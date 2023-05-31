<script setup>
import DxStore from "@/utils/dx";
import { onMounted, ref } from "vue";
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
let items = ref([]),
	props = defineProps({
		showInfo: { type: Boolean, default: true, required: false },
		description: { type: String, default: "Something", required: false },
	}),
	dxStore = DxStore({
		key: ["indicadorId"],
		userData: "producto",
		endPoint: "indicador/iax",
		onLoading: function (loadOptions) {
			$("#grid").lock("Cargando");
			console.log("loadOptions =>", loadOptions);
			console.log("onLoading");
		},
		onLoaded: function (results) {
			items.value = results.data;
		},
	}),
	customizeColumns = (e) => {
		console.log("e =>", e);
	},
	onInitialized = (e) => {
		console.log("e =>", e);
	};
onMounted(async () => {
	console.log("dxStore =>", dxStore);
	dxStore.load();
});
</script>
<template>
	<Transition>
		<div v-if="items.length > 0" class="card mb-4">
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
							<DxColumnChooser :enabled="false" mode="dragAndDrop" />
							<DxExport :enabled="false" />
							<DxFilterRow :visible="false" />
							<DxGrouping :auto-expand-all="true" />
							<DxGroupPanel :visible="false" :allow-column-dragging="true" />
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
								info-text="{2} indicadores con avance (página {0} de {1})"
							/>
							<DxColumn data-field="areaId" caption="Area Id" :visible="false" />
							<DxColumn data-field="areaNombre" caption="Area" :visible="false" />
							<DxColumn data-field="objetivoGeneralId" caption="Objetivo General Id" :visible="false" />
							<DxColumn data-field="objetivoGeneralNombre" caption="Objetivo General" :visible="false" />
							<DxColumn data-field="tipoAcumulacionId" caption="TipoAcumulacionId" :visible="false" />
							<DxColumn data-field="tipoAcumulacionNombre" caption="TipoAcumulacionNombre" :visible="false" />
							<DxColumn data-field="tipoIndicadorId" caption="TipoIndicadorId" :visible="false" />
							<DxColumn data-field="tipoIndicadorNombre" caption="Tipo Indicador" :visible="false" />
							<DxColumn data-field="unidadMedidaId" caption="UnidadMedidaId" :visible="false" />
							<DxColumn data-field="unidadMedidaNombre" caption="UnidadMedidaNombre" :visible="false" />
							<DxColumn data-field="indicadorId" caption="Id" :visible="true" :width="60" aligment="center" />
							<DxColumn data-field="indicadorNombre" caption="Nombre" :visible="true" width="100%" />
							<DxColumn data-field="lineaBase" caption="Línea de base" :visible="false" />
							<DxColumn data-field="lineaBaseFecha" caption="Fecha lìnea de base" :visible="false" />
							<DxColumn data-field="anno" :width="60" alignment="center" caption="Año" format="#,##0.##" />
							<DxColumn data-field="meta" :width="100" alignment="center" caption="Meta" format="#,##0.##" />
							<DxColumn data-field="dato" :width="100" alignment="center" caption="Avance" format="#,##0.##" />
							<DxColumn data-field="cumplimiento" :width="120" alignment="center" caption="Cumplimiento" format="#,##0.##' %'" />
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
	</Transition>
</template>
