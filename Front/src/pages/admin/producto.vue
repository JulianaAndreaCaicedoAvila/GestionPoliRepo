<script setup>
import api from "@/utils/api";
import DxStore from "@/utils/dx";
import { useGeneralStore, useClasificadorStore, useAuthStore } from "@/stores";
import NumberBox from "devextreme/ui/number_box";
import TagBox from "devextreme/ui/tag_box";
import { useRouter, useRoute } from "vue-router";
import { ref, toRaw, onMounted, getCurrentInstance } from "vue";
import DxValidator, {
  DxRequiredRule,
  DxStringLengthRule,
} from "devextreme-vue/validator";
import {
  DxSelectBox,
  DxTextBox,
  DxTagBox,
  DxDateBox,
  DxNumberBox,
  DxTextArea,
  DxValidationGroup,
} from "devextreme-vue";
import {
  DxColumn,
  DxColumnChooser,
  DxExport,
  DxScrolling,
  DxFilterRow,
  DxDataGrid,
  DxGrouping,
  DxGroupItem,
  DxGroupPanel,
  DxLoadPanel,
  DxPager,
  DxPaging,
  DxSearchPanel,
  DxSorting,
  DxSummary,
} from "devextreme-vue/data-grid";
const route = useRoute(),
  storeGeneral = useGeneralStore(),
  store = useClasificadorStore(),
  app = getCurrentInstance(),
  auth = useAuthStore();
