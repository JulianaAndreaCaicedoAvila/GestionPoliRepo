<script setup>
import api from "@/utils/api";
import DxStore from "@/utils/dx";
import List from "devextreme/ui/list";
import { useRoute } from "vue-router";
import NumberBox from "devextreme/ui/number_box";
import Cmds from "@/pages/admin/curso/_comandos.vue";
import { ref, toRaw, onMounted, getCurrentInstance } from "vue";
import { useClasificadorStore, useEncuestaStore, useAuthStore } from "@/stores";
import DxValidator, {
  DxRequiredRule,
  DxStringLengthRule,
} from "devextreme-vue/validator";
import {
  DxSelectBox,
  DxHtmlEditor,
  DxNumberBox,
  DxTextBox,
  DxTextArea,
  DxCheckBox,
  DxDateBox,
  DxValidationGroup,
  DxToolbar,
  DxMediaResizing,
  DxImageUpload,
  DxItem,
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
  store = useClasificadorStore(),
  encuestaStore = useEncuestaStore(),
  authStore = useAuthStore();
let titulo = "Encuestas",
  list1 = null,
  list2 = null,
  itemId = ref(null),
  valGroup = ref(null),
  dxStore = ref(null),
  encuestas = ref([]),
  momentos = ref([]),
  temas = ref([]),
  temasFrom = ref([]),
  temasTo = ref([]),
  fromData = ref([]),
  toData = ref([]),
  selRightClass = ref(""),
  selLeftClass = ref(""),
  item = ref({
    id: 0,
    cursoId: props.itemId,
    encuestaId: null,
    momentoId: null,
    activo: true,
    creadoEl: null,
    creadoPor: null,
    editadoEl: null,
    editadoPor: null,
    orden: 0,
  }),
  item_copy = Clone(item.value),
  panelData = null,
  panelGrid = null,
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
      text: `¿Realmente desea ${data.descripcion ? "desactivar" : "activar"
        } la encuesta "<span class="font-weight-semibold">${data.titulo}</span>"?`,
      onConfirm: () => {
        panelGrid = $("#grid-encuesta");
        panelGrid.lock(
          `${data.activo ? "Desactivando" : "Activando"}, un momento por favor`,
          async function () {
            data.activo = data.activo ? false : true;
            await api()
              .post(`cursoEncuesta/ed`, JSON.stringify(data))
              .then((r) => {
                console.log("r =>", r);
                cancel(function () {
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
    panelData = $("#data-encuesta");
    panelGrid = $("#grid-encuesta");
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
    panelGrid.fadeOut("normal", async function () {
      panelData.fadeIn(function () {
        panelGrid.unlock();
      });
    });
  },
  cancel = (cb) => {
    // console.clear();
    panelData = $("#data-encuesta");
    panelGrid = $("#grid-encuesta");
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
    panelData = $("#data-encuesta");
    panelGrid = $("#grid-encuesta");
    let result = valGroup.value.instance.validate();
    if (!result.isValid) {
      $.scrollTo($(".dx-invalid:first"), {
        duration: 600,
        offset: -110,
      });
    } else {
      // CUandoes válido
      panelData.lock(
        `${item.id == 0 ? "Adicionando" : "Actualizando"} encuestas`,
        async function () {
          let dto = toRaw(item.value);
          console.log("dto =>", dto);
          await api()
            .post(`cursoEncuesta/ed`, dto)
            .then((r) => {
              console.log("r =>", r);
              cancel(function () {
                emit('onRefresh');
                panelData.unlock();
                grid.refresh();
              });
            });
        }
      );
    }
  },
  getData = () => {
    dxStore.value = DxStore({
      key: ["id"],
      endPoint: "curso/encuestas-dx",
      userData: JSON.stringify({ id: props.itemId }),
      onLoading: function (loadOptions) {
        $("#grid-encuesta").lock("Cargando");
        console.log("loadOptions =>", loadOptions);
        console.log("onLoading");
      },
      onLoaded: function (results) {
        console.log("results", results);
        console.log("onLoaded!");
        $("#grid-encuesta").unlock();
        $("#data-encuesta").unlock();
      },
    })
  };

// Se expone como evento en el componente
const emit = defineEmits(['onCancel', 'onRefresh']);
const callOnCancel = () => {
  emit('onCancel');
}

// Propiedades
let props = defineProps({
  itemId: { type: Number, default: null, required: false },
  item: { type: Object, default: null, required: false },
  showRevision: { type: Boolean, default: false, required: false },
  showAprove: { type: Boolean, default: false, required: false }
});

onMounted(async () => {
  $("#grid-encuesta").lock("Cargando");
  console.log(_sep);
  console.log("curso-encuestas.vue MOUNTED!");
  encuestas.value = await encuestaStore.all();
  momentos.value = await store.porTipoNombre("momento_encuesta");
  console.log("temasAll =>", encuestas.value);
  list1 = List.getInstance(document.getElementById("list1"));
  list2 = List.getInstance(document.getElementById("list2"));
  console.log("route.name =>", route.name);
  itemId.value = props.itemId;
  item.value = props.item;
  getData();
});
</script>
<template>
  <div class="container content">
    <div class="card data hidden" id="data-encuesta">
      <!-- {{ item }} -->
      <!-- <div class="card-header main d-flex justify-content-between">
        <span>
          <i class="fa-solid fa-gears"></i>
          <span v-html="titulo" /> &raquo;
          <span id="tit-action">Asociar Tema</span>
        </span>
      </div> -->

      <DxValidationGroup ref="valGroup">
        <div class="card-body pt-3 pb-4">
          <div class="row">
            <div class="col-md-8 mb-3">
              <label class="tit">Encuesta</label>
              <DxSelectBox id="encuestaId" :data-source="encuestas" :grouped="false" :min-search-length="2"
                :search-enabled="true" v-model="item.encuestaId" :show-clear-button="true" :show-data-before-search="true"
                class="form-control" placeholder="Encuesta" value-expr="id" display-expr="titulo">
                <DxValidator>
                  <DxRequiredRule />
                </DxValidator>
              </DxSelectBox>
            </div>
            <div class="col-md-4 mb-3">
              <label class="tit">Momento de ejecución</label>
              <DxSelectBox id="temaId" :data-source="momentos" :grouped="false" :min-search-length="2"
                :search-enabled="true" v-model="item.momentoId" :show-clear-button="true" :show-data-before-search="true"
                class="form-control" placeholder="Momento de ejecución" value-expr="id" display-expr="nombre">
                <DxValidator>
                  <DxRequiredRule />
                </DxValidator>
              </DxSelectBox>
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

    <div class="row" id="grid-encuesta">
      <div class="col-md-12 text-end pb-2" v-if="!props.showAprove">
        <a href="#" class="btn pe-0" @click.prevent="addStart()"><i class="fa-solid fa-square-plus me-1"></i>Asociar
          encuesta</a>
      </div>
      <div class="col-md-12">
        <DxDataGrid :customize-columns="customizeColumns" :data-source="dxStore" :hover-state-enabled="true"
          :remote-operations="true" :word-wrap-enabled="true" :row-alternation-enabled="true" :show-borders="false"
          id="gridContainer" @initialized="onInitialized">
          <DxLoadPanel :enabled="false" />
          <DxFilterRow :visible="false" />
          <DxSorting mode="single" />
          <DxSummary>
            <DxGroupItem summary-type="count" column="group_type_name" display-format="{0}" />
          </DxSummary>
          <DxPaging :page-size="15" />
          <DxPager :visible="true" :show-info="true" :show-page-size-selector="false" :show-navigation-buttons="true"
            :allowed-page-sizes="[15, 50, 'Todos']" info-text="{2} encuestas (página {0} de {1})" />
          <DxColumn data-field="id" caption="Id" :visible="false" :width="80" :allow-filtering="false"
            :allow-sorting="true" alignment="center" />
          <DxColumn data-field="descripcion" caption="Encuesta" :visible="true" />
          <DxColumn data-field="preguntas" caption="Preguntas" alignment="center" :visible="true" width="150" />
          <DxColumn data-field="momentoNombre" caption="Ejecución" :visible="true" alignment="center" width="150" />
          <DxColumn :width="100" data-field="activo" caption="Activo" alignment="center" :visible="true"
            cell-template="tpl1">
            <DxLookup :data-source="$si_no" value-expr="value" display-expr="name" />
          </DxColumn>
          <template #tpl1="{ data }">
            <span v-if="data.data.activo">SI</span>
            <span v-else>NO</span>
          </template>
          <DxColumn :width="70" alignment="center" cell-template="tpl" caption="" name="cmds" :fixed="true"
            fixed-position="right" v-if="!props.showAprove" />
          <template #tpl="{ data }">
            <span class="cmds">
              <a title="Editar" class="cmd-item color-main-600 me-2" @click.prevent="addStart(data.data)" href="#">
                <i class="fa-solid fa-pen-to-square fa-lg"></i>
              </a>
              <a v-if="data.data.activo" title="Desactivar" class="cmd-item color-main-600"
                @click.prevent="active(data.data, false)" href="#">
                <i class="fa-regular fa-square-minus fa-lg"></i>
              </a>
              <a v-else title="Activar" class="cmd-item color-main-600" @click.prevent="active(data.data, true)" href="#">
                <i class="fa-regular fa-square-check fa-lg"></i>
              </a>
            </span>
          </template>
        </DxDataGrid>
      </div>
    </div>

    <!-- {{ item }} -->

    <Cmds :show-revision="showRevision" :show-aprove="showAprove" v-if="item" :item="item" :item-id="item.id"
      @on-cancel="callOnCancel" />

    <div class="card mt-4" v-if="$conf.debug">
      <div class="card-body">
        <span class="font-weight-semibold">item:</span> {{ item }}<br /><span
          class="font-weight-semibold">item_copy:</span>
        {{ item_copy }}
      </div>
    </div>
  </div>
</template>
