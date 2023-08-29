<script setup>
import api from "@/utils/api";
import DxStore from "@/utils/dx";
import { useClasificadorStore } from "@/stores";
import { ref, onMounted, toRaw } from "vue";
import DataSource from "devextreme/data/data_source";
import DxValidator, { DxRequiredRule } from "devextreme-vue/validator";
import { DxSelectBox, DxTextBox, DxNumberBox, DxTextArea, DxValidationGroup } from "devextreme-vue";
import {
	DxColumn,
	DxColumnChooser,
	DxExport,
	DxScrolling,
	DxDataGrid,
	DxGrouping,
	DxGroupItem,
	DxGroupPanel,
	DxLoadPanel,
	DxLookup,
	DxPager,
	DxFilterRow,
	DxPaging,
	DxSearchPanel,
	DxSorting,
	DxSummary,
} from "devextreme-vue/data-grid";
const store = useClasificadorStore();
console.log("store =>", store);
let tipoId = 0; // Todos
let tipos = ref([]),
	padres = ref([]),
	grid = null,
	padreId = ref(null),
	valGroup = ref(null),
	base = {
		id: null,
		padreId: null,
		tipoId: tipoId,
		nombre: null,
		descripcion: null,
		activo: true,
	},
	panelData = null,
	panelGrid = null,
	item = ref(Clone(base)),
	dxStore = DxStore({
		id: tipoId,
		userData: "",
		endPoint: "clasificador/dx/" + tipoId,
		onLoading: function (loadOptions) {
			$("#grid").lock("Cargando");
			console.log("loadOptions =>", loadOptions);
			// root.loaderShow("Cargando Dependencias", "#panel-produccion .card-body");
			console.log("onLoading...");
		},
		onLoaded: function (results, baseEntity) {
			// console.clear();
			console.log("results", results);
			// root.totaCount = results.totalCount;
			// root.loaderHide();
			console.log("onLoaded!");
			if (panelGrid != null) panelGrid.unlock();
		},
	}),
	edit = (data) => {
		// console.clear();
		console.log("data =>", data);
	},
	valueChanged = async (e) => {
		// console.clear();
		console.log(_sep);
		let el = $(e.element);
		let id = el.attr("id");
		let val = e.value;
		// console.log("id =>", id);
		// console.log("value =>", val);
		// console.log("e=>", e);
		// console.log("item =>", item.value.nombre);
		// console.log("");

		if (id == "tipoPadreId" && val != null && typeof val !== "undefined") {
			console.log("value =>", val);
			let items = await store.porTipoId(val);
			padres.value = toRaw(items);
			console.log("items =>", toRaw(items));
		}
	},
	save = () => {
		let res = valGroup.value.instance.validate();
		// console.clear();
		console.log("res =>", res);
		if (res.isValid) {
			panelData.lock(`${item.id == 0 ? "Creando" : "Actualizando"}, un momento por favor`, async function (params) {
				console.log("ITEM =>", item.value);
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
						store.limpiar();
						addCancel(function () {
							panelData.unlock();
							grid.refresh();
						});
					})
					.catch((error) => {
						addCancel(function () {
							panelData.unlock();
							grid.refresh();
						});
					});
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
							store.limpiar();
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
		console.log(_sep);
		console.log("addStart() =>", data);
		panelGrid.fadeOut(function () {
			if (typeof data !== "undefined" && data !== null) {
				item.value = data;
				// panelData.dataFrom(data, function (obj) {
				// 	item.id = data.id;
				// });
			} else {
				item.value = Clone(base);
				item.value.id = 0;
				item.value.padreId = 0;
				item.value.tipoId = null;
				item.value.descripcion = null;
			}
			panelData.fadeIn(function () {});
		});
	},
	addCancel = (cb) => {
		panelData.fadeOut(function () {
			panelData.clear();
			panelGrid.fadeIn(function () {
				item.value = Clone(base);
				valGroup.value.instance.reset();
				if (typeof cb === "function") cb();
			});
		});
	},
	setValue = (event) => {
		// console.clear();
		let el = $(event.target);
		let id = el.attr("id");
		console.log("el =>", el);
		console.log("id =>", id);
		user[id] = el.val();
	},
	onInitialized = (o) => {
		grid = o.component;
		console.log("grid =>", grid);
	};

let dataSourceA = () => {
	return new DataSource({
		store: dxStore,
	});
};
let displayMode = "full",
	pageSizes = [5, 10, 30, 50, "all"],
	showPageSizeSelector = true,
	showInfo = true,
	showNavButtons = true,
	customizeColumns = (columns) => {
		console.log("customizeColumns!");
		// columns[0].width = 70;
	},
	isCompactMode = () => {
		return this.displayMode === "compact";
	};
onMounted(async () => {
	// console.clear();
	console.log(_sep);
	console.log("onMounted!");
	// console.log("tipos =>", tipos.value);
	// let items = await store.porTipoNombre("area_intervencion");
	tipos.value = await store.tipos();
	// console.log("items =>", items);
	// tipos.value = items.sortBy("nombre");
	console.log("tipos.value =>", toRaw(tipos.value));
	// console.log("MAIN ONMOUNTED");
	panelData = $("#data");
	panelGrid = $("#grid");
	panelGrid.lock("Cargando");
});
</script>
<template>
	<div class="container pt-2 pb-2 content">
		<div class="card data hidden" id="data">
			<div class="card-header main d-flex justify-content-between">
				<span> <i class="fa-solid fa-gears"></i> Administración &raquo; Clasificadores &raquo; <span title="tit-action">Nuevo</span> </span>
				<!-- <span>
					<button type="button" class="btn btn-trans" @click.prevent="addStart"><i class="fa-solid fa-square-plus"></i>NUEVO USUARIO</button>
				</span> -->
			</div>
			<DxValidationGroup ref="valGroup">
				<div class="card-body pt-3 pb-4">
					<div class="row">
						<div class="col-md-3 mb-2">
							<label class="tit">Tipo de clasificador padre</label>
							<DxSelectBox
								id="tipoPadreId"
								:data-source="tipos"
								:grouped="false"
								:min-search-length="3"
								:search-enabled="true"
								:show-clear-button="true"
								:show-data-before-search="true"
								class="form-control"
								display-expr="nombre"
								v-model:value="item.padreTipoId"
								placeholder="Tipo de clasificador padre"
								value-expr="id"
								@value-changed="valueChanged"
							/>
						</div>
						<div class="col-md-9 mb-2">
							<label class="tit">Clasificador padre</label>
							<DxSelectBox
								id="padreId"
								:data-source="padres"
								:grouped="false"
								:min-search-length="3"
								:search-enabled="true"
								:show-clear-button="true"
								:show-data-before-search="true"
								v-model:value="item.padreId"
								class="form-control"
								display-expr="nombre"
								placeholder="Clasificador padre"
								value-expr="id"
							/>
						</div>
						<div class="col-md-3 mb-2">
							<label class="tit">Tipo de clasificador</label>
							<DxSelectBox
								id="tipoId"
								:data-source="tipos"
								:grouped="false"
								:min-search-length="3"
								:search-enabled="true"
								:show-clear-button="true"
								:show-data-before-search="true"
								v-model:value="item.tipoId"
								class="form-control"
								display-expr="nombre"
								placeholder="Tipo de clasificador"
								value-expr="id"
							>
								<DxValidator>
									<DxRequiredRule />
								</DxValidator>
							</DxSelectBox>
						</div>
						<div class="col-md-7 mb-2">
							<label class="tit">Nombre</label>
							<!-- <input class="form-control" type="text" placeholder="Nombre" id="nombre" name="nombre" v-model:value="item.nombre" /> -->
							<DxTextBox
								id="nombre"
								value-change-event="keyup"
								:show-clear-button="true"
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
							<!-- <input class="form-control" type="text" placeholder="Nombre" id="nombre" name="nombre" v-model="item.nombre" /> -->
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
						<div class="col-md-12 pb-2">
							<label class="tit">Descripción</label>
							<!-- <input class="form-control" type="text" placeholder="Descripción" id="descripcion" name="descripcion" v-model="item.descripcion" nonrequired /> -->
							<DxTextArea
								id="nombre"
								:show-clear-button="true"
								value-change-event="keyup"
								:height="100"
								v-model:value="item.descripcion"
								class="form-control"
								placeholder="Descripción"
							/>
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
					Administración &raquo; Clasificadores
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
							:allow-column-reordering="true"
							:customize-columns="customizeColumns"
							:column-auto-width="false"
							:data-source="dxStore"
							:hover-state-enabled="true"
							:remote-operations="true"
							:row-alternation-enabled="true"
							:show-borders="false"
							:word-wrap-enabled="false"
							@initialized="onInitialized"
							id="gridContainer"
							width="100%"
						>
							<DxColumnChooser :enabled="true" mode="dragAndDrop" title="Columnas" />
							<DxExport :enabled="false" />
							<DxFilterRow :visible="true" />
							<DxGrouping :auto-expand-all="false" />
							<DxGroupPanel :visible="true" :allow-column-dragging="true" />
							<DxLoadPanel :enabled="false" />
							<DxScrolling row-rendering-mode="virtual" />
							<DxSearchPanel :visible="false" :highlight-case-sensitive="false" />
							<DxSorting mode="single" /><!-- single, multiple, none" -->
							<DxSummary>
								<DxGroupItem summary-type="count" column="group_type_name" display-format="{0} ítems" />
							</DxSummary>
							<DxPaging :page-size="15" />
							<DxPager
								:visible="true"
								:show-info="true"
								:show-page-size-selector="true"
								:show-navigation-buttons="true"
								:allowed-page-sizes="[15, 30, 50, 'Todos']"
								info-text="{2} items (página {0} de {1})"
							/>
							<DxColumn
								name="Abuelo Tipo"
								:width="180"
								:allow-filtering="true"
								:allow-sorting="false"
								:allow-editing="true"
								:wrap-item-text="true"
								sort-order="none"
								alignment="left"
								caption="Abuelo Tipo"
								data-field="abueloTipoId"
								data-type="int"
								:visible="false"
							>
								<DxLookup :data-source="tipos" value-expr="id" display-expr="nombre" />
							</DxColumn>
							<DxColumn
								alignment="center"
								data-field="abueloId"
								caption="Abuelo ID"
								:allow-grouping="false"
								:allow-filtering="false"
								:allow-sorting="true"
								width="85"
								:visible="false"
							/>
							<DxColumn data-field="abueloNombre" caption="Abuelo" :allow-grouping="true" :allow-filtering="true" :allow-sorting="true" :visible="false" />
							<DxColumn
								name="Padre Tipo"
								:width="120"
								:allow-filtering="true"
								:allow-sorting="false"
								:visible="false"
								:allow-editing="true"
								:wrap-item-text="true"
								sort-order="asc"
								alignment="left"
								caption="Padre Tipo"
								data-field="padreTipoId"
								data-type="int"
							>
								<DxLookup :data-source="tipos" value-expr="id" display-expr="nombre" />
							</DxColumn>
							<DxColumn
								alignment="center"
								data-field="padreId"
								caption="Padre ID"
								:width="80"
								:allow-grouping="false"
								:allow-filtering="false"
								:allow-sorting="true"
								width="85"
								:visible="false"
							/>
							<DxColumn
								data-field="padreNombre"
								:width="250"
								caption="Padre"
								:allow-grouping="true"
								:allow-filtering="true"
								:allow-sorting="true"
								:visible="false"
							/>
							<DxColumn
								name="Tipo"
								:width="180"
								:allow-filtering="true"
								:allow-sorting="false"
								:visible="true"
								:allow-editing="true"
								:wrap-item-text="true"
								sort-order="none"
								alignment="left"
								caption="Tipo"
								data-field="tipoId"
								:group-index="0"
								data-type="int"
							>
								<DxLookup :data-source="tipos" value-expr="id" display-expr="nombre" />
							</DxColumn>
							<DxColumn
								alignment="center"
								data-field="id"
								caption="ID"
								:allow-grouping="false"
								:allow-filtering="false"
								:allow-sorting="true"
								width="85"
								:visible="true"
							/>
							<DxColumn
								data-field="nombre"
								caption="Nombre"
								:sort-index="0"
								sort-order="none"
								:allow-grouping="false"
								:allow-filtering="true"
								:allow-sorting="true"
							/>
							<DxColumn
								data-field="descripcion"
								caption="Descripción"
								:allow-grouping="false"
								:allow-filtering="true"
								:allow-sorting="true"
								:visible="false"
								width="55%"
							/>
							<DxColumn :width="120" data-field="orden" caption="Orden" alignment="center" :visible="true" sort-order="none" />
							<DxColumn :width="120" data-field="activo" caption="Activo" alignment="center" :visible="true">
								<DxLookup :data-source="$si_no" value-expr="value" display-expr="name" />
							</DxColumn>
							<DxColumn :width="80" alignment="center" cell-template="tpl" name="cmds" :fixed="true" fixed-position="right" />
							<template #tpl="{ data }">
								<span class="cmds">
									<a title="Modificar..." class="cmd-item color-main-600 me-2" @click.prevent="addStart(data.data)" href="#">
										<i class="fa-solid fa-pen-to-square fa-lg"></i>
									</a>
									<a v-if="data.data.activo" title="Desactivar..." class="cmd-item color-main-600" @click.prevent="active(data.data, false)" href="#">
										<i class="fa-solid fa-square-minus fa-lg"></i>
									</a>
									<a v-else title="Activar..." class="cmd-item color-main-600" @click.prevent="active(data.data, true)" href="#">
										<i class="fa-solid fa-square-check fa-lg"></i>
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
