<script setup>
import DxStore from "@/utils/dx";
import { useRouter } from "vue-router";
import { ref, onMounted, toRaw } from "vue";
import {
	useAuthStore,
	useBancoStore,
	useClasificadorStore,
	useCursoStore,
	useEscuelaStore,
	useGeografiaStore,
	useIndicadorStore,
	useNivelStore,
	useNucleoStore,
	useProductoStore,
	useProgramaStore,
} from "@/stores";
import {
	DxColumn,
	DxColumnChooser,
	DxColumnFixing,
	DxDataGrid,
	DxEditing,
	DxExport,
	DxFilterRow,
	DxGrouping,
	DxGroupItem,
	DxGroupPanel,
	DxLoadPanel,
	DxLookup,
	DxPager,
	DxPaging,
	DxScrolling,
	DxSearchPanel,
	DxSorting,
	DxSummary,
} from "devextreme-vue/data-grid";
const estados = window._config.estado_curso;
const router = useRouter(),
	store = useClasificadorStore(),
	storeBancos = useBancoStore(),
	storeCursos = useCursoStore(),
	storeEscuelas = useEscuelaStore(),
	storeGeo = useGeografiaStore(),
	storeIndicadores = useIndicadorStore(),
	storeNiveles = useNivelStore(),
	storeNucleos = useNucleoStore(),
	storeProductos = useProductoStore(),
	storeProgramas = useProgramaStore(),
	auth = useAuthStore();

