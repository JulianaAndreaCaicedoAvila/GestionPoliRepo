<script setup>
import api from "@/utils/api";
import { router } from "@/utils";
import { useAuthStore } from "@/stores";
import { ref, onMounted, getCurrentInstance } from "vue";

const app = getCurrentInstance();
let props = app.appContext.config.globalProperties,
	loginZone = null,
	recoverZone = null,
	mainZone = null,
	account = ref(null),
	accounts = ref(null),
	// email = ref("dvargas@nemedi.com"),
	// password = ref("Acceso*2022"),
	email = ref(""),
	password = ref(""),
	email_recover = ref(null),
	authStore = useAuthStore();

// 202206101530: Inicializa el store
authStore.init();

let recoverDo = () => {
	loginZone.fadeOut(function name(params) {
		mainZone.clear();
		recoverZone.fadeIn(function name(params) {});
	});
};
let recoverBack = () => {
	recoverZone.fadeOut(function name(params) {
		mainZone.clear();
		loginZone.fadeIn(function name(params) {});
	});
};
let login = async () => {
	if (loginZone.isValid()) {
		loginZone.find(".card").lock("Verificando credenciales,<br/>un momento por favor");
		let res = await authStore.login(["autenticar", email.value, password.value]).catch((error) => {
			console.error("error =>", error);
			loginZone.find(".card").unlock();
			msg.error("Error de autenticación", "Verifique credenciales e inténtelo nuevamente", function (params) {
				$("#txt-email").focus();
			});
		});
		if (res !== null) {
			console.log("res =>", res);
			loginZone.find(".card").lock(`Hola ${res.firstName}, ingresando!<br/>Un momento por favor`);
			setTimeout(function () {
				router.push(this.returnUrl || "/inicio");
			}, 1000);
		}
	}
};
let signin = async () => {
	loginZone.find(".card").lock("Ingresando con ANSV,<br/>esperando respuesta");
	mainZone.clear();
	// https://docs.microsoft.com/en-us/aspnet/web-api/overview/security/individual-accounts-in-web-api
	// https://docs.microsoft.com/es-es/azure/active-directory/develop/scenario-spa-sign-in?tabs=javascript2#sign-in-with-redirect
	// https://docs.microsoft.com/en-us/azure/active-directory-b2c/openid-connect
	await authStore.msal
		.loginPopup({})
		.then(async (loginResponse) => {
			// console.clear();
			console.log("loginResponse =>", loginResponse);
			accounts = authStore.msal.getAllAccounts();
			console.log("accounts =>", accounts);
			if (accounts.length > 0) {
				account = accounts[0];
				console.log("account =>", account);
				// authStore.user = account;
				authStore.token = loginResponse.idToken;
				// let firstName = account.idTokenClaims.name.split(" ")[0];
				// 202208181954 Login
				let email = account.username;
				let res = await authStore.login(["email", email]).catch((error) => {
					console.error("error =>", error);
					loginZone.find(".card").unlock();
					msg.error("Error de autenticación", "Verifique credenciales e inténtelo nuevamente", function (params) {
						$("#txt-email").focus();
					});
				});
				if (res !== null) {
					console.log("res =>", res);
					loginZone.find(".card").lock(`Hola ${res.firstName}, ingresando!<br/>Un momento por favor`);
					setTimeout(function () {
						router.push(this.returnUrl || "/inicio");
					}, 1000);
				}
				// await api({ hideErrors: true })
				// 	.post(`usuario/email`, email)
				// 	.then((r) => {
				// 		// console.clear();
				// 		console.log("r =>", r);
				// 		loginZone.find(".card").lock(`Hola ${r.data.firstName}, ingresando!<br/>Un momento por favor`);
				// 		setTimeout(function () {
				// 			router.push(this.returnUrl || "/inicio");
				// 		}, 1000);
				// 		// addCancel(function () {
				// 		// 	panelData.unlock();
				// 		// 	grid.refresh();
				// 		// });
				// 	})
				// 	.catch((error) => {
				// 		console.error("error =>", error);
				// 		loginZone.find(".card").unlock();
				// 		msg.error(
				// 			"Error de autenticación",
				// 			`El correo <span class='font-weight-semibold'>"${email}"</span><br/>no se encuentra registrado en el sistema.`,
				// 			function (params) {
				// 				$("#txt-email").focus();
				// 			}
				// 		);
				// 	});
			} else {
				const error = new Error("No hay cuentas!");
				error.code = "THIS_IS_A_CUSTOM_ERROR_CODE";
				return error;
			}
		})
		.catch((error) => {
			// console.clear();
			loginZone.find(".card").unlock();
			console.log("error =>", error);
			console.error(`error during authentication: ${error}`);
		});
};
let signout = async () => {
	await props.$msal
		.logout({})
		.then(() => {
			// this.$emitter.emit("logout", "logging out");
		})
		.catch((error) => {
			console.error(error);
		});
};
let recover = () => {
	if (recoverZone.isValid()) {
	}
};

