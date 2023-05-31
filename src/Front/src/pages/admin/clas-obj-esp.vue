<script setup>
import api from "@/utils/api";
import DxStore from "@/utils/dx";
import { ref, onMounted, toRaw } from "vue";
import DxValidator, { DxRequiredRule } from "devextreme-vue/validator";
import { DxSelectBox, DxTextBox, DxTextArea, DxNumberBox, DxValidationGroup } from "devextreme-vue";
import {
	DxColumn,
	DxColumnChooser,
	DxDataGrid,
	DxExport,
	DxGrouping,
	DxGroupItem,
	DxGroupPanel,
	DxLoadPanel,
	DxPager,
	DxPaging,
	DxScrolling,
	DxSearchPanel,
	DxSorting,
	DxSummary,
} from "devextreme-vue/data-grid";
import { useClasificadorStore } from "@/stores";
const store = useClasificadorStore();
console.log("store =>", store);
let tipoId = 8; // Objetivo específico
let items = ref([]),
	areas = ref([]),
	objetivos = ref([]),
	grid = null,
	padreId = ref(null),
	valGroup = ref(null),
	base = {
		id: 0,
		abueloId: null,
		padreId: null,
		tipoId: tipoId,
		nombre: null,
		activo: true,
		descripcion: null,
	},
	panelData = null,
	panelGrid = null,
	item = ref(Clone(base)),
	areaSelected = async (e) => {
		console.clear();
		console.log("e =>", e);
		item.value.padreId = null;
		if (e.value !== null) {
			objetivos.value = await store.porPadre(e.value);
		} else {
			objetivos.value = [];
		}
		// let data = null;
		// let item = root.document_types.find((o) => o.id === e.value);
		// if (typeof item !== "undefined") {
		// 	let name = item.st_name;
		// 	let desc = item.st_description;
		// 	if (name !== null && name.length > 0 && desc !== null && desc.length > 0) {
		// 		try {
		// 			// 202107272117: Acá no se hace nada con 'data'
		// 			data = JSON.parse(desc);
		// 			console.log("data =>", data);
		// 			root.doc_description = null;
		// 		} catch (e) {
		// 			root.doc_description = `<span class="title-zone"><span class="title-desc"><i class='icon-info'></i> ${name}:&nbsp;</span> ${desc}</span>`;
		// 		}
		// 	} else root.doc_description = null;
		// }
	},
	dxStore = DxStore({
		id: tipoId,
		userData: "",
		endPoint: "clasificador/dx/" + tipoId,
		onLoading: function (loadOptions) {
			if (panelGrid) panelGrid.lock(`Cargando`, function (params) {});
			console.log("loadOptions =>", loadOptions);
			// root.loaderShow("Cargando Dependencias", "#panel-produccion .card-body");
			console.log("onLoading...");
		},
		onLoaded: function (results, baseEntity) {
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
	save = () => {
		let res = valGroup.value.instance.validate();
		// // console.clear();
		console.log("res =>", res);
		if (res.isValid) {
			panelData.lock(`${item.id == 0 ? "Creando" : "Actualizando"}, un momento por favor`, async function (params) {
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
					.post(`clasificador/ed`, dto)
					.then((r) => {
						console.log("r =>", r);
						store.clean();
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
	save1 = () => {
		if (panelData.isValid()) {
			// console.clear();
			panelData.lock(`${item.id == 0 ? "Creando" : "Actualizando"}, un momento por favor`, async function (params) {
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
					.post(`clasificador/ed`, dto)
					.then((r) => {
						console.log("r =>", r);
						store.clean();
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
	active = (data, state) => {
		// console.clear();
		console.log("data =>", data);
		msg.confirm({
			// title: "otro",
			textCancel: "CANCELAR",
			textOk: data.activo ? "DESACTIVAR" : "ACTIVAR",
			text: `¿Realmente desea ${data.activo ? "desactivar" : "activar"} "${data.nombre}"?`,
			onConfirm: () => {
				panelGrid.lock(`${data.activo ? "Desactivando" : "Activando"}, un momento por favor`, async function (params) {
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
	onInitialized = (o) => {
		grid = o.component;
		console.log("grid =>", grid);
	};
let displayMode = "full",
	pageSizes = [5, 10, 30, 50, "all"],
	showPageSizeSelector = true,
	showInfo = true,
	showNavButtons = true,
	customizeColumns = (columns) => {
		console.log("customizeColumns!");
		// columns[0].width = 70;
	};
onMounted(async () => {
	// console.log("items =>", items.value);
	let res = await store.porTipoNombre("area_intervencion");
	console.log("res =>", res);
	areas.value = res.filter((o) => o.hijos > 0);
	objetivos.value = await store.porTipoNombre("objetivo_general");
	// console.clear();
	console.log("areas.value =>", areas.value);
	// console.log("items =>", items);
	// items.value = items.sortBy("nombre");
	// console.log("items.value =>", toRaw(items.value));
	// console.log("MAIN ONMOUNTED");
	panelData = $("#data");
	panelGrid = $("#grid");
});
</script>
<template>
	<div class="container pt-2 pb-2 content">
		<div class="card data hidden" id="data">
			<div class="card-header main d-flex justify-content-between">
				<span>
					<i class="fa-solid fa-gears"></i>
					Administración &raquo; Objetivos Específicos &raquo; <span title="tit-action">Nuevo objetivo</span>
				</span>
				<!-- <span>
					<button type="button" class="btn btn-trans" @click.prevent="addStart"><i class="fa-solid fa-square-plus"></i>NUEVO USUARIO</button>
				</span> -->
			</div>
			<DxValidationGroup ref="valGroup">
				<div class="card-body pt-3 pb-4">
					<div class="row">
						<div class="col-md-12 mb-2">
							<label class="tit">Área de acción</label>
							<DxSelectBox
								id="padreId"
								:data-source="areas"
								:grouped="false"
								:min-search-length="3"
								:search-enabled="true"
								v-model:value="item.abueloId"
								:show-clear-button="true"
								:show-data-before-search="true"
								class="form-control"
								display-expr="nombre"
								@value-changed="areaSelected"
								placeholder="Área de acción..."
								value-expr="id"
							>
								<DxValidator>
									<DxRequiredRule />
								</DxValidator>
							</DxSelectBox>
						</div>
						<div class="col-md-10 mb-2">
							<label class="tit">Objetivo general</label>
							<DxSelectBox
								id="padreId"
								:data-source="objetivos"
								:grouped="false"
								:min-search-length="3"
								:search-enabled="true"
								:show-clear-button="true"
								v-model:value="item.padreId"
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
						<div class="col-md-2 mb-2">
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
						<div class="col-md-12 mb-2">
							<label class="tit">Nombre</label>
							<DxTextArea
								:height="60"
								:max-length="2000"
								value-change-event="keyup"
								:show-clear-button="true"
								id="descripcion"
								v-model:value="item.nombre"
								class="form-control"
								placeholder="Nombre"
							>
								<DxValidator>
									<DxRequiredRule />
								</DxValidator>
							</DxTextArea>
						</div>
						<div class="col-md-12 mb-2">
							<label class="tit">Descripción</label>
							<DxTextArea
								:height="100"
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
			<div class="card-header main d-flex justify-content-between">
				<span>
					<i class="fa-solid fa-gears"></i>
					Administración &raquo; Estructura del Plan &raquo; Objetivos Específicos
				</span>
				<span>
					<button type="button" class="btn btn-trans" title="Nuevo..." @click.prevent="addStart()"><i class="fa-solid fa-square-plus"></i>NUEVO</button>
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
							@initialized="onInitialized"
						>
							<DxGrouping :auto-expand-all="true" />
							<DxGroupPanel :visible="true" :allow-column-dragging="true" />
							<DxScrolling row-rendering-mode="virtual" />
							<DxPaging :page-size="15" />
							<DxLoadPanel :enabled="false" />
							<DxPager
								:allowed-page-sizes="[15, 50, 'Todos']"
								:display-mode="displayMode"
								:show-info="showInfo"
								:show-navigation-buttons="showNavButtons"
								:show-page-size-selector="showPageSizeSelector"
								:visible="true"
								info-text="{2} objetivos (página {0} de {1})"
							/>
							<!-- <DxColumn data-field="id" caption="ID" data-type="number" alignment="center" :width="100" /> -->
							<DxColumn data-field="orden" caption="Orden" data-type="number" alignment="center" :width="100" :sort-index="0" sort-order="asc" />
							<DxColumn data-field="abueloNombre" caption="Área" :group-index="0" />
							<DxColumn data-field="padreNombre" caption="Objetivo general" :group-index="1" />
							<DxColumn data-field="nombre" caption="Nombre" />
							<!-- <DxColumn data-field="activo" caption="Activo" alignment="center" :width="100" /> -->
							<DxColumn :width="100" caption="Activo" cell-template="tpl1" alignment="center" />
							<template #tpl1="{ data }">
								<span v-if="data.data.activo">SI</span>
								<span v-else>NO</span>
							</template>
							<DxColumn :width="100" alignment="center" cell-template="tpl" name="cmds" :fixed="true" fixed-position="right" />
							<template #tpl="{ data }">
								<span class="cmds">
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
							</template>
						</DxDataGrid>
					</div>
				</div>
			</div>
		</div>

		<div class="card mt-4" v-if="$conf.debug">
			<div class="card-body"><span class="font-weight-semibold">item:</span> {{ item }}</div>
		</div>
	</div>
</template>
