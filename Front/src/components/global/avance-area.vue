<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useIndicadorStore } from "@/stores";
import { DxCircularGauge, DxGeometry, DxRangeContainer, DxValueIndicator } from "devextreme-vue/circular-gauge";
const store = useIndicadorStore();
const router = useRouter();
let items = ref([]),
	props = defineProps({
		showInfo: { type: Boolean, default: true, required: false },
		description: { type: String, default: "Something", required: false },
	}),
	areaClick = (area) => {
		console.log(_sep);
		console.log("area =>", area);
		// 202212021247: https://router.vuejs.org/guide/essentials/navigation.html
		router.push(`/area/${area.areaId}`);
		// router.push({ name: "area", params: { id: area.id } });
	},
	getColor = (avance) => {
		if (avance >= 0 && avance <= 30) {
			return "#C0392B";
		} else if (avance > 30 && avance <= 70) {
			return "#F5AE36";
		} else {
			return "#00B000";
		}
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
	};
onMounted(async () => {
	items.value = await store.avancesArea();
	$(window).resize(resize);
	resize();
});
</script>
<template>
	<Transition>
		<div v-if="items.length > 0" class="card mb-4">
			<div class="card-header main"><i class="fa-solid fa-chart-simple me-2"></i> Avances por Áreas de Acción</div>
			<div class="card-body pt-3 pb-2">
				<div class="row d-flex justify-content-center">
					<div
						v-for="item in items"
						@click.prevent="areaClick(item)"
						:title="'Observar detalles de ' + item.areaNombre"
						class="col-lg-3 col-md-6 col-sm-12 mb-3 pb-3 mt-4 text-center active"
					>
						<DxCircularGauge :value="item.cumplimiento" class="chart-gauge">
							<DxRangeContainer :width="0" />
							<DxGeometry :start-angle="180" :end-angle="360" />
							<DxValueIndicator type="rangeBar" :color="getColor(item.cumplimiento)" background-color="#EBEBEB" :offset="-10" :size="15" />
						</DxCircularGauge>
						<h5 class="item-title text-center p-0 m-0 mt-2">{{ item.areaOrden }}. {{ item.areaNombre }}</h5>
						<span class="item-avance">{{ item.cumplimiento }}</span>
					</div>
				</div>
			</div>
		</div>
	</Transition>
</template>