let titulo = "Administración &raquo; Participantes",
	item = ref({
		id: 0,
		dependenciaId: null,
		nombre: null,
		descripcion: null,
		actividadAprendizaje: null,
		actividadEvaluacion: null,
		justificacion: null,
		metodologia: null,
		activo: true,
		creadoEl: null,
		creadoPor: null,
		editadoEl: null,
		editadoPor: null,
	}),
	item_copy = Clone(item.value),
	dxStore = DxStore({
		key: ["id"],
		userData: JSON.stringify({
			esAdmin: auth.esAdmin,
			companyId: auth.user.companyId,
			dependenceId: auth.user.dependenceId
		}),
		endPoint: "curso/activos-dx",
		onLoading: function (loadOptions) {
			$("#grid").lock("Cargando cursos");
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
	customizeColumns = () => {
		// console.log("customizeColumns!");
		// columns[0].width = 70;
	},
	grid = null,
	onInitialized = (o) => {
		grid = o.component;
		console.log("grid =>", grid);
	},
	edit = async (data, ruta) => {
		console.clear();
		let id = "";
		if (typeof data != "undefined") {
			storeCursos.item = data;
			id = data.id;
			console.log("storeCursos.item =>", toRaw(storeCursos.item));
		}
		let g = `/admin/${ruta}/${id}`;
		console.log("g =>", g);
		router.push(g);
	};
onMounted(async () => {
	console.log(_sep);
	await store.cargar();
	await storeBancos.all();
	await storeEscuelas.all();
	await storeGeo.dptoAll();
	await storeGeo.munAll();
	await storeIndicadores.all();
	await storeNiveles.all();
	await storeNucleos.all();
	await storeProductos.all();
	await storeProgramas.all();
});
//----------------------------------------------------------------------------------------------------------------------------------------------
</script>
<template>
	<div class="container content">
		<div class="card content" id="grid">
			<div class="card-header main d-flex justify-content-between">
				<span>
					<i class="fa-solid fa-gears"></i>
					<span v-html="titulo" />
				</span>
			</div>

			<div class="card-body pt-3 pb-4">
				<div class="row">
					<div class="col-md-12">
						<DxDataGrid :column-auto-width="false" :customize-columns="customizeColumns" :data-source="dxStore"
							:hover-state-enabled="true" :remote-operations="false" :repaint-changes-only="true"
							:row-alternation-enabled="true" :show-borders="false" :word-wrap-enabled="true"
							horizontal-alignment="Stretch" @initialized="onInitialized" id="gridContainer" key-expr="id">
							<DxColumnChooser :enabled="false" mode="dragAndDrop" />
							<DxColumnFixing :enabled="true" />
							<DxEditing :allow-updating="false" :allow-deleting="false" :allow-adding="false" mode="cell" />
							<DxExport :enabled="false" />
							<DxFilterRow :visible="true" />
							<DxGrouping :auto-expand-all="true" />
							<DxGroupPanel :visible="true" :allow-column-dragging="true" />
							<DxLoadPanel :enabled="false" />
							<DxScrolling row-rendering-mode="virtual" />
							<DxSearchPanel :visible="false" :highlight-case-sensitive="false" />
							<DxSorting mode="single" /><!-- single, multiple, none" -->
							<DxSummary>
								<DxGroupItem summary-type="count" column="group_type_name" display-format="{0} ítems" />
							</DxSummary>
							<DxPaging :page-size="10" />
							<DxPager :visible="true" :show-info="true" :show-page-size-selector="false" :show-navigation-buttons="true"
								:allowed-page-sizes="[15, 50, 'Todos']" info-text="{2} cursos (página {0} de {1})" />
							<DxColumn data-field="id" caption="Id" :visible="false" :width="80" :allow-filtering="false"
								:allow-sorting="true" alignment="center" sort-order="desc" />
							<DxColumn :width="80" data-field="codigoVerificacion" caption="Código" alignment="center"
								:visible="false" />
							<DxColumn :width="110" data-field="codigo" caption="Código" alignment="center" :visible="true" />
							<DxColumn data-field="nombre" caption="Curso" :visible="true" :fixed="false" fixed-position="left" />
							<DxColumn data-field="descripcion" caption="Descripción" :visible="false" />
							<DxColumn data-field="territorialNombre" caption="Territorial" :visible="true" :width="150" />
							<DxColumn data-field="porcentajeValidoAsistencia" caption="Asistencia" :visible="false" :width="100"
								alignment="center" format="#'%'" />
							<DxColumn :width="100" data-field="estadoCursoNombre" caption="Estado" :visible="true" alignment="center" />
							<DxColumn :width="100" data-field="activo" caption="Activo" alignment="center" :visible="true"
								cell-template="tpl1">
								<DxLookup :data-source="$si_no" value-expr="value" display-expr="name" />
							</DxColumn>
							<template #tpl1="{ data }">
								<span v-if="data.data.activo">SI</span>
								<span v-else>NO</span>
							</template>
							<DxColumn data-field="participantes" caption="Participantes" :visible="true" alignment="center"
								:width="135" />
							<DxColumn data-field="numeroDias" caption="Fechas" :visible="true" alignment="center" :width="90" />
							<DxColumn :width="80" alignment="center" cell-template="tpl" caption="" name="cmds" :fixed="false"
								fixed-position="right" />
							<template #tpl="{ data }">
								<span class="cmds">
									<a title="Observar participantes..." :disabled="data.data.participantes == 0"
										:class="'cmd-item color-main-600 me-2 ' + (data.data.participantes > 0 ? '' : 'disabled')"
										@click.prevent="edit(data.data, 'participantes')" href="#">
										<i class="fa-sharp fa-solid fa-screen-users"></i>
									</a>
									<a title="Gestionar asistencia..." :disabled="data.data.participantes == 0"
										:class="'cmd-item color-main-600 me-2 ' + (data.data.participantes > 0 ? '' : 'disabled')"
										@click.prevent="edit(data.data, 'asistencia')" href="#">
										<i class="fa-solid fa-list-check"></i>
									</a>
									<!-- <a title="Editar" class="cmd-item color-main-600 me-2" @click.prevent="edit(data.data)" href="#">
                    <i class="fa-solid fa-pen-to-square fa-lg"></i>
                  </a>
                  <a v-if="data.data.activo" title="Desactivar" class="cmd-item color-main-600"
                    @click.prevent="active(data.data, false)" href="#">
                    <i class="fa-regular fa-square-minus fa-lg"></i>
                  </a>
                  <a v-else title="Activar" class="cmd-item color-main-600" @click.prevent="active(data.data, true)"
                    href="#">
                    <i class="fa-regular fa-square-check fa-lg"></i>
                  </a> -->
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
