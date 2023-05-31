<script setup>
import api from "@/utils/api";
import DxStore from "@/utils/dx";
import { useAuthStore, useClasificadorStore, useAccionStore } from "@/stores";
import { ref, toRaw, onMounted, getCurrentInstance } from "vue";
import DxValidator, { DxRequiredRule } from "devextreme-vue/validator";
import { DxSelectBox, DxTextBox, DxTextArea, DxNumberBox, DxValidationGroup } from "devextreme-vue";
import { useRouter, useRoute } from "vue-router";
import {
	DxColumn,
	DxFilterRow,
	DxColumnChooser,
	DxExport,
	DxScrolling,
	DxDataGrid,
	DxGrouping,
	DxGroupItem,
	DxGroupPanel,
	DxLoadPanel,
	DxPager,
	DxPaging,
	DxSearchPanel,
	DxSorting,
	DxSummary,
} from "devextreme-vue/data-grid";
const auth = useAuthStore(),
	route = useRoute(),
	router = useRouter(),
	accionStore = useAccionStore(),
	store = useClasificadorStore();
console.log("store =>", store);
let tipoId = 9,
	year = new Date().getFullYear();
console.log("year=>", year);
const app = getCurrentInstance();
let props = app.appContext.config.globalProperties;
let areas = ref([]),
	meses = ref([]),
	avances = ref([]),
	objetivos = ref([]),
	entidades = ref([]),
	dependencias = ref([]),
	sectores = ref([]),
	especificos = ref([]),
	annos = ref([]),
	accion = ref(null),
	grid = null,
	gridActividad = null,
	anno_inicial = _config.seguimiento.anno_inicial,
	anno_final = _config.seguimiento.anno_final,
	// anno_actual = new Date().getFullYear(),
	anno_actual = 2023,
	mes_actual = new Date().getMonth(),
	valGroup = ref(null),
	avanceGroup = ref(null),
	valGroupActividad = ref(null),
	avance = ref({
		id: 0,
		actividadId: 0,
		anno: null,
		mes: null,
		cumplimiento: null,
		observaciones: null,
	}),
	avance_bk = Clone(avance.value),
	base = {
		id: 0,
		areaId: null,
		objetivoId: null,
		objetivoEspId: null,
		entidadId: null,
		dependenciaId: null,
		nombre: null,
		descripcion: null,
		activo: true,
	},
	baseActividad = {
		accionId: null,
		peso: 5,
		anno: year,
		id: 0,
		nombre: null,
		descripcion: null,
		activo: true,
	},
	panelData = null,
	panelGrid = null,
	panelAvance = null,
	panelDataActividad = null,
	panelGridActividad = null,
	item = ref(Clone(base)),
	actividad = ref(Clone(baseActividad)),
	itemSelected = async (e) => {
		// console.clear();
		console.log(_sep);
		// objetivosAsignados.value = [];
		console.log("itemSelected =>", e);
		let v = e.value;
		let id = $(e.element).attr("id");
		console.log("id =>", id);
		item.value.padreId = null;
		if (v !== null && v !== undefined) {
			let hijos = await store.porPadre(v);
			if (id == "areaId") {
				objetivos.value = hijos;
			} else if (id == "objetivoId") {
				especificos.value = hijos;
			} else if (id == "sectorId") {
				entidades.value = hijos;
			} else if (id == "entidadId") {
				dependencias.value = hijos;
			}
		} else {
			objetivos.value = [];
			especificos.value = [];
		}
	},
	annoChanged = async (e) => {
		let anno = e.value;
		if (anno == anno_actual) {
			meses.value = [];
			for (let index = 0; index < mes_actual; index++) {
				meses.value.push(props.$meses[index]);
			}
		} else {
			meses.value = Clone(props.$meses);
		}
		console.log("meses =>", toRaw(meses.value));
	},
	dxStoreActividad = ref(null),
	dxStore = DxStore({
		id: tipoId,
		userData: JSON.stringify({ id: tipoId, esAdmin: auth.esAdmin, companyId: auth.user.companyId, dependenceId: auth.user.dependenceId }),
		endPoint: "accion/dx",
		onLoading: function (loadOptions) {
			if (panelGrid) panelGrid.lock(`Cargando`, function () {});
			console.log("loadOptions =>", loadOptions);
			// root.loaderShow("Cargando Dependencias", "#panel-produccion .card-body");
			console.log("onLoading...");
		},
		onLoaded: function (results) {
			if (panelGrid) panelGrid.unlock();
			console.log("results", results);
			// root.totaCount = results.totalCount;
			// root.loaderHide();
			console.log("onLoaded!");
		},
	}),
	valueChanged = (e) => {
		// console.clear();
		let el = $(e.element);
		let id = el.attr("id");
		console.log("id =>", id);
		console.log("e=>", e);
		console.log("item =>", item.value.nombre);
		console.log("");
	},
	avanceCancel = () => {
		panelAvance.fadeOut(function () {
			panelGridActividad.fadeIn(function () {
				panelAvance.unlock();
				avances.value = [];
				avance.value = Clone(avance_bk);
			});
		});
	},
	avanceRegistrar = (item) => {
		console.clear();
		actividad.value = item;
		console.log("item =>", item);
		panelGridActividad.lock("Cargando, un momento por favor", async function () {
			avances.value = await accionStore.avances(actividad.value.id);
			console.log("avaces =>", avances);
			panelGridActividad.fadeOut(function () {
				panelAvance.fadeIn(function () {
					panelGridActividad.unlock();
				});
			});
		});
	},
	avanceSave = async () => {
		console.clear();
		let result = avanceGroup.value.instance.validate();
		if (result.isValid) {
			panelAvance.lock("Guardando, un momento por favor", async function () {
				let dto = toRaw(avance.value);
				dto.actividadId = actividad.value.id;
				if (dto.id == 0) {
					dto.creadoPor = auth.user.id;
				} else {
					dto.editadoPor = auth.user.id;
				}
				console.log("avance =>", dto);
				let av = await accionStore.guardarAvance(dto);
				console.log("item =>", av);
				avanceCancel();
			});
		}
	},
	save = () => {
		let res = valGroup.value.instance.validate();
		// // console.clear();
		console.log("res =>", res);
		if (res.isValid) {
			panelData.lock(`${item.id == 0 ? "Creando" : "Actualizando"}, un momento por favor`, async function () {
				console.log("ITEN =>", item.value);
				let dto = toRaw(item.value);
				console.log("dto =>", dto);
				// let dto = toRaw(item);
				// dto.activo = true;
				// // dto.padreId = 0;
				// dto.tipoId = tipoId;
				// panelData.dataTo(
				// 	toRaw(item),
				// 	async function name(ob) {
				// 		console.log("item =>", ob);
				await api()
					.post(`accion/ed`, dto)
					.then((r) => {
						console.log("r =>", r);
						addCancel(function () {
							panelData.unlock();
							grid.refresh();
						});
					})
					.error((r) => {
						console.log("r =>", r);
						addCancel(function () {
							panelData.unlock();
							grid.refresh();
						});
					});

				// 	},
				// 	true
				// );
			});
		}
	},
	actividadSave = () => {
		console.clear();
		let res = valGroupActividad.value.instance.validate();
		console.clear();
		console.log("res =>", res);
		if (res.isValid) {
			panelDataActividad.lock(`${actividad.id == 0 ? "Creando" : "Actualizando"}, un momento por favor`, async function () {
				console.log("ITEM =>", actividad.value);
				let dto = toRaw(actividad.value);
				dto.accionId = accion.value.id;
				if (item.id == 0) {
					dto.creadoPor = auth.user.id;
				} else {
					dto.editadoPor = auth.user.id;
				}
				console.log("dto =>", dto);
				await api()
					.post(`actividad/ed`, dto)
					.then((r) => {
						console.log("r =>", r);
						actividadCancel(function () {
							panelDataActividad.unlock();
							gridActividad.refresh();
						});
					})
					.error((r) => {
						console.log("r =>", r);
						actividadCancel(function () {
							panelDataActividad.unlock();
							gridActividad.refresh();
						});
					});

				// 	},
				// 	true
				// );
			});
		}
	},
	active = (data) => {
		// console.clear();
		console.log("data =>", data);
		msg.confirm({
			// title: "otro",
			textCancel: "CANCELAR",
			textOk: data.activo ? "DESACTIVAR" : "ACTIVAR",
			text: `¿Realmente desea ${data.activo ? "desactivar" : "activar"} "${data.nombre}"?`,
			onConfirm: () => {
				panelGrid.lock(`${data.activo ? "Desactivando" : "Activando"}, un momento por favor`, async function () {
					data.activo = data.activo ? false : true;
					await api()
						.post(`clasificador/ed`, data)
						.then((r) => {
							console.log("r =>", r);
							store.clean();
							addCancel(function () {
								panelGrid.unlock();
								grid.refresh();
							});
							return r.data;
						});
				});
			},
			onCancel: () => {},
		});
	},
	addStart = (data) => {
		// console.clear();
		console.log("data =>", data);
		panelGrid.fadeOut(function () {
			if (typeof data !== "undefined" && data !== null) {
				item.value = data;
				// panelData.dataFrom(data, function (obj) {
				// 	item.id = data.id;
				// });
			} else {
				item.value = Clone(base);
			}
			panelData.fadeIn(function () {});
		});
	},
	actividadStart = (data) => {
		// console.clear();
		console.log("data =>", data);
		panelGridActividad.fadeOut(function () {
			if (typeof data !== "undefined" && data !== null) {
				actividad.value = data;
				// panelData.dataFrom(data, function (obj) {
				// 	item.id = data.id;
				// });
			} else {
				actividad.value = Clone(baseActividad);
				// actividad.value.accionId = accion.id;
			}
			panelDataActividad.fadeIn(function () {});
		});
	},
	actividades = (data) => {
		// console.clear();
		accion.value = data;
		console.log("data =>", data);
		panelGrid.lock("Cargando actividades", async function name() {
			dxStoreActividad.value = DxStore({
				userData: "",
				endPoint: "actividad/dx/" + data.id,
				onLoading: function (loadOptions) {
					console.log("loadOptions =>", loadOptions);
				},
				onLoaded: function (results) {
					console.log("results =>", results);
					panelGrid.fadeOut(function () {
						panelGrid.unlock();
						if (typeof data !== "undefined" && data !== null) {
							item.value = data;
						} else {
							item.value = Clone(base);
						}
						panelGridActividad.fadeIn(function () {});
					});
				},
			});
			// panelGrid.fadeOut(function () {
			// 	if (typeof data !== "undefined" && data !== null) {
			// 		item.value = data;
			// 		// panelData.dataFrom(data, function (obj) {
			// 		// 	item.id = data.id;
			// 		// });
			// 	} else {
			// 		item.value = Clone(base);
			// 	}
			// 	panelGridActividad.fadeIn(function () {});
			// });
		});
	},
	actividadVolver = () => {
		panelGridActividad.fadeOut(function () {
			accion.value = null;
			panelGrid.fadeIn(function () {});
		});
	},
	addCancel = (cb) => {
		// console.clear();
		// // console.log("data =>", );
		// panelData.hide();
		// panelGrid.show();
		panelData.fadeOut(function () {
			panelData.clear();
			panelGrid.fadeIn(function () {
				item.value = Clone(base);
				valGroup.value.instance.reset();
				if (typeof cb === "function") cb();
			});
		});
	},
	actividadCancel = (cb) => {
		// console.clear();
		// // console.log("data =>", );
		// panelData.hide();
		// panelGrid.show();
		panelDataActividad.fadeOut(function () {
			panelDataActividad.clear();
			panelGridActividad.fadeIn(function () {
				actividad.value = Clone(baseActividad);
				valGroup.value.instance.reset();
				if (typeof cb === "function") cb();
			});
		});
	},
	mesChanged = async (e) => {
		// console.clear();
		console.log(_sep);
		console.log("itemSelected =>", e);
		console.log("avances =>", toRaw(avances.value));
		console.log("avance =>", avance.value);
		let anno = avance.value.anno;
		console.log("anno =>", anno);
		let mes = e.value;
		console.log("mes =>", mes);
		let av = avances.value.find((o) => o.anno == anno && o.mes == mes);
		if (av != null) {
			avance.value.id = av.id;
			avance.value.cumplimiento = av.cumplimiento;
			avance.value.observaciones = av.observaciones;
		} else {
			avance.value.id = 0;
			avance.value.cumplimiento = null;
			avance.value.observaciones = null;
		}
		console.log("avance =>", av);
	},
	onInit = (o) => {
		grid = o.component;
		console.log("grid =>", grid);
	},
	onInitActividad = (o) => {
		gridActividad = o.component;
		console.log("gridActividad =>", gridActividad);
	};
