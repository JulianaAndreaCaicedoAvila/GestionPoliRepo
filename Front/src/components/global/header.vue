<script setup>
import { onMounted, ref } from "vue";
import HeaderMenu from "./header_menu.vue";
let imageHeight = 55;
let fechaHora = ref(null);
let setTime = () => {
	let d = new Date();
	fechaHora.value = d.getDateTimeAmPm();
};
onMounted(() => {
	var _int = setInterval(function () {
		// console.clear();
		setTime();
	}, 60000);
	setTime();
});
</script>
<template>
	<header
		id="header"
		class="header-effect-shrink"
		data-plugin-options="{'stickyEnabled': true, 'stickyEffect': 'shrink', 'stickyEnableOnBoxed': true, 'stickyEnableOnMobile': false, 'stickyChangeLogo': true, 'stickyStartAt': 120, 'stickyHeaderContainerHeight': 150}"
	>
		<div class="header-body border-top-0">
			<div class="header-top bg-dark bg-main-500">
				<div class="container">
					<div class="header-row py-2">
						<div class="header-column justify-content-start">
							<div class="header-row">
								<nav class="header-nav-top">
									<li class="nav-item d-none d-md-block">
										<a href="https://www.gov.co/" target="_blank" class="p-0 pe-4">
											<img src="/assets/img/logo-govco.svg" alt="Logo Gov.co" width="100" />
										</a>
									</li>
								</nav>
							</div>
						</div>
						<div class="header-column justify-content-end">
							<div class="header-row">
								<nav class="header-nav-top">
									<ul class="nav nav-pills">
										<li class="nav-item text-white"><i class="fa-solid fa-clock me-1"></i> Fecha y hora: {{ fechaHora }}</li>
									</ul>
								</nav>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="header-container container">
				<div class="header-row pt-2 pb-3">
					<div class="col-md-6">
						<div class="header-logo">
							<router-link :to="{ name: 'inicio' }">
								<img alt="Potencia Mundial de la Vida" src="/assets/img/logo-potencia.svg" :height="imageHeight" />
							</router-link>
						</div>
					</div>
					<div class="col-md-6 d-flex justify-content-end align-items-center">
						<a class="d-block pe-4" href="https://www.esap.edu.co" title="ESAP" target="_blank">
							<img src="/assets/img/logo-esap.svg" alt="ESAP" id="logo-esap" :height="imageHeight" />
						</a>
						<router-link :to="{ name: 'inicio' }">
							<img src="/assets/img/logo-sirecec.svg" alt="SIRECEC" :height="imageHeight" />
						</router-link>
					</div>
				</div>
				<div class="header-row row w-100 sub">
					<div class="col pe-0 text-left">
						<HeaderMenu />
					</div>
				</div>
			</div>
		</div>
	</header>
</template>
