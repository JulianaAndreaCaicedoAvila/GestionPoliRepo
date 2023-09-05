using System.IdentityModel.Tokens.Jwt;
using System.Text;
using ESAP.Sirecec.Api.Authorization;
using Microsoft.IdentityModel.Tokens;
namespace ESAP.Sirecec.Data.Api.Authorization;
public class JwtMiddleware
{
	private readonly RequestDelegate _next;
	public readonly IConfiguration? _conf;
	public JwtMiddleware(RequestDelegate next, IConfiguration configuration)
	{
		_next = next;
		_conf = configuration;
	}
	// public async Task Invoke(HttpContext context, IUserService userService)
	// {
	// 	var token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
	// 	if (token != null)
	// 		//Validate the token
	// 		attachUserToContext(context, userService, token);
	// 	await _next(context);
	// }
	// private void attachUserToContext(HttpContext context, IUserService userService, string token)
	// {
	// 	try
	// 	{
	// 		var tokenHandler = new JwtSecurityTokenHandler();
	// 		var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_appSettings.Key));
	// 		tokenHandler.ValidateToken(token, new TokenValidationParameters
	// 		{
	// 			ValidateIssuerSigningKey = true,
	// 			ValidateAudience = true,
	// 			ValidateLifetime = true,
	// 			IssuerSigningKey = key,
	// 			ValidIssuer = _conf["Jwt:Issuer"],
	// 			ValidAudience = _conf["Jwt:Audience"],
	// 			ClockSkew = TimeSpan.Zero
	// 		}, out SecurityToken validatedToken);
	// 		var jwtToken = (JwtSecurityToken)validatedToken;
	// 		var userId = int.Parse(jwtToken.Claims.First(x => x.Type == "id").Value);
	// 		// attach user to context on successful jwt validation
	// 		context.Items["User"] = userService.GetById(userId);
	// 	}
	// 	catch (Exception)
	// 	{
	// 		// do nothing if jwt validation fails
	// 		// user is not attached to context so request won't have access to secure routes
	// 	}
	// }
}