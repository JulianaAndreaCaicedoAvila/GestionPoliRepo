<script setup>
import api from "@/utils/api";
import DxStore from "@/utils/dx";
import List from "devextreme/ui/list";
import { useRoute } from "vue-router";
import NumberBox from "devextreme/ui/number_box";
import { ref, toRaw, onMounted, getCurrentInstance } from "vue";
import { useTemaStore, useEncuestaStore, useAuthStore } from "@/stores";
import DxValidator, {
	DxRequiredRule,
	DxStringLengthRule,
} from "devextreme-vue/validator";
import {
	DxSelectBox,
	DxHtmlEditor,
	DxNumberBox,
	DxTextBox,
	DxTextArea,
	DxCheckBox,
	DxDateBox,
	DxValidationGroup,
	DxToolbar,
	DxMediaResizing,
	DxImageUpload,
	DxItem,
} from "devextreme-vue";
import {
	DxColumn,
	DxColumnChooser,
	DxExport,
	DxScrolling,
	DxFilterRow,
	DxDataGrid,
	DxGrouping,
	DxGroupItem,
	DxLookup,
	DxGroupPanel,
	DxLoadPanel,
	DxPager,
	DxPaging,
	DxSearchPanel,
	DxSorting,
	DxSummary,
} from "devextreme-vue/data-grid";
const route = useRoute(),
	temaStore = useTemaStore(),
	encuestaStore = useEncuestaStore(),
	storeAuth = useAuthStore();
