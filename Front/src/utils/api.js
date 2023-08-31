import axios from "axios";
import { useAuthStore } from "../stores";
import { custom } from "devextreme/ui/dialog";
// const api_url = `${import.meta.env.VITE_URL_APP_API}`;

export default (args = {}) => {
	// 202103101051: DxDialog: https://js.devexpress.com/Documentation/ApiReference/Common/Utils/ui/dialog
	// 202103101046: Buttons https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxButton/Configuration
	let show = function (msg = "", code = null) {
		if (document.getElementsByClassName("dx-dialog").length <= 0) {
			// if ($(".dx-dialog").length <= 0) {
			let err = code !== null ? `<textarea class='code' disabled>${code}</textarea>` : "";
			let dialog = custom({
				showTitle: false,
				dragEnabled: false,
				messageHtml: `<span class='error'><h2>${msg}</h2>${err}</span>`,
				buttons: [
					{
						template: `<span class="cmd">ENTENDIDO <i class="icon-thumbs-up2"></i></span>`,
						onClick: (e) => {
							return {
								buttonText: e.component.option("text"),
							};
						},
					},
				],
			});
			dialog.show().then((dialogResult) => {
				console.log(dialogResult.buttonText);
				// window.vm.loaderHide();
			});
		}
	};

	// 202011260213: https://stackoverflow.com/a/6941653
	let axiosConfig = {
		baseURL: typeof args.base_url !== "undefined" ? args.base_url : window._apiUrl,
		withCredentials: false,
		headers: {
			Accept: "application/json",
			"Access-Control-Allow-Origin": "*",
			"Content-Type": "application/json; charset=utf-8",
		},
	};
	// 202009081539: Sending the bearer token with axios
	// https://stackoverflow.com/a/42879201
	// 202308311633: https://vitejs.dev/guide/env-and-mode.html#env-variables
	let preffix = import.meta.env.DEV ? "Bearer " : "";
	if (typeof args.token !== "undefined") {
		axiosConfig.headers["Authorization"] = `${preffix}${args.token}`;
	} else {
		let token = useAuthStore().token;
		console.log("token =>", token);
		if (typeof token !== "undefined" && token !== null) {
			axiosConfig.headers["Authorization"] = `${preffix}${token}`;
		}
	}
	const axiosInstance = axios.create(axiosConfig);

	// 202009090053: Request interceptor -> https://github.com/axios/axios#interceptors
	axiosInstance.interceptors.request.use(
		function (config) {
			return config;
		},
		function (error) {
			// 202009090114: TODO: Add prompt on error?
			console.error(window._sep + "REQUEST ERROR", error);
			console.log("args =>", args);
			if (typeof args.hideErrors !== "undefined" && args.hideErrors === false) {
				show(error, JSON.stringify(error.request.config, null, "\t"));
			}
			return Promise.reject(error);
		}
	);

	// Response interceptor
	axiosInstance.interceptors.response.use(
		function (response) {
			// console.log("Response", response);
			// Any status code that lie within the range of 2xx cause this function to trigger
			// Do something with response data
			return response;
		},
		function (error) {
			// console.error("error =>", error);
			// console.info("error.response =>", error.response);
			// let msg = null;
			// if (typeof error.response !== "undefined") {
			// msg = `<span class="error-detail">${error.response.data.exception.replace("<", "").replace(">", "")}</span>`;
			// delete error.response.data.traces;
			// msg = JSON.stringify(error.response, null, "\t");
			// }
			// console.info("error.response.status =>", error.response.status);
			// if (error.response.status === 401) {
			// console.log("store =>", store);
			// store.commit("auth/login/authLogout", function () {
			// 	window.vm.$router.push("/inicio");
			// });
			// } else {
			if (typeof args.hideErrors === "undefined" || args.hideErrors === false) {
				// show(`${error}`, msg);
				console.log(_sep + "error =>", error);
				let ex = error.response.data.exceptionDetails[0];
				let ms = `${error.response.data.detail}<textarea rows="5" class="d-block form-control mt-2" readonly>${ex.raw}</textarea>`;
				window.msg.error(`${error.message}`, ms, function () {
					return Promise.reject(error);
				});
			}
			// }
		}
	);

	return axiosInstance;
};
