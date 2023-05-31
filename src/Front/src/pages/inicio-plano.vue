<script setup>
import { onMounted } from "vue";
import DxStore from "@/utils/dx";
import { useRouter } from "vue-router";
import Intro from "@/components/global/intro.vue";
import { avancesAreas, indicadoresGenerales } from "@/assets/js/data";
import { useClasificadorStore } from "@/stores";
import {
	DxArgumentAxis,
	DxChart,
	DxCommonSeriesSettings,
	DxConnector,
	DxConstantLine,
	DxLabel,
	DxLegend,
	DxStrip,
	DxSeries,
	DxTooltip,
	DxValueAxis,
} from "devextreme-vue/chart";
import { DxCircularGauge, DxGeometry, DxRangeContainer, DxValueIndicator } from "devextreme-vue/circular-gauge";
import { DxSelectBox, DxTextBox, DxTagBox, DxDateBox, DxNumberBox, DxTextArea, DxValidationGroup } from "devextreme-vue";
import {
	DxColumn,
	DxColumnChooser,
	DxDataGrid,
	DxExport,
	DxFilterRow,
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
const store = useClasificadorStore();
const router = useRouter();
let mainColor = "#7390da",
	getColor = (avance) => {
		if (avance >= 0 && avance <= 30) {
			return "#C0392B";
		} else if (avance > 30 && avance <= 70) {
			return "#F5AE36";
		} else {
			return "#00B000";
		}
	},
	dxStore = DxStore({
		key: ["id"],
		userData: "",
		endPoint: "indicador/dx",
		onLoading: function (loadOptions) {
			$("#grid").lock("Cargando");
			console.log("loadOptions =>", loadOptions);
			console.log("onLoading");
		},
		onLoaded: function (results, baseEntity) {
			console.log("results", results);
			console.log("onLoaded!");
			// $("#grid").unlock();
			// $("#data").unlock();
		},
	}),
	customizeColumns = (e) => {
		console.log("e =>", e);
	},
	onInitialized = (e) => {
		console.log("e =>", e);
	},
	rdn = (rowData, e) => {
		return rdnBetween(50, 500);
		// return "kiki";
	},
	rdnPercent = (rowData, e) => {
		return rdnBetween(5, 99) + "%";
	},
	resize = () => {
		setTimeout(function () {
			// console.clear();
			console.log(new Date());
			// 202211180147: https://snippets.aktagon.com/snippets/310-positioning-an-element-over-another-element-with-jquery
			$(".item-avance").each(function () {
				var el = $(this);
				el.text(el.text().replace(".", ","));
				var chart = el.parent().find(".chart-gauge:first");
				var position = chart.position();
				var x = position.left;
				var y = position.top;
				x -= el.outerWidth() / 2 - chart.outerWidth() / 2;
				y += chart.outerHeight() / 2 + 10;
				el.css({
					position: "absolute",
					zIndex: 5000,
					top: y,
					left: x,
				});
				console.log("el =>", el);
				console.log("parent =>", chart);
				// el.remove();
				el.fadeIn();
			});
		}, 100);
	},
	areaClick = (area) => {
		console.log(_sep);
		console.log("area =>", area);
		// 202212021247: https://router.vuejs.org/guide/essentials/navigation.html
		router.push(`/area/${area.id}`);
		// router.push({ name: "area", params: { id: area.id } });
	},
	detailClick = (e, i) => {
		// console.clear();
		console.log("e =>", e);
		console.log("i =>", i);
		router.push(`/accion`);
		// router.push(`/accion/${area.id}`);
		// router.push({ name: route });
	},
	customizeLabel = (pointInfo) => {
		// console.clear();
		console.log("Label =>", pointInfo);
		return "Diego";
	},
	customizeTooltip = (pointInfo) => {
		// console.clear();
		console.log("pointInfo =>", pointInfo);
		let avance = pointInfo.points.find((o) => o.seriesName == "Avance");
		let meta = pointInfo.points.find((o) => o.seriesName == "Meta");
		// let lineaBase = pointInfo.points.find((o) => o.seriesName == "Línea base");
		// console.log("avance =>", avance);
		// console.log("meta =>", meta);
		let txt = "<strong style='margin-bottom:10px;'>Año:</strong> " + pointInfo.argument;
		txt += "\n<strong>Meta:</strong> " + meta.value;
		txt += "\n<strong>Avance:</strong> " + avance.value;
		// txt += "\n<strong>Línea de base:</strong> " + lineaBase.value;
		return { text: txt };
	};
onMounted(() => {
	$(window).resize(resize);
	resize();
});
</script>
<template>
	<div class="container pt-2 pb-2 content">
		<Intro />
		<div class="card mb-4">
			<!-- <div class="card-header main"><i class="fa-solid fa-chart-simple me-2"></i> Items</div> -->
			<div class="card-body pt-3 pb-2">
				<div class="row pt-3 pb-4">
					<div class="col-md-3">
						<div class="mb-2 text-center cifra" @click.prevent="detailClick('gen')">
							<div class="tit">Áreas de acción</div>
							<div class="num">8</div>
						</div>
					</div>
					<div class="col-md-3">
						<div class="mb-2 text-center cifra" @click.prevent="detailClick('gen')">
							<div class="tit">Objetivos generales</div>
							<div class="num">16</div>
						</div>
					</div>
					<div class="col-md-3">
						<div class="mb-2 text-center cifra" @click.prevent="detailClick('esp')">
							<div class="tit">Objetivos específicos</div>
							<div class="num">40</div>
						</div>
					</div>
					<div class="col-md-3">
						<div class="mb-2 text-center cifra" @click.prevent="detailClick('acc')">
							<div class="tit">Acciones</div>
							<div class="num">154</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="card mb-4">
			<div class="card-header main"><i class="fa-solid fa-chart-simple me-2"></i> Avances por Áreas de Acción</div>
			<div class="card-body pt-3 pb-2">
				<div class="row">
					<div
						v-for="item in avancesAreas"
						@click.prevent="areaClick(item)"
						:title="'Observar detalles de ' + item.nombre"
						class="col-lg-3 col-md-6 col-sm-12 mb-3 pb-3 mt-4 text-center active"
					>
						<DxCircularGauge :value="item.avance" class="chart-gauge">
							<DxRangeContainer :width="0" />
							<DxGeometry :start-angle="180" :end-angle="360" />
							<DxValueIndicator type="rangeBar" :color="getColor(item.avance)" background-color="#EBEBEB" :offset="-10" :size="15" />
						</DxCircularGauge>
						<h5 class="item-title text-center p-0 m-0 mt-2">{{ item.orden }}. {{ item.nombre }}</h5>
						<span class="item-avance">{{ item.avance }}</span>
					</div>
				</div>
			</div>
		</div>
		<div class="card mb-4">
			<div class="card-header main"><i class="fa-solid fa-chart-simple me-2"></i> Avances por Indicadores de Resultado General</div>
			<div class="card-body pt-3 pb-2">
				<div class="row">
					<div class="col-lg-6 col-md-12 mb-4 mt-4" v-for="item in indicadoresGenerales">
						<DxChart class="chart-ind" :data-source="item.resultados" width="100%">
							<DxTooltip :enabled="true" :shared="true" :customize-tooltip="customizeTooltip" />
							<DxLegend :visible="true" vertical-alignment="top" horizontal-alignment="right" item-text-position="bottom" />
							<DxSeries argument-field="anno" value-field="avance" type="bar" name="Avance" :color="mainColor" />
							<DxSeries argument-field="anno" value-field="meta" type="line" name="Meta" color="#F5AE36" />
							<!-- <DxSeries argument-field="anno" value-field="lineaBase" type="line" name="Línea base" color="#edd312" /> -->
							<DxValueAxis>
								<DxConstantLine :value="item.lineaBase" :width="3" color="#0c497a" dash-style="line" :display-behind-series="false" :extend-axis="false">
									<DxLabel :visible="true" :customize-text="customizeLabel" display-format="<b>Línea de base:</b> {valueText}" />
								</DxConstantLine>
								<!-- <DxConstantLine :value="item.lineaBase" :width="3" color="#edd312" dash-style="line" :display-behind-series="false" :extend-axis="false">
									<DxLabel display-format="<b>Línea de base:</b> {valueText}" :visible="true" :customize-text="customizeLabel" background-color="blue">
										<DxConnector :visible="true"
									/></DxLabel>
								</DxConstantLine> -->
								<!-- <DxStrip :start-value="40" :end-value="50" color="blue" /> -->
							</DxValueAxis>
							<DxCommonSeriesSettings>
								<DxLabel :visible="false" format="thousands" display-format="{seriesName}: {valueText}" />
							</DxCommonSeriesSettings>
						</DxChart>
						<h5 class="text-center p-0 m-0 mt-2">{{ item.nombre }}</h5>
					</div>
				</div>
			</div>
		</div>
		<div class="card mb-4">
			<div class="card-header main"><i class="fa-solid fa-chart-simple me-2"></i> Avances por Indicadores de Resultado Intermedio y Producto</div>
			<div class="card-body pt-3 pb-2">
				<div class="row">
					<div class="col-lg-12 col-md-12 mb-4 mt-2 pt-0">
						<DxDataGrid
							:customize-columns="customizeColumns"
							:data-source="dxStore"
							:hover-state-enabled="true"
							:remote-operations="true"
							:row-alternation-enabled="true"
							:show-borders="false"
							:word-wrap-enabled="true"
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
							<DxPaging :page-size="10" />
							<DxPager
								:visible="true"
								:show-info="true"
								:show-page-size-selector="true"
								:show-navigation-buttons="true"
								:allowed-page-sizes="[10, 30, 50, 'Todos']"
								info-text="{2} indicadores (página {0} de {1})"
							/>
							<DxColumn data-field="areaId" caption="Area Id" :visible="false" />
							<DxColumn data-field="areaNombre" caption="Area" :visible="false" />
							<DxColumn data-field="objetivoGeneralId" caption="Objetivo General Id" :visible="false" />
							<DxColumn data-field="objetivoGeneralNombre" caption="Objetivo General" :visible="false" />
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
							<DxColumn :width="100" alignment="center" :calculate-cell-value="rdn" caption="Meta 2022" name="meta" />
							<DxColumn :width="100" alignment="center" :calculate-cell-value="rdn" caption="Avance 2022" name="avance" />
							<DxColumn :width="100" alignment="center" :calculate-cell-value="rdnPercent" caption="% avance 2022" name="resultado" />
							<!-- <DxColumn :width="100" alignment="center" :calculate-cell-value="rdn" caption="Meta periodo" name="meta" />
							<DxColumn :width="100" alignment="center" :calculate-cell-value="rdn" caption="Avance periodo" name="avance" />
							<DxColumn :width="100" alignment="center" :calculate-cell-value="rdnPercent" caption="% avance periodo" name="resultado" /> -->

							<!-- <DxColumn :width="100" alignment="center" cell-template="tpl" caption="" name="cmds" :fixed="true" fixed-position="right" /> -->
							<!-- <template #tpl="{ data }">
								<span class="cmds">
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
									<a title="Eliminar" class="cmd-item color-main-600 me-2" @click.prevent="remove(data.data)" href="#">
										<i class="fa-regular fa-trash-can fa-lg"></i>
									</a>
								</span>
							</template> -->
						</DxDataGrid>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<style lang="scss">
.chart-ind {
	height: 150px;
}
.chart-gauge {
	height: 100px;
}
.item-avance {
	display: none;
	font-size: 2.4rem;
	font-weight: 400;
	letter-spacing: -3px;
	position: absolute;
	left: 0;
	top: -40px;
	// color: #3366cc;
	color: rgb(58, 58, 58);
	&::after {
		content: "%";
		font-size: 1.3rem;
		margin-left: 0.3rem;
	}
}
</style>
