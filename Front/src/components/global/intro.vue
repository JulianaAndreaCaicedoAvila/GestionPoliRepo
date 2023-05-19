<script setup>
import { onMounted, ref } from "vue";
let bUrl = window._baseUrl;
let count = ref(0),
	props = defineProps({
		showInfo: { type: Boolean, default: true, required: false },
		description: { type: String, default: "Something", required: false },
	}),
	getClass = () => {
		return props.showInfo ? "justify-content-between" : "justify-content-center";
	};
onMounted(() => {
	console.log("props =>", props);
});
</script>
<template>
	<div class="card mb-4">
		<div class="card-header main">
			<i class="fa-solid fa-car-side"></i>
			¿Qué es el Plan Nacional de Seguridad Vial?
		</div>
		<div class="card-body pt-3 pb-4">
			<div class="row">
				<div class="col content">
					<div class="row">
						<div class="col-lg-12">
							<h2 class="font-weight-normal text-7 mb-2 color-main">
								<strong class="font-weight-semibold">¿Qué es </strong> el Plan Nacional de Seguridad Vial?
							</h2>
							<p class="p-0">
								PNSV es el instrumento de planeación del Gobierno nacional a través del cual se determinan los objetivos, acciones y calendarios necesarios para
								reducir las víctimas de siniestros viales en el país. Asigna a la Agencia Nacional de Seguridad Vial (ANSV) la responsabilidad de elaborar,
								planificar, coordinar y hacer seguimiento del Plan Nacional de Seguridad Vial.
							</p>
							<p class="text-center p-0 pb-4 m-0">
								<img class="img-fluid center-block d-block mx-auto" src="/assets/img/page/pnsv-estrategia.jpg" alt="Device" />
							</p>
						</div>
					</div>
					<div class="row">
						<div :class="'col-lg-12 d-flex ' + getClass()">
							<p class="p-0 m-0">
								El <span class="font-weight-semibold">PNSV 2022-2031</span> fue aprobado mediante el
								<span class="font-weight-semibold"
									><a :href="bUrl + 'docs/20220729-decreto-1430.pdf'" target="_blank" title="Observar decreto..."
										>Decreto 1430 del 29 de julio de 2022 <i class="ms-1 fa-solid fa-arrow-up-right-from-square"></i></a></span
								>.
							</p>
							<p class="text-center p-0 m-0" v-if="showInfo">
								<router-link :to="{ name: 'que-es' }" class="font-weight-semibold" title="Más información del PNSV..."
									>MÁS INFORMACIÓN <i class="fa-solid fa-circle-chevron-right ms-1"></i
								></router-link>
							</p>
						</div>
					</div>
					<div class="row" v-if="!showInfo">
						<div class="col-lg-12 bt pt-3 mt-4">
							<p>
								El Plan es el resultado de un amplio proceso participativo que inició en 2020. Se realizaron dos consultas públicas, talleres territoriales con
								representantes de víctimas de siniestros viales, de actores viales, del sector privado, institucionales y de la academia. Adicionalmente, se
								adelantó proceso de concertación con <span class="font-weight-semibold">24 entidades</span> del orden nacional.
							</p>
							<p>
								El Plan contempla metas específicas para reducir la mortalidad de los actores viales más vulnerables en la vía. A
								<span class="font-weight-semibold">2031</span> se espera lograr la reducción de fallecidos por actor vial de la siguiente forma:
							</p>
						</div>
					</div>
					<div class="row pb-2" v-if="!showInfo">
						<div class="col-lg-4 text-center">
							<i class="fa-solid fa-motorcycle fa-6x color-main"></i>
							<h4 class="m-0 p-0 mt-2">Motocicletas</h4>
							<h2 class="m-0 color-main font-weight-semibold">-47<small class="ms-1">%</small></h2>
						</div>
						<div class="col-lg-4 text-center">
							<i class="fa-solid fa-person-walking fa-6x color-main"></i>
							<h4 class="m-0 p-0 mt-2">Peatones</h4>
							<h2 class="m-0 color-main font-weight-semibold">-45<small class="ms-1">%</small></h2>
						</div>
						<div class="col-lg-4 text-center">
							<i class="fa-solid fa-bicycle fa-6x color-main"></i>
							<h4 class="m-0 p-0 mt-2">Bicicletas</h4>
							<h2 class="m-0 color-main font-weight-semibold">-37<small class="ms-1">%</small></h2>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
