<script setup>
import api from "@/utils/api";
import DxStore from "@/utils/dx";
import List from "devextreme/ui/list";
import { useRoute } from "vue-router";
import NumberBox from "devextreme/ui/number_box";
import { ref, toRaw, onMounted, getCurrentInstance } from "vue";
import { useTemaStore, useEncuestaStore, useAuthStore } from "@/stores";
import DxValidator, {
  DxRequiredRule,
  DxStringLengthRule,
} from "devextreme-vue/validator";
import {
  DxTextBox,
  DxTextArea,
  DxValidationGroup,
  DxList,
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
  DxLookup,
  DxGroupPanel,
  DxLoadPanel,
  DxPager,
  DxPaging,
  DxSearchPanel,
  DxSorting,
  DxSummary,
} from "devextreme-vue/data-grid";
const route = useRoute(),
  temaStore = useTemaStore(),
  encuestaStore = useEncuestaStore(),
  auth = useAuthStore();
let titulo = "Temas",
  list1 = null,
  list2 = null,
  valGroup = ref(null),
  temasAll = ref([]),
  temas = ref([]),
  temasFrom = ref([]),
  temasTo = ref([]),
  fromData = ref([]),
  toData = ref([]),
  selRightClass = ref(""),
  selLeftClass = ref(""),
  item = ref({
    id: 0,
    nombre: null,
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
      $("#grid-tema").lock("Cargando");
      console.log("loadOptions =>", loadOptions);
      console.log("onLoading");
    },
    onLoaded: function (results) {
      console.log("results", results);
      console.log("onLoaded!");
      $("#grid-tema").unlock();
      $("#data-tema").unlock();
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
  active = (data) => {
    // console.clear();
    console.log("data =>", data);
    msg.confirm({
      // title: "otro",
      textCancel: "CANCELAR",
      textOk: data.activo ? "DESACTIVAR" : "ACTIVAR",
      text: `¿Realmente desea ${data.activo ? "desactivar" : "activar"
        } el Tema "<span class="font-weight-semibold">${data.titulo}</span>"?`,
      onConfirm: () => {
        panelGrid = $("#grid-tema");
        panelGrid.lock(
          `${data.activo ? "Desactivando" : "Activando"}, un momento por favor`,
          async function () {
            data.activo = data.activo ? false : true;
            await api()
              .post(`curso/ed-tema`, data)
              .then((r) => {
                console.log("r =>", r);
                temaStore.limpiar();
                cancel(function () {
                  // panelGrid.unlock();
                  grid.refresh();
                });
                return r.data;
              });
          }
        );
      },
      onCancel: () => { },
    });
  },
  addStart = async (data) => {
    console.clear();
    valGroup.value.instance.reset();
    console.log("data =>", data);
    panelData = $("#data-tema");
    panelGrid = $("#grid-tema");
    panelGrid.lock("Cargando");
    // Editando
    if (typeof data !== "undefined") {
      $("#tit-action").text("Editar Tema");
      item.value = Clone(data);
    } else {
      // Creando
      $("#tit-action").text("Nuevo Tema");
      item.value = Clone(item_copy);
    }
    let ids = [];
    let topics =
      item.value.id == 0 ? [] : await temaStore.byCursoId(item.value.id);
    topics.forEach((topics) => {
      ids.push(topics.temaId);
    });
    console.log("topics =>", topics); // [{id: 5, encuestaId:8, preguntaId: 6},{id: 2, encuestaId:8, preguntaId: 6}]
    console.log("ids =>", ids); // [2, 3, 5, 6]
    panelGrid.fadeOut("normal", async function () {
      console.log(typeof data);
      // preguntasAll.value = await preguntaStore.all();
      // preguntas.value = Object.assign([], preguntasAll.value).filter(
      //   (o) => o.territorialId == null
      // );
      let q = Object.assign([], temasAll.value);
      // preguntasFrom.value = q;
      temasFrom.value = q.filter((o) => !ids.includes(o.id));
      console.log("Temas =>", toRaw(temas.value));
      // TODO: Asociar al store dptosTo.value = geoStore.dptosPorTerritorialId(data.id);
      temasTo.value = q.filter((o) => ids.includes(o.id));
      console.log("temasTo =>", toRaw(temasTo.value));
      updateButtons();
      panelData.fadeIn(function () {
        panelGrid.unlock();
      });
      panelData.fadeIn("normal", function () {
        console.log(_sep);
        console.log("item =>", item.value);
        panelGrid.unlock();
      });
    });
  },
  cancel = (cb) => {
    // console.clear();
    panelData = $("#data-tema");
    panelGrid = $("#grid-tema");
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
  },
  save = async () => {
    console.clear();
    let result = valGroup.value.instance.validate();
    if (!result.isValid) {
      $.scrollTo($(".dx-invalid:first"), {
        duration: 600,
        offset: -110,
      });
    } else {
      // CUandoes válido
      panelData.lock(
        `${item.id == 0 ? "Adicionando" : "Actualizando"} Temas`,
        async function () {
          let registro = r.data;
          let dto = {
            cursoId: registro.id,
            temas: [],
          };
          console.log("Registro =>", registro);
          console.log("temasTo =>", toRaw(temasTo));
          temasTo.value.forEach((tema) => {
            dto.temas.push({
              id: 0,
              cursoId: registro.id,
              temaId: tema.id,
              activo: true,
            });
          });
          console.log("DTO =>", dto);
          await api({ hideErrors: true })
            .post("curso/ed-tema", dto)
            .then((r) => {
              cancel(function () {
                panelData.unlock();
                grid.refresh();
              });
            });
        }
      );
    }
  };
function moveSelectedRight() {
  console.clear();
  var items = list1.option("selectedItems");
  console.log("items =>", toRaw(items));
  items.forEach((item) => {
    for (var x = 0; x < temasFrom.value.length; x++) {
      var current = temasFrom.value[x];
      // console.log(`${item.id} == ${current.id}`);
      if (item.id == current.id) {
        temasFrom.value.splice(x, 1);
        temasTo.value.push(current);
        x--;
      }
    }
  });
  updateButtons();
}
function moveSelectedLeft() {
  console.clear();
  console.log("list2 =>", list2);
  var items = list2.option("selectedItems");
  console.log("items =>", toRaw(items));
  items.forEach((item) => {
    for (var x = 0; x < temasTo.value.length; x++) {
      var current = temasTo.value[x];
      // console.log(`${item.id} == ${current.id}`);
      if (item.id == current.id) {
        temasTo.value.splice(x, 1);
        temasFrom.value.push(current);
        x--;
      }
    }
  });
  updateButtons();
}
function moveAllRight() {
  temasFrom.value = [];
  temasTo.value = Object.assign([], temasAll.value);
  updateButtons();
}
function moveAllLeft() {
  temasFrom.value = Object.assign([], temasAll.value);
  temasTo.value = [];
  updateButtons();
}
function updateButtons() {
  temasTo.value = temasTo.value.sort((a, b) => a.nombre - b.nombre);
  temasFrom.value = temasFrom.value.sort((a, b) => a.nombre - b.nombre);
  list1.reload();
  list2.reload();
  selRightClass.value = temasFrom.value.length > 0 ? "" : "disabled";
  selLeftClass.value = temasTo.value.length > 0 ? "" : "disabled";
}

onMounted(async () => {
  // console.clear();
  // console.log(_sep);
  $("#grid-tema").lock("Cargando");
  temasAll.value = await temaStore.all();
  console.log("temasAll =>", temasAll.value);
  list1 = List.getInstance(document.getElementById("list1"));
  list2 = List.getInstance(document.getElementById("list2"));
  // console.log("route.name =>", route.name);
});
</script>
<template>
  <div class="container content">
    <div class="card data hidden" id="data-tema">
      <div class="card-header main d-flex justify-content-between">
        <span>
          <i class="fa-solid fa-gears"></i>
          <span v-html="titulo" /> &raquo;
          <span id="tit-action">Agregar Tema</span>
        </span>
      </div>

      <DxValidationGroup ref="valGroup">
        <div class="card-body pt-3 pb-4">
          <div class="row">
            <div class="col-md-12 pb-2">
              <div class="row">
                <div class="col pb-2">
                  <label class="tit">Temas disponibles</label>
                  <DxList id="list1" v-model:selected-item-keys="fromData" :data-source="temasFrom" :height="250"
                    page-load-mode="scrollBottom" :search-enabled="false" display-expr="nombre" value-expr="id"
                    :show-selection-controls="true" search-mode="contains" selection-mode="multiple"
                    select-all-mode="allPages" :select-by-click="true" />
                </div>
                <div class="col-md-1 pb-2 d-flex flex-column justify-content-center align-items-center">
                  <a href="#" @click.prevent="moveSelectedRight()" :class="`d-block mb-2 ${selRightClass}`"><i
                      class="fa-solid fa-chevron-right fa-2x"></i></a>
                  <a href="#" @click.prevent="moveAllRight()" :class="`d-block mb-2 ${selRightClass}`"><i
                      class="fa-solid fa-chevrons-right fa-2x"></i></a>
                  <a href="#" @click.prevent="moveSelectedLeft()" :class="`d-block mb-2 ${selLeftClass}`"><i
                      class="fa-solid fa-chevron-left fa-2x"></i></a>
                  <a href="#" @click.prevent="moveAllLeft()" :class="`d-block ${selLeftClass}`"><i
                      class="fa-solid fa-chevrons-left fa-2x"></i></a>
                </div>
                <div class="col pb-2">
                  <label class="tit">Temas seleccionados</label>
                  <DxList id="list2" v-model:selected-item-keys="toData" :data-source="temasTo" :height="250"
                    page-load-mode="scrollBottom" :search-enabled="false" display-expr="nombre" value-expr="id"
                    :show-selection-controls="true" search-mode="contains" selection-mode="multiple"
                    select-all-mode="allPages" :select-by-click="true" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </DxValidationGroup>

      <div class="card-footer">
        <div class="d-flex justify-content-between align-items-center">
          <a class="btn btn-gray" @click.prevent="cancel"><i class="fa-solid fa-circle-xmark"></i>&nbsp;&nbsp;CANCELAR</a>
          <a class="btn btn-main" @click.prevent="save">GUARDAR&nbsp;&nbsp;<i class="fa-solid fa-floppy-disk"></i></a>
        </div>
      </div>
    </div>

    <div class="card content" id="grid-tema">
      <div class="card-header main d-flex justify-content-between">
        <span>
          <i class="fa-solid fa-gears"></i>
          <span v-html="titulo" />
        </span>
        <span>
          <button type="button" class="btn btn-trans" @click.prevent="addStart()" title="Nuevo">
            <i class="fa-solid fa-square-plus"></i>Adicionar Temas
          </button>
        </span>
      </div>

      <div class="card-body pt-3 pb-4">
        <div class="row">
          <div class="col">
            <!-- <h2 class="font-weight-normal text-7 mb-1 color-main"><strong class="font-weight-semibold">Indicadores</strong> Principal o Interna</h2> -->
            <!-- <DxDataGrid id="gridContainer" :customize-columns="customizeColumns" :data-source="dxStore" key-expr="id" :show-borders="true"></DxDataGrid> -->
            <DxDataGrid :customize-columns="customizeColumns" :data-source="dxStore" :hover-state-enabled="true"
              :remote-operations="true" :word-wrap-enabled="true" :row-alternation-enabled="true" :show-borders="false"
              id="gridContainer" @initialized="onInitialized">
              <DxLoadPanel :enabled="false" />
              <DxFilterRow :visible="true" />
              <!-- <DxColumnChooser :enabled="true" mode="dragAndDrop" />
							<DxExport :enabled="true" />
							
							<DxGrouping :auto-expand-all="true" />
							<DxGroupPanel :visible="true" :allow-column-dragging="true" />
							<DxScrolling row-rendering-mode="virtual" />
							<DxSearchPanel :visible="false" :highlight-case-sensitive="false" /> -->
              <DxSorting mode="single" /><!-- single, multiple, none" -->
              <DxSummary>
                <DxGroupItem summary-type="count" column="group_type_name" display-format="{0}" />
              </DxSummary>
              <DxPaging :page-size="15" />
              <DxPager :visible="true" :show-info="true" :show-page-size-selector="false" :show-navigation-buttons="true"
                :allowed-page-sizes="[15, 50, 'Todos']" info-text="{2} temas (página {0} de {1})" />
              <DxColumn data-field="id" caption="Id" :visible="true" :width="80" :allow-filtering="false"
                :allow-sorting="true" alignment="center" />
              <DxColumn data-field="nombre" caption="Nombre Tema" :visible="true" />
              <DxColumn :width="100" data-field="activo" caption="Activo" alignment="center" :visible="true"
                cell-template="tpl1">
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
                  <a title="Editar" class="cmd-item color-main-600 me-2" @click.prevent="addStart(data.data)" href="#">
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
