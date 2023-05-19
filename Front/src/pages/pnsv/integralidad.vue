<script setup>
import { onMounted } from "vue";
import Intro from "@/components/global/intro.vue";
let bUrl = window._baseUrl;
onMounted(() => {
	// console.log("MAIN ONMOUNTED");
});
</script>
<template>
	<div class="container pt-2 pb-2 content">
		<div class="card">
			<div class="card-header main">
				<i class="fa-solid fa-car-side"></i>
				Plan Nacional de Seguridad Vial 2022-2031
			</div>
			<div class="card-body pt-3 pb-4">
				<div class="row">
					<div class="col-md-12 content">
						<h2 class="font-weight-normal text-7 mb-2 color-main">
							<strong class="font-weight-semibold">Integralidad </strong> nacional y territorial del PNSV
						</h2>
						<p class="p-0 mb-3">
							El Plan contempla una estrategia transversal a nivel nacional considerando los objetivos de cada área de acción y las estrategias que deben ser
							diseñadas, a partir del principio de corresponsabilidad, por parte de las entidades nacionales que en diferentes sectores de la administración
							pública inciden en la seguridad vial.
						</p>
						<p class="p-0 mb-0">
							A nivel territorial, se plantea un modelo de corresponsabilidad entre los diferentes niveles de gobierno con el fin de acercar la oferta
							institucional de la Nación a la demanda de cada una de las ocho regiones definidas en el PNSV.
						</p>
					</div>
					<div class="col-md-12 text-center pt-3 mt-4 bt">
						<h2 class="font-weight-normal text-7 mb-2 color-main"><strong class="font-weight-semibold">Estrategias </strong> regionales</h2>
						<p class="">
							En este sentido, las regiones contribuyen a la reducción de fatalidades y lesionados graves, mediante apuestas regionales, departamentales y/o
							municipales, a partir de sus condiciones de siniestralidad y las capacidades diferenciadas para gestionar la seguridad vial (institucionalidad,
							capital humano, recursos), en el marco del enfoque de Sistema Seguro.
						</p>
						<img class="img-fluid" src="/assets/img/page/regiones-1.jpg" alt="Regiones" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
