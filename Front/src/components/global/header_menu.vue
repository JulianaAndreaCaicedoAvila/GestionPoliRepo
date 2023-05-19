<script setup>
import { ref, onMounted } from "vue";
import { RouterLink } from "vue-router";
import { useAuthStore } from "@/stores";
const _int = ref(null),
	auth = useAuthStore(),
	logout = () => {
		msg.confirm({
			// title: "otro",
			textCancel: "CANCELAR",
			textOk: "CERRAR SESIÓN",
			text: "¿Realmente desea cerrar sesión?",
			onConfirm: async () => {
				auth.logout();
			},
			onCancel: () => {},
		});
	},
	check = () => {
		console.log("isTokenExpired =>", auth.isTokenExpired);
		if (auth.isTokenExpired) {
			window.clearInterval(window._int);
			auth.logout();
		}
	};

onMounted(() => {
	// console.clear();
	// console.log("---------");
	// console.log("Mounted header menu!!");
	// console.log("auth.usuario =>", auth.usuario);
	// console.log("auth.user =>", auth.user);
	// console.log(typeof auth.user);
	// setShow();
	if (auth.user) {
		check();
		window._int = setInterval(function () {
			check();
		}, 10000);
	} else window.clearInterval(window._int);
});
</script>
<template>
	<div class="header-column justify-content-end">
		<div class="header-row">
			<div class="header-nav header-nav-line header-nav-top-line header-nav-top-line-with-border order-2 order-lg-1">
				<div class="header-nav-main header-nav-main-square header-nav-main-effect-2 header-nav-main-sub-effect-1">
					<nav class="collapse">
						<ul class="nav nav-pills" id="mainNav">
							<li class="dropdown">
								<router-link class="dropdown-item dropdown-toggle" :to="{ name: 'inicio' }"><i class="fa-solid fa-home"></i>&nbsp;&nbsp;INICIO</router-link>
							</li>
							<li class="dropdown">
								<a class="dropdown-item dropdown-toggle" href="#">
									<i class="fa-solid fa-car-side me-2"></i>EL PNSV<i class="ms-2 fa-solid fa-angle-down"></i>
									<i class="fas fa-chevron-down"></i>
								</a>
								<ul class="dropdown-menu">
									<li><router-link :to="{ name: 'que-es' }" class="dropdown-item">¿Que es?</router-link></li>
									<li><router-link :to="{ name: 'estructura' }" class="dropdown-item">Estructura</router-link></li>
									<li><router-link :to="{ name: 'integralidad' }" class="dropdown-item">Integralidad</router-link></li>
									<li><router-link :to="{ name: 'seguimiento' }" class="dropdown-item">Seguimiento</router-link></li>
								</ul>
							</li>
							<li class="dropdown" v-if="auth.user && auth.esAdmin">
								<a class="dropdown-item dropdown-toggle" href="#"> <i class="fa fa-gear me-2"></i>ADMINISTRACIÓN<i class="ms-2 fa-solid fa-angle-down"></i></a>
								<ul class="dropdown-menu">
									<li><router-link :to="{ name: 'admin-usuarios' }" class="dropdown-item">Usuarios</router-link></li>
									<li><router-link :to="{ name: 'admin-clasificador' }" class="dropdown-item">Clasificadores</router-link></li>
									<li><router-link :to="{ name: 'admin-clasificador-tipo' }" class="dropdown-item">Tipos de Clasificadores</router-link></li>
									<li class="dropdown-submenu">
										<a class="dropdown-item" href="#">Estructura del Plan<i class="fas fa-chevron-down"></i></a>
										<ul class="dropdown-menu">
											<li><router-link :to="{ name: 'admin-area' }" class="dropdown-item">Áreas de acción</router-link></li>
											<li><router-link :to="{ name: 'admin-objetivo-general' }" class="dropdown-item">Objetivos generales</router-link></li>
											<li><router-link :to="{ name: 'admin-objetivo-especifico' }" class="dropdown-item">Objetivos específicos</router-link></li>
											<li><router-link :to="{ name: 'admin-accion' }" class="dropdown-item">Acciones y actividades</router-link></li>
											<li><router-link :to="{ name: 'admin-indicador' }" class="dropdown-item">Indicadores</router-link></li>
										</ul>
									</li>
								</ul>
							</li>
							<li class="dropdown" v-if="auth.user && !auth.esAdmin">
								<a class="dropdown-item dropdown-toggle" href="#"
									><i class="fa-solid fa-pen-to-square me-2"></i>REPORTAR<i class="ms-2 fa-solid fa-angle-down"></i
								></a>
								<ul class="dropdown-menu">
									<li><router-link :to="{ name: 'reporte-indicador' }" class="dropdown-item">Indicadores</router-link></li>
									<li><router-link :to="{ name: 'reporte-actividad' }" class="dropdown-item">Acciones y actividades</router-link></li>
								</ul>
							</li>
							<li class="dropdown" v-if="!auth.user">
								<router-link class="dropdown-item dropdown-toggle pe-0 ps-2" :to="{ name: 'login' }">
									<i class="fa-solid fa-user-lock me-2"></i>INGRESAR</router-link
								>
							</li>
						</ul>
					</nav>
				</div>
				<button class="btn header-btn-collapse-nav" data-bs-toggle="collapse" data-bs-target=".header-nav-main nav">
					<i class="fas fa-bars"></i>
				</button>
			</div>
			<div class="header-nav-features header-nav-features-no-border header-nav-features-lg-show-border order-1 order-lg-2" v-if="auth.user">
				<div class="header-nav-feature header-nav-features-search">
					<h5 class="m-0 p-0 d-block">{{ auth.user.name }}</h5>
					<a href="#" @click="logout" class="header-nav-features-toggle text-decoration-none font-weight-semibold d-block"
						><i class="fa-solid fa-right-from-bracket"></i>&nbsp;&nbsp;CERRAR SESIÓN</a
					>
				</div>
			</div>
		</div>
	</div>
</template>
