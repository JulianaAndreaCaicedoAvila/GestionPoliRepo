<script setup>
import api from "@/utils/api";
import DxStore from "@/utils/dx";
import { useRouter } from "vue-router";
import NumberBox from "devextreme/ui/number_box";
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
  DxStateStoring,
  DxSummary,
} from "devextreme-vue/data-grid";
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
const estados = window._config.estado_curso;
let titulo = "Administración &raquo; Cursos",
  valGroup = ref(null),
  entidades = ref([]),
  dependencias = ref([]),
  especificos = ref([]),
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
  panelData = null,
  panelGrid = null,
  dxStore = DxStore({
    key: ["id"],
    userData: JSON.stringify({
      esAdmin: auth.esAdmin,
      companyId: auth.user.companyId,
      dependenceId: auth.user.dependenceId,
    }),
    endPoint: "curso/dx",
    onLoading: function (loadOptions) {
      $("#grid").lock("Cargando cursos,<br>un momento por favor");
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
  gridReset = () => {
    console.clear();
    console.log("gridReset!");
    console.log("grid =>", grid);
    grid.state(null);
    // grid.value.instance.state(null);
    // dataGridRef.value!.instance!.clearGrouping();
  },
  gridRedraw = (e) => {
    console.clear();
    console.log("e =>", e);
    // Determina si la grilla está agrupada
    let cols = e.component.getVisibleColumns();
    let grp = cols.filter(o => o.groupIndex !== undefined).length;
    if (grp > 0) {
      $("#btn-clear").fadeIn();
    } else {
      $("#btn-clear").fadeOut();
    }
  },
  active = (data) => {
    // console.clear();
    console.log("data =>", data);
    msg.confirm({
      // title: "otro",
      textCancel: "CANCELAR",
      textOk: data.activo ? "DESACTIVAR" : "ACTIVAR",
      text: `¿Realmente desea ${data.activo ? "desactivar" : "activar"
        } el curso "<span class="font-weight-semibold">${data.nombre}</span>"?`,
      onConfirm: () => {
        panelGrid = $("#grid");
        panelGrid.lock(
          `${data.activo ? "Desactivando" : "Activando"}, un momento por favor`,
          async function () {
            data.activo = data.activo ? false : true;
            await api()
              .post(`curso/ed`, data)
              .then((r) => {
                console.clear();
                console.log("r =>", r.data);
                grid.refresh();
                return r.data;
              });
          }
        );
      },
      onCancel: () => { },
    });
  },
  edit = async (data) => {
    let id = "";
    if (typeof (data) != "undefined") {
      storeCursos.item = data;
      id = data.id;
      console.log("storeCursos.item =>", toRaw(storeCursos.item));
    }
    router.push(`/admin/curso/${id}`);
  },
  getEstado = (rowData) => {
    if (rowData.estadoCursoId == estados.borrador) { // Borrador
      console.log("rowData.estadoCursoId =>", rowData.estadoCursoId);
      let suffix = "Incompletos";
      if (rowData.temas > 0 && rowData.encuestas > 0 && rowData.fechas > 0 && (rowData.documentos + rowData.imagenes) > 0)
        suffix = "Completos";
      return suffix;
    } else return "Completos";
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
      <div class="card-header main d-flex justify-content-between align-items-center">
        <span>
          <i class="fa-solid fa-gears"></i>
          <span v-html="titulo" />
        </span>
        <span>
          <a href="#" id="btn-clear" @click.prevent="gridReset" class="btn btn-trans me-4 hidden"><i
              class="fa-solid fa-arrows-rotate me-2"></i>LIMPIAR AGRUPACIONES Y FILTROS</a>
          <router-link :to="{ path: '/admin/curso' }" class="btn btn-trans" @click.prevent="edit()"
            title="Crear nuevo curso..."><i class="fa-solid fa-square-plus"></i>NUEVO CURSO</router-link>
        </span>
      </div>

      <div class="card-body pt-3 pb-4">
        <div class="row">
          <div class="col">
            <DxDataGrid :column-auto-width="true" :customize-columns="customizeColumns" :data-source="dxStore"
              :hover-state-enabled="true" :remote-operations="false" :repaint-changes-only="true"
              :row-alternation-enabled="true" :show-borders="false" :word-wrap-enabled="false"
              @editor-prepared="gridRedraw" :allow-column-reordering="true" :allow-column-resizing="true"
              horizontal-alignment="Stretch" @initialized="onInitialized" id="gridContainer" key-expr="id">

              <DxColumnFixing :enabled="true" />
              <DxColumnChooser :enabled="true" mode="dragAndDrop" title="Columnas" />
              <DxStateStoring :enabled="true" type="localStorage" storage-key="gridCursos" />
              <DxEditing :allow-updating="false" :allow-deleting="false" :allow-adding="false" mode="cell" />
              <DxExport :enabled="false" />
              <DxFilterRow :visible="true" :allow-sorting="true" />
              <DxGrouping :auto-expand-all="true" />
              <DxGroupPanel :visible="true" :allow-sorting="true" :allow-column-dragging="true" />
              <DxLoadPanel :enabled="false" />
              <DxScrolling row-rendering-mode="virtual" />
              <DxSearchPanel :visible="false" :highlight-case-sensitive="false" />
              <DxSorting mode="single" /><!-- single, multiple, none" -->
              <DxSummary>
                <DxGroupItem summary-type="count" column="group_type_name" display-format="{0} cursos" />
              </DxSummary>
              <DxPaging :page-size="15" />
              <DxPager :visible="true" :allow-sorting="true" :show-info="true" :show-page-size-selector="true"
                :show-navigation-buttons="true" :allowed-page-sizes="[15, 30, 50]"
                info-text="{2} cursos (página {0} de {1})" />

              <DxColumn data-field="id" caption="Id" :visible="false" :width="80" :allow-filtering="false"
                :allow-sorting="true" alignment="center" sort-order="desc" />
              <DxColumn :width="130" data-field="codigoVerificacion" caption="Código" alignment="center"
                :visible="false" />
              <DxColumn data-field="nombre" caption="Nombre" :visible="true" :allow-sorting="true" :fixed="true"
                fixed-position="left" width="450" />
              <DxColumn data-field="estadoCursoNombre" caption="Estado" :visible="true" :allow-sorting="true" />
              <DxColumn caption="Datos" :visible="true" :calculate-cell-value="getEstado" :allow-sorting="true" />
              <DxColumn :width="90" data-field="publicado" caption="Publicado" alignment="center" :visible="true"
                cell-template="tpl2" :allow-sorting="true">
                <DxLookup :data-source="$si_no" value-expr="value" display-expr="name" />
              </DxColumn>
              <template #tpl2="{ data }">
                <span v-if="data.data.publicado">SI</span>
                <span v-else>NO</span>
              </template>
              <DxColumn data-field="dependenciaNombre" caption="Dependencia" :visible="true" :allow-sorting="true" />
              <DxColumn data-field="territorialNombre" caption="Territorial" :visible="true" :allow-sorting="true" />
              <DxColumn data-field="departamentoNombre" caption="Departamento" :visible="true" :allow-sorting="true" />
              <DxColumn data-field="municipioNombre" caption="Municipio" :visible="true" :allow-sorting="true" />
              <DxColumn data-field="descripcion" caption="Descripción" :visible="false" />
              <DxColumn data-field="tipoAsistenciaNombre" caption="Asistencia" :visible="true" :allow-sorting="true" />
              <DxColumn data-field="tipoCursoNombre" caption="Tipo curso" :visible="true" :allow-sorting="true" />
              <DxColumn data-field="escuelaNombre" caption="Escuela" :visible="false" :allow-sorting="true" />
              <DxColumn data-field="nivelEscuelaNombre" caption="Nivel de escuela" :visible="false"
                :allow-sorting="true" />
              <DxColumn data-field="porcentajeValidoAsistencia" caption="Porcentaje asistencia" :visible="false"
                alignment="center" format="#'%'" :allow-sorting="true" />
              <DxColumn :width="100" data-field="activo" caption="Activo" alignment="center" :visible="true"
                cell-template="tpl1" :allow-sorting="true">
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
                  <a title="Editar" class="cmd-item color-main-600 me-2" @click.prevent="edit(data.data)" href="#">
                    <i class="fa-solid fa-pen-to-square fa-lg"></i>
                  </a>
                  <a v-if="data.data.activo" title="Desactivar" class="cmd-item color-main-600"
                    @click.prevent="active(data.data, false)" href="#">
                    <i class="fa-regular fa-square-minus fa-lg"></i>
                  </a>
                  <a v-else title="Activar" class="cmd-item color-main-600" @click.prevent="active(data.data, true)"
                    href="#">
                    <i class="fa-regular fa-square-check fa-lg"></i>
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
