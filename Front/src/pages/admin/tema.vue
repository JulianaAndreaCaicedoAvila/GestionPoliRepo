<script setup>
import api from "@/utils/api";
import DxStore from "@/utils/dx";
import { useRoute } from "vue-router";
import NumberBox from "devextreme/ui/number_box";
import { ref, toRaw, onMounted, getCurrentInstance } from "vue";
import { useGenericStore, useClasificadorStore, useModuloStore, useAuthStore } from "@/stores";
import DxValidator, { DxRequiredRule, DxStringLengthRule } from "devextreme-vue/validator";
import { DxSelectBox, DxTextBox, DxDateBox, DxValidationGroup } from "devextreme-vue";
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
	store = useClasificadorStore(),
	storeModulo = useModuloStore(),
	auth = useAuthStore();
let titulo = "Administración &raquo; Cursos &raquo; Temas",
	dependenciaIdTxtRef = ref(null),
	valGroup = ref(null),
	entidades = ref([]),
	modulos = ref([]),
	dependencias = ref([]),
	especificos = ref([]),
	item = ref({
		id: 0,
		moduloId: null,
		dependenciaId: null,
		nombre: null,
		activo: true,
		orden: 0,
		creadoEl: null,
		creadoPor: null,
		editadoEl: null,
		editadoPor: null,
	}),
	item_copy = Clone(item.value),
	panelData = null,
	panelGrid = null,
	dxStore = DxStore({
		key: ["id"],
		userData: JSON.stringify({
			esAdmin: auth.esAdmin,
			companyId: auth.user.companyId,
			dependenceId: auth.user.dependenceId,
		}),
		endPoint: "tema/dx",
		onLoading: function (loadOptions) {
			$("#grid").lock("Cargando");
			console.log("loadOptions =>", loadOptions);
			console.log("onLoading");
		},
		onLoaded: function (results) {
			console.log("results", results);
			console.log("onLoaded!");
			$("#grid").unlock();
			$("#data").unlock();
		},
	}),
	itemSelected = async (e) => {
		// console.clear();
		console.log(_sep);
		console.log("itemSelected =>", e);
		let v = e.value;
		let id = $(e.element).attr("id");
		console.log("id =>", id);
	},
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
			text: `¿Realmente desea ${data.activo ? "desactivar" : "activar"} el tema "<span class="font-weight-semibold">${data.nombre}</span>"?`,
			onConfirm: () => {
				panelGrid = $("#grid");
				panelGrid.lock(`${data.activo ? "Desactivando" : "Activando"}, un momento por favor`, async function () {
					data.activo = data.activo ? false : true;
					await api()
						.post(`tema/ed`, data)
						.then((r) => {
							console.log("r =>", r);
							store.limpiar();
							cancel(function () {
								// panelGrid.unlock();
								grid.refresh();
							});
							return r.data;
						});
				});
			},
			onCancel: () => { },
		});
	},
	start = async (data) => {
		// console.clear();
		console.log(_sep);
		console.log("data =>", data);
		panelData = $("#data");
		panelGrid = $("#grid");
		// Editando
		if (typeof data !== "undefined") {
			$("#tit-action").text("Editar tema");
			panelGrid.lock("Cargando");
			item.value = Clone(data);
		} else {
			$("#tit-action").text("Nuevo tema");
			item.value = Clone(item_copy);
		}
		panelGrid.fadeOut("normal", async function () {
			console.log(typeof data);
			panelData.fadeIn("normal", function () {
				console.log(_sep);
				console.log("item =>", item.value);
				panelGrid.unlock();
			});
		});
	},
	cancel = (cb) => {
		// console.clear();
		panelData = $("#data");
		panelGrid = $("#grid");
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
		// console.clear();
		let result = valGroup.value.instance.validate();
		if (!result.isValid) {
			$.scrollTo($(".dx-invalid:first"), {
				duration: 600,
				offset: -110,
			});
		} else {
			panelData.lock(`${item.id == 0 ? "Creando" : "Actualizando"} tema`, async function () {
				let dto = item.value;
				console.log("dto =>", dto);
				await api({ hideErrors: true })
					.post("tema/ed", dto)
					.then((r) => {
						console.log("r =>", r);
						cancel(function () {
							// panelData.unlock();
							grid.refresh();
						});
					})
					.catch(function (error) {
						if (error.response) {
							// The request was made and the server responded with a status code
							// that falls out of the range of 2xx
							console.log(error.response.data);
							console.log(error.response.status);
							console.log(error.response.headers);
						} else if (error.request) {
							// The request was made but no response was received
							// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
							// http.ClientRequest in node.js
							console.log(error.request);
						} else {
							// Something happened in setting up the request that triggered an Error
							console.log("Error", error.message);
						}
						console.log(error.config);
						// console.log("r =>", r);
						cancel(function () {
							// panelData.unlock();
							grid.refresh();
						});
					});
			});
		}
	};

