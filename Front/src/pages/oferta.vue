<script setup>
import Pagination from "vuejs-paginate-next";
import { ref, onMounted, toRaw, watch } from "vue";
import { DxTextBox, DxSelectBox } from "devextreme-vue";
import { useClasificadorStore, useGeografiaStore } from "@/stores";
import { useRouter, useRoute } from "vue-router";
import { eventos } from "@/assets/js/data";
import DxValidator, { DxRequiredRule, DxEmailRule, DxStringLengthRule, } from "devextreme-vue/validator";
const router = useRouter(), route = useRoute(), store = useClasificadorStore(),
	geoStore = useGeografiaStore();
let asistencias = ref([]), territoriales = ref([]),
	departamentos = ref([]), municipios = ref([]),
	por = ref(null), tipoAsistenciaId = ref(null), territorialId = ref(null),
	departamentoId = ref(null), municipioId = ref(null);
let currentPage = ref(1), pageSize = ref(6), pageCount = ref(0), currentItems = ref([]);
// https://codesandbox.io/s/vue-paginate-vuejs-paginate-next-client-side-pagination-forked-h5dmk5
let paginate = () => {
	console.log("currentPage.value => pageSize.value", currentPage.value + "=>" + pageSize.value);
	let items = eventos.length <= pageSize.value ? eventos : eventos.slice((currentPage.value - 1) * pageSize.value, currentPage.value * pageSize.value);
	console.log("items =>", items);
	console.log("evaluaciones =>", toRaw(eventos));
	currentItems.value = items;
	store.pagina = currentPage;
};
let onPaging = (parameters) => {
	paginate();
	// window.scrollToSmoothly(300);
};
let divipola = (item) => {
	console.log("item =>", item);
	if (item != null) return `${item.nombre} (${item.codigo})`;
};
let buscarEventos = async () => {
	$("#panel-buscar").lock(`Buscando eventos de capacitación`);
	setTimeout(function () {
		$("#panel-buscar").unlock();
	}, 3000);
};
let itemSelected = async (e) => {
	console.log(_sep);
	console.log("itemSelected =>", e);
	let v = e.value;
	let id = $(e.element).attr("id");
	console.log("id =>", id);
	console.log("v =>", v);
	if (id == "territorialId") {
		departamentos.value = [];
		municipios.value = [];
		municipioId.value = null;
		departamentoId.value = null;
		if (v !== null && v !== undefined) departamentos.value = await geoStore.dptosPorTerritorialId(v);
		console.log("departamentos =>", toRaw(departamentos.value));
	}
	if (id == "departamentoId") {
		municipios.value = [];
		municipioId.value = null;
		if (v !== null && v !== undefined) municipios.value = await geoStore.municipiosPorDepartamentoId(v);
		console.log("municipios =>", toRaw(municipios.value));
	}
};
onMounted(async () => {
	por.value = route.params.por;
	console.log("por =>", por.value);
	// asistencias.value = await store.porTipoNombre("tipo_asistencia");
	// territoriales.value = await store.porTipoNombre("territorial");
	// currentPage.value = store.pagina != null ? store.pagina : 1;
	// D:\web\dnp\sinergia\app-dev\FrontEnd\demo\src\pages\evaluaciones\repositorio.vue
	currentPage.value = 1;
	pageCount.value = Math.ceil(eventos.length / pageSize.value);
	paginate();
});
</script>
<template>
	<div class="container pt-2 mb-3 content">

		<div class="row">
			<div class="col">

				<div class="card data mb-4">
					<div class="card-header main d-flex justify-content-between align-items-center">
						<span v-if="por == 'capacitacion'">
							<i class="fa-solid fa-people-group"></i>
							Oferta Académica de Capacitación
						</span>
						<span v-else>
							<i class="fa-solid fa-users-line"></i>
							Oferta Académica de Alto Gobierno
						</span>
						<span>
							<router-link :to="{ path: '/' }" class="btn btn-trans">
								<i class="fa-solid fa-circle-arrow-left"></i>VOLVER
							</router-link>
						</span>
					</div>
					<img class="card-img-top h-6vw" src="/assets/img/banner-03.jpg" alt="Card Image" v-if="por == 'capacitacion'">
					<img class="card-img-top h-6vw" src="/assets/img/banner-04.jpg" alt="Card Image" v-else>
					<div class="card-body pt-3 pb-0" id="panel-buscar">
						<div class="row mb-4">
							<div class="col-md-12 fs">
								<fieldset>
									<legend><i class="fa-solid fa-magnifying-glass me-2"></i>Buscar eventos de capacitación</legend>
									<div class="row">
										<div class="col-md-3 mb-3">
											<label class="tit">Tipo de asistencia</label>
											<DxSelectBox id="asistenciaId" :data-source="asistencias" :show-clear-button="true"
												class="form-control" display-expr="nombre" v-model="tipoAsistenciaId"
												placeholder="Tipo de asistencia" value-expr="id" @value-changed="itemSelected">
												<DxValidator>
													<DxRequiredRule />
												</DxValidator>
											</DxSelectBox>
										</div>
										<div class="col-md-3 mb-3">
											<label class="tit">Territorial</label>
											<DxSelectBox id="territorialId" :data-source="territoriales" :grouped="false" :min-search-length="2"
												:search-enabled="true" :show-clear-button="true" :show-data-before-search="true"
												class="form-control" display-expr="nombre" v-model="territorialId" placeholder="Territoriales"
												value-expr="id" @value-changed="itemSelected">
											</DxSelectBox>
										</div>
										<div class="col-md-3 mb-3">
											<label class="tit">Departamento</label>
											<DxSelectBox id="departamentoId" :data-source="departamentos" :grouped="false"
												:disabled="departamentos.length <= 0" :min-search-length="2" :search-enabled="true"
												:show-clear-button="true" :show-data-before-search="true" class="form-control"
												:display-expr="divipola" v-model="departamentoId" placeholder="Departamento" value-expr="id"
												@value-changed="itemSelected">
												<DxValidator>
													<DxRequiredRule />
												</DxValidator>
											</DxSelectBox>
										</div>
										<div class="col-md-3 mb-3">
											<label class="tit">Municipio</label>
											<DxSelectBox id="municipioId" :data-source="municipios" :grouped="false"
												:disabled="municipios.length <= 0" :min-search-length="2" :search-enabled="true"
												:show-clear-button="true" :show-data-before-search="true" class="form-control"
												:display-expr="divipola" v-model="municipioId" placeholder="Municipio" value-expr="id"
												@value-changed="itemSelected" item-template="item">
												<DxValidator>
													<DxRequiredRule />
												</DxValidator>
											</DxSelectBox>
										</div>
									</div>
									<div class="row">
										<div class="col d-flex justify-content-between">
											<span><a href="#" class="btn btn-gray d-inline-block"><i
														class="fa-regular fa-eraser me-2"></i><span>Limpiar búsqueda</span></a></span>
											<span>
												<button type="button" class="btn btn-main" title="Consultar"
													@click.prevent="buscarEventos()">Buscar eventos <i
														class="fa-solid fa-magnifying-glass ms-1"></i></button>
											</span>
										</div>
									</div>
								</fieldset>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="row pt-0 mb-2">
			<div class="col-md-12 content d-flex justify-content-center align-items-center">
				<Pagination v-model="currentPage" :page-count="pageCount" :click-handler="onPaging" :margin-pages="3"
					:page-range="3" :first-last-button="true" prev-text="Anteriores" next-text="Siguientes"
					first-button-text="Iniciales" last-button-text="Finales" />
			</div>
		</div>

		<div class="row">
			<div class="col-md-4 mb-4" v-for="(item, index) in currentItems" :key="index">
				<div class="card evento">
					<img class="card-img-top bb h-6vw" :src="'/assets/img/' + item.imagen" alt="Card image cap">
					<div class="card-body py-2 px-4">
						<p class="card-title mb-2 mt-2">{{ item.nombre }}</p>
						<p class="card-text">
							<strong>Territorial:</strong> {{ item.territorialNombre }}<br>
							<span v-if="item.tipoAsistenciaId == 299">
								<strong>Departamento:</strong> {{ item.departamentoNombre }}<br>
								<strong>Municipio / Ciudad:</strong> {{ item.municipioNombre }}<br>
							</span>
							<strong>Cierre inscripciones:</strong> 06/12/2023<br>
							<strong>Fecha evento:</strong> 04/12/2023<br>
						</p>
					</div>
					<div class="card-footer d-flex justify-content-between">
						<span class="type presencial ms-2" v-if="item.tipoAsistenciaId == 299">
							<i class="fa fa-users me-1"></i> EVENTO PRESENCIAL
						</span>
						<span class="type virtual ms-2" v-else><i class="fa fa-desktop me-1"></i> EVENTO VIRTUAL</span>
						<router-link :to="{ name: 'inscripcion', params: { id: item.id } }" title="Inscribirse...">
							INSCRIBIRSE <i class="fa fa-pencil ms-1"></i>
						</router-link>
					</div>
				</div>
			</div>
		</div>

		<div class="row pt-3 mb-2">
			<div class="col-md-12 content d-flex justify-content-center align-items-center">
				<Pagination v-model="currentPage" :page-count="pageCount" :click-handler="onPaging" :margin-pages="3"
					:page-range="3" :first-last-button="true" prev-text="Anteriores" next-text="Siguientes"
					first-button-text="Iniciales" last-button-text="Finales" />
			</div>
		</div>

	</div>
</template>
