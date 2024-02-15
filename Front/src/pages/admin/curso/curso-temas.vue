<script setup>
import api from "@/utils/api";
import DxStore from "@/utils/dx";
import List from "devextreme/ui/list";
import { useRoute } from "vue-router";
import NumberBox from "devextreme/ui/number_box";
import Cmds from "@/pages/admin/curso/_comandos.vue";
import { ref, toRaw, onMounted, getCurrentInstance } from "vue";
import { useTemaStore, useEncuestaStore, useAuthStore } from "@/stores";
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
  temaStore = useTemaStore(),
  encuestaStore = useEncuestaStore(),
  authStore = useAuthStore();
let titulo = "Temas",
  gridData = [],
  list1 = null,
  list2 = null,
  itemId = ref(null),
  muestraComandos = ref(true),
  valGroup = ref(null),
  dxStore = ref(null),
  docentes = ref([]),
  items = ref([]),
  temasAll = ref([]),
  temasIds = ref([]),
  tema = ref({
    id: 0,
    cursoId: props.itemId,
    temaId: null,
    docenteId: null,
    lugarRealizacion: null,
    direccionRealizacion: null,
    activo: true,
    creadoEl: null,
    creadoPor: null,
    editadoEl: null,
    editadoPor: null,
    orden: 0,
  }),
  tema_copy = Clone(tema.value),
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
      text: `¿Realmente desea ${data.activo ? "desactivar" : "activar"
        } el tema "<span class="font-weight-semibold">${data.temaNombre
        }</span>"?`,
      onConfirm: () => {
        panelGrid = $("#grid-tema");
        panelGrid.lock(
          `${data.activo ? "Desactivando" : "Activando"}, un momento por favor`,
          async function () {
            data.activo = data.activo ? false : true;
            await api()
              .post(`cursoTema/ed`, JSON.stringify(data))
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
    // console.clear();
    console.log(_sep);
    valGroup.value.instance.reset();
    console.log("data =>", data);
    panelData = $("#data-tema");
    panelGrid = $("#grid-tema");
    panelGrid.lock("Cargando");
    console.log("temasIds =>", temasIds);
    console.log("temasAll.value =>", temasAll.value);
    if (typeof data !== "undefined") {
      console.log("EDITANDO");
      let temasIdsSinActual = temasIds.filter(id => id !== data.temaId);
      let temasFiltered = toRaw(temasAll.value).filter(o => !temasIdsSinActual.includes(o.id));
      items.value = temasFiltered;
      console.log("temasFiltered =>", temasFiltered);
      $("#tit-action").text("Editar Tema");
      tema.value = Clone(data);
    } else {
      console.log("CREANDO");
      // 202402142209: Filtra para obtener los temas que aun no se hayan relacionado
      let temasFiltered = toRaw(temasAll.value).filter(o => !temasIds.includes(o.id));
      console.log("temasFiltered =>", temasFiltered);
      items.value = temasFiltered;
      $("#tit-action").text("Nuevo Tema");
      tema.value = Clone(tema_copy);
    }
    let ids = [];
    let topics =
      tema.value.id == 0 ? [] : await temaStore.porCursoId(tema.value.id);
    topics.forEach((topics) => {
      ids.push(topics.temaId);
    });
    console.log("topics =>", topics); // [{id: 5, encuestaId:8, preguntaId: 6},{id: 2, encuestaId:8, preguntaId: 6}]
    console.log("ids =>", ids); // [2, 3, 5, 6]
    panelGrid.fadeOut("normal", async function () {
      console.log(typeof data);
      panelData.fadeIn(function () {
        panelGrid.unlock();
      });
      panelData.fadeIn("normal", function () {
        console.log(_sep);
        console.log("item =>", tema.value);
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
        tema.value = Clone(tema_copy);
        console.log("item =>", tema);
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
    panelData = $("#data-tema");
    panelGrid = $("#grid-tema");
    let result = valGroup.value.instance.validate();
    if (!result.isValid) {
      $.scrollTo($(".dx-invalid:first"), {
        duration: 600,
        offset: -110,
      });
    } else {
      // CUandoes válido
      panelData.lock(
        `${tema.id == 0 ? "Adicionando" : "Actualizando"} temas`,
        async function () {
          let dto = toRaw(tema.value);
          console.log("dto =>", dto);
          await api()
            .post(`cursoTema/ed`, dto)
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
      endPoint: "curso/temas-dx",
      userData: JSON.stringify({ id: props.itemId }),
      onLoading: function (loadOptions) {
        $("#grid-tema").lock("Cargando");
        console.log("loadOptions =>", loadOptions);
        console.log("onLoading");
      },
      onLoaded: function (results) {
        gridData = toRaw(results.data);
        temasIds = gridData.map(o => o.temaId);
        console.log("onLoaded =>", results);
        console.log("gridData =>", gridData);
        console.log("temasIds =>", temasIds);
        $("#grid-tema").unlock();
        $("#data-tema").unlock();
      },
    });
  };

// Se expone como evento en el componente
const emit = defineEmits(["onCancel"]);
const callOnCancel = () => {
  emit("onCancel");
};

// Propiedades
let props = defineProps({
  itemId: { type: Number, default: null, required: false },
  item: { type: Object, default: null, required: false },
  showRevision: { type: Boolean, default: false, required: false },
  showAprove: { type: Boolean, default: false, required: false },
  showSave: { type: Boolean, default: true, required: false }
});

onMounted(async () => {
  $("#grid-tema").lock("Cargando");
  console.log(_sep);
  console.log("curso-temas.vue MOUNTED!");
  itemId.value = props.itemId;
  tema.value = props.item;
  temasAll.value = await temaStore.porDependenciaId(tema.value.dependenciaId);
  items.value = toRaw(temasAll.value);
  console.log("temas =>", items.value);
  docentes.value = await authStore.porRol("DOCENTE");
  list1 = List.getInstance(document.getElementById("list1"));
  list2 = List.getInstance(document.getElementById("list2"));
  console.log("route.name =>", route.name);
  if (props.showAprove) muestraComandos.value = false;
  if (!props.showAprove && !props.showRevision) muestraComandos.value = false;
  console.log("muestraComandos =>", muestraComandos.value);
  getData();
});
</script>
<template>
  <div class="container content">
    <div class="card data hidden mt-4" id="data-tema">
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
            <div class="col-md-12 mb-3">
              <label class="tit">Tema</label>
              <DxSelectBox id="temaId" :data-source="items" :grouped="false" :min-search-length="2" :search-enabled="true"
                v-model="tema.temaId" :show-clear-button="true" :show-data-before-search="true" class="form-control"
                placeholder="Tema" value-expr="id" display-expr="nombre">
                <DxValidator>
                  <DxRequiredRule />
                </DxValidator>
              </DxSelectBox>
            </div>
            <div class="col-md-4 mb-3">
              <label class="tit">Docente</label>
              <DxSelectBox id="temaId" :data-source="docentes" :grouped="false" :min-search-length="2"
                :search-enabled="true" v-model="tema.docenteId" :show-clear-button="true" :show-data-before-search="true"
                class="form-control" placeholder="Docente" value-expr="id" display-expr="name" />
            </div>
            <div class="col-md-4">
              <label class="tit">Dirección de realización</label>
              <DxTextBox id="nombre" value-change-event="keyup" :show-clear-button="true"
                v-model="tema.direccionRealizacion" class="form-control" placeholder="Dirección"
                @focus-out="$capitalizeAll" />
            </div>
            <div class="col-md-4">
              <label class="tit">Lugar de realización</label>
              <DxTextBox id="nombre" value-change-event="keyup" :show-clear-button="true" v-model="tema.lugarRealizacion"
                class="form-control" placeholder="Lugar realización" @focus-out="$capitalizeAll" />
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

    <div class="row" id="grid-tema">
      <div class="col-md-12 text-end pb-2" v-if="muestraComandos">
        <a href="#" class="btn pe-0" @click.prevent="addStart()"><i class="fa-solid fa-square-plus me-1"></i>Asociar
          tema</a>
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
            :allowed-page-sizes="[15, 50, 'Todos']" info-text="{2} temas (página {0} de {1})" />
          <DxColumn data-field="id" caption="Id" :visible="false" :width="80" :allow-filtering="false"
            :allow-sorting="true" alignment="center" />
          <DxColumn data-field="temaNombre" caption="Tema" :visible="true" />
          <DxColumn data-field="dependenciaNombre" caption="Dependencia" :visible="true" width="120" />
          <DxColumn data-field="docenteNombre" caption="Docente" :visible="true" />
          <DxColumn data-field="lugarRealizacion" caption="Lugar" :visible="true" width="120" />
          <DxColumn data-field="direccionRealizacion" caption="Dirección" :visible="true" width="120" />
          <DxColumn :width="100" data-field="activo" caption="Activo" alignment="center" :visible="true"
            cell-template="tpl1">
            <DxLookup :data-source="$si_no" value-expr="value" display-expr="name" />
          </DxColumn>
          <template #tpl1="{ data }">
            <span v-if="data.data.activo">SI</span>
            <span v-else>NO</span>
          </template>
          <DxColumn :width="70" alignment="center" cell-template="tpl" caption="" name="cmds" :fixed="true"
            fixed-position="right" v-if="muestraComandos" />
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

    <Cmds :show-revision="showRevision" :show-aprove="showAprove" v-if="tema" :item="tema" :item-id="tema.id"
      @on-cancel="callOnCancel" />
  </div>
</template>
