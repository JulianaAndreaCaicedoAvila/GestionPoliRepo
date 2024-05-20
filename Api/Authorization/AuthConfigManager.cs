namespace Poli.Repositorio.Data.Api.Authorization;

// using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Protocols;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;
using Microsoft.IdentityModel.Tokens;

public static class AuthConfigManager
{

	private static bool _hashNonceBeforeValidateToken = true;
	private const string MicrosoftGraphApplicationId = "00000003-0000-0000-c000-000000000000";
	private const string MicrosoftIssuer = "https://sts.windows.net";
	private static IConfigurationManager<OpenIdConnectConfiguration> configManager;
	private static IConfigurationManager<OpenIdConnectConfiguration> GetConfigurationManager(string metadataAddress)
	{
		if (configManager == null)
			return new ConfigurationManager<OpenIdConnectConfiguration>(metadataAddress, new OpenIdConnectConfigurationRetriever(), new HttpDocumentRetriever());
		return configManager;
	}
	public static OpenIdConnectConfiguration GetOpenIdConnectConfig(string metadataAddress)
	{
		var configManager = GetConfigurationManager(metadataAddress);
		var metaData = configManager.GetConfigurationAsync(default).Result;
		return metaData;
	}

	// 202206140036: https://stackoverflow.com/a/71588115
	// public static bool ValidateTokenSignature(string accessToken, ApplicationConfiguration applicationConfiguration) {
	// 	var tokenHandler = new JwtSecurityTokenHandler();
	// 	var jsonToken = tokenHandler.ReadJwtToken(accessToken);
	// 	string[] parts = accessToken.Split('.');
	// 	string header = parts[0];
	// 	string payload = parts[1];
	// 	string signature = parts[2];

	// 	//hash nonce and update header with the hash before validating
	// 	if (_hashNonceBeforeValidateToken &&
	// 		 jsonToken.Header.TryGetValue("nonce", out object nonceAsObject)) {
	// 		string plainNonce = nonceAsObject.ToString();
	// 		using (SHA256 sha256 = SHA256.Create()) {
	// 			byte[] hashedNonceAsBytes = sha256.ComputeHash(
	// 				 System.Text.Encoding.UTF8.GetBytes(plainNonce));
	// 			string hashedNonce = Base64Url.Encode(hashedNonceAsBytes);
	// 			jsonToken.Header.Remove("nonce");
	// 			jsonToken.Header.Add("nonce", hashedNonce);
	// 			header = tokenHandler.WriteToken(jsonToken).Split('.')[0];

	// 			accessToken = $"{header}.{payload}.{signature}";
	// 		}
	// 	}

	// 	//get the Microsoft JWT signature public key 
	// 	string stsDiscoveryEndpoint = $"https://login.microsoftonline.com/{applicationConfiguration.TenantId}/v2.0/.well-known/openid-configuration";
	// 	if (jsonToken.Header.TryGetValue("ver", out object version) && version.ToString() == "1.0") {
	// 		stsDiscoveryEndpoint = $"https://login.microsoftonline.com/{applicationConfiguration.TenantId}/.well-known/openid-configuration";
	// 	}
	// 	var openidConfigManaged = new ConfigurationManager<OpenIdConnectConfiguration>(stsDiscoveryEndpoint,
	// 		 new OpenIdConnectConfigurationRetriever(),
	// 		 new HttpDocumentRetriever());
	// 	var configTask = openidConfigManaged.GetConfigurationAsync();
	// 	configTask.Wait();
	// 	var config = configTask.Result;

	// 	var parameteres = new TokenValidationParameters() {
	// 		RequireAudience = true,
	// 		ValidateAudience = true,
	// 		ValidAudiences = new[] { applicationConfiguration.ApplicationId, MicrosoftGraphApplicationId },
	// 		ValidateIssuer = true,
	// 		ValidIssuers = new string[] { $"{MicrosoftIssuer}/{applicationConfiguration.TenantId}/", config.Issuer },
	// 		IssuerSigningKeys = config.SigningKeys,
	// 		ValidateIssuerSigningKey = true,
	// 		RequireExpirationTime = true,
	// 		ValidateLifetime = true,
	// 	};

	// 	var claimPrincipal = tokenHandler.ValidateToken(accessToken, parameteres, out SecurityToken validatedToken);

	// 	return claimPrincipal.Identity.IsAuthenticated;
	// }
}