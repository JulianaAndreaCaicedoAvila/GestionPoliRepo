<script setup>
import { onMounted, ref, toRaw } from "vue";
import { useIndicadorStore } from "@/stores";
import { DxChart, DxValueAxis, DxConstantLine, DxArgumentAxis, DxCommonSeriesSettings, DxLabel, DxLegend, DxSeries, DxTooltip } from "devextreme-vue/chart";
const store = useIndicadorStore();
let mainColor = "#7390da",
	items = ref([]),
	props = defineProps({
		showInfo: { type: Boolean, default: true, required: false },
		description: { type: String, default: "Something", required: false },
	}),
	customizeTooltip = (pointInfo) => {
		console.log("pointInfo =>", pointInfo);
		let avance = pointInfo.points.find((o) => o.seriesName == "Avance");
		let meta = pointInfo.points.find((o) => o.seriesName == "Meta");
		let txt = "<strong style='margin-bottom:10px;'>Año:</strong> " + pointInfo.argument;
		txt += "\n<strong>Meta:</strong> " + meta.value;
		txt += "\n<strong>Avance:</strong> " + avance.value;
		return { text: txt };
	},
	customizeLabel = (pointInfo) => {
		// console.clear();
		console.log("Label =>", pointInfo);
		return "Diego";
	},
	onPointClick = (target) => {
		console.clear();
		console.log(target);
		// if (this.isFirstLevel) {
		// 	this.isFirstLevel = false;
		// 	this.dataSource = service.filterData(target.originalArgument);
		// }
	};
onMounted(async () => {
	// console.clear();
	console.log("store =>", store);
	// 	{ "id": 1343, "name": "general" },
	// { "id": 1344, "name": "producto" },
	// { "id": 1345, "name": "resultado_intermedio" }
	items.value = await store.avancesPorTipo("general");
	console.log("items =>", toRaw(items.value));
});
</script>
<template>
	<Transition>
		<div v-if="items.length > 0" class="card mb-4">
			<div class="card-header main"><i class="fa-solid fa-chart-simple me-2"></i> Avances por Indicadores de Resultado General</div>
			<div class="card-body pt-3 pb-2">
				<div class="row d-flex justify-content-center">
					<div class="col-lg-6 col-md-12 mb-4 mt-4" v-for="item in items">
						<DxChart class="chart-ind" :data-source="item.avances" width="100%" @point-click="onPointClick">
							<!-- https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxChart/Configuration/argumentAxis/ -->
							<DxArgumentAxis :allow-decimals="false">
								<DxLabel overlapping-behavior="stagger" />
							</DxArgumentAxis>
							<DxTooltip :enabled="true" :shared="true" :customize-tooltip="customizeTooltip" />
							<DxLegend :visible="true" vertical-alignment="top" horizontal-alignment="right" item-text-position="bottom" />
							<DxSeries argument-field="anno" :ignore-empty-points="true" value-field="meta" type="line" name="Meta" color="#F5AE36" />
							<DxSeries argument-field="anno" :ignore-empty-points="true" value-field="dato" type="bar" name="Avance" :color="mainColor" :bar-width="350" />
							<!-- https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxChart/Configuration/valueAxis/ -->
							<DxValueAxis :auto-breaks-enabled="true">
								<DxConstantLine :width="2" :value="item.lineaBase" color="#333" dash-style="dash" :display-behind-series="false" :extend-axis="false">
									<DxLabel text="Línea de base" />
									<!-- <DxLabel display-format=">Línea de base:</b> {valueText}" /> -->
								</DxConstantLine>
							</DxValueAxis>
							<!-- <DxCommonSeriesSettings :ignore-empty-points="true" argument-field="anno" /> -->
							<!-- <DxValueAxis :auto-breaks-enabled="true"> -->
							<!-- <DxConstantLine :value="item.lineaBase" :width="3" color="#0c497a" dash-style="line" :display-behind-series="false" :extend-axis="false">
								<DxLabel :visible="true" :customize-text="customizeLabel" display-format="<b>Línea de base:</b> {valueText}" />
							</DxConstantLine> -->
							<!-- </DxValueAxis> -->
							<!-- <DxCommonSeriesSettings :ignore-empty-points="true" argument-field="anno">
								<DxLabel :visible="false" format="thousands" display-format="{seriesName}: {valueText}" />
							</DxCommonSeriesSettings> -->
						</DxChart>
						<h5 class="text-center p-0 m-0 mt-2">{{ item.indicadorNombre }}</h5>
					</div>
				</div>
			</div>
		</div>
	</Transition>
</template>
