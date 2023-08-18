<script setup>
import api from "@/utils/api";
import DxStore from "@/utils/dx";
import { ref, onMounted, toRaw, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import DxValidator, { DxRequiredRule } from "devextreme-vue/validator";
import {
  DxTextBox,
  DxNumberBox,
  DxTextArea,
  DxValidationGroup,
} from "devextreme-vue";
import {
  DxColumn,
  DxScrolling,
  DxDataGrid,
  DxLoadPanel,
  DxPager,
  DxPaging,
} from "devextreme-vue/data-grid";
import { useClasificadorStore } from "@/stores";
const store = useClasificadorStore();
const route = useRoute();
const router = useRouter();
let titAccion = ref("Crear"),
  tipos = null,
  clasificacion = ref("departamento"),
  tipoId = route.params.id,
  path = `clasificador/dx/${tipoId}`,
  grid = null,
  valGroup = ref(null),
  base = {
    id: 0,
    tipoId: tipoId,
    padreId: 0,
    nombre: null,
    activo: true,
    descripcion: null,
  },
  panelData = null,
  panelGrid = null,
  item = ref(Clone(base)),
  dxStore = ref(null),
  onInitialized = (o) => {
    // console.log("onInitialized =>", o);
    grid = o.component;
    // console.log("grid =>", grid);
    // let ds = grid.getDataSource();
    // console.log("ds =>", ds);
  },
  onReady = (o) => {
    // console.log("onReady =>", o);
    // grid = o.component;
    // console.log("grid =>", grid);
    // let ds = grid.getDataSource();
    // console.log("ds =>", ds);
    if (panelGrid != null) panelGrid.unlock();
  },
  editorPreparing = (o) => {
    // console.clear();
    // console.log("editorPeparing =>", o);
    // grid = o.component;
    // console.log("grid =>", grid);
    // let ds = grid.getDataSource();
    // console.log("ds =>", ds);
    // if (panelGrid != null) panelGrid.unlock();
  },
  save = () => {
    let res = valGroup.value.instance.validate();
    // console.clear();
    console.log("res =>", res);
    if (res.isValid) {
      panelData.lock(
        `${item.id == 0 ? "Creando" : "Actualizando"}, un momento por favor`,
        async function (params) {
          console.log("ITEN =>", item.value);
          let dto = toRaw(item.value);
          console.log("dto =>", dto);
          // let dto = toRaw(item);
          // dto.activo = true;
          // // dto.padreId = 0;
          // dto.tipoId = tipoId;
          // panelData.dataTo(
          // 	toRaw(item),
          // 	async function name(ob) {
          // 		console.log("item =>", ob);
          await api()
            .post(`clasificador/ed`, dto)
            .then((r) => {
              console.log("r =>", r);
              store.clean();
              addCancel(function () {
                panelData.unlock();
                grid.refresh();
              });
            })
            .error((r) => {
              console.log("r =>", r);
              addCancel(function () {
                panelData.unlock();
                grid.refresh();
              });
            });

          // 	},
          // 	true
          // );
        }
      );
    }
  },
  active = (data, state) => {
    // console.clear();
    console.log("data =>", data);
    msg.confirm({
      // title: "otro",
      textCancel: "CANCELAR",
      textOk: data.activo ? "DESACTIVAR" : "ACTIVAR",
      text: `¿Realmente desea ${data.activo ? "desactivar" : "activar"} "${
        data.nombre
      }"?`,
      onConfirm: () => {
        panelGrid.lock(
          `${data.activo ? "Desactivando" : "Activando"}, un momento por favor`,
          async function (params) {
            data.activo = data.activo ? false : true;
            await api()
              .post(`clasificador/ed`, data)
              .then((r) => {
                console.log("r =>", r);
                store.clean();
                addCancel(function () {
                  panelGrid.unlock();
                  grid.refresh();
                });
                return r.data;
              });
          }
        );
      },
      onCancel: () => {},
    });
  },
  addStart = (data) => {
    // console.clear();
    console.log("data =>", data);
    panelGrid.fadeOut(function () {
      if (typeof data !== "undefined") {
        titAccion.value = "Editar";
        item.value = Clone(data);
      } else {
        titAccion.value = "Crear";
        item.value = Clone(base);
      }
      panelData.fadeIn(function () {});
    });
  },
  addCancel = (cb) => {
    // console.clear();
    // // console.log("data =>", );
    // panelData.hide();
    // panelGrid.show();
    panelData.fadeOut(function () {
      panelData.clear();
      panelGrid.fadeIn(function () {
        item.value = Clone(base);
        valGroup.value.instance.reset();
        if (typeof cb === "function") cb();
      });
    });
  },
  displayMode = "full",
  pageSizes = [15, 30, 50, "all"],
  showPageSizeSelector = true,
  showInfo = true,
  showNavButtons = true,
  customizeColumns = (columns) => {
    // console.log("customizeColumns!");
    // columns[0].width = 70;
  },
  isCompactMode = () => {
    return this.displayMode === "compact";
  },
  getData = () => {
    dxStore.value = DxStore({
      id: tipoId,
      userData: "",
      endPoint: `clasificador/dx/${tipoId}`,
      onLoading: function (loadOptions) {
        panelGrid.lock("Cargando");
        console.log("loadOptions =>", loadOptions);
        // root.loaderShow("Cargando Dependencias", "#panel-produccion .card-body");
        console.log("onLoading...");
      },
      onLoaded: function (results, baseEntity) {
        // console.clear();
        console.log("results", results);
        // root.totaCount = results.totalCount;
        // root.loaderHide();
        console.log("onLoaded!");
        let cl = tipos.filter((o) => o.id == tipoId)[0];
        clasificacion.value = cl.nombre;
        if (panelGrid != null) panelGrid.unlock();
      },
    });
  };

watch(
  () => route.params.id,
  (newId, oldId) => {
    console.clear();
    console.log("newId, oldId =>", newId, oldId);
    tipoId = route.params.id;
    console.log("tipoId =>", tipoId);
    console.log("route.params.id =>", route.params.id);
    path = `clasificador/dx/${tipoId}`;
    console.log("path =>", path);
    // dxStore.endPoint = path;
    // let ds = grid.getDataSource();
    // console.log("ds =>", ds);
    // dxStore.load();
    // grid.refresh();
    getData();
    console.log("dxStore =>", dxStore);
  }
);

onMounted(async () => {
  console.clear();
  console.log("Clasificador mounted");
  panelData = $("#data");
  panelGrid = $("#grid");
  console.clear();
  console.log(_sep);
  panelGrid.lock("Cargando");
  tipoId = route.params.id;
  tipos = await store.tipos();
  console.log("tipos =>", tipos);
  getData();
});
</script>
<template>
  <div class="container pt-2 pb-2 content">
    <div class="card data hidden" id="data">
      <div class="card-header main d-flex justify-content-between">
        <span>
          <i class="fa-solid fa-gears"></i>
          Administración &raquo; {{ clasificacion }} &raquo;
          <span title="tit-action">{{ titAccion }}</span>
        </span>
        <!-- <span>
						<button type="button" class="btn btn-trans" @click.prevent="addStart"><i class="fa-solid fa-square-plus"></i>NUEVO USUARIO</button>
						</span> -->
      </div>

      <DxValidationGroup ref="valGroup">
        <div class="card-body pt-2 pb-4">
          <div class="row">
            <div class="col-md-10 pb-2">
              <label class="tit">Nombre</label>
              <!-- <input class="form-control" type="text" placeholder="Nombre" id="nombre" name="nombre" v-model="item.nombre" /> -->
              <DxTextBox
                id="nombre"
                :show-clear-button="true"
                value-change-event="keyup"
                v-model:value="item.nombre"
                class="form-control"
                placeholder="Nombre"
              >
                <DxValidator>
                  <DxRequiredRule />
                </DxValidator>
              </DxTextBox>
            </div>
            <div class="col-md-2 pb-2">
              <label class="tit">Orden</label>
              <!-- <input class="form-control" type="text" placeholder="Nombre" id="nombre" name="nombre" v-model="item.nombre" /> -->
              <DxNumberBox
                id="orden"
                :show-clear-button="true"
                value-change-event="keyup"
                v-model:value="item.orden"
                :show-spin-buttons="true"
                :step="1"
                :min="0"
                class="form-control"
                placeholder="Orden"
              >
                <DxValidator>
                  <DxRequiredRule />
                </DxValidator>
              </DxNumberBox>
            </div>
            <div class="col-md-12 pb-2">
              <label class="tit">Descripción</label>
              <!-- <input class="form-control" type="text" placeholder="Descripción" id="descripcion" name="descripcion" v-model="item.descripcion" nonrequired /> -->
              <DxTextArea
                id="nombre"
                :show-clear-button="true"
                value-change-event="keyup"
                :height="140"
                v-model:value="item.descripcion"
                class="form-control"
                placeholder="Descripción"
              >
                <DxValidator>
                  <DxRequiredRule />
                </DxValidator>
              </DxTextArea>
            </div>
          </div>
        </div>
      </DxValidationGroup>

      <div class="card-footer">
        <div class="d-flex justify-content-between align-items-center">
          <a class="btn btn-gray" @click.prevent="addCancel"
            ><i class="fa-solid fa-circle-xmark"></i>&nbsp;&nbsp;CANCELAR</a
          >
          <a class="btn btn-main" @click.prevent="save"
            >GUARDAR&nbsp;&nbsp;<i class="fa-solid fa-floppy-disk"></i
          ></a>
        </div>
      </div>
    </div>

    <div class="card content" id="grid">
      <div class="card-header main d-flex justify-content-between">
        <span>
          <i class="fa-solid fa-gears"></i>
          Administración &raquo; {{ clasificacion }}
        </span>
        <span>
          <button
            type="button"
            class="btn btn-trans"
            @click.prevent="addStart()"
            title="Nuevo..."
          >
            <i class="fa-solid fa-square-plus"></i>NUEVO
          </button>
        </span>
      </div>
      <div class="card-body pt-3 pb-4">
        <div class="row">
          <div class="col">
            <!-- <h2 class="font-weight-normal text-7 mb-2 color-main"><strong class="font-weight-semibold">Usuarios</strong> Principal o Interna</h2> -->
            <DxDataGrid
              :customize-columns="customizeColumns"
              :data-source="dxStore"
              :hover-state-enabled="true"
              :remote-operations="true"
              :row-alternation-enabled="true"
              :show-borders="false"
              :word-wrap-enabled="false"
              id="gridContainer"
              @content-ready="onReady"
              @initialized="onInitialized"
              @editor-preparing="editorPreparing"
            >
              <DxLoadPanel :enabled="false" />
              <DxScrolling row-rendering-mode="virtual" />
              <DxPaging :page-size="15" />
              <DxPager
                :allowed-page-sizes="pageSizes"
                :display-mode="displayMode"
                :show-info="showInfo"
                :show-navigation-buttons="showNavButtons"
                :show-page-size-selector="showPageSizeSelector"
                :visible="true"
              />
              <DxColumn
                data-field="id"
                caption="Id"
                data-type="number"
                alignment="center"
                :width="60"
                :allow-sorting="false"
              />
              <DxColumn data-field="nombre" caption="Nombre" sort-order="asc" />
              <DxColumn data-field="descripcion" caption="Descripción" />
              <DxColumn
                :width="90"
                caption="Activo"
                alignment="center"
                cell-template="tpl1"
              />
              <DxColumn
                data-field="orden"
                caption="Orden"
                data-type="number"
                alignment="center"
                :width="100"
                :sort-index="0"
              />
              <template #tpl1="{ data }">
                <span v-if="data.data.activo">SI</span>
                <span v-else>NO</span>
              </template>
              <DxColumn
                :width="100"
                alignment="center"
                cell-template="tpl"
                name="cmds"
                :fixed="true"
                fixed-position="right"
              />
              <template #tpl="{ data }">
                <span class="cmds">
                  <a
                    title="Modificar..."
                    class="cmd-item color-main-600 me-2"
                    @click.prevent="addStart(data.data)"
                    href="#"
                  >
                    <i class="fa-solid fa-pen-to-square fa-lg"></i>
                  </a>
                  <a
                    v-if="data.data.activo"
                    title="Desactivar..."
                    class="cmd-item color-main-600"
                    @click.prevent="active(data.data, false)"
                    href="#"
                  >
                    <i class="fa-regular fa-square-minus fa-lg"></i>
                  </a>
                  <a
                    v-else
                    title="Activar..."
                    class="cmd-item color-main-600"
                    @click.prevent="active(data.data, true)"
                    href="#"
                  >
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
        <span class="font-weight-semibold">item:</span> {{ item }}
      </div>
    </div>
  </div>
</template>