onMounted(() => {
	// console.clear();
	console.log("MOUNTED!!");
	console.log("config =>", window._config);
	console.log("getCurrentInstance =>", app);
	console.log("globalProperties =>", props);
	console.log("window.address =>", window.address);

	// 202206080058: https://devblogs.microsoft.com/azure-sdk/vue-js-user-authentication/
	// accounts = props.$msal.getAllAccounts();
	// console.log("accounts =>", accounts);
	// if (accounts.length > 0) account = accounts[0];

	console.log("props.$msal =>", props.msal);
	setTimeout(function () {
		mainZone = $("#main-zone");
		loginZone = $("#login-zone");
		recoverZone = $("#recover-zone");
		$("#txt-email").focus();
		console.log("loginZone =>", loginZone);
		console.log("recoverZone =>", recoverZone);
	}, 300);
});

$().ready(function () {});
</script>
<template>
	<div class="container py-4" id="main-zone">
		<div class="row" id="login-zone">
			<div class="col d-flex align-items-center justify-content-center">
				<div class="card col-5">
					<div class="card-header main"><i class="fa-solid fa-user-lock"></i> Ingresar al sistema</div>

					<div class="card-body pt-3 pb-4">
						<div class="row">
							<div class="form-group">
								<label class="form-label color-main font-weight-semibold">Correo electrónico: <span class="text-color-danger">*</span></label>

								<div class="form-icon position-relative">
									<i class="fa-solid fa-envelope text-4 color-main position-absolute left-15 top-50pct transform3dy-n50"></i>

									<input
										required
										email
										type="text"
										v-model="email"
										placeholder="Correo electrónico"
										class="form-control form-control-lg text-4 has-icon"
										id="txt-email"
										name="txt-email"
									/>
								</div>
							</div>
						</div>

						<div class="row">
							<div class="form-group m-0">
								<label class="form-label color-main font-weight-semibold">Contraseña: <span class="text-color-danger">*</span></label>

								<div class="form-icon position-relative">
									<i class="fa-solid fa-key text-4 color-main position-absolute left-15 top-50pct transform3dy-n50"></i>

									<input
										required
										minlength="5"
										type="password"
										v-model="password"
										placeholder="Contraseña"
										class="form-control form-control-lg text-4 has-icon"
										id="txt-password"
										name="txt-password"
									/>
								</div>
							</div>
						</div>
					</div>

					<div class="card-footer main">
						<div class="d-flex justify-content-between">
							<span v-if="$conf.msalConfig.enabled">
								<button type="button" class="btn btn-gray" @click.prevent="signin" title="Ingreso usuarios ESAP...">USUARIOS ESAP</button>
							</span>
							<span v-else>&nbsp;</span>
							<button type="button" class="btn btn-main" @click.prevent="login" title="Ingresar">INGRESAR</button>
						</div>
						<div class="bt mt-3 pt-2 text-center font-weight-semibold text-size-md d-flex align-items-center justify-content-between">
							<a href="#" @click.prevent="recoverDo" class="text-" title="Recuperar contraseña...">Recuperar contraseña</a>
							<a href="#" @click.prevent="recoverDo" class="text-" title="Registrarse...">Registrarse</a>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="row hidden" id="recover-zone">
			<div class="col d-flex align-items-center justify-content-center">
				<div class="card col-5">
					<div class="card-header main"><i class="fa-solid fa-arrow-rotate-left"></i> Recuperar contraseña</div>

					<div class="card-body pt-3 pb-2">
						<div class="row">
							<div class="form-group">
								<label class="form-label color-main font-weight-semibold">Correo electrónico: <span class="text-color-danger">*</span></label>

								<div class="form-icon position-relative">
									<i class="fa-solid fa-envelope text-4 color-main position-absolute left-15 top-50pct transform3dy-n50"></i>

									<input
										required
										email
										type="text"
										v-model="email"
										placeholder="Correo electrónico"
										class="form-control form-control-lg text-4 has-icon"
										id="txt-email-recover"
										name="txt-email-recover"
									/>
								</div>
							</div>
						</div>
					</div>

					<div class="card-footer main">
						<div class="d-flex justify-content-between">
							<button type="button" class="btn btn-gray" @click.prevent="recoverBack">INGRESAR AL SISTEMA</button>

							<button type="button" class="btn btn-main" @click.prevent="recover">RECUPERAR</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
