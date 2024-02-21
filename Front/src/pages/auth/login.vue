<script setup>
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "@/stores";
import { ref, watch, onMounted, getCurrentInstance } from "vue";
const route = useRoute(), router = useRouter();
const app = getCurrentInstance();
const baseUrl = import.meta.env.BASE_URL;
const routeName = router.currentRoute.value.name;
let props = app.appContext.config.globalProperties,
	action = ref("login"),
	recoverZone = null,
	loginZone = null,
	activateZone = null,
	mainZone = null,
	firstName = ref(null),
	lastName = ref(null),
	account = ref(null),
	accounts = ref(null),
	pwdBtnClass = ref("btn btn-main"),
	code = ref(null),
	// email = ref("dvargas@nemedi.com"),
	// password = ref("Acceso*2022"),
	email = ref(""),
	password = ref(""),
	password1 = ref(""),
	email_recover = ref(null),
	authStore = useAuthStore();
// 202206101530: Inicializa el store
authStore.init();
watch(lastName, (n, o) => {
	lastName.value = lastName.value.replace(/\s\s+/g, " ").capitalizeAll();
});
watch(firstName, (n, o) => {
	firstName.value = firstName.value.replace(/\s\s+/g, " ").capitalizeAll();
});
let recoverDo = (what) => {
	email.value = null;
	password.value = null;
	action.value = what;
	loginZone.fadeOut(function name(params) {
		mainZone.clear();
		recoverZone.fadeIn(function name(params) {
			window.FormatInit();
		});
	});
};
let returnUrl = null, recoverBack = () => {
	email.value = null;
	password.value = null;
	firstName.value = null;
	lastName.value = null;
	password.value = null;
	password1.value = null;
	let originZone = null;
	if (activateZone.is(":visible")) originZone = activateZone;
	if (recoverZone.is(":visible")) originZone = recoverZone;
	// if (signupZone.is(":visible")) originZone = signupZone;
	if (originZone != null)
		originZone.fadeOut(function name(params) {
			mainZone.clear();
			loginZone.fadeIn();
		});
};
let login = async () => {
	if (loginZone.isValid()) {
		if (email.value.toLowerCase().contains("@esap.edu.co")) {
			signin();
			return false;
		}
		console.clear();
		loginZone.find(".card").lock("Verificando credenciales,<br/>un momento por favor");
		let res = await authStore.do(["autenticar", email.value, password.value]).catch((error) => {
			// console.clear();
			console.error("error =>", error);
			let title = "Error de autenticación";
			let text = "Verifique credenciales e inténtelo nuevamente";
			console.log("error =>",);
			if (typeof (error.response) != "undefined" && error.response.status == 500) {
				title = "Error: " + error.message;
				text = error.response.data.message;
			}
			msg.error(title, text, function (params) {
				$("#txt-email").focus();
			});
			loginZone.find(".card").unlock();
		});
		if (typeof res != "undefined") {
			console.log("res =>", res);
			loginZone.find(".card").lock(`Hola ${res.firstName}, ingresando!<br/>Un momento por favor`);
			setTimeout(function () {
				router.push(returnUrl);
			}, 1000);
		}
	}
};
let signin = async () => {
	loginZone.find(".card").lock("Ingresando con ESAP,<br/>esperando respuesta");
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
				let name = account.name;
				let email = account.username;
				let res = await authStore.login(name, email).catch((error) => {
					console.error("error =>", error);
					loginZone.find(".card").unlock();
					msg.error("Error de autenticación", "Verifique credenciales e inténtelo nuevamente", function (params) {
						$("#txt-email").focus();
					});
				});
				if (typeof res != "undefined") {
					console.log("res =>", res);
					loginZone.find(".card").lock(`Hola ${res.firstName}, ingresando!<br/>Un momento por favor`);
					setTimeout(function () {
						router.push(returnUrl);
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
let recover = async () => {
	if (recoverZone.isValid()) {
		recoverZone.find(".card").lock("Recuperando contraseña,<br/>un momento por favor");
		let res = await authStore
			.do([
				"recuperar",
				{
					Email: email.value,
				},
			])
			.catch((error) => {
				console.error("error =>", error);
				recoverZone.find(".card").unlock();
				msg.error("Error de autenticación", "Verifique credenciales e inténtelo nuevamente", function (params) {
					$("#txt-email").focus();
				});
			});
		if (typeof res != "undefined") {
			console.log("res =>", res);
			msg.success(
				null,
				`Si la dirección <strong>${email.value}</strong> se encuentra registrada en el sistema deberá recibir un correo electrónico de recuperación en los próximos minutos.`,
				function () {
					recoverZone.find(".card").unlock();
					recoverBack();
				}
			);
		}
	}
};
let register = async () => {
	if (recoverZone.isValid()) {
		recoverZone.find(".card").lock("Registrando cuenta,<br/>un momento por favor");
		let res = await authStore
			.do([
				"registrar",
				{
					RoleId: 1,
					LastName: lastName.value,
					FirstName: firstName.value,
					Email: email.value,
				},
			])
			.catch((error) => {
				console.error("error =>", error);
				recoverZone.find(".card").unlock();
				let err = error.response.data.result.errors[0];
				let text =
					err.code == "DuplicateUserName" ? `Ya existe una cuenta registrada con el correo electrónico <strong>${email.value}</strong>.` : err.description;
				msg.error(`Error de registro`, text, function (params) {
					// router.push("ingreso");
					recoverBack();
				});
				console.error("error =>", error);
			});
		if (typeof res != "undefined") {
			console.log("res =>", res);
			msg.success(
				null,
				`<strong>${firstName.value}</strong>, el sistema acaba de enviar un correo electrónico a la dirección <strong>${email.value}</strong> para que active su nueva cuenta por favor.`,
				function () {
					recoverZone.find(".card").unlock();
					recoverBack();
				}
			);
		}
	}
};
let confirm = async () => {
	if (recoverZone.isValid()) {
		recoverZone.find(".card").lock("Confirmando cuenta,<br/>un momento por favor");
		let res = await authStore
			.do([
				"registrar",
				{
					RoleId: 1,
					LastName: lastName.value,
					FirstName: firstName.value,
					Email: email.value,
				},
			])
			.catch((error) => {
				console.error("error =>", error);
				recoverZone.find(".card").unlock();
				msg.error("Error de autenticación", "Verifique credenciales e inténtelo nuevamente", function (params) {
					$("#txt-email").focus();
				});
			});
		if (typeof res != "undefined") {
			console.log("res =>", res);
			msg.success(
				null,
				`El sistema acaba de enviar un correo electrónico a la dirección <strong>${email.value}</strong> para que active su nueva cuenta.`,
				function () {
					recoverZone.find(".card").unlock();
					recoverBack();
				}
			);
		}
	}
};
let reset = async (endPoint) => {
	if (activateZone.isValid()) {
		let txt = endPoint == "activar" ? "Activando cuenta" : "Ingresando datos";
		activateZone.find(".card").lock(`${txt},<br/>un momento por favor`);
		var dto = {
			email: email.value,
			password: password.value,
			code: code.value,
			firstName: null,
			lastName: null,
		};
		console.log("dto =>", dto);
		let res = await authStore.activar(JSON.stringify(dto))
			.catch((error) => {
				console.error("error =>", error);
				activateZone.find(".card").unlock();
				let err = error.response.data.result.errors[0];
				txt = endPoint == "activar" ? "Activando cuenta" : "Ingresando datos";
				let text =
					err.code == "InvalidToken"
						? `El correo enviado para la ${endPoint == "activar" ? `activación de<br>la cuenta` : `recuperación de<br>la contraseña`
						} ha caducado o ya fue utilizado.`
						: err.description;
				msg.error(`Error al ${endPoint == "activar" ? `activar la cuenta` : `asignar la contraseña`}`, text, function (params) {
					router.push("ingreso");
				});
			});
		if (typeof res != "undefined") {
			console.log("res =>", res);
			let txt = endPoint == "activar" ? "Cuenta activada!" : "Contraseña asignada!";
			msg.success(txt, null, function () {
				router.push("ingreso");
			});
		}
	}
};

onMounted(() => {
	// console.clear();
	console.log(_sep);
	console.log("login.vue mounted!!");
	console.log("route.query =>", route.query);
	console.log("router =>", router);
	console.log("router.options.history.state =>", router.options.history.state);
	// console.log("route.options.history.state =>", route.options.history.state);
	console.log("config =>", window._config);
	console.log("getCurrentInstance =>", app);
	console.log("globalProperties =>", props);
	console.log("window.address =>", window.address);
	console.log("route =>", router.currentRoute.value);

	// 202206080058: https://devblogs.microsoft.com/azure-sdk/vue-js-user-authentication/
	// accounts = props.$msal.getAllAccounts();
	// console.log("accounts =>", accounts);
	// if (accounts.length > 0) account = accounts[0];

	// 202402081717: Check if history
	if (window.history.state.back === null) {
		returnUrl = baseUrl;
	} else {
		returnUrl = router.options.history.state.back;
	}

	console.log("props.$msal =>", props.msal);
	setTimeout(function () {
		mainZone = $("#main-zone");
		loginZone = $("#login-zone");
		recoverZone = $("#recover-zone");
		activateZone = $("#activate-zone");

		// 202306020122: Si esta recuperando la contraseña
		if (route.query.c) {
			console.log("c =>", route.query.c);
			console.log("routeName =>", routeName);
			if (routeName == "activar") {
				// email.value = route.query.e;
				email.value = route.query.e.d64();
				// code.value = route.query.c;
				code.value = route.query.c.d64();
				console.log("email =>", email.value);
				console.log("code =>", code.value);
				$("#txt-email").focus();
				action.value = "activate";
				activateZone.fadeIn();
			}
		} else {
			loginZone.fadeIn();
		}

		console.log("loginZone =>", loginZone);
		console.log("recoverZone =>", recoverZone);
		console.log("activateZone =>", activateZone);
	}, 300);
});

$().ready(function () { });
</script>
<template>
	<div class="container py-4" id="main-zone">

		<div class="row hidden" id="login-zone">
			<div class="col d-flex align-items-center justify-content-center">
				<div class="card col-5">
					<div class="card-header main"><i class="fa-solid fa-user-lock"></i> Ingresar al sistema</div>
					<div class="card-body pt-3 pb-4" @keyup.enter="login">
						<div class="row">
							<div class="form-group">
								<label class="form-label color-main font-weight-semibold">Correo electrónico: <span
										class="text-color-danger">*</span></label>
								<div class="form-icon position-relative">
									<i
										class="fa-solid fa-envelope text-4 color-main position-absolute left-15 top-50pct transform3dy-n50"></i>
									<input required email type="text" v-model="email" placeholder="Correo electrónico"
										class="form-control form-control-lg text-4 has-icon" id="txt-email" name="txt-email" />
								</div>
							</div>
						</div>
						<div class="row">
							<div class="form-group m-0">
								<label class="form-label color-main font-weight-semibold">Contraseña: <span
										class="text-color-danger">*</span></label>
								<div class="form-icon position-relative">
									<i class="fa-solid fa-key text-4 color-main position-absolute left-15 top-50pct transform3dy-n50"></i>
									<input required minlength="5" autocomplete="off" type="password" v-model="password"
										placeholder="Contraseña" class="form-control form-control-lg text-4 has-icon" id="txt-password"
										name="txt-password" />
								</div>
							</div>
						</div>
					</div>
					<div class="card-footer main">
						<div class="d-flex justify-content-between">
							<span v-if="$conf.msalConfig.enabled">
								<button type="button" class="btn btn-gray" @click.prevent="signin" title="Ingreso usuarios ESAP...">
									USUARIOS ESAP <i class="fa-solid fa-up-right-from-square ms-1"></i>
								</button>
							</span>
							<span v-else>&nbsp;</span>
							<button type="button" class="btn btn-main" @click.prevent="login" title="Ingresar">INGRESAR <i
									class="fa-solid fa-caret-right ms-1"></i></button>
						</div>
						<!-- <div class="bt mt-3 pt-3 pb-1 text-center font-weight-semibold text-size-md d-flex align-items-center justify-content-between">
							<a href="#" @click.prevent="recoverDo('recover')" title="Recuperar contraseña..."
								><i class="fa-solid fa-arrow-rotate-left me-1"></i> Recuperar contraseña</a
							>
							<a href="#" @click.prevent="dataSeed" title="Recuperar contraseña...">Seed</a>
							<a href="#" @click.prevent="recoverDo('register')" title="Registrarse...">Registrarse <i class="fa-solid fa-user-plus ms-1"></i></a>
						</div> -->
					</div>
				</div>
			</div>
		</div>

		<div class="row hidden" id="recover-zone">
			<div class="col d-flex align-items-center justify-content-center">
				<div class="card col-5">
					<div class="card-header main"><i class="fa-solid fa-arrow-rotate-left"></i> Recuperar
						contraseña</div>
					<div class="card-body pt-3 pb-2">
						<div class="row" v-if="action == 'register'">
							<div class="col">
								<div class="form-group">
									<label class="form-label color-main font-weight-semibold">Nombres: <span
											class="text-color-danger">*</span></label>
									<div class="form-icon">
										<input required type="text" v-model="firstName" placeholder="Nombres"
											class="form-control form-control-lg text-4" id="firstName" name="firstName" />
									</div>
								</div>
							</div>
							<div class="col">
								<div class="form-group">
									<label class="form-label color-main font-weight-semibold">Apellidos: <span
											class="text-color-danger">*</span></label>
									<div class="form-icon">
										<input required type="text" v-model="lastName" placeholder="Apellidos"
											class="form-control form-control-lg text-4" id="lastName" name="lastName" />
									</div>
								</div>
							</div>
						</div>
						<div class="row">
							<div class="form-group">
								<label class="form-label color-main font-weight-semibold">Correo electrónico: <span
										class="text-color-danger">*</span></label>
								<div class="form-icon position-relative">
									<i
										class="fa-solid fa-envelope text-4 color-main position-absolute left-15 top-50pct transform3dy-n50"></i>
									<input required email type="text" v-model="email" placeholder="Correo electrónico"
										class="form-control form-control-lg text-4 has-icon" id="txt-email-register"
										name="txt-email-register" />
								</div>
							</div>
						</div>
					</div>
					<div class="card-footer main">
						<div class="d-flex justify-content-between">
							<button type="button" class="btn btn-gray" @click.prevent="recoverBack"><i
									class="fa-solid fa-caret-left me-1"></i> INGRESAR AL SISTEMA</button>
							<button type="button" class="btn btn-main" @click.prevent="recover" v-if="action == 'recover'">
								RECUPERAR<i class="fa-solid fa-caret-right ms-1"></i>
							</button>
							<button type="button" class="btn btn-main" @click.prevent="register" v-if="action == 'register'">
								REGISTRARSE<i class="fa-solid fa-caret-right ms-1"></i>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="row hidden" id="activate-zone">
			<div class="col d-flex align-items-center justify-content-center">
				<div class="card col-5">
					<div class="card-header main"><i class="fa-solid fa-user-plus"></i> Activar cuenta
					</div>
					<div class="card-body pt-3 pb-4">
						<div class="row">
							<div class="form-group">
								<label class="form-label color-main font-weight-semibold">Correo electrónico:</label>
								<div class="form-icon position-relative">
									<i
										class="fa-solid fa-envelope text-4 color-main position-absolute left-15 top-50pct transform3dy-n50"></i>
									<input required email disabled type="text" v-model="email" placeholder="Correo electrónico"
										class="form-control form-control-lg text-4 has-icon" id="txt-email" name="txt-email" />
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col">
								<div class="form-group m-0">
									<label class="form-label color-main font-weight-semibold">Nueva contraseña: <span
											class="text-color-danger">*</span></label>
									<div class="form-icon position-relative">
										<i class="fa-solid fa-key text-4 color-main position-absolute left-15 top-50pct transform3dy-n50"></i>
										<input required minlength="6" autocomplete="off" type="password" v-model="password"
											placeholder="Contraseña" class="form-control form-control-lg text-4 has-icon" id="txt-password"
											name="txt-password" />
									</div>
								</div>
							</div>
							<div class="col">
								<div class="form-group m-0">
									<label class="form-label color-main font-weight-semibold">Confirmar contraseña: <span
											class="text-color-danger">*</span></label>
									<div class="form-icon position-relative">
										<i class="fa-solid fa-key text-4 color-main position-absolute left-15 top-50pct transform3dy-n50"></i>
										<input required minlength="6" autocomplete="off" type="password" v-model="password1"
											equalsTo="txt-password" placeholder="Contraseña"
											class="form-control form-control-lg text-4 has-icon" id="txt-password-1" name="txt-password-1" />
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="card-footer main">
						<div class="d-flex justify-content-center">
							<button type="button" :class="pwdBtnClass" @click.prevent="reset('activar')" v-if="action == 'activate'">
								ACTIVAR CUENTA<i class="fa-solid fa-caret-right ms-2"></i>
							</button>
							<button type="button" :class="pwdBtnClass" @click.prevent="reset('resetear')" v-else>
								ASIGNAR CONTRASEÑA<i class="fa-solid fa-caret-right ms-2"></i>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>

	</div>
</template>
