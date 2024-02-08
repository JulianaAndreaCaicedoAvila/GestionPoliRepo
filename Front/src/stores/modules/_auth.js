import { toRaw } from "vue";
import api from "@/utils/api";
import { router } from "@/utils";
import { defineStore } from "pinia";
import { useSessionStorage } from "@vueuse/core";
import { PublicClientApplication } from "@azure/msal-browser";

const tokenVariableName = "user_token",
	userVariableName = "user_info",
	// window._apiUrl = win,
	// window._apiUrl = `${import.meta.env.VITE_URL_APP_API}`,
	decryptToken = (token) => {
		var base64Url = token.split(".")[1];
		var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
		var jsonPayload = decodeURIComponent(
			atob(base64)
				.split("")
				.map(function (c) {
					return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
				})
				.join("")
		);
		let user = JSON.parse(jsonPayload);
		user["token_value"] = token;
		return user;
	},
	makeUser = (r, origin) => {
		console.log(_sep);
		console.log("makeUser");
		console.log("r =>", r);
		let usr = r.data.usuario;
		usr["origin"] = origin;
		usr["token"] = decryptToken(r.data.token);
		sessionStorage.setItem(tokenVariableName, r.data.token);
		sessionStorage.setItem(userVariableName, JSON.stringify(usr));
		return usr;
	};

export const useAuthStore = defineStore("auth", {
	id: "auth",
	state: () => ({
		msal: null,
		returnUrl: null,
		roles: useSessionStorage("authRoles", []),
		token: sessionStorage.getItem(tokenVariableName),
		tokenDecrypted: null,
		user: sessionStorage.getItem(userVariableName),
		userX: function () {
			let u = sessionStorage.getItem(userVariableName);
			return u != null ? JSON.parse(u) : null;
		},
	}),
	// 202206171442: https://pinia.vuejs.org/core-concepts/getters.html
	getters: {
		esAdmin(state) {
			console.log("state.user =>", toRaw(state.user));
			return state.user != null ? state.user.roleId == 1 : false;
		},
		isTokenExpired(state) {
			console.log("state =>", state);
			if (typeof state.user === "string") state.user = JSON.parse(state.user);
			console.log("state.user =>", state.user);
			// 202205291105: https://stackoverflow.com/a/28742860
			// https://devblogs.microsoft.com/azure-sdk/vue-js-user-authentication/
			// user["token_expired"] = state.user.exp < Date.now() / 1000;
			return state.user ? state.user.token.exp < Date.now() / 1000 : true;
		},
	},
	watch: {
		token: () => {
			console.log("TOKEN");
		},
	},
	actions: {
		async init() {
			// 202206080106: MSAL, en propiedad global -> http://t.ly/bu6L
			// 202310030307: https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/errors.md#uninitialized_public_client_application
			const msalInstance = new PublicClientApplication(window._config.msalConfig);
			await msalInstance.initialize();
			await msalInstance.handleRedirectPromise();
			msalInstance.acquireTokenSilent();
			this.msal = msalInstance;
		},
		async registrarParticipante(u) {
			console.log("registrarParticipante =>", u);
			return await api()
				.post(`usuario/registrar`, JSON.stringify(u))
				.then(async (r) => {
					return r.data;
				});
		},
		async porRol(rol) {
			return await api()
				.post(`usuario/porRol`, rol)
				.then(async (r) => {
					return r.data;
				});
		},
		async porEmail(email) {
			return await api()
				.post(`usuario/porEmail`, email)
				.then(async (r) => {
					return r.data;
				});
		},
		async getRoles() {
			console.log("Roles =>", this.roles);
			if (this.roles.length > 0) return this.roles;
			return await api()
				.get(`usuario/roles`)
				.then(async (r) => {
					this.roles = r.data.sort((a, b) => a.name - b.name);
					return this.roles;
				});
		},
		// 202208182242: Login integrado Local, Azure
		async do(args) {
			// console.clear();
			console.log(_sep);
			console.log("login", args);
			let ep = args[0];
			let endPoint = `${window._apiUrl}/usuario/${ep}`;
			console.log("endPoint =>", endPoint);
			let email = args[1];
			console.log("email =>", email);
			let password = args[2];
			console.log("password =>", password);
			let data = args[1];
			if (ep == "autenticar") data = { email, password };
			else if (ep == "email") data = email;
			console.log("data =>", data);
			return await api({ hideErrors: import.meta.env.PROD })
				.post(endPoint, data)
				.then((r) => {
					if (ep == "autenticar") {
						this.token = r.data.token;
						let usr = makeUser(r, ep == "email" ? "azure" : "local");
						this.user = usr;
						return usr;
					}
					return r.data;
				});
		},
		// 202402080138: Activar cuenta
		async activar(data) {
			console.log(_sep);
			console.log("activar data =>", data);
			return await api({ hideErrors: import.meta.env.PROD })
				.post(`usuario/activar`, data)
				.then((r) => {
					return r.data;
				});
		},
		async login(name, email) {
			console.log(_sep);
			console.log("loginAzureAd");
			console.log("window._apiUrl =>", window._apiUrl);
			console.log("email =>", email);
			return await api({ hideErrors: import.meta.env.PROD })
				.post(`${window._apiUrl}/usuario/email`, { name: name, email: email })
				.then((r) => {
					this.token = r.data.token;
					let usr = makeUser(r, "azure");
					this.user = usr;
					return usr;
				});
		},
		async logout() {
			// console.clear();
			console.log("LOGOUT!");
			// 202206101525: Si hay 'homeAccountId' es sesión AzureAD
			// if (this.user != null && this.user.origin === "azure") {
			// 	console.log("msal =>", this.msal);
			// 	console.log("this.user =>", this.user);
			// 	let usr = decryptToken(this.token);
			// 	let account = this.msal.getAccountByHomeId(usr.homeAccountId);
			// 	console.log("account =>", account);
			// 	// 202206101449: Cierre de sesión con una ventana emergente -> https://t.ly/sk0T
			// 	await this.msal.logoutPopup({ postLogoutRedirectUri: window._baseUrl, account: account }).then((logoutResponse) => {
			// 		console.log("logoutResponse =>", logoutResponse);
			// 		this.clearData();
			// 		router.push("/login");
			// 	});
			// } else {
			this.clearData(function () {
				router.push("/inicio");
			});
			// }
		},
		clearData(cb) {
			this.msal = null;
			this.userState = null;
			this.returnUrl = null;
			this.user = null;
			this.token = null;
			sessionStorage.clear();
			cb();
		},
		// checkExpired() {
		// 	if (this.user) {
		// 		window._int = setInterval(function () {
		// 			console.log(this);
		// 			console.log("this.user =>", this.user);
		// 			console.log("isTokenExpired =>", this.isTokenExpired);
		// 			if (this.isTokenExpired) {
		// 				window.clearInterval(_int);
		// 				this.logout();
		// 			}
		// 		}, 2000);
		// 	} else window.clearInterval(window._int);
		// },
	},
});
// // 202206091517: Events
// useAuthStore.$subscribe(() => {
// 	console.log("useAuthStore subscribed!");
// });
