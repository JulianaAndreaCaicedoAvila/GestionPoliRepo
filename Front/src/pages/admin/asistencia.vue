<script setup>
import DxStore from "@/utils/dx";
import { useCursoStore } from "@/stores";
import { ref, onMounted, toRaw } from "vue";
import { useRouter, useRoute } from "vue-router";
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
const router = useRouter(),
  route = useRoute(),
  storeCursos = useCursoStore();
let cursoId = ref(null),
  dxStore = ref(null),
  curso = ref(null);
let cancel = () => {
    console.clear();
    console.log(_sep);
    storeCursos.item = data;
    console.log("Cancel in tabs!");
    router.push("/admin/cursos");
  },
  getData = () => {
    dxStore.value = DxStore({
      key: ["id"],
      endPoint: "curso/participantes-dx",
      userData: JSON.stringify({ id: cursoId.value }),
      onLoading: function (loadOptions) {
        $("#grid").lock("Cargando");
        console.log("loadOptions =>", loadOptions);
        console.log("onLoading");
      },
      onLoaded: function (results) {
        console.log("results", results);
        console.log("onLoaded!");
        $("#grid").unlock();
        $("#data").unlock();
      },
    });
  };
defineExpose({ cancel });
onMounted(async () => {
  console.log(_sep);
  console.log("tabs.vue MOUNTED!");
  const id = route.params.id;
  console.log("id =>", id);
  console.log("id != null", id != null);
  console.log("id.length", id.length);
  if (id.length > 0) {
    cursoId.value = 1;
    if (storeCursos.item != null && storeCursos.item.id == parseInt(id))
      curso.value = storeCursos.item;
    else curso.value = await storeCursos.getById(id);
    console.log("curso =>", toRaw(curso.value));
    console.log("CARGAR CURSO!!");
    cursoId.value = parseInt(id);
  } else {
    cursoId.value = 0;
  }
  getData();
});
//----------------------------------------------------------------------------------------------------------------------------------------------
</script>
<template>
  <div class="container content">
    <div class="card data" id="data">
      <div class="card-header main d-flex justify-content-between">
        <span class="d-flex justify-content-between">
          <i class="fa-solid fa-gears"></i>
          <span v-if="curso"
            >Administración &raquo; Asistencia<br />"{{ curso.nombre }}"</span
          >
        </span>
        <span>
          <router-link
            :to="{ path: '/admin/participantes' }"
            class="btn btn-trans"
          >
            <i class="fa-solid fa-circle-arrow-left"></i>VOLVER
          </router-link>
        </span>
      </div>
      <div class="card-body" v-if="curso">
        <div class="row" v-if="curso.id > 0">
          <div class="col-md-12 mb-2 d-flex justify-content-between">
            <p>
              <i class="fa-solid fa-circle-info me-1 color-main"></i> Lorem
              ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <p><b>Participantes en el curso:</b> {{ curso.participantes }}</p>
          </div>
        </div>
        <div class="row" v-if="curso">
          <div class="card content" id="grid">
            <div class="card-body pt-3 pb-4">
              <div class="row">
                <div class="col-md-12">
                  <DxDataGrid
                    :column-auto-width="false"
                    :customize-columns="customizeColumns"
                    :data-source="dxStore"
                    :hover-state-enabled="true"
                    :remote-operations="false"
                    :repaint-changes-only="true"
                    :row-alternation-enabled="true"
                    :show-borders="false"
                    :word-wrap-enabled="true"
                    horizontal-alignment="Stretch"
                    @initialized="onInitialized"
                    id="gridContainer"
                    key-expr="id"
                  >
                    <DxColumnChooser :enabled="false" mode="dragAndDrop" />
                    <DxColumnFixing :enabled="true" />
                    <DxEditing
                      :allow-updating="false"
                      :allow-deleting="false"
                      :allow-adding="false"
                      mode="cell"
                    />
                    <DxExport :enabled="false" />
                    <DxFilterRow :visible="true" />
                    <DxGrouping :auto-expand-all="true" />
                    <DxGroupPanel
                      :visible="true"
                      :allow-column-dragging="true"
                    />
                    <DxLoadPanel :enabled="false" />
                    <DxScrolling row-rendering-mode="virtual" />
                    <DxSearchPanel
                      :visible="false"
                      :highlight-case-sensitive="false"
                    />
                    <DxSorting mode="single" /><!-- single, multiple, none" -->
                    <DxSummary>
                      <DxGroupItem
                        summary-type="count"
                        column="group_type_name"
                        display-format="{0} ítems"
                      />
                    </DxSummary>
                    <DxPaging :page-size="10" />
                    <DxPager
                      :visible="true"
                      :show-info="true"
                      :show-page-size-selector="false"
                      :show-navigation-buttons="true"
                      :allowed-page-sizes="[15, 50, 'Todos']"
                      info-text="{2} participantes (página {0} de {1})"
                    />
                    <DxColumn
                      data-field="usuarioId"
                      caption="Id"
                      :width="80"
                      :allow-filtering="false"
                      :allow-sorting="true"
                      alignment="center"
                      sort-order="desc"
                    />
                    <DxColumn
                      :width="80"
                      data-field="codigoVerificacion"
                      caption="Código"
                      alignment="center"
                      :visible="false"
                    />
                    <DxColumn
                      data-field="nombre"
                      caption="Nombre"
                      :visible="true"
                      :fixed="false"
                      fixed-position="left"
                    />
                    <DxColumn
                      data-field="porcentajeValidoAsistencia"
                      caption="Asistencia"
                      :visible="true"
                      alignment="center"
                      format="#'%'"
                    />
                    <DxColumn
                      :width="100"
                      data-field="activo"
                      caption="Activo"
                      alignment="center"
                      :visible="true"
                      cell-template="tpl1"
                    >
                      <DxLookup
                        :data-source="$si_no"
                        value-expr="value"
                        display-expr="name"
                      />
                    </DxColumn>
                    <template #tpl1="{ data }">
                      <span v-if="data.data.activo">SI</span>
                      <span v-else>NO</span>
                    </template>
                    <DxColumn
                      :width="50"
                      alignment="center"
                      cell-template="tpl"
                      caption=""
                      name="cmds"
                      :fixed="false"
                      fixed-position="right"
                    />
                    <template #tpl="{ data }">
                      <span class="cmds">
                        <a
                          title="Gestionar asistencia..."
                          class="cmd-item color-main-600 me-2"
                          @click.prevent="edit(data.data)"
                          href="#"
                        >
                          <i
                            class="fa-sharp fa-solid fa-screen-users fa-lg"
                          ></i>
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
        </div>
      </div>
    </div>
  </div>
</template>