let props = app.appContext.config.globalProperties;
let titulo = "Administración &raquo; Cursos &raquo; Productos",
  tbAsignados = null,
  metas = [],
  avances = [],
  series = [],
  meses = ref([]),
  anno_inicial = _config.seguimiento.anno_inicial,
  anno_final = _config.seguimiento.anno_final,
  anno_actual = new Date().getFullYear(),
  // anno_actual = 2023,
  mes_actual = new Date().getMonth(),
  areaIdTxtRef = ref(null),
  objetivoIdTxtRef = ref(null),
  valGroup = ref(null),
  avanceGroup = ref(null),
  objGralId = ref(null),
  objEspId = ref(null),
  objetivos = ref([]),
  objetivosAsignados = ref([]),
  indicadorObjetivos = ref([]),
  entidades = ref([]),
  dependencias = ref([]),
  sectores = ref([]),
  especificos = ref([]),
  indicador = ref(null),
  tiposIndicador = ref(null),
  periodicidades = ref(null),
  unidades = ref(null),
  annos = ref([]),
  avance = ref({
    id: 0,
    indicadorId: 0,
    anno: null,
    mes: null,
    dato: null,
    avance: null,
    meta: null,
    meta_anterior: null,
    cumplimiento: null,
    observaciones: null,
    creadoPor: null,
    editadoPor: null,
  }),
  avance_bk = ref(Clone(avance.value)),
  tiposAcumulacion = ref(null),
  item = ref({
    id: 0,
    dependenciaId: null,
    nombre: null,
    descripcion: null,
    activo: null,
    creadoEl: null,
    creadoPor: null,
    editadoEl: null,
    editadoPor: null,
  }),
  item_copy = Clone(item.value),
  date_focus_in = (e) => {
    e.component.open();
  },
  date_focus_out = (e) => {
    e.component.close();
  },
  panelData = null,
  panelGrid = null,
  panelAvance = null,
  dxStore = DxStore({
    key: ["id"],
    userData: JSON.stringify({
      esAdmin: auth.esAdmin,
      companyId: auth.user.companyId,
      dependenceId: auth.user.dependenceId,
    }),
    endPoint: "producto/dx",
    onLoading: function (loadOptions) {
      $("#grid").lock("Cargando");
      console.log("loadOptions =>", loadOptions);
      console.log("onLoading");
    },
    onLoaded: function (results, baseEntity) {
      console.log("results", results);
      console.log("onLoaded!");
      $("#grid").unlock();
      $("#data").unlock();
    },
  }),
  itemSelected = async (e) => {
    // console.clear();
    console.log(_sep);
    objetivosAsignados.value = [];
    console.log("itemSelected =>", e);
    let v = e.value;
    let id = $(e.element).attr("id");
    console.log("id =>", id);
    item.value.padreId = null;
    if (v !== null && v !== undefined) {
      let hijos = await store.porPadre(v);
      if (id == "areaId") {
        objetivos.value = hijos;
      } else if (id == "objetivoId") {
        especificos.value = hijos;
      } else if (id == "sectorId") {
        entidades.value = hijos;
      } else if (id == "entidadId") {
        dependencias.value = hijos;
      }
    } else {
      objetivos.value = [];
      especificos.value = [];
    }
  },
  annoChanged = async (e) => {
    // console.clear();
    console.log(_sep);
    console.log("itemSelected =>", e);
    console.log("metas =>", metas);
    let anno = e.value;
    console.log("anno =>", anno);
    avance.value.mes = null;
    let meta = metas.find((o) => o.anno == anno);
    console.log("meta =>", meta);
    avance.value.meta = typeof meta != "undefined" ? meta.meta : null;
    let meta_anterior = metas.find((o) => o.anno == anno - 1);
    console.log("meta_anterior =>", meta_anterior);
    console.log("indicador =>", indicador);
    avance.value.meta_anterior =
      typeof meta_anterior != "undefined" ? meta_anterior.meta : null;
    // 202210272102: Ajusta selector de meses
    if (anno == anno_actual) {
      meses.value = [];
      for (let index = 0; index < mes_actual; index++) {
        meses.value.push(props.$meses[index]);
      }
    } else {
      meses.value = Clone(props.$meses);
    }
    console.log("meses =>", toRaw(meses.value));
  },
  mesChanged = async (e) => {
    // console.clear();
    console.log(_sep);
    console.log("itemSelected =>", e);
    console.log("avances =>", avances);
    console.log("avance =>", avance.value);
    let anno = avance.value.anno;
    console.log("anno =>", anno);
    let mes = e.value;
    console.log("mes =>", mes);
    let av = avances.find((o) => o.anno == anno && o.mes == mes);
    if (av != null) {
      avance.value.id = av.id;
      avance.value.dato = av.dato;
      avance.value.cumplimiento = av.cumplimiento;
      avance.value.observaciones = av.observaciones;
    } else {
      avance.value.id = 0;
      avance.value.dato = null;
      avance.value.cumplimiento = null;
      avance.value.observaciones = null;
    }
    console.log("avance =>", av);
  },
  obtenerCumplimiento = async (e) => {
    // console.clear();
    console.log(_sep);
    console.log("e =>", e);
    console.log("indicador =>", toRaw(indicador.value));
    let cumplimiento = await storeIndicador.cumplimientoObtener(
      toRaw(indicador.value),
      toRaw(avance.value)
    );
    avance.value.cumplimiento = cumplimiento;
    console.log("cumplimiento =>", cumplimiento);
  },
  customizeColumns = (columns) => {
    // console.log("customizeColumns!");
    // columns[0].width = 70;
  },
  setSeries = (item, value) => {
    const f = typeof value !== "undefined" ? value : "";
    const h = `<div class="form-group"><label>${item}</label><input type="text" nonrequired="true" id="{criteria}-${item}" name="{criteria}-${item}" value="${f}" class="form-control"></div>`;
    $("#series").append(h.replaceAll("{criteria}", "serie"));
  },
  setSerie = (e) => {
    // console.clear();
    let v = e.value;
    if (v !== null) {
      let id = $(e.element).attr("id");
      console.log("v =>", v);
      console.log("id =>", id);
      let y = parseInt(id.split("-")[1]);
      console.log("año =>", y);
      let finded = false;
      let arr = id.contains("serie-") ? series : metas;
      for (let index = 0; index < arr.length; index++) {
        const el = arr[index];
        if (el.anno === y) {
          el.dato = v;
          el.creadoPor = auth.user.id;
          finded = true;
          break;
        }
      }
      if (!finded) {
        arr.push({
          id: 0,
          indicadorId: 0,
          anno: y,
          dato: v,
          creadoPor: auth.user.id,
        });
      }
      arr.sort((a, b) => a.anno - b.anno);
      console.log(
        id.contains("serie-") ? "series =>" : "metas =>",
        id.contains("serie-") ? series : metas
      );
    }
  },
  grid = null,
  onInitialized = (o) => {
    grid = o.component;
    console.log("grid =>", grid);
  },
  active = (data, state) => {
    // console.clear();
    console.log("data =>", data);
    msg.confirm({
      // title: "otro",
      textCancel: "CANCELAR",
      textOk: data.activo ? "DESACTIVAR" : "ACTIVAR",
      text: `¿Realmente desea ${
        data.activo ? "desactivar" : "activar"
      } el indicador "<span class="font-weight-semibold">${
        data.nombre
      }</span>"?`,
      onConfirm: () => {},
      onCancel: () => {},
    });
  },
  remove = (data, state) => {
    // console.clear();
    console.log("data =>", data);
    msg.confirm({
      // title: "otro",
      textCancel: "CANCELAR",
      textOk: "ELIMINAR",
      text: `¿Realmente desea eliminar al indicador ${data.name}?`,
      onConfirm: () => {},
      onCancel: () => {},
    });
  },
  avanceStart = async (data) => {
    // console.clear();
    console.log(_sep);
    indicador.value = Clone(data);
    panelGrid.lock("Cargando");
    metas = await storeIndicador.cargar("metas", indicador.value.id);
    avances = await storeIndicador.cargar("avances", indicador.value.id);
    panelGrid.fadeOut("normal", async function () {
      panelAvance.fadeIn("normal", function () {
        console.log("indicador =>", toRaw(indicador.value));
        console.log("metas =>", metas);
        panelGrid.unlock();
      });
    });
  },
  avanceCancel = async () => {
    panelAvance.fadeOut("normal", async function () {
      panelGrid.fadeIn("normal", function () {
        avanceGroup.value.instance.reset();
        avance.value = Clone(avance_bk.value);
      });
    });
  },
  avanceSave = async () => {
    console.clear();
    let result = avanceGroup.value.instance.validate();
    if (result.isValid) {
      console.log("auth.user =>", auth.user);
      avance.value.indicadorId = indicador.value.id;
      if (avance.value.id == 0) {
        avance.value.creadoPor = auth.user.id;
      } else {
        avance.value.editadoPor = auth.user.id;
      }
      console.log("enviado =>", toRaw(avance.value));
      let av = await storeIndicador.guardarAvance(toRaw(avance.value));
      console.log("gestionado =>", av);
      panelAvance.fadeOut("normal", async function () {
        panelGrid.fadeIn("normal", function () {
          avance.value = Clone(avance_bk.value);
        });
      });
    }
  },
  addStart = async (data) => {
    // console.clear();
    console.log(_sep);
    console.log("data =>", data);
    // Editando
    if (typeof data !== "undefined") {
      $("#tit-action").text("Editar producto");
      panelGrid.lock("Cargando");
      item.value = Clone(data);
      metas = await storeIndicador.cargar("metas", item.value.id);
      series = await storeIndicador.cargar("series", item.value.id);
      indicadorObjetivos = await storeIndicador.cargar(
        "objetivos",
        item.value.id
      );
      indicadorObjetivos.forEach((item) => {
        objetivosAsignados.value.push(item.objetivoEspecificoId);
      });
      console.log("indicadorObjetivos =>", indicadorObjetivos);
      // https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxTagBox
      tbAsignados.option("value", objetivosAsignados.value);
      // tb.blur();
      // console.log("tagBox =>", tb);
      // instance.option("value", item.meta);
      // setTimeout(async function () {}, 800);
    } else {
      $("#tit-action").text("Nuevo producto");
      item.value = Clone(item_copy);
    }
    panelGrid.fadeOut("normal", async function () {
      console.log(typeof data);
      panelData.fadeIn("normal", function () {
        console.log(_sep);
        console.log("item =>", item.value);
        panelGrid.unlock();
      });
    });
  },
  addCancel = (cb) => {
    // console.clear();
    console.log("CANCEL!");
    panelData.fadeOut("normal", function () {
      panelData.clear();
      panelGrid.fadeIn("normal", function () {
        metas = [];
        series = [];
        item.value = Clone(item_copy);
        console.log("item =>", item);
        valGroup.value.instance.reset();
        $(".nb.dx-numberbox").each(function (index) {
          var el = $(this);
          let instance = NumberBox.getInstance(el);
          instance.reset();
          console.log("instance =>", instance);
        });
        objetivosAsignados.value = [];
        tbAsignados.option("value", []);
        if (typeof cb === "function") cb();
      });
    });
  },
  save = async () => {
    // console.clear();
    let result = valGroup.value.instance.validate();
    if (!result.isValid) {
      $.scrollTo($(".dx-invalid:first"), {
        duration: 600,
        offset: -110,
      });
      ``;
    } else {
      panelData.lock(
        `${item.id == 0 ? "Creando" : "Actualizando"} producto`,
        async function (params) {
          //   let res = storeGeneral.guardar("/producto/ed", toRaw(item.value));
          //   addCancel(function () {
          //     panelData.unlock();
          //     grid.refresh();
          //   });
          let dto = toRaw(item.value);
          console.log("dto =>", dto);
          await api()
            .post(`producto/ed`, dto)
            .then((r) => {
              console.log("r =>", r);
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
        }
      );
    }
  };
onMounted(async () => {
  console.clear();
  console.log(_sep);
  console.log("route.name =>", route.name);
  dependencias.value = await store.porTipoNombre("dependencia");
  setTimeout(function () {
    panelData = $("#data");
    panelGrid = $("#grid");
  }, 500);
});
</script>
<template>
  <div class="container content">
    {{ item }}
    <div class="card data hidden" id="data">
      <div class="card-header main d-flex justify-content-between">
        <span>
          <i class="fa-solid fa-gears"></i>
          <span v-html="titulo" /> &raquo;
          <span id="tit-action">Nuevo producto</span>
        </span>
      </div>

      <DxValidationGroup ref="valGroup">
        <div class="card-body pt-3 pb-4">
          <div class="row">
            <div class="col-md-3 mb-1">
              <label class="tit">Dependencia</label>
              <DxSelectBox
                id="areaId"
                ref="areaIdTxtRef"
                :data-source="dependencias"
                :grouped="false"
                :min-search-length="3"
                :search-enabled="true"
                v-model="item.dependenciaId"
                :show-clear-button="true"
                :show-data-before-search="true"
                class="form-control"
                @value-changed="itemSelected"
                placeholder="Dependencia"
                value-expr="id"
                display-expr="nombre"
                item-template="item"
              >
                <template #item="{ data }">
                  {{ data.nombre }}
                </template>
                <DxValidator>
                  <DxRequiredRule />
                </DxValidator>
              </DxSelectBox>
            </div>
            <div class="col-md-9 mb-2">
              <label class="tit">Nombre</label>
              <DxTextBox
                id="nombre"
                value-change-event="keyup"
                :show-clear-button="true"
                v-model="item.nombre"
                class="form-control"
                placeholder="Nombre"
              >
                <DxValidator>
                  <DxRequiredRule />
                  <DxStringLengthRule :min="3" />
                </DxValidator>
              </DxTextBox>
            </div>
            <div class="col-md-12 mb-2">
              <label class="tit">Descripción</label>
              <DxTextArea
                :height="110"
                :max-length="400"
                value-change-event="keyup"
                :show-clear-button="true"
                id="descripcion"
                v-model="item.descripcion"
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
          <span v-html="titulo" />
        </span>
        <span>
          <button
            type="button"
            class="btn btn-trans"
            @click.prevent="addStart()"
            title="Nuevo"
          >
            <i class="fa-solid fa-square-plus"></i>NUEVO
          </button>
        </span>
      </div>

      <div class="card-body pt-3 pb-4">
        <div class="row">
          <div class="col">
            <!-- <h2 class="font-weight-normal text-7 mb-1 color-main"><strong class="font-weight-semibold">Indicadores</strong> Principal o Interna</h2> -->
            <!-- <DxDataGrid id="gridContainer" :customize-columns="customizeColumns" :data-source="dxStore" key-expr="id" :show-borders="true"></DxDataGrid> -->
            <DxDataGrid
              :customize-columns="customizeColumns"
              :data-source="dxStore"
              :hover-state-enabled="true"
              :remote-operations="true"
              :row-alternation-enabled="true"
              :show-borders="false"
              :word-wrap-enabled="false"
              id="gridContainer"
              @initialized="onInitialized"
            >
              <DxColumnChooser :enabled="true" mode="dragAndDrop" />
              <DxExport :enabled="true" />
              <DxFilterRow :visible="true" />
              <DxGrouping :auto-expand-all="true" />
              <DxGroupPanel :visible="true" :allow-column-dragging="true" />
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
                  display-format="{0}"
                />
              </DxSummary>
              <DxPaging :page-size="15" />
              <DxPager
                :visible="true"
                :show-info="true"
                :show-page-size-selector="false"
                :show-navigation-buttons="true"
                :allowed-page-sizes="[15, 50, 'Todos']"
                info-text="{2} productos (página {0} de {1})"
              />
              <DxColumn data-field="id" caption="Id" :visible="true" />
              <DxColumn
                data-field="nombre"
                caption="Producto"
                :visible="true"
              />
              <DxColumn
                data-field="descripcion"
                caption="Descripción"
                :visible="true"
              />
              <DxColumn
                data-field="dependenciaId"
                caption="Dependencia Id"
                :visible="false"
              />
              <DxColumn
                data-field="dependenciaNombre"
                caption="Dependencia"
                :visible="true"
              />
              <DxColumn
                :width="auth.esAdmin ? 100 : 50"
                alignment="center"
                cell-template="tpl"
                caption=""
                name="cmds"
                :fixed="true"
                fixed-position="right"
              />
              <template #tpl="{ data }">
                <span class="cmds" v-if="auth.esAdmin">
                  <a
                    title="Registrar avance en indicador"
                    class="cmd-item color-main-600 me-2"
                    @click.prevent="avanceStart(data.data)"
                    href="#"
                  >
                    <i class="fa-regular fa-square-plus fa-lg"></i>
                  </a>
                  <a
                    v-if="data.data.activo"
                    title="Desactivar indicador"
                    class="cmd-item color-main-600"
                    @click.prevent="active(data.data, false)"
                    href="#"
                  >
                    <i class="fa-regular fa-square-check fa-lg"></i>
                  </a>
                  <a
                    v-else
                    title="Activar indicador"
                    class="cmd-item color-main-600"
                    @click.prevent="active(data.data, true)"
                    href="#"
                  >
                    <i class="fa-regular fa-square-minus fa-lg"></i>
                  </a>
                  <a
                    title="Editar indicador"
                    class="cmd-item color-main-600 me-2"
                    @click.prevent="addStart(data.data)"
                    href="#"
                  >
                    <i class="fa-solid fa-pen-to-square fa-lg"></i>
                  </a>
                </span>
                <span class="cmds" v-else>
                  <a
                    title="Registrar avance en indicador"
                    class="cmd-item color-main-600"
                    @click.prevent="avanceStart(data.data)"
                    href="#"
                  >
                    <i class="fa-regular fa-square-plus fa-lg"></i>
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
          class="font-weight-semibold"
          >item_copy:</span
        >
        {{ item_copy }}
      </div>
    </div>
  </div>
</template>
