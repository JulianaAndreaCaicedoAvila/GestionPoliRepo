<script setup>
import api from "@/utils/api";
import DxStore from "@/utils/dx";
import List from "devextreme/ui/list";
import { useRoute } from "vue-router";
import NumberBox from "devextreme/ui/number_box";
import Cmds from "@/pages/admin/curso/_comandos.vue";
import { ref, toRaw, onMounted, getCurrentInstance } from "vue";
import { useClasificadorStore, useAuthStore } from "@/stores";
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
	DxFileUploader,
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
	store = useClasificadorStore(),
	authStore = useAuthStore();
let itemArchivoId = ref(null),
	valGroup = ref(null),
	dxStore = ref(null),
	temasAll = ref([]),
	tiposArchivos = ref([]),
	action = ref("Seleccionar archivo"),
	temasFrom = ref([]),
	hasErrors = ref(true),
	fileUploader = null,
	file = ref(null),
	temasTo = ref([]),
	fromData = ref([]),
	toData = ref([]),
	selRightClass = ref(""),
	selLeftClass = ref(""),
	itemArchivo = ref({
		id: 0,
		cursoId: props.itemId,
		tipoDocumentoId: null,
		nombre: null,
		archivoNombre: null,
		archivoPeso: null,
		activo: true,
		creadoEl: null,
		creadoPor: null,
		editadoEl: null,
		editadoPor: null,
		orden: 0,
	}),
	itemArchivoCopy = Clone(itemArchivo.value),
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
				} el archivo "<span class="font-weight-semibold">${data.nombre}</span>"?`,
			onConfirm: () => {
				panelGrid = $("#grid-archivo");
				panelGrid.lock(
					`${data.activo ? "Desactivando" : "Activando"}, un momento por favor`,
					async function () {
						data.activo = data.activo ? false : true;
						var fData = new FormData();
						fData.append('documento', JSON.stringify(data));
						await api()
							.post(`curso/ed-archivo`, fData, {
								headers: {
									'Content-Type': 'multipart/form-data'
								}
							})
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
		panelData = $("#data-archivo");
		panelGrid = $("#grid-archivo");
		panelGrid.lock("Cargando");
		// Editando
		if (typeof data !== "undefined") {
			hasErrors.value = false;
			action.value = "Cambiar archivo";
			$("#tit-action").text("Editar archivo");
			itemArchivo.value = Clone(data);
		} else {
			// Creando
			action.value = "Seleccionar archivo";
			$("#tit-action").text("Asociar archivo");
			itemArchivo.value = Clone(itemArchivoCopy);
		}
		panelGrid.fadeOut("normal", async function () {
			console.log(typeof data);
			panelData.fadeIn(function () {
				panelGrid.unlock();
			});
			panelData.fadeIn("normal", function () {
				console.log(_sep);
				console.log("item =>", itemArchivo.value);
				panelGrid.unlock();
			});
		});
	},
	getLink = (data) => {
		console.clear();
		console.log("data =>", data);
		let nm = data.archivoNombre.toLowerCase();
		return `/store/${nm.includes('.pdf') ? 'doc' : 'img'}/${nm}`;
	},
	cancel = (cb) => {
		// console.clear();
		panelData = $("#data-archivo");
		panelGrid = $("#grid-archivo");
		console.log("CANCEL!");
		panelData.fadeOut("normal", function () {
			panelData.clear();
			panelGrid.fadeIn("normal", function () {
				itemArchivo.value = Clone(itemArchivoCopy);
				console.log("item =>", itemArchivo);
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
		panelData = $("#data-archivo");
		panelGrid = $("#grid-archivo");
		let result = valGroup.value.instance.validate();
		if (!result.isValid) {
			$.scrollTo($(".dx-invalid:first"), {
				duration: 600,
				offset: -110,
			});
		} else {
			panelData.lock(
				`${itemArchivo.value.id == 0 ? "Asociando" : "Actualizando"} archivo`,
				async function () {
					//202312270151: https://stackoverflow.com/a/40826943
					var data = new FormData();
					data.append('archivo', file.value);
					data.append('documento', JSON.stringify(toRaw(itemArchivo.value)));
					await api()
						.post(`curso/ed-archivo`, data, {
							headers: {
								'Content-Type': 'multipart/form-data'
							}
						}).then((r) => {
							console.log("r =>", r);
							cancel(function () {
								emit('onRefresh');
								panelData.unlock();
								grid.refresh();
							});
						});
				}
			);
		}
	},
	archivoSeleccionado = (e) => {
		console.clear();
		console.log("e =>", e);
		fileUploader = e.component;
		var f = e.value[0];
		file.value = f;
		console.log("f =>", f);
		itemArchivo.value.archivoNombre = f.name;
		itemArchivo.value.archivoPeso = f.size;
		let errors = document.getElementsByClassName("dx-fileuploader-invalid");
		hasErrors.value = file.value && errors.length > 0;
		if (errors.length > 0) {
			// uploadBtn.classList.add("hidden");
		} else {
			// uploadBtn.classList.remove("hidden");
		}
		console.log("errors.length =>", errors.length);
	},
	archivoSubido = () => {
		console.clear();
		fileUploader.reset();
	},
	archivoSubir = () => {
		let pause = 2000;
		loaderTitle.value = "Subiendo reporte";
		loaderCtl.show();
		// 202308171726: Simula proceso de subida
		setTimeout(function () {
			loaderTitle.value = "Procesando reporte";
			loaderCtl.show();
			setTimeout(() => {
				messageTitle.value = "¡El reporte fue subido y procesado correctamente!";
				loaderCtl.hide();
				messageCtl.show();
			}, pause);
		}, pause);
	},
	getData = () => {
		dxStore.value = DxStore({
			key: ["id"],
			endPoint: "curso/archivos-dx",
			userData: JSON.stringify({ id: props.itemId }),
			onLoading: function (loadOptions) {
				$("#grid-archivo").lock("Cargando");
				console.log("loadOptions =>", loadOptions);
				console.log("onLoading");
			},
			onLoaded: function (results) {
				console.log("results", results);
				console.log("onLoaded!");
				$("#grid-archivo").unlock();
				$("#data-archivo").unlock();
			},
		})
	};

// Se expone como evento en el componente
const emit = defineEmits(['onCancel', 'onRefresh']);
const callOnCancel = () => {
	emit('onCancel');
}

// Propiedades
let props = defineProps({
	itemId: { type: Number, default: null, required: false },
	item: { type: Object, default: null, required: false },
	showRevision: { type: Boolean, default: false, required: false },
	showAprove: { type: Boolean, default: false, required: false }
});

onMounted(async () => {
	console.log(_sep);
	console.log("curso-archivos.vue MOUNTED!");
	$("#grid-archivo").lock("Cargando");
	console.log(_sep);
	tiposArchivos.value = await store.porTipoNombre("tipo_documento");
	itemArchivoId.value = props.itemId;
	itemArchivo.value = props.item;
	getData();
});
</script>
<template>
	<div class="container content">
		<div class="card data hidden mx-1 my-4" id="data-archivo">
			<!-- {{ hasErrors }}<br />
			{{ item }} -->
			<div class="card-header main d-flex justify-content-between">
				<span>
					<i class="fa-solid fa-gears"></i>
					<span id="tit-action"></span>
				</span>
			</div>

			<DxValidationGroup ref="valGroup">
				<div class="card-body pt-3 pb-4">
					<div class="row">
						<div class="col-md-6 mb-3">
							<label class="tit">Nombre</label>
							<DxTextBox id="nombre" v-model="itemArchivo.nombre" class="form-control" placeholder="Nombre">
								<DxValidator>
									<DxRequiredRule />
								</DxValidator>
							</DxTextBox>
						</div>
						<div class="col-md-6">
							<div class="row">
								<div class="col-md-5 mb-3">
									<label class="tit">Tipo</label>
									<DxSelectBox id="tipoDocumentoId" :data-source="tiposArchivos" :grouped="false" :min-search-length="2"
										:search-enabled="true" v-model="itemArchivo.tipoDocumentoId" :show-clear-button="true"
										:show-data-before-search="true" class="form-control" placeholder="Tipo de archivo" value-expr="id"
										display-expr="nombre">
										<DxValidator>
											<DxRequiredRule />
										</DxValidator>
									</DxSelectBox>
								</div>
								<div class="col-md-7 mb-3">
									<label class="tit">{{ action }}</label>
									<div class="file-container d-flex align-content-between">
										<div class="file-selector">
											<DxFileUploader :title="action" accept="image/jpg,image/jpeg,image/png,application/pdf"
												:select-button-text="action" @value-changed="archivoSeleccionado"
												:allowed-file-extensions="['.pdf', '.jpeg', '.jpg', '.png']" :max-file-size="4000000"
												upload-mode="useForm" />
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</DxValidationGroup>

			<div class="card-footer">
				<div class="d-flex justify-content-between align-items-center">
					<a class="btn btn-gray" @click.prevent="cancel"><i class="fa-solid fa-circle-xmark"></i>&nbsp;&nbsp;CANCELAR</a>
					<a :class="'btn btn-main' + (hasErrors ? ' disabled' : '')" @click.prevent="save">GUARDAR&nbsp;&nbsp;<i
							class="fa-solid fa-floppy-disk"></i></a>
				</div>
			</div>
		</div>

		<div class="row" id="grid-archivo">
			<div class="col-md-12 text-end pb-2" v-if="!props.showAprove">
				<a href="#" class="btn pe-0" @click.prevent="addStart()"><i class="fa-solid fa-square-plus me-1"></i>Asociar
					archivo</a>
			</div>
			<div class="col-md-12">
				<DxDataGrid :customize-columns="customizeColumns" :data-source="dxStore" :hover-state-enabled="true"
					:remote-operations="true" :word-wrap-enabled="true" :row-alternation-enabled="true" :show-borders="false"
					id="gridContainer" @initialized="onInitialized">
					<DxLoadPanel :enabled="false" />
					<DxFilterRow :visible="false" />
					<DxSorting mode="single" />
					<DxPaging :page-size="15" />
					<DxPager :visible="true" :show-info="true" :show-page-size-selector="false" :show-navigation-buttons="true"
						:allowed-page-sizes="[15, 50, 'Todos']" info-text="{2} temas (página {0} de {1})" />
					<DxColumn data-field="id" caption="Id" :visible="false" :width="80" :allow-filtering="false"
						:allow-sorting="true" alignment="center" />
					<DxColumn data-field="nombre" caption="Nombre" :visible="true" />
					<DxColumn data-field="tipoDocumentoNombre" caption="Tipo" width="150" :visible="true" />
					<DxColumn data-field="archivoPeso" caption="Peso" :visible="true" width="150" :format="$formatSize" />
					<DxColumn :width="100" data-field="activo" caption="Activo" alignment="center" :visible="true"
						cell-template="tpl1">
						<DxLookup :data-source="$si_no" value-expr="value" display-expr="name" />
					</DxColumn>
					<template #tpl1="{ data }">
						<span v-if="data.data.activo">SI</span>
						<span v-else>NO</span>
					</template>
					<DxColumn :width="80" alignment="center" cell-template="tpl" caption="" name="cmds" :fixed="true"
						fixed-position="right" />
					<template #tpl="{ data }">
						<span class="cmds">
							<a title="Observar" class="cmd-item color-main-600 me-2" :href="getLink(data.data)" target="_blank">
								<i class="fa-solid fa-arrow-up-right-from-square"></i>
							</a>
							<a title="Editar" class="cmd-item color-main-600 me-2" @click.prevent="addStart(data.data)" href="#"
								v-if="!props.showAprove">
								<i class="fa-solid fa-pen-to-square"></i>
							</a>
							<!-- <a v-if="data.data.activo" title="Desactivar" class="cmd-item color-main-600"
								@click.prevent="active(data.data, false)" href="#">
								<i class="fa-regular fa-square-minus"></i>
							</a>
							<a v-else title="Activar" class="cmd-item color-main-600" @click.prevent="active(data.data, true)" href="#">
								<i class="fa-regular fa-square-check"></i>
							</a> -->
						</span>
					</template>
				</DxDataGrid>
			</div>
		</div>

		<Cmds :show-revision="showRevision" :show-aprove="showAprove" v-if="item" :item="item" :item-id="item.id"
			@on-cancel="callOnCancel" />

		<div class="card mt-4" v-if="$conf.debug">
			<div class="card-body">
				<span class="font-weight-semibold">item:</span> {{ itemArchivo }}<br /><span
					class="font-weight-semibold">item_copy:</span>
				{{ itemArchivoCopy }}
			</div>
		</div>
	</div>
</template>
 