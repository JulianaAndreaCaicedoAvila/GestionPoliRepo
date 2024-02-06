import { LogLevel, PublicClientApplication } from "@azure/msal-browser";

// 202206072344:
// https://github.com/AzureAD/microsoft-authentication-library-for-js/tree/dev/samples/msal-browser-samples/vue3-sample-app
// https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/initialization.md
// https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md
// https://devblogs.microsoft.com/azure-sdk/vue-js-user-authentication/
// PNSV
// App Client ID: b7933851-8311-4051-a819-af52b557c52e
// Object ID: 2e987771-097b-4d29-947b-95b6ac322441
// Directory Tenant ID: 33fa6907-21c6-4126-aa66-bcbed95361bb

// Config object to be passed to Msal on creation
export const msal = {
	auth: {
		clientId: "b7933851-8311-4051-a819-af52b557c52e",
		redirectUri: "http://localhost:3000", // Must be registered as a SPA redirectURI on your app registration
		postLogoutRedirectUri: "http://localhost:3000", // Must be registered as a SPA redirectURI on your app registration
	},
	cache: {
		cacheLocation: "sessionStorage",
	},
	system: {
		loggerOptions: {
			loggerCallback: (level, message, containsPii) => {
				if (containsPii) {
					return;
				}
				switch (level) {
					case LogLevel.Error:
						console.error(message);
						return;
					case LogLevel.Info:
						console.info(message);
						return;
					case LogLevel.Verbose:
						console.debug(message);
						return;
					case LogLevel.Warning:
						console.warn(message);
						return;
					default:
						return;
				}
			},
			logLevel: LogLevel.Verbose,
		},
	},
};

export const msalInstance = new PublicClientApplication(msal);

// Add here scopes for id token to be used at MS Identity Platform endpoints.
export const loginRequest = {
	scopes: ["User.Read"],
};

// Add here the endpoints for MS Graph API services you would like to use.
export const graphConfig = {
	graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
};
