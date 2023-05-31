<script setup>
import api from "@/utils/api";
import DxStore from "@/utils/dx";
import { useClasificadorStore } from "@/stores";
import { ref, onMounted, toRaw } from "vue";
import { DxHtmlEditor, DxToolbar, DxItem } from "devextreme-vue/html-editor";
import DxValidator, { DxRequiredRule } from "devextreme-vue/validator";
import { DxSelectBox, DxTextBox, DxTextArea, DxValidationGroup } from "devextreme-vue";
import { DxColumn, DxScrolling, DxDataGrid, DxLoadPanel, DxPager, DxPaging } from "devextreme-vue/data-grid";
const store = useClasificadorStore();
console.log("store =>", store);
let tipoId = 9; // Acción
let items = ref([]),
	areas = ref([]),
	objetivos = ref([]),
	especificos = ref([]),
	grid = null,
	sizeValues = ["8pt", "10pt", "12pt", "14pt", "18pt", "24pt", "36pt"],
	fontValues = ["Arial", "Georgia", "Tahoma", "Times New Roman", "Verdana"],
	headerValues = [false, 1, 2, 3, 4, 5],
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
	itemSelected = async (e) => {
		console.clear();
		console.log("e =>", e);
		let id = $(e.element).attr("id");
		console.log("id =>", id);
		let hijos = await store.porPadre(e.value);
		item.value.padreId = null;
		if (e.value !== null) {
			if (id == "areaId") objetivos.value = hijos;
			if (id == "objetivoId") especificos.value = hijos;
		} else {
			objetivos.value = [];
			especificos.value = [];
		}
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
					Administración &raquo; Acciones &raquo; <span title="tit-action">Nueva acción</span>
				</span>
				<!-- <span>
					<button type="button" class="btn btn-trans" @click.prevent="addStart"><i class="fa-solid fa-square-plus"></i>NUEVO USUARIO</button>
				</span> -->
			</div>
			<DxValidationGroup ref="valGroup">
				<div class="card-body pt-3 pb-4">
					<div class="row">
						<div class="col-6 mb-2">
							<label class="tit">Área de acción</label>
							<DxSelectBox
								id="areaId"
								:data-source="areas"
								:grouped="false"
								:min-search-length="3"
								:search-enabled="true"
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
						<div class="col-6 mb-2">
							<label class="tit">Objetivo general</label>
							<DxSelectBox
								id="objetivoId"
								:data-source="objetivos"
								:grouped="false"
								:min-search-length="3"
								:search-enabled="true"
								:show-clear-button="true"
								v-model:value="item.abueloId"
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
						<div class="col-12 mb-2">
							<label class="tit">Objetivo específico</label>
							<DxSelectBox
								id="especificoId"
								:data-source="especificos"
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
						<div class="col-12 mb-2">
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
						<div class="col-12">
							<label class="tit">Descripción</label>
							<DxHtmlEditor class="form-control" :value.sync="item.descripcion" placeholder="Descripción" value-change-event="keyup">
								<DxToolbar :multiline="true">
									<DxItem name="undo" />
									<DxItem name="redo" />
									<DxItem name="separator" />
									<DxItem name="size" :accepted-values="sizeValues" />
									<DxItem name="font" :accepted-values="fontValues" />
									<DxItem name="separator" />
									<DxItem name="bold" />
									<DxItem name="italic" />
									<DxItem name="strike" />
									<DxItem name="underline" />
									<DxItem name="separator" />
									<DxItem name="alignLeft" />
									<DxItem name="alignCenter" />
									<DxItem name="alignRight" />
									<DxItem name="alignJustify" />
									<DxItem name="separator" />
									<DxItem name="orderedList" />
									<DxItem name="bulletList" />
									<DxItem name="separator" />
									<DxItem name="header" :accepted-values="headerValues" />
									<DxItem name="separator" />
									<DxItem name="color" />
									<DxItem name="background" />
									<DxItem name="separator" />
									<DxItem name="link" />
									<DxItem name="image" />
									<DxItem name="separator" />
									<DxItem name="clear" />
									<DxItem name="codeBlock" />
									<DxItem name="blockquote" />
									<DxItem name="separator" />
								</DxToolbar>
							</DxHtmlEditor>
							<DxTextArea
								:height="140"
								:max-length="400"
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
					Administración &raquo; Acciones
				</span>
				<span>
					<button type="button" class="btn btn-trans" title="Nueva..." @click.prevent="addStart()"><i class="fa-solid fa-square-plus"></i>nueva</button>
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
							<DxScrolling row-rendering-mode="virtual" />
							<DxPaging :page-size="10" />
							<DxLoadPanel :enabled="false" />
							<DxPager
								:allowed-page-sizes="pageSizes"
								:display-mode="displayMode"
								:show-info="showInfo"
								:show-navigation-buttons="showNavButtons"
								:show-page-size-selector="showPageSizeSelector"
								:visible="true"
							/>
							<!-- <DxColumn data-field="id" caption="ID" data-type="number" alignment="center" :width="100" /> -->
							<DxColumn data-field="abueloNombre" caption="Objetivo general" />
							<DxColumn data-field="padreNombre" caption="Objetivo específico" />
							<DxColumn data-field="nombre" caption="Nombre" :sort-index="0" sort-order="asc" />
							<!-- <DxColumn data-field="activo" caption="Activo" alignment="center" :width="100" /> -->
							<DxColumn :width="100" caption="Activo" cell-template="tpl1" alignment="center" :visible="false" />
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
