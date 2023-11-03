// DX
import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.light.css";
import { loadMessages, locale } from "devextreme/localization";
import esMessages from "devextreme/localization/messages/es.json";
loadMessages(esMessages);
locale("es");

// Otros
import { router } from "./utils";
import "./assets/scss/global.scss";
import { useAuthStore } from "@/stores";
window.$ = window.jQuery;
console.log("window.address =>", window.address);
window._basePath = window.address.origin;
window._baseUrl = import.meta.env.BASE_URL;
window._env = import.meta.env.MODE;
// 202211230055: https://vitejs.dev/guide/env-and-mode.html
console.log("window._env =>", window._env);
window._apiUrl = window._basePath + window._baseUrl + "api";
if (import.meta.env.DEV) window._apiUrl = "http://localhost:3550";
console.log("window._apiUrl =>", window._apiUrl);

const capitalize = (str, lower = true) => (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, (match) => match.toUpperCase());

$().ready(function () {});

// Global
import axios from "axios";
import { createApp } from "vue";
import { createPinia } from "pinia";
import app from "./app.vue";
const appObj = createApp(app);
let props = appObj.config.globalProperties;
axios
	.get(window._baseUrl + "data/config.json")
	.then(({ data }) => {
		// Construct
		appObj.use(createPinia()).use(router).mount("#app");

		// Init
		window.themeInit();
		console.log("jQuery", $().jquery);

		// Propiedades globales
		const authStore = useAuthStore();
		props.$auth = authStore;
		console.log("authStore =>", authStore);
		console.log("authStore.user =>", authStore.user);
		window._config = data;
		props.$conf = window._config;
		props.$msal = {};
		props.$si_no = [
			{ name: "SI", value: true },
			{ name: "NO", value: false },
		];
		props.$meses = [
			{ value: 1, name: "enero" },
			{ value: 2, name: "febrero" },
			{ value: 3, name: "marzo" },
			{ value: 4, name: "abril" },
			{ value: 5, name: "mayo" },
			{ value: 6, name: "junio" },
			{ value: 7, name: "julio" },
			{ value: 8, name: "agosto" },
			{ value: 9, name: "septiembre" },
			{ value: 10, name: "octubre" },
			{ value: 11, name: "noviembre" },
			{ value: 12, name: "diciembre" },
		];
		props.$si_no_int = [
			{ name: "SI", value: 1 },
			{ name: "NO", value: 0 },
		];
		props.$clean = (e) => {
			let v = e.component.option("value");
			e.component.option("value", v.clean());
		};
		props.$capitalize = (e) => {
			let v = e.component.option("value");
			e.component.option("value", v.capitalize());
		};
		props.$capitalizeAll = (e) => {
			let v = e.component.option("value");
			e.component.option("value", v.capitalizeAll());
		};
		props.$lowerCase = (e) => {
			let v = e.component.option("value");
			if (v != null) e.component.option("value", v.toLowerCase().clean());
		};
		props.$addDays = (date, days) => {
			return window.addDays(date, days);
		};
	})
	.catch((err) => {
		console.log("ERROR", err);
	});
