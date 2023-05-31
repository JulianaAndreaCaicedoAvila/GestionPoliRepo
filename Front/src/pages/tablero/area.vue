<script setup>
import { onMounted, toRaw, ref } from "vue";
import { useClasificadorStore } from "@/stores";
import { avancesAreas } from "@/assets/js/data";
import { useRouter, useRoute } from "vue-router";
import { DxProgressBar } from "devextreme-vue/progress-bar";
import DxValidator, { DxRequiredRule, DxCustomRule, DxEmailRule, DxCompareRule, DxAsyncRule, DxStringLengthRule } from "devextreme-vue/validator";
import { DxButton, DxCheckBox, DxSelectBox, DxTextBox, DxSwitch, DxNumberBox, DxPopup, DxTooltip, DxValidationGroup } from "devextreme-vue";

const route = useRoute();
const router = useRouter();
const store = useClasificadorStore();

let areas = ref([]),
	areaId = ref(null),
	objGeneralId = ref(null),
	area = ref(null),
	areaAvance = ref(null),
	objGenerales = ref([]),
	objEspecificos = ref([]),
	statusFormat = (ratio) => {
		return (ratio * 100).format(0) + "%";
		// return (ratio * 100).format(2) + "%";
		return `<h5 class="main">Loading: ${ratio * 100}%</h5>`;
	},
	itemSelected = async (e) => {
		// console.clear();
		console.log(_sep);
		console.log("e =>", e);
		area.value = areas.value.filter((o) => o.id == e.value)[0];
		areaId.value = area.value.id;
		areaAvance.value = avancesAreas.find((o) => o.id == areaId.value);
		objGenerales.value = await store.porPadre(areaId.value);
	},
	getHijos = (padreId) => {
		return objEspecificos.value.filter((o) => o.padreId == padreId);
	},
	rdn = (rowData, e) => {
		return rdnBetween(5, 99);
		// return "kiki";
	},
	rdnPercent = (rowData, e) => {
		return rdnBetween(5, 99) + "%";
	};

onMounted(async () => {
	let o = await store.porTipoNombre("area_intervencion", true, false);
	o.forEach((item) => {
		item["nom"] = item.orden + ". " + item.nombre;
	});
	areaId.value = route.params.id;
	areas.value = o;
	if (areaId.value != null) {
		area.value = areas.value.filter((o) => o.id == areaId.value)[0];
	} else {
		area.value = areas.value[0];
		areaId.value = area.value.id;
	}
	objGenerales.value = await store.porPadre(areaId.value);
	console.log("objGenerales.value =>", toRaw(objGenerales.value));
	objEspecificos.value = await store.porTipoNombre("objetivo_especifico");
	areaAvance.value = avancesAreas.find((o) => o.id == areaId.value);
	console.log("area =>", toRaw(area.value));
	console.log("areaAvance =>", toRaw(areaAvance.value));
});
</script>
<template>
	<div class="container pt-2 pb-2 content">
		<div class="card mb-4">
			<div class="card-header main">
				<div class="row">
					<div class="col-md-5 d-flex align-items-center"><i class="fa-solid fa-chart-simple"></i> Avances por área de acción</div>
					<div class="col-md-7">
						<DxSelectBox
							id="objetivoId"
							:data-source="areas"
							:grouped="false"
							:min-search-length="3"
							:search-enabled="true"
							:show-clear-button="false"
							:show-data-before-search="true"
							v-model:value="areaId"
							@value-changed="itemSelected"
							class="form-control"
							display-expr="nom"
							placeholder="Objetivo General"
							value-expr="id"
						/>
					</div>
				</div>
			</div>
			<div class="card-body pt-3 pb-4" v-if="area">
				<div class="row">
					<div class="col-md-12 d-flex justify-content-between align-items-end bb pt-2 pb-3 mb-3">
						<h1 class="m-0 p-0 title-1 color-main">
							<span class="font-weight-semibold me-2">{{ area.orden }}.</span> {{ area.nombre }}
						</h1>
						<h4 class="m-0 p-0 color-main">Avance: {{ areaAvance.avance }}%</h4>
					</div>
				</div>
				<div class="row">
					<div class="col-md-12 mb-3">
						<p class="p-0 m-0">
							{{ area.descripcion }}
						</p>
					</div>
				</div>
				<div class="row">
					<div class="col-md-12 fs">
						<h5 class="tit color-main mb-3">Objetivos generales</h5>
						<fieldset class="main mb-4" v-for="item in objGenerales">
							<div class="row mb-0 pb-0">
								<div class="col-md-12 mb-3 d-flex justify-content-between align-items-start">
									<h5 class="tit me-3">
										<span class="font-weight-semibold" v-if="item.orden">{{ item.orden }}.</span>{{ item.nombre }}
									</h5>
									<h5 class="tit color-main">
										<span>Avance:&nbsp;{{ rdn() }}%</span>
										<!-- <DxProgressBar
											id="progress-bar-status"
											:show-status="false"
											:status-format="statusFormat"
											:height="5"
											:min="0"
											:max="100"
											:value="rdn()"
											width="100%"
										/> -->
									</h5>
								</div>
								<div class="row m-0">
									<div class="col-md-12 fs">
										<legend class="mb-2 pb-1 sub">Objetivos específicos</legend>
										<div class="row m-0 mb-0" v-for="item in getHijos(item.id)">
											<div class="col-md-12 m-0 mb-1 d-flex justify-content-between align-items-start">
												<p class="m-0 p-0 me-5">
													<span class="font-weight-semibold" v-if="item.orden">{{ item.orden }}.</span>{{ item.nombre }}
												</p>
												<p class="color-main m-0 p-0">
													<DxProgressBar
														id="progress-bar-status"
														:show-status="true"
														:status-format="statusFormat"
														:height="10"
														:min="0"
														:max="100"
														:value="rdn()"
														width="100"
													/>
													<!-- <span>Avance:&nbsp;{{ rdn() }}%</span> -->
												</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</fieldset>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<style lang="scss">
.dx-progressbar-status {
	width: 100%;
	text-align: center;
	font-weight: 500;
	font-size: 1rem;
}
</style>