let titulo = "Temas",
	list1 = null,
	list2 = null,
	itemId = ref(null),
	valGroup = ref(null),
	dxStore = ref(null),
	temasAll = ref([]),
	docentes = ref([]),
	temas = ref([]),
	temasFrom = ref([]),
	temasTo = ref([]),
	fromData = ref([]),
	toData = ref([]),
	selRightClass = ref(""),
	selLeftClass = ref(""),
	item = ref({
		id: 0,
		cursoId: props.itemId,
		temaId: null,
		docenteId: null,
		lugarRealizacion: null,
		direccionRealizacion: null,
		activo: true,
		creadoEl: null,
		creadoPor: null,
		editadoEl: null,
		editadoPor: null,
		orden: 0,
	}),
	item_copy = Clone(item.value),
	panelData = null,
	panelGrid = null,
	customizeColumns = () => {
		// console.log("customizeColumns!");
		// columns[0].width = 70;
	},
	grid = null,
	onInitialized = (o) => {
		grid = o.component;
		console.log("grid =>", grid);
	},
	active = (data) => {
		// console.clear();
		console.log("data =>", data);
		msg.confirm({
			// title: "otro",
			textCancel: "CANCELAR",
			textOk: data.activo ? "DESACTIVAR" : "ACTIVAR",
			text: `¿Realmente desea ${data.activo ? "desactivar" : "activar"
				} el tema "<span class="font-weight-semibold">${data.temaNombre}</span>"?`,
			onConfirm: () => {
				panelGrid = $("#grid-tema");
				panelGrid.lock(
					`${data.activo ? "Desactivando" : "Activando"}, un momento por favor`,
					async function () {
						data.activo = data.activo ? false : true;
						await api()
							.post(`cursoTema/ed`, JSON.stringify(data))
							.then((r) => {
								console.log("r =>", r);
								cancel(function () {
									grid.refresh();
								});
								return r.data;
							});
					}
				);
			},
			onCancel: () => { },
		});
	},
	addStart = async (data) => {
		console.clear();
		valGroup.value.instance.reset();
		console.log("data =>", data);
		panelData = $("#data-tema");
		panelGrid = $("#grid-tema");
		panelGrid.lock("Cargando");
		// Editando
		if (typeof data !== "undefined") {
			$("#tit-action").text("Editar Tema");
			item.value = Clone(data);
		} else {
			// Creando
			$("#tit-action").text("Nuevo Tema");
			item.value = Clone(item_copy);
		}
		let ids = [];
		let topics =
			item.value.id == 0 ? [] : await temaStore.byCursoId(item.value.id);
		topics.forEach((topics) => {
			ids.push(topics.temaId);
		});
		console.log("topics =>", topics); // [{id: 5, encuestaId:8, preguntaId: 6},{id: 2, encuestaId:8, preguntaId: 6}]
		console.log("ids =>", ids); // [2, 3, 5, 6]
		panelGrid.fadeOut("normal", async function () {
			console.log(typeof data);
			// preguntasAll.value = await preguntaStore.all();
			// preguntas.value = Object.assign([], preguntasAll.value).filter(
			//   (o) => o.territorialId == null
			// );
			let q = Object.assign([], temasAll.value);
			// preguntasFrom.value = q;
			temasFrom.value = q.filter((o) => !ids.includes(o.id));
			console.log("Temas =>", toRaw(temas.value));
			// TODO: Asociar al store dptosTo.value = geoStore.dptosPorTerritorialId(data.id);
			temasTo.value = q.filter((o) => ids.includes(o.id));
			console.log("temasTo =>", toRaw(temasTo.value));
			// updateButtons();
			panelData.fadeIn(function () {
				panelGrid.unlock();
			});
			panelData.fadeIn("normal", function () {
				console.log(_sep);
				console.log("item =>", item.value);
				panelGrid.unlock();
			});
		});
	},
	cancel = (cb) => {
		// console.clear();
		panelData = $("#data-tema");
		panelGrid = $("#grid-tema");
		console.log("CANCEL!");
		panelData.fadeOut("normal", function () {
			panelData.clear();
			panelGrid.fadeIn("normal", function () {
				item.value = Clone(item_copy);
				console.log("item =>", item);
				valGroup.value.instance.reset();
				$(".nb.dx-numberbox").each(function () {
					var el = $(this);
					let instance = NumberBox.getInstance(el);
					instance.reset();
					console.log("instance =>", instance);
				});
				if (typeof cb === "function") cb();
			});
		});
	},
	save = async () => {
		console.clear();
		panelData = $("#data-tema");
		panelGrid = $("#grid-tema");
		let result = valGroup.value.instance.validate();
		if (!result.isValid) {
			$.scrollTo($(".dx-invalid:first"), {
				duration: 600,
				offset: -110,
			});
		} else {
			// CUandoes válido
			panelData.lock(
				`${item.id == 0 ? "Adicionando" : "Actualizando"} temas`,
				async function () {
					let dto = toRaw(item.value);
					console.log("dto =>", dto);
					await api()
						.post(`cursoTema/ed`, dto)
						.then((r) => {
							console.log("r =>", r);
							cancel(function () {
								panelData.unlock();
								grid.refresh();
							});
						});
				}
			);
		}
	},
	getData = () => {
		dxStore.value = DxStore({
			key: ["id"],
			endPoint: "curso/temas-dx",
			userData: JSON.stringify({ id: props.itemId }),
			onLoading: function (loadOptions) {
				$("#grid-tema").lock("Cargando");
				console.log("loadOptions =>", loadOptions);
				console.log("onLoading");
			},
			onLoaded: function (results) {
				console.log("results", results);
				console.log("onLoaded!");
				$("#grid-tema").unlock();
				$("#data-tema").unlock();
			},
		})
	};

// Propiedades
let props = defineProps({
	itemId: { type: Number, default: null, required: false },
	item: { type: Object, default: null, required: false }
});

