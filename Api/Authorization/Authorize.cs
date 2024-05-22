
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using System.Security.Principal;
using System.Text;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.IdentityModel.Protocols;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;
using Microsoft.IdentityModel.Tokens;

namespace SongStock.Api.Authorization;
[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
public class Authorize : Attribute, IAuthorizationFilter
{

	private IConfiguration _conf;

	public static DateTime UnixTimeStampToDateTime(long unixTimeStamp)
	{
		// Unix timestamp is seconds past epoch
		DateTime dateTime = new DateTime(1970, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc);
		dateTime = dateTime.AddSeconds(unixTimeStamp).ToLocalTime();
		return dateTime;
	}

	public void OnAuthorization(AuthorizationFilterContext filterContext)
	{
		if (filterContext != null)
		{
			// skip authorization if action is decorated with [AllowAnonymous] attribute
			var allowAnonymous = filterContext.ActionDescriptor.EndpointMetadata.OfType<AllowAnonymousAttribute>().Any();
			if (allowAnonymous)
				return;
			// 202206080617: https://stackoverflow.com/a/59995286
			_conf = (IConfiguration)filterContext.HttpContext.RequestServices.GetService(typeof(IConfiguration));
			var response = filterContext.HttpContext.Response;
			var reqHeaders = filterContext.HttpContext.Request.Headers;
			var respHeaders = response.Headers;
			var token = reqHeaders["Authorization"].FirstOrDefault();
			if (token != null)
			{
				if (token.Contains(" "))
					token = token.Split(" ").Last();
				if (IsValidToken(token, filterContext))
				{
					respHeaders.Add("token", token);
					respHeaders.Add("AuthStatus", "Authorized");
					respHeaders.Add("storeAccessiblity", "Authorized");
					response.StatusCode = (int)HttpStatusCode.OK;
					return;
				}
				else
				{
					respHeaders.Add("token", token);
					respHeaders.Add("AuthStatus", "NotAuthorized");
					response.StatusCode = (int)HttpStatusCode.Forbidden;
					response.HttpContext.Features.Get<IHttpResponseFeature>().ReasonPhrase = "Not Authorized";
					filterContext.Result = new JsonResult("NotAuthorized")
					{
						Value = new
						{
							Status = "ERROR",
							Message = "Invalid Token"
						},
					};
				}
			}
			else
			{
				var error = "Se debe proporcionar un token válido";
				response.StatusCode = (int)HttpStatusCode.Forbidden;
				response.HttpContext.Features.Get<IHttpResponseFeature>().ReasonPhrase = error;
				filterContext.Result = new JsonResult(error)
				{
					Value = new
					{
						Status = "ERROR",
						Message = error
					},
				};
			}
		}
	}

	public bool IsValidToken(string token, AuthorizationFilterContext filterContext)
	{
		SecurityToken validatedToken;
		var handler = new JwtSecurityTokenHandler();
		var jwToken = handler.ReadJwtToken(token);

		// 202206140023: Valida que el token no haya expirado
		// https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.4
		var exp = jwToken.Claims.First(claim => claim.Type == "exp").Value;
		DateTimeOffset dateTimeOffset = DateTimeOffset.FromUnixTimeSeconds(long.Parse(exp));
		var dtExp = dateTimeOffset.LocalDateTime;
		if (DateTime.Now > dtExp) return false;

		// 202206140134: Token Azure AD
		// "https://login.microsoftonline.com/33fa6907-21c6-4126-aa66-bcbed95361bb/v2.0"
		if (jwToken.Issuer.ToLower().Contains("login.microsoftonline.com"))
		{
			var tenantId = _conf["AzureAd:TenantId"];
			var tenantIdClaim = jwToken.Claims.First(claim => claim.Type == "tid").Value;
			if (tenantId != tenantIdClaim) return false;
			var clientId = _conf["AzureAd:ClientId"];
			var clientIdClaim = jwToken.Claims.First(claim => claim.Type == "aud").Value;
			if (clientId != clientIdClaim) return false;
			// 202206132330: Custom Authentication (Validate JWT Token) In .NET Core -> https://t.ly/Nxg3
			// 202206080721: How to Validate the Access Token Issued by Microsoft Azure AD -> https://t.ly/fQtO
			string stsDiscoveryEndpoint = "https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration";
			var config = AuthConfigManager.GetOpenIdConnectConfig(stsDiscoveryEndpoint);
			var signingKeys = config.SigningKeys;
			try
			{
				var validationParameters = new TokenValidationParameters
				{
					RequireExpirationTime = true,
					ValidateLifetime = true,
					ClockSkew = TimeSpan.FromMinutes(1),
					RequireSignedTokens = true,
					ValidateIssuerSigningKey = true,
					IssuerSigningKeys = signingKeys,
					ValidateIssuer = true,
					ValidIssuer = jwToken.Issuer,
					ValidateAudience = true,
					ValidAudience = clientId
				};
				// 202206140054: Signature validation failed.Keys tried: '[PII of type 'System.Text.StringBuilder' is hidden
				// The problem was that I was using the accessToken to authenticate instead of the idToken -> https://t.ly/8853
				IPrincipal principal = handler.ValidateToken(token, validationParameters, out validatedToken);
				Thread.CurrentPrincipal = principal;
				return true;
			}
			catch
			{
				return false;
			}
		}
		else
		{
			// 202206140134: Token Local
			try
			{
				var validationParameters = new TokenValidationParameters
				{
					ClockSkew = TimeSpan.Zero,
					ValidateIssuer = true,
					ValidateAudience = true,
					ValidateLifetime = true,
					ValidateIssuerSigningKey = true,
					ValidIssuer = _conf["Jwt:Issuer"],
					ValidAudience = _conf["Jwt:Audience"],
					IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_conf["Jwt:Key"]))
				};
				IPrincipal principal = handler.ValidateToken(token, validationParameters, out validatedToken);
				var jwtToken = (JwtSecurityToken)validatedToken;
				var claim = jwtToken.Claims.First(x => x.Type == ClaimTypes.Sid);
				if (claim != null)
				{
					var userId = int.Parse(claim.Value);
					filterContext.HttpContext.Items["UserId"] = userId;
				}
				Thread.CurrentPrincipal = principal;
				return true;
			}
			catch
			{
				return false;
			}
		}
	}
}