let customizeColumns = () => {
		console.log("customizeColumns!");
		// columns[0].width = 70;
	};
onMounted(async () => {
	console.clear();
	console.log("auth =>", toRaw(auth));
	console.log("route =>", toRaw(route));
	console.log("router =>", router);
	console.log("route.path =>", route.name);
	// console.log("items =>", items.value);
	let res = await store.porTipoNombre("area_intervencion");
	console.log("res =>", res);
	areas.value = res.filter((o) => o.hijos > 0);
	objetivos.value = await store.porTipoNombre("objetivo_general");
	especificos.value = await store.porTipoNombre("objetivo_especifico");
	res = await store.porTipoNombre("sector");
	res = res.filter((o) => o.hijos > 0);
	sectores.value = res;
	// console.clear();
	console.log("areas.value =>", areas.value);
	// console.log("items =>", items);
	// items.value = items.sortBy("nombre");
	// console.log("items.value =>", toRaw(items.value));
	// console.log("MAIN ONMOUNTED");
	panelData = $("#data");
	panelGridActividad = $("#grid-actividad");
	panelDataActividad = $("#data-actividad");
	panelGrid = $("#grid");
	panelAvance = $("#avance-actividad");

	// 202301151034: Verifica si nes enero en el año actual
	let month = new Date().getMonth();
	console.log("month =>", month);
	// 202301162007: Ei el mes es enero dismonuye el anno_actual en uno
	let anno_tope = anno_actual;
	if (month == 0) anno_tope--;
	console.log("anno_tope =>", anno_tope);

	// 202210121839: Annos para datos
	for (let anno = anno_inicial; anno <= anno_final; anno++) {
		if (anno <= anno_tope) {
			annos.value.push(anno);
		} else {
			break;
		}
	}
	console.log("annos =>", toRaw(annos.value));
});
</script>
<template>
	<div class="container pt-2 pb-2 content">
		<div class="card data hidden" id="data">
			<div class="card-header main d-flex justify-content-between">
				<span>
					<i class="fa-solid fa-gears"></i>
					Administración &raquo; Acciones &raquo; <span title="tit-action">Nueva acción</span>
				</span>
				<!-- <span>
					<button type="button" class="btn btn-trans" @click.prevent="addStart"><i class="fa-solid fa-square-plus"></i>NUEVO USUARIO</button>
				</span> -->
			</div>
			<DxValidationGroup ref="valGroup">
				<div class="card-body pt-3 pb-4">
					<div class="row">
						<div class="col-md-6 mb-2">
							<label class="tit">Área de acción</label>
							<DxSelectBox
								id="areaId"
								:data-source="areas"
								:grouped="false"
								:min-search-length="3"
								:search-enabled="true"
								v-model:value="item.areaId"
								:show-clear-button="true"
								:show-data-before-search="true"
								class="form-control"
								display-expr="nombre"
								@value-changed="itemSelected"
								placeholder="Área de acción..."
								value-expr="id"
							>
								<DxValidator>
									<DxRequiredRule />
								</DxValidator>
							</DxSelectBox>
						</div>
						<div class="col-md-6 mb-2">
							<label class="tit">Objetivo general</label>
							<DxSelectBox
								id="objetivoId"
								:data-source="objetivos"
								:grouped="false"
								:min-search-length="3"
								:search-enabled="true"
								:show-clear-button="true"
								v-model:value="item.objetivoId"
								@value-changed="itemSelected"
								:show-data-before-search="true"
								class="form-control"
								display-expr="nombre"
								placeholder="Objetivo general..."
								value-expr="id"
							>
								<DxValidator>
									<DxRequiredRule />
								</DxValidator>
							</DxSelectBox>
						</div>
						<div class="col-md-12 mb-2">
							<label class="tit">Objetivo específico</label>
							<DxSelectBox
								id="especificoId"
								:data-source="especificos"
								:grouped="false"
								:min-search-length="3"
								:search-enabled="true"
								:show-clear-button="true"
								v-model:value="item.objetivoEspId"
								:show-data-before-search="true"
								class="form-control"
								display-expr="nombre"
								placeholder="Objetivo específico..."
								value-expr="id"
							>
								<DxValidator>
									<DxRequiredRule />
								</DxValidator>
							</DxSelectBox>
						</div>
						<div class="col-md-4 mb-1">
							<label class="tit">Sector a cargo</label>
							<DxSelectBox
								id="sectorId"
								:data-source="sectores"
								:grouped="false"
								:min-search-length="3"
								:search-enabled="true"
								:show-clear-button="true"
								v-model="item.sectorId"
								@value-changed="itemSelected"
								:show-data-before-search="true"
								class="form-control"
								display-expr="nombre"
								placeholder="Sector a cargo"
								value-expr="id"
							>
								<DxValidator>
									<DxRequiredRule />
								</DxValidator>
							</DxSelectBox>
						</div>
						<div class="col-md-4 mb-1">
							<label class="tit">Entidad responsable</label>
							<DxSelectBox
								id="entidadId"
								:data-source="entidades"
								:grouped="false"
								:disabled="entidades.length <= 0"
								:min-search-length="3"
								:search-enabled="true"
								:show-clear-button="true"
								v-model="item.entidadId"
								@value-changed="itemSelected"
								:show-data-before-search="true"
								class="form-control"
								display-expr="nombre"
								placeholder="Entidad responsable"
								value-expr="id"
							>
								<DxValidator>
									<DxRequiredRule />
								</DxValidator>
							</DxSelectBox>
						</div>
						<div class="col-md-4 mb-1">
							<label class="tit">Dependencia responsable</label>
							<DxSelectBox
								id="dependenciaId"
								:data-source="dependencias"
								:grouped="false"
								:disabled="dependencias.length <= 0"
								:min-search-length="3"
								:search-enabled="true"
								:show-clear-button="true"
								v-model="item.dependenciaId"
								@value-changed="itemSelected"
								:show-data-before-search="true"
								class="form-control"
								display-expr="nombre"
								placeholder="Dependencia responsable"
								value-expr="id"
							>
								<DxValidator>
									<DxRequiredRule />
								</DxValidator>
							</DxSelectBox>
						</div>
						<div class="col-md-10 mb-2">
							<label class="tit">Nombre</label>
							<!-- <input class="form-control" type="text" placeholder="Nombre" id="nombre" name="nombre" v-model:value="item.nombre" /> -->
							<DxTextBox
								id="nombre"
								value-change-event="keyup"
								:show-clear-button="true"
								:value.sync="item.nombre"
								v-model:value="item.nombre"
								@value-changed="valueChanged"
								class="form-control"
								placeholder="Nombre"
							>
								<DxValidator>
									<DxRequiredRule />
								</DxValidator>
							</DxTextBox>
						</div>
						<div class="col-md-2 pb-2">
							<label class="tit">Orden</label>
							<DxNumberBox
								id="orden"
								:show-clear-button="true"
								value-change-event="keyup"
								v-model:value="item.orden"
								:show-spin-buttons="true"
								:step="1"
								:min="0"
								class="form-control"
								placeholder="Orden"
							>
								<DxValidator>
									<DxRequiredRule />
								</DxValidator>
							</DxNumberBox>
						</div>
						<div class="col-md-12">
							<label class="tit">Descripción</label>
							<DxTextArea
								:height="140"
								:max-length="2000"
								value-change-event="keyup"
								:show-clear-button="true"
								id="descripcion"
								v-model:value="item.descripcion"
								class="form-control"
								placeholder="Descripción"
							>
								<DxValidator>
									<DxRequiredRule />
								</DxValidator>
							</DxTextArea>
						</div>
					</div>
				</div>
			</DxValidationGroup>

			<div class="card-footer">
				<div class="d-flex justify-content-between align-items-center">
					<a class="btn btn-gray" @click.prevent="addCancel"><i class="fa-solid fa-circle-xmark"></i>&nbsp;&nbsp;CANCELAR</a>
					<a class="btn btn-main" @click.prevent="save">GUARDAR&nbsp;&nbsp;<i class="fa-solid fa-floppy-disk"></i></a>
				</div>
			</div>
		</div>

		<div class="card content" id="grid">
			<div class="card-header main d-flex justify-content-between" v-if="route.name == 'reporte-actividad'">
				<span>
					<i class="fa-solid fa-pen-to-square me-2"></i>
					Reportar avance&nbsp;&nbsp;&nbsp;&raquo;&nbsp;&nbsp;&nbsp;Acciones y actividades
				</span>
			</div>
			<div class="card-header main d-flex justify-content-between" v-else>
				<span>
					<i class="fa-solid fa-gears"></i>
					Administración&nbsp;&nbsp;&nbsp;&raquo;&nbsp;&nbsp;&nbsp;Estructura del Plan&nbsp;&nbsp;&nbsp;&raquo;&nbsp;&nbsp;&nbsp;Acciones
				</span>
				<span>
					<button type="button" class="btn btn-trans" title="Nueva..." @click.prevent="addStart()"><i class="fa-solid fa-square-plus"></i>NUEVA</button>
				</span>
			</div>

			<div class="card-body pt-3 pb-4">
				<div class="row">
					<div class="col">
						<!-- <h2 class="font-weight-normal text-7 mb-2 color-main"><strong class="font-weight-semibold">Usuarios</strong> Principal o Interna</h2> -->
						<DxDataGrid
							:customize-columns="customizeColumns"
							:data-source="dxStore"
							:hover-state-enabled="true"
							:remote-operations="true"
							:row-alternation-enabled="true"
							:show-borders="false"
							:word-wrap-enabled="false"
							id="gridContainer"
							width="100%"
							@initialized="onInit"
						>
							<DxGrouping :auto-expand-all="true" />
							<DxColumnChooser :enabled="true" mode="dragAndDrop" />
							<DxExport :enabled="false" />
							<DxFilterRow :visible="true" />
							<DxGroupPanel :visible="true" :allow-column-dragging="true" />
							<DxLoadPanel :enabled="false" />
							<DxScrolling row-rendering-mode="virtual" />
							<DxSearchPanel :visible="false" :highlight-case-sensitive="false" />
							<DxSorting mode="single" /><!-- single, multiple, none" -->
							<DxSummary>
								<DxGroupItem summary-type="count" column="group_type_name" display-format="{0}" />
							</DxSummary>
							<DxPaging :page-size="15" />
							<DxPager
								:visible="true"
								:show-info="true"
								:show-page-size-selector="true"
								:show-navigation-buttons="true"
								:allowed-page-sizes="[15, 50, 'Todos']"
								info-text="{2} acciones (página {0} de {1})"
							/>
							<DxColumn data-field="areaNombre" caption="Área" :width="200" :visible="true" :group-index="0" />
							<DxColumn data-field="objetivoNombre" caption="Objetivo general" :width="200" :visible="true" :group-index="1" />
							<DxColumn data-field="objetivoEspNombre" caption="Objetivo específico" :width="200" :visible="true" :group-index="2" />
							<DxColumn data-field="id" caption="ID" data-type="number" alignment="center" :width="50" :visible="false" />
							<DxColumn data-field="orden" caption="Orden" :sort-index="0" sort-order="asc" data-type="number" alignment="center" :width="100" />
							<DxColumn data-field="nombre" caption="Nombre" width="100%" />
							<DxColumn data-field="actividades" caption="Actividades" alignment="center" :width="100" />
							<!-- <DxColumn data-field="activo" caption="Activo" alignment="center" :width="100" /> -->
							<DxColumn :width="100" caption="Activo" cell-template="tpl1" alignment="center" :visible="false" />
							<template #tpl1="{ data }">
								<span v-if="data.data.activo">SI</span>
								<span v-else>NO</span>
							</template>
							<DxColumn :width="auth.esAdmin ? 100 : 60" alignment="center" cell-template="tpl" name="cmds" :fixed="true" fixed-position="right" />
							<template #tpl="{ data }">
								<span class="cmds" v-if="auth.esAdmin">
									<a title="Gestionar actividades..." class="cmd-item color-main-600 me-2" @click.prevent="actividades(data.data)" href="#">
										<i class="fa-solid fa-diagram-project"></i>
									</a>
									<a title="Modificar..." class="cmd-item color-main-600 me-2" @click.prevent="addStart(data.data)" href="#">
										<i class="fa-solid fa-pen-to-square fa-lg"></i>
									</a>
									<a v-if="data.data.activo" title="Desactivar..." class="cmd-item color-main-600" @click.prevent="active(data.data, false)" href="#">
										<i class="fa-regular fa-square-minus fa-lg"></i>
									</a>
									<a v-else title="Activar..." class="cmd-item color-main-600" @click.prevent="active(data.data, true)" href="#">
										<i class="fa-regular fa-square-check fa-lg"></i>
									</a>
								</span>
								<span class="cmds" v-else>
									<a title="Gestionar actividades..." class="cmd-item color-main-600 me-2" @click.prevent="actividades(data.data)" href="#">
										<i class="fa-solid fa-diagram-project"></i>
									</a>
								</span>
							</template>
						</DxDataGrid>
					</div>
				</div>
			</div>
		</div>

		<div class="card data hidden" id="data-actividad">
			<div class="card-header main d-flex justify-content-between">
				<span>
					<i class="fa-solid fa-gears"></i>
					Administración &raquo; Acciones &raquo; <span title="tit-action">Nueva actividad</span>
				</span>
				<!-- <span>
					<button type="button" class="btn btn-trans" @click.prevent="addStart"><i class="fa-solid fa-square-plus"></i>NUEVO USUARIO</button>
				</span> -->
			</div>
			<DxValidationGroup ref="valGroupActividad">
				<div class="card-body pt-3 pb-4">
					<div class="row">
						<div class="col title bb pb-3 mb-2" v-if="accion"><span class="color-main">Acción &raquo;</span> {{ accion.nombre }}<br /></div>
					</div>
					<div class="row">
						<div class="col-md-7 mb-2">
							<label class="tit">Nombre de la actividad</label>
							<!-- <input class="form-control" type="text" placeholder="Nombre" id="nombre" name="nombre" v-model:value="item.nombre" /> -->
							<DxTextBox
								id="nombre"
								value-change-event="keyup"
								:show-clear-button="true"
								v-model:value="actividad.nombre"
								class="form-control"
								placeholder="Nombre"
							>
								<DxValidator>
									<DxRequiredRule />
								</DxValidator>
							</DxTextBox>
						</div>
						<div class="col-md-5 mb-2">
							<div class="row">
								<div class="col mb-2">
									<label class="tit">Orden</label>
									<DxNumberBox
										id="orden"
										:show-clear-button="true"
										value-change-event="keyup"
										v-model:value="actividad.orden"
										:show-spin-buttons="true"
										:step="1"
										:min="0"
										class="form-control"
										placeholder="Orden"
									>
										<DxValidator>
											<DxRequiredRule />
										</DxValidator>
									</DxNumberBox>
								</div>
								<div class="col mb-2">
									<label class="tit help" title="Peso Porcentual de de la Actividad dentro de la Acción (Número)">Peso (%)</label>
									<DxNumberBox
										:min="0"
										:max="100"
										:step="5"
										:show-spin-buttons="true"
										:show-clear-button="true"
										:disabled="false"
										:read-only="false"
										placeholder="Peso"
										value-change-event="keyup"
										v-model:value="actividad.peso"
									>
										<DxValidator>
											<DxRequiredRule />
										</DxValidator>
									</DxNumberBox>
								</div>
								<div class="col mb-2">
									<label class="tit help" title="Año en el cual la actividad debe estar finalizada (Número)">Año final</label>
									<DxNumberBox
										:min="anno_inicial"
										:max="anno_final"
										:step="1"
										:show-spin-buttons="true"
										:show-clear-button="false"
										:disabled="false"
										:read-only="false"
										placeholder="Año"
										value-change-event="keyup"
										v-model:value="actividad.anno"
									>
										<DxValidator>
											<DxRequiredRule />
										</DxValidator>
									</DxNumberBox>
								</div>
							</div>
						</div>

						<div class="col-md-12">
							<label class="tit">Descripción</label>
							<DxTextArea
								:height="60"
								:max-length="2000"
								value-change-event="keyup"
								:show-clear-button="true"
								id="descripcion"
								v-model:value="actividad.descripcion"
								class="form-control"
								placeholder="Descripción"
							/>
						</div>
					</div>
				</div>
			</DxValidationGroup>

			<div class="card-footer">
				<div class="d-flex justify-content-between align-items-center">
					<a class="btn btn-gray" @click.prevent="actividadCancel"><i class="fa-solid fa-circle-xmark"></i>&nbsp;&nbsp;CANCELAR</a>
					<a class="btn btn-main" @click.prevent="actividadSave">GUARDAR&nbsp;&nbsp;<i class="fa-solid fa-floppy-disk"></i></a>
				</div>
			</div>
		</div>

		<div class="card content hidden" id="grid-actividad">
			<div class="card-header main d-flex justify-content-between" v-if="route.name == 'reporte-actividad'">
				<span>
					<i class="fa-solid fa-pen-to-square me-2"></i>
					Reportar &raquo; Acciones y actividades
				</span>
				<span>
					<button type="button" class="btn btn-trans" @click.prevent="actividadVolver()"><i class="fa-solid fa-circle-chevron-left"></i>VOLVER</button>
				</span>
			</div>
			<div class="card-header main d-flex justify-content-between" v-else>
				<span>
					<i class="fa-solid fa-gears"></i>
					Administración &raquo; Estructura del Plan &raquo; Actividades
				</span>
				<span>
					<button type="button" class="btn btn-trans" @click.prevent="actividadVolver()"><i class="fa-solid fa-circle-chevron-left"></i>VOLVER</button>
					<button type="button" class="btn btn-trans ms-4" title="Nueva..." @click.prevent="actividadStart()">
						<i class="fa-solid fa-square-plus"></i>NUEVA
					</button>
				</span>
			</div>
			<div class="card-body pt-3 pb-4">
				<div class="row">
					<div class="col title-mid bb pb-3 mb-2" v-if="accion">
						<span class="color-main">Área de acción &raquo;</span> {{ accion.areaNombre }}<br />
						<span class="color-main">Entidad &raquo;</span> {{ accion.entidadNombre }}<br />
						<span class="color-main">Objetivo &raquo;</span> {{ accion.objetivoNombre }}<br />
						<span class="color-main">Objetivo específico &raquo;</span> {{ accion.objetivoEspNombre }}<br />
					</div>
				</div>
				<!-- {{ avances }} -->
				<div class="row">
					<div class="col title pb-2 mb-2" v-if="accion"><span class="color-main">Actividades para la acción &raquo;</span> {{ accion.nombre }}<br /></div>
				</div>
				<div class="row">
					<div class="col">
						<!-- <h2 class="font-weight-normal text-7 mb-2 color-main"><strong class="font-weight-semibold">Usuarios</strong> Principal o Interna</h2> -->
						<DxDataGrid
							:customize-columns="customizeColumns"
							:data-source="dxStoreActividad"
							:hover-state-enabled="true"
							:remote-operations="true"
							:row-alternation-enabled="true"
							:show-borders="false"
							:word-wrap-enabled="false"
							id="gridContainer"
							width="100%"
							@initialized="onInitActividad"
						>
							<DxColumnChooser :enabled="false" mode="dragAndDrop" />
							<DxExport :enabled="false" />
							<DxFilterRow :visible="false" />
							<DxGrouping :auto-expand-all="true" />
							<DxGroupPanel :visible="false" :allow-column-dragging="true" />
							<DxLoadPanel :enabled="false" />
							<DxPaging :page-size="10" />
							<DxScrolling row-rendering-mode="virtual" />
							<DxSearchPanel :visible="false" :highlight-case-sensitive="false" />
							<DxSorting mode="single" /><!-- single, multiple, none" -->
							<DxSummary>
								<DxGroupItem summary-type="count" column="group_type_name" display-format="{0}" />
							</DxSummary>
							<DxPager
								:visible="true"
								:show-info="true"
								:show-page-size-selector="true"
								:show-navigation-buttons="true"
								:allowed-page-sizes="[5, 10, 30, 50, 'Todos']"
								info-text="{2} items (página {0} de {1})"
							/>
							<DxColumn data-field="id" caption="ID" data-type="number" alignment="center" :width="50" :visible="false" />
							<DxColumn
								data-field="orden"
								caption="Orden"
								data-type="number"
								alignment="center"
								:width="100"
								:visible="true"
								:sort-index="0"
								sort-order="asc"
							/>
							<DxColumn data-field="nombre" caption="Nombre" width="100%" />
							<DxColumn data-field="peso" caption="Peso (%)" alignment="center" :width="120" cell-template="tpl-percent" />
							<template #tpl-percent="{ data }"> {{ data.data.peso }}<small>&nbsp;%</small> </template>
							<DxColumn data-field="anno" caption="Año final" alignment="center" :width="120" />
							<DxColumn :width="auth.esAdmin ? 80 : 60" alignment="center" cell-template="tpl" name="cmds" :fixed="true" fixed-position="right" />
							<template #tpl="{ data }">
								<span class="cmds" v-if="auth.esAdmin">
									<a title="Registrar avance en actividad" class="cmd-item color-main-600 me-2" href="#" @click.prevent="avanceRegistrar(data.data)"
										><i class="fa-regular fa-square-plus fa-lg"></i
									></a>
									<a title="Modificar..." class="cmd-item color-main-600 me-2" @click.prevent="actividadStart(data.data)" href="#">
										<i class="fa-solid fa-pen-to-square fa-lg"></i>
									</a>
									<a v-if="data.data.activo" title="Desactivar..." class="cmd-item color-main-600" @click.prevent="active(data.data, false)" href="#">
										<i class="fa-regular fa-square-minus fa-lg"></i>
									</a>
									<a v-else title="Activar..." class="cmd-item color-main-600" @click.prevent="active(data.data, true)" href="#">
										<i class="fa-regular fa-square-check fa-lg"></i>
									</a>
								</span>
								<span class="cmds" v-else>
									<a title="Registrar avance en actividad" class="cmd-item color-main-600 me-2" href="#" @click.prevent="avanceRegistrar(data.data)"
										><i class="fa-regular fa-square-plus fa-lg"></i
									></a>
								</span>
							</template>
						</DxDataGrid>
					</div>
				</div>
			</div>
		</div>
		<div class="card data hidden" id="avance-actividad">
			<div class="card-header main d-flex justify-content-between" v-if="route.name == 'reporte-actividad'">
				<span>
					<i class="fa-solid fa-pen-to-square me-2"></i>
					Reportar &raquo; Acciones y actividades
				</span>
			</div>
			<div class="card-header main d-flex justify-content-between" v-else>
				<span>
					<i class="fa-solid fa-gears"></i>
					Administración &raquo; Actividad &raquo; <span id="tit-action-avance">Registro de avance</span>
				</span>
			</div>
			<DxValidationGroup ref="avanceGroup">
				<div class="card-body pt-3 pb-2">
					<div class="row">
						<div class="col title bb pb-2 mb-2" v-if="actividad"><span class="color-main">Actividad »</span> {{ actividad.nombre }}</div>
					</div>
					<div class="row">
						<div class="col-md-6">
							<div class="row">
								<div class="col-md-4 mb-2">
									<label class="tit">Año</label>
									<DxSelectBox
										id="anno"
										:data-source="annos"
										value-change-event="keyup"
										v-model:value="avance.anno"
										class="form-control"
										@value-changed="annoChanged"
									>
										<DxValidator>
											<DxRequiredRule />
										</DxValidator>
									</DxSelectBox>
								</div>
								<div class="col-md-4 mb-2">
									<label class="tit">Mes</label>
									<DxSelectBox
										id="mes"
										:data-source="meses"
										value-change-event="keyup"
										v-model="avance.mes"
										@value-changed="mesChanged"
										class="form-control"
										display-expr="name"
										value-expr="value"
									>
										<DxValidator>
											<DxRequiredRule />
										</DxValidator>
									</DxSelectBox>
								</div>
								<div class="col-md-4 mb-2">
									<label class="tit">Cumplimiento (%)</label>
									<DxNumberBox
										id="cumplimiento"
										format="#,##0.##"
										value-change-event="keyup"
										v-model:value="avance.cumplimiento"
										class="form-control"
										type="decimal"
										:read-only="false"
									>
										<DxValidator>
											<DxRequiredRule />
										</DxValidator>
									</DxNumberBox>
								</div>
							</div>
						</div>
						<div class="col-md-6">
							<label class="tit">Análisis del avance</label>
							<DxTextArea
								:height="110"
								:max-length="400"
								value-change-event="keyup"
								:show-clear-button="true"
								id="descripcion"
								v-model:value="avance.observaciones"
								class="form-control"
								placeholder="Descripción"
							>
								<DxValidator>
									<DxRequiredRule />
								</DxValidator>
							</DxTextArea>
						</div>
					</div>
				</div>
			</DxValidationGroup>
			<div class="card-footer">
				<div class="d-flex justify-content-between align-items-center">
					<a class="btn btn-gray" @click.prevent="avanceCancel"><i class="fa-solid fa-circle-xmark"></i>&nbsp;&nbsp;CANCELAR</a>
					<a class="btn btn-main" @click.prevent="avanceSave">GUARDAR&nbsp;&nbsp;<i class="fa-solid fa-floppy-disk"></i></a>
				</div>
			</div>
		</div>
		<div class="card mt-4" v-if="$conf.debug">
			<div class="card-body">
				<span class="font-weight-semibold pt-4 mt-4">avance:</span> {{ avance }}<br />
				<span class="font-weight-semibold pt-4 mt-4">avance_bk:</span> {{ avance_bk }}<br />
				<span class="font-weight-semibold">item:</span> {{ item }}<br />
				<span class="font-weight-semibold">accion:</span> {{ accion }}<br />
				<span class="font-weight-semibold">actividad:</span> {{ actividad }}
			</div>
		</div>
	</div>
</template>
