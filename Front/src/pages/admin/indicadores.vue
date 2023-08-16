<script setup>
import DxStore from "@/utils/dx";
import { useIndicadorStore, useClasificadorStore, useAuthStore } from "@/stores";
import NumberBox from "devextreme/ui/number_box";
import TagBox from "devextreme/ui/tag_box";
import { useRouter, useRoute } from "vue-router";
import { ref, toRaw, onMounted, getCurrentInstance } from "vue";
import DxValidator, { DxRequiredRule, DxStringLengthRule } from "devextreme-vue/validator";
import { DxSelectBox, DxTextBox, DxTagBox, DxDateBox, DxNumberBox, DxTextArea, DxValidationGroup } from "devextreme-vue";
import {
	DxColumn,
	DxColumnChooser,
	DxExport,
	DxScrolling,
	DxFilterRow,
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
const route = useRoute(),
	storeIndicador = useIndicadorStore(),
	store = useClasificadorStore(),
	app = getCurrentInstance(),
	auth = useAuthStore();
let props = app.appContext.config.globalProperties;
let tbAsignados = null,
	metas = [],
	avances = [],
	series = [],
	meses = ref([]),
	anno_inicial = _config.seguimiento.anno_inicial,
	anno_final = _config.seguimiento.anno_final,
	anno_actual = new Date().getFullYear(),
	// anno_actual = 2023,
	mes_actual = new Date().getMonth(),
	areaIdTxtRef = ref(null),
	objetivoIdTxtRef = ref(null),
	valGroup = ref(null),
	avanceGroup = ref(null),
	objGralId = ref(null),
	objEspId = ref(null),
	areas = ref([]),
	objetivos = ref([]),
	objetivosAsignados = ref([]),
	indicadorObjetivos = ref([]),
	entidades = ref([]),
	dependencias = ref([]),
	sectores = ref([]),
	especificos = ref([]),
	indicador = ref(null),
	tiposIndicador = ref(null),
	periodicidades = ref(null),
	unidades = ref(null),
	annos = ref([]),
	avance = ref({
		id: 0,
		indicadorId: 0,
		anno: null,
		mes: null,
		dato: null,
		avance: null,
		meta: null,
		meta_anterior: null,
		cumplimiento: null,
		observaciones: null,
		creadoPor: null,
		editadoPor: null,
	}),
	avance_bk = ref(Clone(avance.value)),
	tiposAcumulacion = ref(null),
	item_test = ref({
		id: 0,
		tipoIndicadorId: 1344,
		objetivoEspecificoId: 1382,
		sectorId: 1400,
		entidadId: 1172,
		tipoAcumulacionId: 1377,
		periodicidadId: 1370,
		unidadMedidaId: 1364,
		unidadMedidaOtra: null,
		nombre: "Indicador de prueba",
		formulaCalculo: "Fórmula",
		diasRezago: 3,
		fuentesInformacion:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec urna eros, lacinia eu ullamcorper a, egestas porta nulla. Donec nec est nibh, rhoncus lobortis magna.",
		serieDisponible: _config.seguimiento.anno_inicial,
		lineaBase: 65.3,
		lineaBaseFecha: "2020-02-01T05:06:49.345Z",
		lineaBaseFuente: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
		lineaBaseDescripcion:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec urna eros, lacinia eu ullamcorper a, egestas porta nulla. Donec nec est nibh, rhoncus lobortis magna.",
		metodologiaMedicion:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec urna eros, lacinia eu ullamcorper a, egestas porta nulla. Donec nec est nibh, rhoncus lobortis magna.",
		observaciones:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec urna eros, lacinia eu ullamcorper a, egestas porta nulla. Donec nec est nibh, rhoncus lobortis magna.",
		responsableNombre: "Nombre resp",
		responsableCargo: "Cargo resp",
		responsableEntidad: "Entidad resp",
		responsableDependencia: "Depen resp",
		responsableEmail: "Email resp",
		responsableTelefono: "Tel resp",
		responsableAprobacionNombre: "Apro resp",
		responsableAprobacionCargo: "Cargo resp",
		responsableAprobacionEntidad: "Entidad resp",
		fichaAprobada: false,
		fichaAprobadaEl: null,
		activo: null,
		creadoEl: null,
		creadoPor: null,
		editadoEl: null,
		editadoPor: null,
		descripcion:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec urna eros, lacinia eu ullamcorper a, egestas porta nulla. Donec nec est nibh, rhoncus lobortis magna.",
		areaId: 1331,
		padreId: null,
		objetivoId: 1341,
	}),
	item = ref({
		id: 0,
		tipoIndicadorId: null,
		objetivoEspecificoId: null,
		sectorId: null,
		entidadId: null,
		tipoAcumulacionId: null,
		periodicidadId: null,
		unidadMedidaId: null,
		unidadMedidaOtra: null,
		nombre: null,
		formulaCalculo: null,
		diasRezago: null,
		fuentesInformacion: null,
		serieDisponible: null,
		lineaBase: null,
		lineaBaseFecha: null,
		lineaBaseFuente: null,
		lineaBaseDescripcion: null,
		metodologiaMedicion: null,
		observaciones: null,
		responsableNombre: null,
		responsableCargo: null,
		responsableEntidad: null,
		responsableDependencia: null,
		responsableEmail: null,
		responsableTelefono: null,
		responsableAprobacionNombre: null,
		responsableAprobacionCargo: null,
		responsableAprobacionEntidad: null,
		fichaAprobada: false,
		fichaAprobadaEl: null,
		activo: null,
		creadoEl: null,
		creadoPor: null,
		editadoEl: null,
		editadoPor: null,
	}),
	item_copy = Clone(item.value),
	date_focus_in = (e) => {
		e.component.open();
	},
	date_focus_out = (e) => {
		e.component.close();
	},
	panelData = null,
	panelGrid = null,
	panelAvance = null,
	dxStore = DxStore({
		key: ["id"],
		userData: JSON.stringify({ esAdmin: auth.esAdmin, companyId: auth.user.companyId, dependenceId: auth.user.dependenceId }),
		endPoint: "indicador/dx",
		onLoading: function (loadOptions) {
			$("#grid").lock("Cargando");
			console.log("loadOptions =>", loadOptions);
			console.log("onLoading");
		},
		onLoaded: function (results, baseEntity) {
			console.log("results", results);
			console.log("onLoaded!");
			$("#grid").unlock();
			$("#data").unlock();
		},
	}),
	itemSelected = async (e) => {
		// console.clear();
		console.log(_sep);
		objetivosAsignados.value = [];
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
		// console.clear();
		console.log(_sep);
		console.log("itemSelected =>", e);
		console.log("metas =>", metas);
		let anno = e.value;
		console.log("anno =>", anno);
		avance.value.mes = null;
		let meta = metas.find((o) => o.anno == anno);
		console.log("meta =>", meta);
		avance.value.meta = typeof meta != "undefined" ? meta.meta : null;
		let meta_anterior = metas.find((o) => o.anno == anno - 1);
		console.log("meta_anterior =>", meta_anterior);
		console.log("indicador =>", indicador);
		avance.value.meta_anterior = typeof meta_anterior != "undefined" ? meta_anterior.meta : null;
		// 202210272102: Ajusta selector de meses
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
	mesChanged = async (e) => {
		// console.clear();
		console.log(_sep);
		console.log("itemSelected =>", e);
		console.log("avances =>", avances);
		console.log("avance =>", avance.value);
		let anno = avance.value.anno;
		console.log("anno =>", anno);
		let mes = e.value;
		console.log("mes =>", mes);
		let av = avances.find((o) => o.anno == anno && o.mes == mes);
		if (av != null) {
			avance.value.id = av.id;
			avance.value.dato = av.dato;
			avance.value.cumplimiento = av.cumplimiento;
			avance.value.observaciones = av.observaciones;
		} else {
			avance.value.id = 0;
			avance.value.dato = null;
			avance.value.cumplimiento = null;
			avance.value.observaciones = null;
		}
		console.log("avance =>", av);
	},
	obtenerCumplimiento = async (e) => {
		// console.clear();
		console.log(_sep);
		console.log("e =>", e);
		console.log("indicador =>", toRaw(indicador.value));
		let cumplimiento = await storeIndicador.cumplimientoObtener(toRaw(indicador.value), toRaw(avance.value));
		avance.value.cumplimiento = cumplimiento;
		console.log("cumplimiento =>", cumplimiento);
	},
	customizeColumns = (columns) => {
		// console.log("customizeColumns!");
		// columns[0].width = 70;
	},
	setSeries = (item, value) => {
		const f = typeof value !== "undefined" ? value : "";
		const h = `<div class="form-group"><label>${item}</label><input type="text" nonrequired="true" id="{criteria}-${item}" name="{criteria}-${item}" value="${f}" class="form-control"></div>`;
		$("#series").append(h.replaceAll("{criteria}", "serie"));
	},
	setSerie = (e) => {
		// console.clear();
		let v = e.value;
		if (v !== null) {
			let id = $(e.element).attr("id");
			console.log("v =>", v);
			console.log("id =>", id);
			let y = parseInt(id.split("-")[1]);
			console.log("año =>", y);
			let finded = false;
			let arr = id.contains("serie-") ? series : metas;
			for (let index = 0; index < arr.length; index++) {
				const el = arr[index];
				if (el.anno === y) {
					el.dato = v;
					el.creadoPor = auth.user.id;
					finded = true;
					break;
				}
			}
			if (!finded) {
				arr.push({
					id: 0,
					indicadorId: 0,
					anno: y,
					dato: v,
					creadoPor: auth.user.id,
				});
			}
			arr.sort((a, b) => a.anno - b.anno);
			console.log(id.contains("serie-") ? "series =>" : "metas =>", id.contains("serie-") ? series : metas);
		}
	},
	grid = null,
	onInitialized = (o) => {
		grid = o.component;
		console.log("grid =>", grid);
	},
	active = (data, state) => {
		// console.clear();
		console.log("data =>", data);
		msg.confirm({
			// title: "otro",
			textCancel: "CANCELAR",
			textOk: data.activo ? "DESACTIVAR" : "ACTIVAR",
			text: `¿Realmente desea ${data.activo ? "desactivar" : "activar"} el indicador "<span class="font-weight-semibold">${data.nombre}</span>"?`,
			onConfirm: () => {},
			onCancel: () => {},
		});
	},
	remove = (data, state) => {
		// console.clear();
		console.log("data =>", data);
		msg.confirm({
			// title: "otro",
			textCancel: "CANCELAR",
			textOk: "ELIMINAR",
			text: `¿Realmente desea eliminar al indicador ${data.name}?`,
			onConfirm: () => {},
			onCancel: () => {},
		});
	},
	avanceStart = async (data) => {
		// console.clear();
		console.log(_sep);
		indicador.value = Clone(data);
		panelGrid.lock("Cargando");
		metas = await storeIndicador.cargar("metas", indicador.value.id);
		avances = await storeIndicador.cargar("avances", indicador.value.id);
		panelGrid.fadeOut("normal", async function () {
			panelAvance.fadeIn("normal", function () {
				console.log("indicador =>", toRaw(indicador.value));
				console.log("metas =>", metas);
				panelGrid.unlock();
			});
		});
	},
	avanceCancel = async () => {
		panelAvance.fadeOut("normal", async function () {
			panelGrid.fadeIn("normal", function () {
				avanceGroup.value.instance.reset();
				avance.value = Clone(avance_bk.value);
			});
		});
	},
	avanceSave = async () => {
		console.clear();
		let result = avanceGroup.value.instance.validate();
		if (result.isValid) {
			console.log("auth.user =>", auth.user);
			avance.value.indicadorId = indicador.value.id;
			if (avance.value.id == 0) {
				avance.value.creadoPor = auth.user.id;
			} else {
				avance.value.editadoPor = auth.user.id;
			}
			console.log("enviado =>", toRaw(avance.value));
			let av = await storeIndicador.guardarAvance(toRaw(avance.value));
			console.log("gestionado =>", av);
			panelAvance.fadeOut("normal", async function () {
				panelGrid.fadeIn("normal", function () {
					avance.value = Clone(avance_bk.value);
				});
			});
		}
	},
	addStart = async (data) => {
		// console.clear();
		console.log(_sep);
		console.log("data =>", data);
		// Editando
		if (typeof data !== "undefined") {
			$("#tit-action").text("Editar indicador");
			panelGrid.lock("Cargando");
			item.value = Clone(data);
			metas = await storeIndicador.cargar("metas", item.value.id);
			series = await storeIndicador.cargar("series", item.value.id);
			indicadorObjetivos = await storeIndicador.cargar("objetivos", item.value.id);
			indicadorObjetivos.forEach((item) => {
				objetivosAsignados.value.push(item.objetivoEspecificoId);
			});
			console.log("indicadorObjetivos =>", indicadorObjetivos);
			// https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxTagBox
			tbAsignados.option("value", objetivosAsignados.value);
			// tb.blur();
			// console.log("tagBox =>", tb);
			// instance.option("value", item.meta);
			// setTimeout(async function () {}, 800);
		} else {
			$("#tit-action").text("Nuevo indicador");
			item.value = Clone(item_copy);
		}
		panelGrid.fadeOut("normal", async function () {
			console.log(typeof data);
			objGralId.value = item.value.objetivoGeneralId;
			objEspId.value = item.value.objetivoEspecificoId;
			panelData.fadeIn("normal", function () {
				console.log(_sep);
				console.log("item =>", item.value);
				panelGrid.unlock();
				let oId = objetivoIdTxtRef.value.instance;
				oId.option("value", item.value.objetivoGeneralId);
				metas.forEach((item) => {
					let instance = NumberBox.getInstance($(`#meta-${item.anno}`));
					// 202301262134: https://bobbyhadz.com/blog/javascript-cannot-read-property-of-undefined#use-the-optional-chaining--operator
					if (instance?.option) instance.option("value", item.meta);
				});
				series.forEach((item) => {
					let instance = NumberBox.getInstance($(`#serie-${item.anno}`));
					// 202301262134: https://bobbyhadz.com/blog/javascript-cannot-read-property-of-undefined#use-the-optional-chaining--operator
					if (instance?.option) instance.option("value", item.dato);
				});
			});
		});
	},
	addCancel = (cb) => {
		// console.clear();
		console.log("CANCEL!");
		panelData.fadeOut("normal", function () {
			panelData.clear();
			panelGrid.fadeIn("normal", function () {
				metas = [];
				series = [];
				item.value = Clone(item_copy);
				console.log("item =>", item);
				valGroup.value.instance.reset();
				$(".nb.dx-numberbox").each(function (index) {
					var el = $(this);
					let instance = NumberBox.getInstance(el);
					instance.reset();
					console.log("instance =>", instance);
				});
				objetivosAsignados.value = [];
				tbAsignados.option("value", []);
				if (typeof cb === "function") cb();
			});
		});
	},
	save = () => {
		// console.clear();
		let result = valGroup.value.instance.validate();
		if (!result.isValid) {
			$.scrollTo($(".dx-invalid:first"), {
				duration: 600,
				offset: -110,
			});
		} else {
			panelData.lock(`${item.id == 0 ? "Creando" : "Actualizando"} indicador`, async function (params) {
				if (item.id == 0) {
					item.value.creadoPor = auth.user.id;
				} else {
					item.value.editadoPor = auth.user.id;
				}
				console.log("item =>", item.value);
				let ind = toRaw(item.value);
				if (!ind.hasOwnProperty("password")) ind["password"] = null;
				console.log("dto =>", ind);
				let obs = [];
				objetivosAsignados.value.forEach((id) => {
					obs.push({
						IndicadorId: ind.id,
						ObjetivoEspecificoId: id,
						CreadoPor: auth.user.id,
					});
				});
				let o = await storeIndicador.guardarCompleto(ind, metas, series, obs);
				console.log("Guardado =>", o);
				addCancel(function () {
					panelData.unlock();
					grid.refresh();
				});
			});
		}
	};
onMounted(async () => {
	// console.clear();
	console.log(_sep);
	console.log("route.name =>", route.name);
	let res = await store.porTipoNombre("area_intervencion"); // Areas
	res = res.filter((o) => o.hijos > 0);
	res = res.sort((a, b) => (a.orden > b.orden ? 1 : b.orden > a.orden ? -1 : 0));
	areas.value = res;
	res = await store.porTipoNombre("sector");
	res = res.filter((o) => o.hijos > 0);
	sectores.value = res;
	entidades.value = await store.porTipoNombre("entidad");
	tiposIndicador.value = await store.porTipoNombre("tipo_indicador");
	tiposAcumulacion.value = await store.porTipoNombre("tipo_acumulacion");
	periodicidades.value = await store.porTipoNombre("periodicidad");
	unidades.value = await store.porTipoNombre("unidad_medida");

	panelData = $("#data");
	panelGrid = $("#grid");
	panelAvance = $("#avance");
	tbAsignados = TagBox.getInstance($("#tb-asignados"));
	setHelp();

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
	<div class="container content">
		<div class="card data hidden" id="avance">
			<div class="card-header main d-flex justify-content-between">
				<span>
					<i class="fa-solid fa-gears"></i>
					Administración &raquo; Indicadores &raquo; <span id="tit-action-avance">Registro de avance</span>
				</span>
			</div>
			<DxValidationGroup ref="avanceGroup">
				<div class="card-body pt-3 pb-2">
					<div class="row">
						<div class="col title bb pb-2 mb-4" v-if="indicador">
							<span class="color-main">Indicador »</span> {{ indicador.nombre }}&nbsp;<small class="color-main"
								>&raquo; Tipo acumulación: {{ indicador.tipoAcumulacionNombre }}</small
							>
						</div>
					</div>
					<div class="row">
						<div class="col-md-5">
							<div class="row">
								<div class="col-md-6 mb-2">
									<label class="tit">Año</label>
									<DxSelectBox
										id="anno"
										:data-source="annos"
										value-change-event="keyup"
										v-model="avance.anno"
										class="form-control"
										@value-changed="annoChanged"
									>
										<DxValidator>
											<DxRequiredRule />
										</DxValidator>
									</DxSelectBox>
								</div>
								<div class="col-md-6 mb-2">
									<label class="tit">Mes</label>
									<DxSelectBox
										id="mes"
										:disabled="avance.anno == null"
										:data-source="meses"
										value-change-event="keyup"
										v-model="avance.mes"
										class="form-control"
										display-expr="name"
										value-expr="value"
										@value-changed="mesChanged"
									>
										<DxValidator>
											<DxRequiredRule />
										</DxValidator>
									</DxSelectBox>
								</div>
							</div>
							<div class="row">
								<div class="col-md-4 mb-2">
									<label class="tit">Meta</label>
									<DxNumberBox
										id="meta"
										format="#,##0.##"
										value-change-event="keyup"
										v-model="avance.meta"
										class="form-control"
										:read-only="true"
										aligment="right"
									/>
								</div>
								<div class="col-md-4 mb-2">
									<label class="tit">Avance</label>
									<DxNumberBox
										id="dato"
										format="#,##0.##"
										value-change-event="keyup"
										v-model="avance.dato"
										@value-changed="obtenerCumplimiento"
										class="form-control"
										:read-only="false"
									/>
								</div>
								<div class="col-md-4 mb-2">
									<label class="tit">Cumplimiento (%)</label>
									<DxNumberBox
										id="cumplimiento"
										format="#,##0.##"
										value-change-event="keyup"
										v-model="avance.cumplimiento"
										class="form-control"
										type="decimal"
										:read-only="true"
									/>
								</div>
							</div>
						</div>
						<div class="col-md-7">
							<label class="tit">Análisis del avance</label>
							<DxTextArea
								:height="110"
								:max-length="400"
								value-change-event="keyup"
								:show-clear-button="true"
								id="descripcion"
								v-model="avance.observaciones"
								class="form-control"
								placeholder="Descripción"
							>
								<DxValidator>
									<DxRequiredRule />
								</DxValidator>
							</DxTextArea>
						</div>
					</div>

					<!-- <div class="row fs" v-if="$conf.debug">{{ avance }}<br /></div> -->
					<!-- <div class="row fs">{{ avance }}<br /></div> -->
				</div>
			</DxValidationGroup>
			<div class="card-footer">
				<div class="d-flex justify-content-between align-items-center">
					<a class="btn btn-gray" @click.prevent="avanceCancel"><i class="fa-solid fa-circle-xmark"></i>&nbsp;&nbsp;CANCELAR</a>
					<a class="btn btn-main" @click.prevent="avanceSave" v-if="avance.meta">GUARDAR&nbsp;&nbsp;<i class="fa-solid fa-floppy-disk"></i></a>
					<span v-else class="msg-alert pe-4">No hay meta para el año {{ avance.anno }}</span>
				</div>
			</div>
		</div>

		<div class="card data hidden" id="data">
			<div class="card-header main d-flex justify-content-between">
				<span>
					<i class="fa-solid fa-gears"></i>
					Administración &raquo; Indicadores &raquo; <span id="tit-action">Nuevo indicador</span>
				</span>
			</div>

			<DxValidationGroup ref="valGroup">
				<div class="card-body pt-3 pb-4">
					<div class="row fs">
						<fieldset>
							<legend>1. Información general</legend>
							<div class="row">
								<div class="col-md-12 mb-2">
									<label class="tit">Nombre</label>
									<DxTextBox id="nombre" value-change-event="keyup" :show-clear-button="true" v-model="item.nombre" class="form-control" placeholder="Nombre">
										<DxValidator>
											<DxRequiredRule />
											<DxStringLengthRule :min="3" />
										</DxValidator>
									</DxTextBox>
								</div>
								<div class="col-md-10 mb-2">
									<label class="tit">Descripción</label>
									<DxTextArea
										:height="110"
										:max-length="400"
										value-change-event="keyup"
										:show-clear-button="true"
										id="descripcion"
										v-model="item.descripcion"
										class="form-control"
										placeholder="Descripción"
									>
										<DxValidator>
											<DxRequiredRule />
										</DxValidator>
									</DxTextArea>
								</div>
								<div class="col-md-2 mb-2">
									<div class="row">
										<div class="col-md-12 mb-2">
											<label class="tit">Activo</label>
											<DxSelectBox id="activo" :data-source="$si_no" v-model="item.activo" class="form-control" display-expr="name" value-expr="value" />
										</div>
									</div>
									<div class="row">
										<div class="col-md-12 mb-2">
											<label class="tit">Ficha aprobada</label>
											<DxSelectBox
												id="fichaAprobada"
												:data-source="$si_no"
												v-model="item.fichaAprobada"
												class="form-control"
												display-expr="name"
												value-expr="value"
											/>
										</div>
									</div>
								</div>
								<div class="col-md-12 mb-1">
									<label class="tit">Área de acción</label>
									<DxSelectBox
										id="areaId"
										ref="areaIdTxtRef"
										:data-source="areas"
										:grouped="false"
										:min-search-length="3"
										:search-enabled="true"
										v-model="item.areaId"
										:show-clear-button="true"
										:show-data-before-search="true"
										class="form-control"
										@value-changed="itemSelected"
										placeholder="Área de acción"
										value-expr="id"
										display-expr="nombre"
										item-template="item"
									>
										<template #item="{ data }"> {{ data.orden }}. {{ data.nombre }} </template>
										<DxValidator>
											<DxRequiredRule />
										</DxValidator>
									</DxSelectBox>
								</div>
								<div class="col-md-12 mb-1">
									<label class="tit">Objetivo general</label>
									<DxSelectBox
										id="objetivoId"
										ref="objetivoIdTxtRef"
										:data-source="objetivos"
										:grouped="false"
										:min-search-length="3"
										:search-enabled="true"
										:show-clear-button="true"
										v-model="item.objetivoGeneralId"
										@value-changed="itemSelected"
										:show-data-before-search="true"
										class="form-control"
										display-expr="nombre"
										placeholder="Objetivo general"
										value-expr="id"
									>
										<DxValidator>
											<DxRequiredRule />
										</DxValidator>
									</DxSelectBox>
								</div>
								<div class="col-md-12 mb-1">
									<label class="tit">Objetivo(s) específico(s)</label>
									<!-- {{ objetivosAsignados }} -->
									<DxTagBox
										id="tb-asignados"
										:items="especificos"
										:show-clear-button="true"
										v-model="objetivosAsignados"
										:show-selection-controls="true"
										display-expr="nombre"
										value-expr="id"
										select-all-mode="allPages"
									>
										<DxValidator>
											<DxRequiredRule />
										</DxValidator>
									</DxTagBox>
									<!-- <DxTagBox
										:data-source="especificos"
										:grouped="false"
										:min-search-length="3"
										:search-enabled="true"
										:show-clear-button="true"
										:show-data-before-search="true"
										:show-selection-controls="true"
										apply-value-mode="useButtons"
										class="form-control"
										display-expr="nombre"
										id="especificoId"
										placeholder="Objetivo específico"
										v-model="objetivosAsignados"
										value-expr="id"
									>
										<DxValidator>
											<DxRequiredRule />
										</DxValidator>
									</DxTagBox> -->
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
							</div>
						</fieldset>

						<fieldset class="mt-3">
							<legend>2. Información de medición</legend>
							<div class="row">
								<div class="col-md-7 mb-2">
									<label class="help" title="Expresión matemática mediante la cual se calcula el valor cuantitativo del indicador.">Fórmula de cálculo</label>
									<DxTextBox
										id="formula"
										value-change-event="keyup"
										:show-clear-button="true"
										v-model="item.formulaCalculo"
										class="form-control"
										placeholder="Fórmula de cálculo"
									>
										<DxValidator>
											<DxRequiredRule />
											<DxStringLengthRule :min="3" />
										</DxValidator>
									</DxTextBox>
								</div>
								<div class="col-md-3 mb-2">
									<label
										class="help"
										title="Permite realizar la lectura de los avances, delinear adecuadamente las líneas de base y determinar las metas para cada uno de los indicadores."
										>Tipo de indicador</label
									>
									<DxSelectBox
										id="tipoIndicadorId"
										:data-source="tiposIndicador"
										:grouped="false"
										:min-search-length="3"
										:search-enabled="false"
										:show-clear-button="true"
										:show-data-before-search="true"
										v-model="item.tipoIndicadorId"
										class="form-control"
										display-expr="nombre"
										value-expr="id"
									>
										<DxValidator>
											<DxRequiredRule />
										</DxValidator>
									</DxSelectBox>
								</div>
								<div class="col-md-2 mb-2">
									<label
										class="help"
										title="Número de días, después de cumplido el Periodo de medición, que tarda la información para estar disponible y ser reportada."
										>Días de rezago</label
									>
									<DxNumberBox
										:min="0"
										:step="1"
										id="diasRezago"
										:show-spin-buttons="true"
										:show-clear-button="true"
										placeholder="Días rezago"
										value-change-event="keyup"
										v-model="item.diasRezago"
									>
										<DxValidator>
											<DxRequiredRule />
										</DxValidator>
									</DxNumberBox>
								</div>
								<div class="col-md-3 mb-2">
									<label
										class="help"
										title="Permite realizar la lectura de los avances, delinear adecuadamente las líneas de base y determinar las metas para cada uno de los indicadores."
										>Tipo de acumulación</label
									>
									<DxSelectBox
										id="tiposAcumulacionId"
										:data-source="tiposAcumulacion"
										:grouped="false"
										:min-search-length="3"
										:search-enabled="false"
										:show-clear-button="true"
										:show-data-before-search="true"
										v-model="item.tipoAcumulacionId"
										class="form-control"
										display-expr="nombre"
										value-expr="id"
									>
										<DxValidator>
											<DxRequiredRule />
										</DxValidator>
									</DxSelectBox>
								</div>
								<div class="col-md-3 mb-2">
									<label
										class="help"
										title="Frecuencia con la cual se recolecta la información de avances y a partir de la cual se realiza el reporte de avance."
										>Periodicidad de medición</label
									>
									<DxSelectBox
										id="periodicidadId"
										:data-source="periodicidades"
										:grouped="false"
										:min-search-length="3"
										:search-enabled="false"
										:show-clear-button="true"
										:show-data-before-search="true"
										v-model="item.periodicidadId"
										class="form-control"
										display-expr="nombre"
										value-expr="id"
									>
										<DxValidator>
											<DxRequiredRule />
										</DxValidator>
									</DxSelectBox>
								</div>
								<div class="col-md-4 mb-2">
									<label class="help" title="Parámetro o unidad de referencia para determinar la magnitud de medición del indicador.">Unidad de medida</label>
									<DxSelectBox
										id="tipoId"
										:data-source="unidades"
										:grouped="false"
										:min-search-length="3"
										:search-enabled="true"
										:show-clear-button="true"
										:show-data-before-search="true"
										v-model="item.unidadMedidaId"
										class="form-control"
										display-expr="nombre"
										value-expr="id"
									>
										<DxValidator>
											<DxRequiredRule />
										</DxValidator>
									</DxSelectBox>
								</div>
								<div class="col-md-2 mb-2">
									<label class="help" title="Corresponde al intervalo de años anteriores para los cuales se cuenta con información sobre el indicador."
										>Serie disponible
									</label>
									<DxTextBox
										id="serieDisponible"
										value-change-event="keyup"
										:show-clear-button="true"
										v-model="item.serieDisponible"
										class="form-control"
										placeholder="Serie Disponible"
									>
										<DxValidator>
											<DxRequiredRule />
											<DxStringLengthRule :min="4" />
										</DxValidator>
									</DxTextBox>
								</div>
								<div class="col-md-2 mb-2">
									<label
										class="help"
										title="Describe la situación previa a una intervención y con la cual es posible hacer seguimiento a una política, programa o proyecto o efectuar comparaciones relacionadas."
										>Línea de Base
									</label>
									<DxNumberBox
										id="lineaBase"
										value-change-event="keyup"
										:show-clear-button="true"
										v-model="item.lineaBase"
										class="form-control"
										placeholder="Línea de Base"
										format="#,##0.##"
									>
										<DxValidator>
											<DxRequiredRule />
										</DxValidator>
									</DxNumberBox>
								</div>
								<div class="col-md-2">
									<div class="form-group">
										<label
											class="help"
											title="Fecha del valor de la línea base, la cual debe ser una fecha previa a la intervención de política, programa o proyecto. "
											>Fecha Línea de Base</label
										>
										<DxDateBox
											id="start_date"
											@focus-in="date_focus_in"
											@focus-out="date_focus_out"
											class="form-control"
											:max="new Date()"
											v-model="item.lineaBaseFecha"
											:calendar-options="{ maxZoomLevel: 'year', minZoomLevel: 'century' }"
											display-format="MM/yyyy"
											type="date"
										>
											<!-- :calendar-options="{ maxZoomLevel: 'year', minZoomLevel: 'century' }" -->
											<!-- display-format="monthAndYear" -->
											<DxValidator>
												<DxRequiredRule />
											</DxValidator>
										</DxDateBox>
									</div>
								</div>
								<div class="col-md-8 mb-2">
									<label
										class="help"
										title="Periodo de tiempo al que corresponde el valor de la línea base. Ej.: 'El valor de la línea base corresponde a los kilómetros de red vial construida durante el año 2020.'."
										>Fuente de la línea base
									</label>
									<DxTextBox
										id="lineaBaseFuente"
										value-change-event="keyup"
										:show-clear-button="true"
										v-model="item.lineaBaseFuente"
										class="form-control"
										placeholder="Fuente de la Línea de Base"
									>
										<DxValidator>
											<DxRequiredRule />
											<DxStringLengthRule :min="4" />
										</DxValidator>
									</DxTextBox>
								</div>
								<div class="col-md-12 mb-2">
									<label
										class="help"
										title="Nombre del sistema de información o encuesta<small>(s)</small> encargada<small>(s)</small> de la producción y/o suministro de la información que se utiliza para la construcción y reporte del indicador."
										>Fuentes de información</label
									>
									<DxTextArea
										:height="80"
										:max-length="400"
										value-change-event="keyup"
										:show-clear-button="true"
										id="fuentesInformacion"
										v-model="item.fuentesInformacion"
										class="form-control"
										placeholder="Descripción"
									>
										<DxValidator>
											<DxRequiredRule />
										</DxValidator>
									</DxTextArea>
								</div>
								<div class="col-md-12 mb-2">
									<label
										class="help"
										title="Comentarios que deban tenerse en cuenta sobre el indicador, que se consideran pertinentes y que no fueron recogidos a través de las otras secciones de la ficha técnica."
										>Observaciones</label
									>
									<DxTextArea
										:height="80"
										:max-length="400"
										value-change-event="keyup"
										:show-clear-button="true"
										id="observaciones"
										v-model="item.observaciones"
										class="form-control"
										placeholder="Descripción"
									>
										<DxValidator>
											<DxRequiredRule />
										</DxValidator>
									</DxTextArea>
								</div>
							</div>
						</fieldset>

						<fieldset class="mt-3">
							<legend>3. Información histórica</legend>
							<div class="row">
								<div class="col-md-md-12">
									<div class="form-group mb-0">
										<div class="hor-scroll m-0">
											<div class="hs full" id="series">
												<div class="form-group" v-for="index in 10">
													<label class="tit">{{ index + (anno_inicial - 11) }}</label>
													<DxNumberBox
														@value-changed="setSerie"
														:id="'serie-' + (index + (anno_inicial - 11))"
														value-change-event="keyup"
														format="#,##0.##"
														:show-clear-button="true"
														class="form-control nb"
														:width="120"
														value=""
													/>
												</div>
												<!-- <div class="form-group" v-for="index in 10">
													<label class="tit">{{ index + 2011 }}</label>
													<DxNumberBox
														@value-changed="setSerie"
														:id="'serie-' + (index + 2011)"
														value-change-event="keyup"
														format="#,##0.##"
														:show-clear-button="true"
														class="form-control nb"
														:width="120"
														value=""
													/>
												</div> -->
											</div>
										</div>
									</div>
								</div>
							</div>
						</fieldset>

						<fieldset class="mt-3">
							<legend>4. Información de metas</legend>
							<div class="row">
								<div class="col-md-md-12 mb-2">
									<div class="form-group mb-0">
										<div class="hor-scroll m-0">
											<div class="hs full" id="series">
												<div class="form-group" v-for="index in anno_final - anno_inicial + 1">
													<label class="tit">{{ index + (anno_inicial - 1) }}</label>
													<DxNumberBox
														@value-changed="setSerie"
														:id="'meta-' + (index + (anno_inicial - 1))"
														value-change-event="keyup"
														format="#,##0.##"
														:show-clear-button="true"
														class="form-control nb"
														:width="130"
														value=""
													/>
												</div>
												<!-- <div class="form-group" v-for="index in 10">
													<label class="tit">{{ index + 2021 }}</label>
													<DxNumberBox
														@value-changed="setSerie"
														:id="'meta-' + (index + 2021)"
														value-change-event="keyup"
														format="#,##0.##"
														:show-clear-button="true"
														class="form-control nb"
														:width="130"
														value=""
													/>
												</div> -->
											</div>
										</div>
									</div>
								</div>
								<div class="col-md-12 mb-2">
									<label class="help" title="Información descriptiva sobre la metodología de cálculo para la proyección de metas."
										>Metodología para proyección de metas
									</label>
									<DxTextArea
										:height="80"
										:max-length="400"
										value-change-event="keyup"
										:show-clear-button="true"
										id="metodologiaMedicion"
										v-model="item.metodologiaMedicion"
										class="form-control"
										placeholder="Descripción de la metodología para proyección de metas"
									>
										<DxValidator>
											<DxRequiredRule />
										</DxValidator>
									</DxTextArea>
								</div>
							</div>
						</fieldset>

						<fieldset class="mt-3">
							<legend>5. Información de responsables</legend>
							<div class="row">
								<div class="col-md-12 mb-1 mt-2 subtit">Datos del responsable del diligenciamiento de la información en la ficha técnica y del reporte:</div>
								<div class="col-md-4 mb-2">
									<label class="tit">Nombre </label>
									<DxTextBox
										id="responsableNombre"
										value-change-event="keyup"
										:show-clear-button="true"
										v-model="item.responsableNombre"
										class="form-control"
										placeholder="Nombre del responsable"
									>
										<DxValidator>
											<DxRequiredRule />
											<DxStringLengthRule :min="4" />
										</DxValidator>
									</DxTextBox>
								</div>
								<div class="col-md-4 mb-2">
									<label class="tit">Cargo</label>
									<DxTextBox
										id="responsableCargo"
										value-change-event="keyup"
										:show-clear-button="true"
										v-model="item.responsableCargo"
										class="form-control"
										placeholder="Cargo del responsable"
									>
										<DxValidator>
											<DxRequiredRule />
											<DxStringLengthRule :min="4" />
										</DxValidator>
									</DxTextBox>
								</div>
								<div class="col-md-4 mb-2">
									<label class="tit">Entidad</label>
									<DxTextBox
										id="responsableEntidad"
										value-change-event="keyup"
										:show-clear-button="true"
										v-model="item.responsableEntidad"
										class="form-control"
										placeholder="Entidad del responsable"
									>
										<DxValidator>
											<DxRequiredRule />
											<DxStringLengthRule :min="4" />
										</DxValidator>
									</DxTextBox>
								</div>
								<div class="col-md-4 mb-2">
									<label class="tit">Dependencia</label>
									<DxTextBox
										id="responsableDependencia"
										value-change-event="keyup"
										:show-clear-button="true"
										v-model="item.responsableDependencia"
										class="form-control"
										placeholder="Dependencia del responsable"
									>
										<DxValidator>
											<DxRequiredRule />
											<DxStringLengthRule :min="4" />
										</DxValidator>
									</DxTextBox>
								</div>
								<div class="col-md-4 mb-2">
									<label class="tit">Email</label>
									<DxTextBox
										id="responsableEmail"
										value-change-event="keyup"
										:show-clear-button="true"
										v-model="item.responsableEmail"
										class="form-control"
										placeholder="Email del responsable"
									>
										<DxValidator>
											<DxRequiredRule />
											<DxStringLengthRule :min="4" />
										</DxValidator>
									</DxTextBox>
								</div>
								<div class="col-md-4 mb-2">
									<label class="tit">Telefono</label>
									<DxTextBox
										id="responsableTelefono"
										value-change-event="keyup"
										:show-clear-button="true"
										v-model="item.responsableTelefono"
										class="form-control"
										placeholder="Telefono del responsable"
									>
										<DxValidator>
											<DxRequiredRule />
											<DxStringLengthRule :min="4" />
										</DxValidator>
									</DxTextBox>
								</div>
								<div class="col-md-12 mb-0 mt-4 subtit">Datos del Director Técnico de la dependencia responsable de la aprobación de la ficha:</div>

								<div class="col-md-4 mb-2">
									<label class="tit">Nombre </label>
									<DxTextBox
										id="responsableAprobacionNombre"
										value-change-event="keyup"
										:show-clear-button="true"
										v-model="item.responsableAprobacionNombre"
										class="form-control"
										placeholder="Nombre del responsable de aprobación"
									>
										<DxValidator>
											<DxRequiredRule />
											<DxStringLengthRule :min="4" />
										</DxValidator>
									</DxTextBox>
								</div>
								<div class="col-md-4 mb-2">
									<label class="tit">Cargo</label>
									<DxTextBox
										id="responsableAprobacionCargo"
										value-change-event="keyup"
										:show-clear-button="true"
										v-model="item.responsableAprobacionCargo"
										class="form-control"
										placeholder="Cargo del responsable de aprobación"
									>
										<DxValidator>
											<DxRequiredRule />
											<DxStringLengthRule :min="4" />
										</DxValidator>
									</DxTextBox>
								</div>
								<div class="col-md-4 mb-2">
									<label class="tit">Entidad</label>
									<DxTextBox
										id="responsableAprobacionEntidad"
										value-change-event="keyup"
										:show-clear-button="true"
										v-model="item.responsableAprobacionEntidad"
										class="form-control"
										placeholder="Entidad del responsable de aprobación"
									>
										<DxValidator>
											<DxRequiredRule />
											<DxStringLengthRule :min="4" />
										</DxValidator>
									</DxTextBox>
								</div>
							</div>
							<div class="row">
								<div class="col-md-md-12 mb-2"></div>
							</div>
						</fieldset>
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
			<div class="card-header main d-flex justify-content-between" v-if="route.name == 'reporte-indicador'">
				<span>
					<i class="fa-solid fa-pen-to-square me-2"></i>
					Reportar avance&nbsp;&nbsp;&nbsp;&raquo;&nbsp;&nbsp;&nbsp;Indicador
				</span>
			</div>
			<div class="card-header main d-flex justify-content-between" v-else>
				<span>
					<i class="fa-solid fa-gears"></i>
					Administración&nbsp;&nbsp;&nbsp;&raquo;&nbsp;&nbsp;&nbsp;Indicadores
				</span>
				<span>
					<button type="button" class="btn btn-trans" @click.prevent="addStart()" title="Nuevo"><i class="fa-solid fa-square-plus"></i>NUEVO</button>
				</span>
			</div>

			<div class="card-body pt-3 pb-4">
				<div class="row">
					<div class="col">
						<!-- <h2 class="font-weight-normal text-7 mb-1 color-main"><strong class="font-weight-semibold">Indicadores</strong> Principal o Interna</h2> -->
						<!-- <DxDataGrid id="gridContainer" :customize-columns="customizeColumns" :data-source="dxStore" key-expr="id" :show-borders="true"></DxDataGrid> -->
						<DxDataGrid
							:customize-columns="customizeColumns"
							:data-source="dxStore"
							:hover-state-enabled="true"
							:remote-operations="true"
							:row-alternation-enabled="true"
							:show-borders="false"
							:word-wrap-enabled="false"
							id="gridContainer"
							@initialized="onInitialized"
						>
							<DxColumnChooser :enabled="true" mode="dragAndDrop" />
							<DxExport :enabled="false" />
							<DxFilterRow :visible="false" />
							<DxGrouping :auto-expand-all="true" />
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
								:show-page-size-selector="false"
								:show-navigation-buttons="true"
								:allowed-page-sizes="[15, 50, 'Todos']"
								info-text="{2} Indicadores (página {0} de {1})"
							/>
							<DxColumn data-field="areaId" caption="Area Id" :visible="false" />
							<DxColumn data-field="areaNombre" caption="Area" :visible="true" :group-index="0" />
							<DxColumn data-field="objetivoGeneralId" caption="Objetivo General Id" :visible="false" />
							<DxColumn data-field="objetivoGeneralNombre" caption="Objetivo General" :visible="true" :group-index="1" />
							<!-- <DxColumn data-field="objetivoEspecificoId" caption="Objetivo Especifico Id" :visible="false" /> -->
							<!-- <DxColumn data-field="objetivoEspecificoNombre" caption="Objetivo Especifico" :visible="true" :group-index="2" /> -->
							<DxColumn data-field="sectorId" caption="SectorId" :visible="false" />
							<DxColumn data-field="sectorNombre" caption="SectorNombre" :visible="false" />
							<DxColumn data-field="entidadId" caption="EntidadId" :visible="false" />
							<DxColumn data-field="entidadNombre" caption="EntidadNombre" :visible="false" />
							<DxColumn data-field="tipoAcumulacionId" caption="TipoAcumulacionId" :visible="false" />
							<DxColumn data-field="tipoAcumulacionNombre" caption="TipoAcumulacionNombre" :visible="false" />
							<DxColumn data-field="periodicidadId" caption="PeriodicidadId" :visible="false" />
							<DxColumn data-field="periodicidadNombre" caption="PeriodicidadNombre" :visible="false" />
							<DxColumn data-field="unidadMedidaId" caption="UnidadMedidaId" :visible="false" />
							<DxColumn data-field="unidadMedidaNombre" caption="UnidadMedidaNombre" :visible="false" />
							<DxColumn data-field="unidadMedidaOtra" caption="UnidadMedidaOtra" :visible="false" />
							<DxColumn data-field="id" caption="Id" :visible="true" :width="60" aligment="center" />
							<DxColumn data-field="nombre" caption="Nombre" :visible="true" width="100%" />
							<DxColumn data-field="tipoIndicadorId" caption="TipoIndicadorId" :visible="false" />
							<DxColumn data-field="tipoIndicadorNombre" caption="Tipo Indicador" :visible="false" />
							<DxColumn data-field="formulaCalculo" caption="FormulaCalculo" :visible="false" />
							<DxColumn data-field="diasRezago" caption="DiasRezago" :visible="false" />
							<DxColumn data-field="fuentesInformacion" caption="FuentesInformacion" :visible="false" />
							<DxColumn data-field="serieDisponible" caption="SerieDisponible" :visible="false" />
							<DxColumn data-field="lineaBase" caption="LineaBase" :visible="false" />
							<DxColumn data-field="lineaBaseFecha" caption="LineaBaseFecha" :visible="false" />
							<DxColumn data-field="lineaBaseFuente" caption="LineaBaseFuente" :visible="false" />
							<DxColumn data-field="lineaBaseDescripcion" caption="LineaBaseDescripcion" :visible="false" />
							<DxColumn data-field="metodologiaMedicion" caption="MetodologiaMedicion" :visible="false" />
							<DxColumn data-field="Observaciones" caption="Observaciones" :visible="false" />
							<DxColumn data-field="responsableNombre" caption="responsableNombre" :visible="false" />
							<DxColumn data-field="responsableCargo" caption="responsableCargo" :visible="false" />
							<DxColumn data-field="responsableEntidad" caption="responsableEntidad" :visible="false" />
							<DxColumn data-field="responsableDependencia" caption="responsableDependencia" :visible="false" />
							<DxColumn data-field="responsableEmail" caption="responsableEmail" :visible="false" />
							<DxColumn data-field="responsableTelefono" caption="responsableTelefono" :visible="false" />
							<DxColumn data-field="responsableAprobacionNombre" caption="responsableAprobacionNombre" :visible="false" />
							<DxColumn data-field="responsableAprobacionCargo" caption="responsableAprobacionCargo" :visible="false" />
							<DxColumn data-field="responsableAprobacionEntidad" caption="responsableAprobacionEntidad" :visible="false" />
							<DxColumn data-field="fichaAprobada" caption="FichaAprobada" :visible="false" />
							<DxColumn data-field="fichaAprobadaEl" caption="FichaAprobadaEl" :visible="false" />
							<DxColumn data-field="avanceDato" caption="AvanceDato" :visible="false" />
							<DxColumn data-field="avanceFecha" caption="AvanceFecha" :visible="false" />
							<DxColumn data-field="avancePorcentaje" caption="AvancePorcentaje" :visible="false" />
							<DxColumn data-field="cumplimientoPorcentaje" caption="CumplimientoPorcentaje" :visible="false" />
							<DxColumn data-field="numeroMetas" caption="Metas" :visible="false" :width="100" />
							<DxColumn data-field="numeroAvances" caption="NumeroAvances" :visible="false" />
							<DxColumn data-field="activo" caption="Activo" :visible="false" />
							<DxColumn data-field="creadoEl" caption="CreadoEl" :visible="false" />
							<DxColumn data-field="creadoPor" caption="CreadoPor" :visible="false" />
							<DxColumn data-field="creadoPorNombre" caption="CreadoPorNombre" :visible="false" />
							<DxColumn data-field="editadoEl" caption="EditadoEl" :visible="false" />
							<DxColumn data-field="editadoPor" caption="EditadoPor" :visible="false" />
							<DxColumn data-field="editadoPorNombre" caption="EditadoPorNombre" :visible="false" />
							<DxColumn :width="auth.esAdmin ? 100 : 50" alignment="center" cell-template="tpl" caption="" name="cmds" :fixed="true" fixed-position="right" />
							<template #tpl="{ data }">
								<span class="cmds" v-if="auth.esAdmin">
									<a title="Registrar avance en indicador" class="cmd-item color-main-600 me-2" @click.prevent="avanceStart(data.data)" href="#">
										<i class="fa-regular fa-square-plus fa-lg"></i>
									</a>
									<a v-if="data.data.activo" title="Desactivar indicador" class="cmd-item color-main-600" @click.prevent="active(data.data, false)" href="#">
										<i class="fa-regular fa-square-check fa-lg"></i>
									</a>
									<a v-else title="Activar indicador" class="cmd-item color-main-600" @click.prevent="active(data.data, true)" href="#">
										<i class="fa-regular fa-square-minus fa-lg"></i>
									</a>
									<a title="Editar indicador" class="cmd-item color-main-600 me-2" @click.prevent="addStart(data.data)" href="#">
										<i class="fa-solid fa-pen-to-square fa-lg"></i>
									</a>
								</span>
								<span class="cmds" v-else>
									<a title="Registrar avance en indicador" class="cmd-item color-main-600" @click.prevent="avanceStart(data.data)" href="#">
										<i class="fa-regular fa-square-plus fa-lg"></i>
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
				<span class="font-weight-semibold">item:</span> {{ item }}<br /><span class="font-weight-semibold">item_copy:</span> {{ item_copy }}
			</div>
		</div>
	</div>
</template>
