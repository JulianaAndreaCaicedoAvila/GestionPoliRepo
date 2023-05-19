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
							<strong class="font-weight-semibold">Estructura </strong> del Plan Nacional de Seguridad Vial 2022-2031
						</h2>
						<p class="p-0 mb-3">El PNSV 2022-2031 presenta las siguientes características:</p>
						<ol class="m-0 p-0 list list-ordened list-ordened-style-3">
							<li>Reconoce los avances del país en la gestión de la seguridad vial.</li>
							<li>
								Con la adopción del enfoque Sistema Seguro, ratifica que ningún ser humano debe perder la vida o sufrir lesiones graves por causa de un
								siniestro vial.
							</li>
							<li>Fortalece el principio de corresponsabilidad en la seguridad vial.</li>
							<li>Resalta la importancia de las particularidades territoriales para el diseño de estrategias efectivas.</li>
							<li>
								Define un instrumento que posibilita el seguimiento a las acciones del decenio: hitos, fechas de cumplimiento y entidad responsable de la
								acción.
							</li>
							<li>Las bases estratégicas del Plan Nacional de Seguridad Vial 2022-2031 se definen a partir de 8 áreas de acción y 16 objetivos generales.</li>
						</ol>
						<p class="pt-3 m-0">
							Descargar el
							<span class="font-weight-semibold"
								><a
									target="_blank"
									title="Observar decreto..."
									:href="bUrl + 'docs/20220830-pnsv-documento-tecnico.pdf'"
									href-alt="https://www.esap.edu.co/sites/default/files/Documentos/Agencia/PNSV/22.08.30%20-%20Documento%20te%CC%81cnico%20de%20soporte%20-%20PNSV.pdf"
									>documento técnico de soporte del PNSV <i class="ms-1 fa-solid fa-arrow-up-right-from-square"></i></a></span
							>.
						</p>
					</div>
					<div class="col-md-12 text-center pt-3 mt-4 bt">
						<h2 class="font-weight-normal text-7 mb-2 color-main"><strong class="font-weight-semibold">Areas </strong> de acción</h2>
						<p class="p-0 m-0">
							El punto de partida del enfoque de Sistema Seguro son los actores viales, a pesar de los errores que estos puedan cometer, los elementos que
							constituyen el Sistema de Movilidad deben propender por salvaguardar su vida e integridad. Es así como cada área de intervención realiza un aporte
							a la reducción de la vulnerabilidad de los diferentes actores viales o del control de factores de riesgo que constituyen una amenaza para su
							movilidad.
						</p>
						<img class="img-fluid" src="/assets/img/page/areas.png" alt="Áreas de acción" />
						<p class="text-center p-0 m-0">
							<a target="_blank" class="font-weight-semibold" title="Más información..." href="https://www.esap.edu.co/agencia/pnsv/pilares"
								>MÁS INFORMACIÓN <i class="ms-1 pt-2 fa-solid fa-arrow-up-right-from-square"></i
							></a>
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
