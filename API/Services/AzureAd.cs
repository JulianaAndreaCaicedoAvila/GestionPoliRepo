using System.Text.Json;
using System.Threading.Tasks;
using Azure.Identity;
using Microsoft.Graph;


namespace ESAP.Sirecec.Data.API.Services;

public interface IAzureAdService
{
	Task<string?> GetByEmailAsync(string email);
}

public class AzureAdService : IAzureAdService
{
	private readonly Uri _instance;
	private readonly GraphServiceClient _graphClient;
	private readonly IConfiguration _configuration;
	private readonly string _clientId, _clientSecret, _graphApiResource, _tenantId;

	// 202208170026: https://stackoverflow.com/a/40734696  https://azuretrendz.wordpress.com/2020/01/15/azure-ad-search-using-c
	// 202208170054: Azure AD B2C user account management with .NET Core and Microsoft Graph -> https://t.ly/jOX_
	// 202208170531: Client credentials provider: The client credential flow enables service applications to run without user interaction -> https://t.ly/2nL3
	private GraphServiceClient GetClient()
	{
		// The client credentials flow requires that you request the .default scope, and preconfigure your permissions on the
		// app registration in Azure. An administrator must grant consent	to those permissions beforehand.
		var scopes = new[] { "https://graph.microsoft.com/.default" };
		// Multi-tenant apps can use "common" single-tenant apps must use the tenant ID from the Azure portal
		var tenantId = _tenantId;
		// Values from app registration
		var clientId = _clientId;
		var clientSecret = _clientSecret;
		// using Azure.Identity;
		var options = new TokenCredentialOptions
		{
			AuthorityHost = AzureAuthorityHosts.AzurePublicCloud
		};
		// https://docs.microsoft.com/dotnet/api/azure.identity.clientsecretcredential
		var clientSecretCredential = new ClientSecretCredential(tenantId, clientId, clientSecret, options);
		var graphClient = new GraphServiceClient(clientSecretCredential, scopes);
		return graphClient;
	}
	public AzureAdService(IConfiguration configuration)
	{
		_configuration = configuration;
		_clientId = _configuration["AzureAd:ClientId"] ?? "";
		_clientSecret = _configuration["AzureAd:ClientSecretValue"] ?? "";
		_graphApiResource = _configuration["AzureAd:GraphApiResource"] ?? "";
		_tenantId = _configuration["AzureAd:TenantId"] ?? "";
		_instance = new(_configuration["AzureAd:Instance"] ?? "");
		_graphClient = GetClient();
	}

	public async Task<string?> GetByEmailAsync(string email)
	{
		var result = await _graphClient.Users
			 .Request()
			 .Filter($"identities/any(c:c/issuerAssignedId eq '{email}' and c/issuer eq '{_tenantId}')")
			 .Select(e => new
			 {
				 e.DisplayName,
				 e.Id,
				 e.Identities
			 })
			 .GetAsync();
		return result != null ? JsonSerializer.Serialize(result) : null;
	}
}