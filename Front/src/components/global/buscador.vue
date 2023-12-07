<script setup>
import * as g from "@/assets/js/generate";
import { onMounted, ref, toRaw, watch } from "vue";
import { DxSelectBox, DxTagBox, DxTextBox, DxDateBox, DxNumberBox, DxTextArea, DxValidationGroup } from "devextreme-vue";
import { useClasificadorStore } from "@/stores";
let store = useClasificadorStore();

let dataTipos = ref([]), dataSectores = ref([]), dataAnnos = ref([]), dataTotal = ref(1),
	sectoresEvaluados = ref([]), tiposEvaluados = ref([]), annosEvaluados = ref([]), evaluaciones = ref([]);

watch(
	() => store.evaluacionesFiltradas, (newItems, olItems) => {
		console.log("WATCH BUSCADOR =>", store.evaluacionesFiltradas);
		dataTotal.value = store.total;
	}
);

let evaluacionesPor = [
	{ nombre: "Internas DNP", val: 2 },
	{ nombre: "Externas DNP", val: 1 },
	// { nombre: "Otras", val: 0 }
];

let desarrolloDnp = [
	{ nombre: "Desarrolladas por el DNP", val: 1 },
	{ nombre: "Desarrolladas por externos", val: 2 }
];

let itemSelected = (e) => {
	// console.clear();
	let id = e.element.id;
	let valor = e;
	console.log("id =>", id);
	console.log("valor =>", valor);
	if (id == "restricciones") {
	} else if (id == "anno") {
	}
};
const props = defineProps({
	busquedaTexto: {
		type: Boolean,
		default: false,
		required: false,
	},
	total: {
		type: Number,
		default: null,
		required: false,
	},
	sectores: {
		type: Array,
		default: [],
		required: false,
	},
	tipos: {
		type: Array,
		default: [],
		required: false,
	},
	annos: {
		type: Array,
		default: [],
		required: false,
	}
});

// Accesar funciones en padre
// const emit = defineEmits(['changeMode']);

onMounted(async () => {
	// console.clear();
	evaluaciones = await store.getAll();
	annosEvaluados = store.annos;
	sectoresEvaluados = store.sectores;
	tiposEvaluados = store.tipos;

	setTimeout(function () {
		console.log("props.annos =>", toRaw(props.annos));
		console.log("props.sectores =>", toRaw(props.sectores));
		console.log("props.tipos =>", toRaw(props.tipos));
		dataTotal.value = evaluaciones.length;
		dataAnnos = props.annos.length > 0 ? props.annos : annosEvaluados;
		dataSectores = props.sectores.length > 0 ? props.sectores : sectoresEvaluados;
		dataSectores = g.sortBy(dataSectores, "Nombre");
		dataTipos = props.tipos.length > 0 ? props.tipos : tiposEvaluados;
		dataTipos = g.sortBy(dataTipos, "TipoNombre");
		console.log("dataSectores =>", toRaw(dataSectores));
		console.log("dataTipos =>", toRaw(dataTipos));
		console.log("dataAnnos =>", toRaw(dataAnnos));
	}, 100);
});
</script>
<template>
	<div class="row mb-4">
		<div class="col-md-12">
			<div class="card no-click">
				<div class="card-body content d-flex justify-content-between align-items-center">
					<div class="container p-0">
						<div class="row" @keyup.enter="store.doFilter()">
							<div class="col-md-6 pb-2">
								<label class="tit">Busque la palabra de su interés</label>
								<DxTextBox :show-clear-button="true" :height="43" @value-changed="itemSelected" class="form-control"
									placeholder="Busque la palabra de su interés" v-model="store.filtroTexto" value-change-event="keyup" />
								<!-- {{ store.filtroTexto }} -->
							</div>
							<div class="col-md-6 mb-2">
								<div class="row">
									<div class="col-md-7 mb-2">
										<label class="tit">Desarrolladas por</label>
										<DxSelectBox :height="43" :data-source="desarrolloDnp" :search-enabled="false"
											:show-clear-button="true" @value-changed="itemSelected" class="form-control"
											placeholder="Desarrolladas por" display-expr="nombre" value-expr="val"
											v-model="store.filtroDesarrollo" />
										<!-- {{ store.filtroDesarrollo }} -->
									</div>
									<div class="col-md-5 mb-2">
										<label class="tit">Desarrollo en DNP</label>
										<DxSelectBox :height="43" :data-source="evaluacionesPor" :search-enabled="false"
											:show-clear-button="true" @value-changed="itemSelected" class="form-control"
											placeholder="Desarrollo en DNP" display-expr="nombre" value-expr="val"
											v-model="store.filtroInterna" />
										<!-- {{ store.filtroInterna }} -->
									</div>
								</div>
							</div>
							<div class="col-md-3 mb-2">
								<label class="tit">Año publicación</label>
								<DxTagBox :data-source="store.annosSrc" select-all-text="Todos" :search-enabled="true"
									:show-clear-button="true" :show-selection-controls="true" @value-changed="itemSelected"
									class="form-control" placeholder="Año" v-model="store.filtroAnno" />
								<!-- {{ store.filtroAnno }} -->
							</div>
							<div class="col-md-6 mb-2">
								<label class="tit">Sector</label>
								<DxTagBox :data-source="store.sectoresSrc" select-all-text="Todos los sectores" :search-enabled="true"
									:show-clear-button="true" :show-selection-controls="true" @value-changed="itemSelected"
									class="form-control" placeholder="Sector" display-expr="Nombre" value-expr="Codigo"
									v-model="store.filtroSector" />
								<!-- {{ store.filtroSector }} -->
							</div>
							<div class="col-md-3 mb-2">
								<label class="tit">Tipo</label>
								<DxTagBox :data-source="store.tiposSrc" select-all-text="Todos los tipos" :search-enabled="true"
									:show-clear-button="true" :show-selection-controls="true" @value-changed="itemSelected"
									class="form-control" placeholder="Tipo de evaluación" display-expr="TipoNombre" value-expr="TipoId"
									v-model="store.filtroTipo" />
								<!-- {{ store.filtroTipo }} -->
							</div>
							<div class="col-md-12 pt-1 pb-1 d-flex justify-content-between align-items-end">
								<span>
									<a href="#" @click.prevent="store.clearFilter()" class="btn btn-gray d-inline-block">
										<i class="fa-regular fa-eraser me-2"></i>
										<span>Limpiar búsqueda</span>
									</a>
								</span>
								<a href="#" class="btn btn-main d-flex justify-content-center align-items-center"
									@click.prevent="store.doFilter()">Buscar <i class="fa-sharp fa-solid fa-magnifying-glass ms-2"></i></a>
							</div>
							<div class="col-md-12" v-if="dataTotal <= 0">
								<div class="warn mt-3 mb-1 px-3 py-2 w-100 d-flex justify-content-center align-items-center">
									<span class="me-3"><i class="fa-solid fa-circle-info me-1 color-main"></i>No hubo
										resultados con los criterios
										utilizados, se muestran todas las evaluaciones ({{ store.total }}).</span>
									<a href="#" @click.prevent="store.clearFilter()" title="Limpiar búsqueda">Limpiar búsqueda</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>