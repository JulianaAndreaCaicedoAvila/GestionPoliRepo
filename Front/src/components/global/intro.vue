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
	<div class="row">
		<div class="col">
			<div class="card mb-4">
				<!-- <div class="card-header main">
			<i class="fa-solid fa-users-rectangle"></i>
			Sistema de Registro y Control de Eventos de Capacitación de la ESAP
		</div> -->
				<img class="card-img-top" src="/assets/img/banner-01.jpg" alt="Card Image" />
				<div class="card-body pt-3 pb-0">
					<div class="row">
						<div class="col content">
							<div class="row">
								<div class="col-lg-12">
									<h2 class="font-weight-normal text-7 mb-0 color-main text-center">
										<!-- <i class="fa-solid fa-users-rectangle me-2"></i> -->
										Sistema de Registro y Control de Eventos de Capacitación de la ESAP
									</h2>
									<p class="p-0 text-center">
										Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec urna eros, lacinia eu ullamcorper a, egestas porta nulla. Donec nec est nibh,
										rhoncus lobortis magna Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec urna eros, lacinia eu ullamcorper a, egestas porta
										nulla. Donec nec est nibh.
									</p>
									<!-- <p class="text-center p-0 pb-4 m-0">
										<img class="img-fluid center-block d-block mx-auto" src="/assets/img/page/pnsv-estrategia.jpg" alt="Device" />
									</p> -->
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="row">
		<div class="col-lg-6 col-md-12">
			<div class="card mb-4">
				<div class="card-header main text-center">
					<i class="fa-solid fa-users-line"></i>
					Alto gobierno
				</div>
				<img class="card-img" src="/assets/img/banner-04.jpg" alt="Card Image" />
				<div class="card-body pt-3 pb-0">
					<div class="row">
						<div class="col content">
							<div class="row">
								<div class="col-lg-12">
									<!-- <h2 class="font-weight-normal text-7 mb-2 color-main">
										<i class="fa-solid fa-users-rectangle me-2"></i>
										Sistema de Registro y Control de Eventos de Capacitación de la ESAP
									</h2> -->
									<p class="p-0 mb-3">
										La <strong>Escuela de Alto Gobierno de la ESAP</strong> ofrece de manera presencial y virtual su amplia oferta académica a través de cursos,
										diplomados, seminarios, conferencias y capacitaciones. Los programas están dirigidos a los altos directivos del estado colombiano en nivel
										territorial y nacional, y a los miembros de corporaciones públicas de elección popular.
									</p>
									<!-- <p class="text-center p-0 pb-4 m-0">
								<img class="img-fluid center-block d-block mx-auto" src="/assets/img/page/pnsv-estrategia.jpg" alt="Device" />
							</p> -->
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="card-footer text-center">
					<p class="p-0 m-0 mt-1 mb-1 text-center">
						<a href="#" title="Ver la oferta académica para 'Alto gobierno'..."
							><strong>VER OFERTA ACADÉMICA <i class="fa-solid fa-circle-arrow-right ms-1"></i></strong
						></a>
					</p>
				</div>
			</div>
		</div>
		<div class="col-lg-6 col-md-12">
			<div class="card mb-4">
				<div class="card-header main text-center">
					<i class="fa-solid fa-people-group"></i>
					Capacitación
				</div>
				<img class="card-img-top" src="/assets/img/banner-03.jpg" alt="Card Image" />
				<div class="card-body pt-3 pb-0">
					<div class="row">
						<div class="col content">
							<div class="row">
								<div class="col-lg-12">
									<!-- <h2 class="font-weight-normal text-7 mb-2 color-main">
										<i class="fa-solid fa-users-rectangle me-2"></i>
										Sistema de Registro y Control de Eventos de Capacitación de la ESAP
									</h2> -->
									<p class="p-0">
										EL <strong>Departamento de Capacitación de la ESAP</strong> pone a disposición de las entidades públicas y la ciudadaní­a en general su
										oferta de capacitación en educación informal que responde a los lineamientos del Plan Nacional de Desarrollo, Plan Nacional de Formación y
										Capacitación y los Planes Institucionales de la ESAP.
									</p>
									<!-- <p class="text-center p-0 pb-4 m-0">
								<img class="img-fluid center-block d-block mx-auto" src="/assets/img/page/pnsv-estrategia.jpg" alt="Device" />
							</p> -->
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="card-footer text-center">
					<p class="p-0 m-0 mt-1 mb-1 text-center">
						<a href="#" title="Ver la oferta académica para 'Capacitación'..."
							><strong>VER OFERTA ACADÉMICA <i class="fa-solid fa-circle-arrow-right ms-1"></i></strong
						></a>
					</p>
				</div>
			</div>
		</div>
	</div>
</template>
