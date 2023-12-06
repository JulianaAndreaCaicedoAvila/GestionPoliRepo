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
		<div class="card mb-4">
			<div class="card-header main"><i class="fa-solid fa-chart-simple me-2"></i> Cifras clave</div>
			<div class="card-body pt-3 pb-2">
				<div class="row pt-3 pb-4">
					<div class="col">
						<div class="mb-2 text-center cifra" @click.prevent="detailClick('gen')">
							<div class="tit">Productos</div>
							<div class="num">8</div>
						</div>
					</div>
					<div class="col">
						<div class="mb-2 text-center cifra" @click.prevent="detailClick('gen')">
							<div class="tit">Núcleos</div>
							<div class="num">16</div>
						</div>
					</div>
					<div class="col">
						<div class="mb-2 text-center cifra" @click.prevent="detailClick('esp')">
							<div class="tit">Programas</div>
							<div class="num">40</div>
						</div>
					</div>
					<div class="col">
						<div class="mb-2 text-center cifra" @click.prevent="detailClick('acc')">
							<div class="tit">Objetivos</div>
							<div class="num">54</div>
						</div>
					</div>
					<div class="col">
						<div class="mb-2 text-center cifra" @click.prevent="detailClick('acc')">
							<div class="tit">Indicadores</div>
							<div class="num">83</div>
						</div>
					</div>
					<div class="col">
						<div class="mb-2 text-center cifra" @click.prevent="detailClick('acc')">
							<div class="tit">Temas</div>
							<div class="num">17</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="card mb-4">
			<div class="card-header main"><i class="fa-solid fa-chart-simple me-2"></i> Avances por Núcleo</div>
			<div class="card-body pt-3 pb-2">
				<div class="row">
					<div v-for="item in avancesAreas" @click.prevent="areaClick(item)"
						:title="'Observar detalles de ' + item.nombre"
						class="col-lg-3 col-md-6 col-sm-12 mb-3 pb-3 mt-4 text-center active">
						<DxCircularGauge :value="item.avance" class="chart-gauge">
							<DxRangeContainer :width="0" />
							<DxGeometry :start-angle="180" :end-angle="360" />
							<DxValueIndicator type="rangeBar" :color="getColor(item.avance)" background-color="#EBEBEB" :offset="-10"
								:size="15" />
						</DxCircularGauge>
						<h5 class="item-title text-center p-0 m-0 mt-2">{{ item.orden }}. {{ item.nombre }}</h5>
						<span class="item-avance">{{ item.avance }}</span>
					</div>
				</div>
			</div>
		</div>
		<div class="card mb-4">
			<div class="card-header main"><i class="fa-solid fa-chart-simple me-2"></i> Avances por indicador</div>
			<div class="card-body pt-3 pb-2">
				<div class="row">
					<div class="col-lg-6 col-md-12 mb-4 mt-4" v-for="item in indicadoresGenerales">
						<DxChart class="chart-ind" :data-source="item.resultados" width="100%">
							<DxTooltip :enabled="true" :shared="true" :customize-tooltip="customizeTooltip" />
							<DxLegend :visible="true" vertical-alignment="top" horizontal-alignment="right"
								item-text-position="bottom" />
							<DxSeries argument-field="anno" value-field="avance" type="bar" name="Avance" :color="mainColor" />
							<DxSeries argument-field="anno" value-field="meta" type="line" name="Meta" color="#F5AE36" />
							<!-- <DxSeries argument-field="anno" value-field="lineaBase" type="line" name="Línea base" color="#edd312" /> -->
							<DxValueAxis>
								<DxConstantLine :value="item.lineaBase" :width="3" color="#0c497a" dash-style="line"
									:display-behind-series="false" :extend-axis="false">
									<DxLabel :visible="true" :customize-text="customizeLabel"
										display-format="<b>Línea de base:</b> {valueText}" />
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
