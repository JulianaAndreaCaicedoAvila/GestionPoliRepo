<script setup>
import api from "@/utils/api";
import DxStore from "@/utils/dx";
import List from "devextreme/ui/list";
import { useRoute } from "vue-router";
import NumberBox from "devextreme/ui/number_box";
import { ref, toRaw, onMounted, getCurrentInstance } from "vue";
import {
  useTemaStore,
  useEncuestaStore,
  useAuthStore,
  useClasificadorStore,
  useGeografiaStore,
} from "@/stores";
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
  store = useClasificadorStore(),
  geoStore = useGeografiaStore(),
  storeAuth = useAuthStore();
let titulo = "Temas",
  tipoDocumento = ref([]),
  departamentos = ref([]),
  municipios = ref([]),
  genero = ref([]),
  nivelEscolar = ref([]),
  estadoCivil = ref([]),
  list1 = null,
  list2 = null,
  itemId = ref(null),
  valGroup = ref(null),
  dxStore = ref(null),
  docentes = ref([]),
  temas = ref([]),
  entidad = ref([]),
  temasFrom = ref([]),
  temasTo = ref([]),
  fromData = ref([]),
  toData = ref([]),
  selRightClass = ref(""),
  selLeftClass = ref(""),
  item = ref({
    id: 0,
    cursoId: props.itemId,
    tipoDocumentoId: null,
    departamentoId: null,
    municipioId: null,
    entidad: null,
    genero: null,
    nivelEscolar: null,
    estadoCivil: null,
    cargoActual: null,
    documentoIdentidad: null,
    nombres: null,
    apellidos: null,
    fechaNacimiento: new Date(),
    profesion: null,
    teleno: null,
    celular: null,
    correo: null,
    direccion: null,
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
      text: `¿Realmente desea ${
        data.activo ? "desactivar" : "activar"
      } el tema "<span class="font-weight-semibold">${
        data.temaNombre
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
      onCancel: () => {},
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
      // updateButtons();
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
        `${item.id == 0 ? "Adicionando" : "Actualizando"} temas`,
        async function () {
          let dto = toRaw(item.value);
          console.log("dto =>", dto);
          await api()
            .post(`cursoTema/ed`, dto)
            .then((r) => {
              console.log("r =>", r);
              cancel(function () {
                panelData.unlock();
                grid.refresh();
              });
            });
        }
      );
    }
  };
let itemSelected = async (e) => {
  console.log(_sep);
  console.log("itemSelected =>", e);
  let v = e.value;
  let id = $(e.element).attr("id");
  console.log("id =>", id);
  console.log("v =>", v);
  if (id == "departamentoId") {
    municipios.value = [];
    municipioId.value = null;
    if (v !== null && v !== undefined)
      municipios.value = await geoStore.municipiosPorDepartamentoId(v);
  }
};

// Propiedades
let props = defineProps({
  itemId: { type: Number, default: null, required: false },
  item: { type: Object, default: null, required: false },
});

onMounted(async () => {
  // $("#grid-tema").lock("Cargando");
  // console.log(_sep);
  // console.log("curso-tema.vue MOUNTED!");
  // temasAll.value = await temaStore.all();
  // docentes.value = await storeAuth.porRol("DOCENTE");
  // console.log("temasAll =>", temasAll.value);
  // list1 = List.getInstance(document.getElementById("list1"));
  // list2 = List.getInstance(document.getElementById("list2"));
  // // console.log("route.name =>", route.name);
  tipoDocumento.value = await store.porTipoNombre("tipo_documento_identidad");
  genero.value = await store.porTipoNombre("genero");
  nivelEscolar.value = await store.porTipoNombre("nivel_escolar");
  estadoCivil.value = await store.porTipoNombre("estado_civil");
  entidad.value = await store.porTipoNombre("entidad");
  departamentos.value = await geoStore.dptoAll();
  console.log("nivel Escolar =>", nivelEscolar.value);
  // console.log("tipo documentos =>", tipoDocumento.value);
  console.log("genero =>", genero.value);
  itemId.value = props.itemId;
  item.value = props.item;
  // getData();
});
</script>
<template>
  <div class="container content">
    <div class="card data mb-5 pb-5" id="data-datos">
      <DxValidationGroup ref="valGroup">
        <div class="card-body pt-3 pb-4">
          <div class="row">
            <div class="col-md-12">
              <h4 class="mb-3 pb-2 bbd">Información personal</h4>
            </div>
            <div class="col-md-6">
              <div class="row">
                <div class="col-md-4 mb-3">
                  <label class="tit">Tipo de documento</label>
                  <DxSelectBox
                    id="tipoDocumentoId"
                    :data-source="tipoDocumento"
                    :grouped="false"
                    :min-search-length="2"
                    :search-enabled="true"
                    v-model="item.tipoDocumentoId"
                    :show-clear-button="true"
                    :show-data-before-search="true"
                    class="form-control"
                    placeholder="Tipo"
                    value-expr="id"
                    display-expr="nombre"
                  >
                    <DxValidator>
                      <DxRequiredRule />
                    </DxValidator>
                  </DxSelectBox>
                </div>
                <div class="col-md-4 mb-3">
                  <label class="tit">Documento</label>
                  <DxTextBox
                    id="documento"
                    value-change-event="keyup"
                    :show-clear-button="true"
                    v-model="item.documentoIdentidad"
                    class="form-control"
                    placeholder="Documento"
                    @focus-out="$capitalizeAll"
                  >
                    <DxValidator>
                      <DxRequiredRule />
                    </DxValidator>
                  </DxTextBox>
                </div>
                <div class="col-md-4 mb-3">
                  <label class="tit">Género</label>
                  <DxSelectBox
                    id="genero"
                    :data-source="genero"
                    :grouped="false"
                    :min-search-length="2"
                    :search-enabled="true"
                    v-model="item.genero"
                    :show-clear-button="true"
                    :show-data-before-search="true"
                    class="form-control"
                    placeholder="Género"
                    value-expr="id"
                    display-expr="nombre"
                  >
                    <DxValidator>
                      <DxRequiredRule />
                    </DxValidator>
                  </DxSelectBox>
                </div>
              </div>
            </div>
            <div class="col-md-3 mb-3">
              <label class="tit">Nombres</label>
              <DxTextBox
                id="nombre"
                value-change-event="keyup"
                :show-clear-button="true"
                :v-model="item.nombres"
                class="form-control"
                placeholder="Nombres"
                @focus-out="$capitalizeAll"
              >
                <DxValidator>
                  <DxRequiredRule />
                </DxValidator>
              </DxTextBox>
            </div>
            <div class="col-md-3 mb-3">
              <label class="tit">Apellidos</label>
              <DxTextBox
                id="apellidos"
                value-change-event="keyup"
                :show-clear-button="true"
                :v-model="item.apellidos"
                class="form-control"
                placeholder="Apellidos"
                @focus-out="$capitalizeAll"
              >
                <DxValidator>
                  <DxRequiredRule />
                </DxValidator>
              </DxTextBox>
            </div>
            <div class="col-md-3 mb-3">
              <label class="tit">Fecha de nacimiento</label>
              <DxDateBox
                id="fechaNacimiento"
                value-change-event="keyup"
                :show-clear-button="true"
                :v-model="item.fechaNacimiento"
                class="form-control"
                placeholder="Fecha"
                @focus-out="$capitalizeAll"
              >
                <DxValidator>
                  <DxRequiredRule />
                </DxValidator>
              </DxDateBox>
            </div>
            <div class="col-md-3 mb-3">
              <label class="tit">Profesión</label>
              <DxTextBox
                id="profesion"
                value-change-event="keyup"
                :show-clear-button="true"
                :v-model="item.profesion"
                class="form-control"
                placeholder="Profesión"
                @focus-out="$capitalizeAll"
              >
                <DxValidator>
                  <DxRequiredRule />
                </DxValidator>
              </DxTextBox>
            </div>
            <div class="col-md-3 mb-3">
              <label class="tit">Nivel escolar</label>
              <DxSelectBox
                id="nivelEscolar"
                :data-source="nivelEscolar"
                :grouped="false"
                :min-search-length="2"
                :search-enabled="true"
                :show-clear-button="true"
                :show-data-before-search="true"
                v-model="item.nivelEscolar"
                class="form-control"
                placeholder="Nivel escolar"
                value-expr="id"
                display-expr="nombre"
              >
                <DxValidator>
                  <DxRequiredRule />
                </DxValidator>
              </DxSelectBox>
            </div>
            <div class="col-md-3 mb-3">
              <label class="tit">Estado civil</label>
              <DxSelectBox
                id="estadoCivil"
                :data-source="estadoCivil"
                :grouped="false"
                :min-search-length="2"
                :search-enabled="true"
                :show-clear-button="true"
                :show-data-before-search="true"
                v-model="item.estadoCivil"
                class="form-control"
                placeholder="Estado civil"
                value-expr="id"
                display-expr="nombre"
              >
                <DxValidator>
                  <DxRequiredRule />
                </DxValidator>
              </DxSelectBox>
            </div>
            <div class="col-md-7">
              <div class="row">
                <div class="col-md-3 mb-3">
                  <label class="tit">Teléfono</label>
                  <DxTextBox
                    id="telefono"
                    value-change-event="keyup"
                    :show-clear-button="true"
                    v-model="item.telefono"
                    class="form-control"
                    placeholder="Teléfono"
                    @focus-out="$capitalizeAll"
                  >
                    <DxValidator>
                      <DxRequiredRule />
                    </DxValidator>
                  </DxTextBox>
                </div>
                <div class="col-md-4 mb-3">
                  <label class="tit">Celular</label>
                  <DxTextBox
                    id="celular"
                    value-change-event="keyup"
                    :show-clear-button="true"
                    v-model="item.celular"
                    class="form-control"
                    placeholder="Celular"
                    @focus-out="$capitalizeAll"
                  >
                    <DxValidator>
                      <DxRequiredRule />
                    </DxValidator>
                  </DxTextBox>
                </div>
                <div class="col-md-5 mb-3">
                  <label class="tit">Correo</label>
                  <DxTextBox
                    id="correo"
                    value-change-event="keyup"
                    :show-clear-button="true"
                    v-model="item.correo"
                    class="form-control"
                    placeholder="Correo"
                    @focus-out="$capitalizeAll"
                  >
                    <DxValidator>
                      <DxRequiredRule />
                    </DxValidator>
                  </DxTextBox>
                </div>
              </div>
            </div>
            <div class="col-md-5 mb-3">
              <label class="tit">Dirección</label>
              <DxTextBox
                id="direccion"
                value-change-event="keyup"
                :show-clear-button="true"
                v-model="item.direccion"
                class="form-control"
                placeholder="Dirección"
                @focus-out="$capitalizeAll"
              >
                <DxValidator>
                  <DxRequiredRule />
                </DxValidator>
              </DxTextBox>
            </div>
            <div class="col-md-6 mb-3">
              <label class="tit">Departamento</label>
              <DxSelectBox
                id="departamentoId"
                :data-source="departamentos"
                :grouped="false"
                :min-search-length="2"
                :search-enabled="true"
                @value-changed="itemSelected"
                v-model="item.departamentoId"
                :show-clear-button="true"
                :show-data-before-search="true"
                class="form-control"
                placeholder="Departamento"
                value-expr="id"
                display-expr="nombre"
              >
                <DxValidator>
                  <DxRequiredRule />
                </DxValidator>
              </DxSelectBox>
            </div>
            <div class="col-md-6 mb-3">
              <label class="tit">Municipio</label>
              <DxSelectBox
                id="municipioId"
                :data-source="municipios"
                :disabled="municipios.length <= 0"
                :grouped="false"
                :min-search-length="2"
                :search-enabled="true"
                v-model="item.municipioId"
                :show-clear-button="true"
                :show-data-before-search="true"
                class="form-control"
                placeholder="Municipio"
                value-expr="id"
                display-expr="nombre"
              >
                <DxValidator>
                  <DxRequiredRule />
                </DxValidator>
              </DxSelectBox>
            </div>
          </div>
          <div class="row mt-4">
            <div class="col-md-12">
              <h4 class="mb-3 pb-2 bbd">Información laboral</h4>
            </div>
            <div class="col-md-6 mb-3">
              <label class="tit">Entidad donde trabaja</label>
              <DxTextBox
                id="entidad"
                value-change-event="keyup"
                :show-clear-button="true"
                class="form-control"
                placeholder="Entidad donde trabaja"
                v-model="item.entidad"
                @focus-out="$capitalizeAll"
              >
                <DxValidator>
                  <DxRequiredRule />
                </DxValidator>
              </DxTextBox>
            </div>
            <div class="col-md-6 mb-3">
              <label class="tit">Cargo actual</label>
              <DxTextBox
                id="cargo"
                value-change-event="keyup"
                :show-clear-button="true"
                class="form-control"
                v-model="item.cargoActual"
                placeholder="Cargo actual"
                @focus-out="$capitalizeAll"
              >
                <DxValidator>
                  <DxRequiredRule />
                </DxValidator>
              </DxTextBox>
            </div>
          </div>
        </div>
      </DxValidationGroup>
      <div class="card-footer">
        <div class="d-flex justify-content-between align-items-center">
          <span>
            <a class="btn btn-gray me-3" @click.prevent="next"
              ><i class="me-1 fa-solid fa-circle-xmark"></i> CANCELAR</a
            >
            <a class="btn btn-main" @click.prevent="next"
              ><i class="me-1 fa-solid fa-circle-left"></i> ANTERIOR</a
            >
          </span>
          <a class="btn btn-main" @click.prevent="next"
            >SIGUIENTE <i class="ms-1 fa-solid fa-circle-right"></i
          ></a>
        </div>
      </div>
    </div>
  </div>
</template>