onMounted(async () => {
	console.log(_sep);
	console.log("tema.vue MOUNTED!");
	$("#grid").lock("Cargando");
	dependencias.value = await store.porTipoNombre("dependencia");
	modulos.value = await storeModulo.all();
	console.log("modulos =>", toRaw(modulos.value));
	console.log("route.name =>", route.name);
});
</script>
<template>
	<div class="container content">
		<div class="card data hidden" id="data">
			<div class="card-header main d-flex justify-content-between">
				<span>
					<i class="fa-solid fa-gears"></i>
					<span v-html="titulo" /> &raquo;
					<span id="tit-action">Nuevo tema</span>
				</span>
			</div>

			<DxValidationGroup ref="valGroup">
				<div class="card-body pt-3 pb-4">
					<div class="row">
						<div class="col-md-12 mb-2">
							<label class="tit">Nombre</label>
							<DxTextBox id="nombre" value-change-event="keyup" :show-clear-button="true" v-model="item.nombre"
								class="form-control" placeholder="Nombre">
								<DxValidator>
									<DxRequiredRule />
									<DxStringLengthRule :min="3" />
								</DxValidator>
							</DxTextBox>
						</div>
						<div class="col-md-9 mb-3">
							<label class="tit">Módulo</label>
							<DxSelectBox id="moduloId" :data-source="modulos" :min-search-length="2" :search-enabled="false"
								:show-clear-button="true" class="form-control" display-expr="nombre" v-model="item.moduloId"
								placeholder="Módulo" value-expr="id" @value-changed="itemSelected">
								<DxValidator>
									<DxRequiredRule />
								</DxValidator>
							</DxSelectBox>
						</div>
						<div class="col-md-3 mb-3">
							<label class="tit">Dependencia</label>
							<DxSelectBox id="dependenciaId" :data-source="dependencias" :min-search-length="2" :search-enabled="false"
								:show-clear-button="true" class="form-control" display-expr="nombre" v-model="item.dependenciaId"
								placeholder="Indicador" value-expr="id" @value-changed="itemSelected">
								<DxValidator>
									<DxRequiredRule />
								</DxValidator>
							</DxSelectBox>
						</div>
					</div>
				</div>
			</DxValidationGroup>

			<div class="card-footer">
				<div class="d-flex justify-content-between align-items-center">
					<a class="btn btn-gray" @click.prevent="cancel"><i class="fa-solid fa-circle-xmark"></i>&nbsp;&nbsp;CANCELAR</a>
					<a class="btn btn-main" @click.prevent="save">GUARDAR&nbsp;&nbsp;<i class="fa-solid fa-floppy-disk"></i></a>
				</div>
			</div>
		</div>

		<div class="card content" id="grid">
			<div class="card-header main d-flex justify-content-between">
				<span>
					<i class="fa-solid fa-gears"></i>
					<span v-html="titulo" />
				</span>
				<span>
					<button type="button" class="btn btn-trans" @click.prevent="start()" title="Nuevo"><i
							class="fa-solid fa-square-plus"></i>NUEVO</button>
				</span>
			</div>

			<div class="card-body pt-3 pb-4">
				<div class="row">
					<div class="col">
						<!-- <h2 class="font-weight-normal text-7 mb-1 color-main"><strong class="font-weight-semibold">Indicadores</strong> Principal o Interna</h2> -->
						<!-- <DxDataGrid id="gridContainer" :customize-columns="customizeColumns" :data-source="dxStore" key-expr="id" :show-borders="true"></DxDataGrid> -->
						<DxDataGrid :customize-columns="customizeColumns" :data-source="dxStore" :hover-state-enabled="true"
							:remote-operations="true" :word-wrap-enabled="true" :row-alternation-enabled="true" :show-borders="false"
							id="gridContainer" @initialized="onInitialized">
							<DxLoadPanel :enabled="false" />
							<DxFilterRow :visible="true" />
							<!-- <DxColumnChooser :enabled="true" mode="dragAndDrop" />
							<DxExport :enabled="true" />
							
							<DxGrouping :auto-expand-all="true" />
							<DxGroupPanel :visible="true" :allow-column-dragging="true" />
							<DxScrolling row-rendering-mode="virtual" />
							<DxSearchPanel :visible="false" :highlight-case-sensitive="false" /> -->
							<DxSorting mode="single" /><!-- single, multiple, none" -->
							<DxSummary>
								<DxGroupItem summary-type="count" column="group_type_name" display-format="{0}" />
							</DxSummary>
							<DxPaging :page-size="15" />
							<DxPager :visible="true" :show-info="true" :show-page-size-selector="false" :show-navigation-buttons="true"
								:allowed-page-sizes="[15, 50, 'Todos']" info-text="{2} temas (página {0} de {1})" />
							<DxColumn data-field="id" caption="Id" :visible="true" :width="80" :allow-filtering="false"
								:allow-sorting="true" alignment="center" />
							<DxColumn data-field="nombre" caption="Tema" :visible="true" />
							<DxColumn data-field="moduloId" caption="Módulo" :visible="true" width="300" alignment="center">
								<DxLookup :data-source="modulos" value-expr="id" display-expr="nombre" />
							</DxColumn>
							<DxColumn data-field="dependenciaId" caption="Dependencia" :visible="true" width="150" alignment="center">
								<DxLookup :data-source="dependencias" value-expr="id" display-expr="nombre" />
							</DxColumn>
							<DxColumn :width="100" data-field="activo" caption="Activo" alignment="center" :visible="true"
								cell-template="tpl1">
								<DxLookup :data-source="$si_no" value-expr="value" display-expr="name" />
							</DxColumn>
							<template #tpl1="{ data }">
								<span v-if="data.data.activo">SI</span>
								<span v-else>NO</span>
							</template>
							<DxColumn :width="70" alignment="center" cell-template="tpl" caption="" name="cmds" :fixed="true"
								fixed-position="right" />
							<template #tpl="{ data }">
								<span class="cmds">
									<a title="Editar" class="cmd-item color-main-600 me-2" @click.prevent="start(data.data)" href="#">
										<i class="fa-solid fa-pen-to-square fa-lg"></i>
									</a>
									<a v-if="data.data.activo" title="Desactivar" class="cmd-item color-main-600"
										@click.prevent="active(data.data, false)" href="#">
										<i class="fa-regular fa-square-check fa-lg"></i>
									</a>
									<a v-else title="Activar" class="cmd-item color-main-600" @click.prevent="active(data.data, true)"
										href="#">
										<i class="fa-regular fa-square-minus fa-lg"></i>
									</a>
								</span>
							</template>
						</DxDataGrid>
					</div>
				</div>
			</div>
		</div>

		<div class="card mt-4" v-if="$conf.debug">
			<div class="card-body">
				<span class="font-weight-semibold">item:</span> {{ item }}<br /><span
					class="font-weight-semibold">item_copy:</span>
				{{ item_copy }}
			</div>
		</div>
	</div>
</template>