onMounted(async () => {
	// $("#grid-tema").lock("Cargando");
	// console.log(_sep);
	// console.log("curso-tema.vue MOUNTED!");
	// temasAll.value = await temaStore.all();
	// docentes.value = await storeAuth.porRol("DOCENTE");
	// console.log("temasAll =>", temasAll.value);
	// list1 = List.getInstance(document.getElementById("list1"));
	// list2 = List.getInstance(document.getElementById("list2"));
	// console.log("route.name =>", route.name);
	itemId.value = props.itemId;
	item.value = props.item;
	// getData();
});
</script>
<template>
	<div class="container content">
		<div class="card data mb-5 pb-5" id="data-tipo">
			<DxValidationGroup ref="valGroup">
				<div class="card-body pt-3 pb-4">
					<div class="row">
						<div class="col-md-12">
							<h4 class="mb-3 pb-2 bbd">Tipo de participante</h4>
						</div>
						<div class="col-md-5 mb-3">
							<label class="tit">Tipo de participante</label>
							<DxSelectBox id="temaId" :data-source="temasAll" :grouped="false" :min-search-length="2"
								:search-enabled="true" v-model="item.temaId" :show-clear-button="true" :show-data-before-search="true"
								class="form-control" placeholder="Tipo de participante" value-expr="id" display-expr="nombre">
								<DxValidator>
									<DxRequiredRule />
								</DxValidator>
							</DxSelectBox>
						</div>
						<div class="col-md-5 mb-3">
							<label class="tit">Tipo de servidor público</label>
							<DxSelectBox id="temaId" :data-source="temasAll" :grouped="false" :min-search-length="2"
								:search-enabled="true" v-model="item.temaId" :show-clear-button="true" :show-data-before-search="true"
								class="form-control" placeholder="Tipo de servidor público" value-expr="id" display-expr="nombre">
								<DxValidator>
									<DxRequiredRule />
								</DxValidator>
							</DxSelectBox>
						</div>
						<div class="col-md-2 mt-2 mb-3 text-center">
							<label class="tit" for="">Contratista del estado</label>
							<DxCheckBox />
						</div>
					</div>
					<div class="row mt-4">
						<div class="col-md-12">
							<h4 class="mb-3 pb-2 bbd">Caracterización</h4>
						</div>
						<div class="col-md-3 mb-3">
							<label class="tit">Se encuentra en</label>
							<DxSelectBox id="temaId" :data-source="temasAll" :grouped="false" :min-search-length="2"
								:search-enabled="true" v-model="item.temaId" :show-clear-button="true" :show-data-before-search="true"
								class="form-control" placeholder="Situación" value-expr="id" display-expr="nombre">
								<DxValidator>
									<DxRequiredRule />
								</DxValidator>
							</DxSelectBox>
						</div>
						<div class="col-md-3 mb-3">
							<label class="tit">Tipo de discapacidad</label>
							<DxSelectBox id="temaId" :data-source="temasAll" :grouped="false" :min-search-length="2"
								:search-enabled="true" v-model="item.temaId" :show-clear-button="true" :show-data-before-search="true"
								class="form-control" placeholder="Tipo de discapacidad" value-expr="id" display-expr="nombre">
								<DxValidator>
									<DxRequiredRule />
								</DxValidator>
							</DxSelectBox>
						</div>
						<div class="col-md-3 mb-3">
							<label class="tit">Grupo étnico</label>
							<DxSelectBox id="temaId" :data-source="temasAll" :grouped="false" :min-search-length="2"
								:search-enabled="true" v-model="item.temaId" :show-clear-button="true" :show-data-before-search="true"
								class="form-control" placeholder="Grupo étnico" value-expr="id" display-expr="nombre">
								<DxValidator>
									<DxRequiredRule />
								</DxValidator>
							</DxSelectBox>
						</div>
						<div class="col-md-3 mb-3">
							<label class="tit">Participantes</label>
							<DxSelectBox id="temaId" :data-source="temasAll" :grouped="false" :min-search-length="2"
								:search-enabled="true" v-model="item.temaId" :show-clear-button="true" :show-data-before-search="true"
								class="form-control" placeholder="Participantes" value-expr="id" display-expr="nombre">
								<DxValidator>
									<DxRequiredRule />
								</DxValidator>
							</DxSelectBox>
						</div>
						<div class="col-md-12 mt-3 mb-3 text-center">
							<label class="tit me-2" for="habeas">Al hacer clic en la "casilla", acepta nuestros Términos y condiciones
								así como la
								ley 1581 de tratamiento de datos personales Habeas data</label>
							<DxCheckBox id="habeas" />
						</div>
					</div>
				</div>
			</DxValidationGroup>
			<div class="card-footer">
				<div class="d-flex justify-content-between align-items-center">
					<span>
						<a class="btn btn-gray me-3" @click.prevent="next"><i class="me-1 fa-solid fa-circle-xmark"></i> CANCELAR</a>
						<a class="btn btn-main" @click.prevent="next"><i class="me-1 fa-solid fa-circle-left"></i> ANTERIOR</a>
					</span>
					<a class="btn btn-main" @click.prevent="next">FINALIZAR INCSCRIPCIÓN <i
							class="fa-solid fa-circle-check ms-1"></i></a>
				</div>
			</div>
		</div>
	</div>
</template>
