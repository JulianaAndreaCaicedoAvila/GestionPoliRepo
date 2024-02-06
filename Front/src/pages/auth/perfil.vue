<script setup>
import api from "@/utils/api";
import DxStore from "@/utils/dx";
import List from "devextreme/ui/list";
import { useRouter, useRoute } from "vue-router";
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
  DxAsyncRule,
  DxRequiredRule,
  DxEmailRule,
  DxCompareRule,
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
const router = useRouter(), route = useRoute(),
  temaStore = useTemaStore(),
  store = useClasificadorStore(),
  geoStore = useGeografiaStore(),
  auth = useAuthStore();
let now = new Date(), titulo = "Temas",
  tipoParticipante = ref([]),
  tipoServidorPublico = ref([]),
  situacionEconomica = ref([]),
  tipoDiscapacidad = ref([]),
  grupoEtnico = ref([]),
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
    cursoId: 0,
    tipoDocumentoId: 0,
    departamentoId: 0,
    municipioId: 0,
    entidad: null,
    genero: null,
    nivelEscolar: null,
    estadoCivil: null,
    cargoActual: null,
    documentoIdentidad: null,
    nombres: null,
    apellidos: null,
    fechaNacimiento: now,
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
      // let q = Object.assign([], temasAll.value);
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
  };

let save = async () => {
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

let passwordComparison = () => {
  return item.value.correo;
};

let checkEmail = async (params) => {
  console.clear();
  let usr = await auth.porEmail(params.value);
  console.log("usr =>", usr);
  return typeof usr.firstName === "undefined";
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

onMounted(async () => {
  console.log("route.name =>", route.name);
  tipoParticipante.value = await store.porTipoNombre("tipo_participante");
  situacionEconomica.value = await store.porTipoNombre("tipo_vulnerabilidad");
  tipoDiscapacidad.value = await store.porTipoNombre("tipo_discapacidad");
  grupoEtnico.value = await store.porTipoNombre("grupo_etnico");
  tipoServidorPublico.value = await store.porTipoNombre("tipo_servidor_publico");
  tipoDocumento.value = await store.porTipoNombre("tipo_documento_identidad");
  genero.value = await store.porTipoNombre("genero");
  nivelEscolar.value = await store.porTipoNombre("nivel_escolar");
  estadoCivil.value = await store.porTipoNombre("estado_civil");
  entidad.value = await store.porTipoNombre("entidad");
  departamentos.value = await geoStore.dptoAll();
  console.log("nivel Escolar =>", nivelEscolar.value);
  // console.log("tipo documentos =>", tipoDocumento.value);
  console.log("genero =>", genero.value);
  // itemId.value = props.itemId;
  // item.value = props.item;
  // getData();
});
</script>
<template>
  <div class="container content">

    <div class="card data mb-5 pb-5" id="data-datos">
      <div class="card-header main d-flex justify-content-between align-items-center">
        <span v-if="route.name == 'registro'">
          <i class="fa-solid fa-user-pen ms-2"></i>
          Registro en el sistema
        </span>
        <span v-else>
          <i class="fa-regular fa-address-card"></i>
          Perfil de usuario
        </span>
        <span>
          <a @click.prevent="router.go(-1)" class="btn btn-trans">
            <i class="fa-solid fa-circle-arrow-left"></i>VOLVER
          </a>
          <!-- <router-link :to="{ path: '/' }" class="btn btn-trans">
            <i class="fa-solid fa-circle-arrow-left"></i>VOLVER
          </router-link> -->
        </span>
      </div>
      <DxValidationGroup ref="valGroup">
        <div class="card-body pt-3 pb-4">
          <div class="row mb-4">
            <div class="col-md-12 d-flex justify-content-between align-items-center">
              <h4 class="mb-3 pb-2 bbd">1. Información personal</h4>
              <p class="font-weight-semibold text-center"><i class="fa-solid fa-circle-info me-1 color-main"></i>
                Todos los campos son requeridos</p>
            </div>
            <div class="col-md-6">
              <div class="row">
                <div class="col-md-4 mb-3">
                  <label class="tit">Tipo de documento</label>
                  <DxSelectBox id="tipoDocumentoId" :data-source="tipoDocumento" :grouped="false" :min-search-length="2"
                    :search-enabled="true" v-model="item.tipoDocumentoId" :show-clear-button="true"
                    :show-data-before-search="true" class="form-control" placeholder="Tipo" value-expr="id"
                    display-expr="nombre">
                    <DxValidator>
                      <DxRequiredRule />
                    </DxValidator>
                  </DxSelectBox>
                </div>
                <div class="col-md-4 mb-3">
                  <label class="tit">Documento</label>
                  <DxNumberBox id="documento" value-change-event="keyup" :show-clear-button="true"
                    v-model="item.documentoIdentidad" class="form-control" placeholder="Documento">
                    <DxValidator>
                      <DxRequiredRule />
                    </DxValidator>
                  </DxNumberBox>
                </div>
                <div class="col-md-4 mb-3">
                  <label class="tit">Género</label>
                  <DxSelectBox id="genero" :data-source="genero" :grouped="false" :min-search-length="2"
                    :search-enabled="true" v-model="item.genero" :show-clear-button="true" :show-data-before-search="true"
                    class="form-control" placeholder="Género" value-expr="id" display-expr="nombre">
                    <DxValidator>
                      <DxRequiredRule />
                    </DxValidator>
                  </DxSelectBox>
                </div>
              </div>
            </div>
            <div class="col-md-3 mb-3">
              <label class="tit">Nombres</label>
              <DxTextBox id="nombre" value-change-event="keyup" :show-clear-button="true" :v-model="item.nombres"
                class="form-control" placeholder="Nombres" @focus-out="$capitalizeAll">
                <DxValidator>
                  <DxRequiredRule />
                </DxValidator>
              </DxTextBox>
            </div>
            <div class="col-md-3 mb-3">
              <label class="tit">Apellidos</label>
              <DxTextBox id="apellidos" value-change-event="keyup" :show-clear-button="true" :v-model="item.apellidos"
                class="form-control" placeholder="Apellidos" @focus-out="$capitalizeAll">
                <DxValidator>
                  <DxRequiredRule />
                </DxValidator>
              </DxTextBox>
            </div>
            <div class="col-md-2 mb-3">
              <label class="tit">Fecha de nacimiento</label>
              <DxDateBox id="fechaNacimiento" value-change-event="keyup" :max="now" :show-clear-button="true"
                :v-model="item.fechaNacimiento" class="form-control" placeholder="Fecha" display-format="dd/MM/yyyy">
                <DxValidator>
                  <DxRequiredRule />
                </DxValidator>
              </DxDateBox>
            </div>
            <div class="col-md-4 mb-3">
              <label class="tit">Profesión</label>
              <DxTextBox id="profesion" value-change-event="keyup" :show-clear-button="true" :v-model="item.profesion"
                class="form-control" placeholder="Profesión">
                <DxValidator>
                  <DxRequiredRule />
                </DxValidator>
              </DxTextBox>
            </div>
            <div class="col-md-3 mb-3">
              <label class="tit">Nivel escolar</label>
              <DxSelectBox id="nivelEscolar" :data-source="nivelEscolar" :grouped="false" :min-search-length="2"
                :search-enabled="true" :show-clear-button="true" :show-data-before-search="true"
                v-model="item.nivelEscolar" class="form-control" placeholder="Nivel escolar" value-expr="id"
                display-expr="nombre">
                <DxValidator>
                  <DxRequiredRule />
                </DxValidator>
              </DxSelectBox>
            </div>
            <div class="col-md-3 mb-3">
              <label class="tit">Estado civil</label>
              <DxSelectBox id="estadoCivil" :data-source="estadoCivil" :grouped="false" :min-search-length="2"
                :search-enabled="true" :show-clear-button="true" :show-data-before-search="true"
                v-model="item.estadoCivil" class="form-control" placeholder="Estado civil" value-expr="id"
                display-expr="nombre">
                <DxValidator>
                  <DxRequiredRule />
                </DxValidator>
              </DxSelectBox>
            </div>
            <div class="col-md-12">
              <div class="row">
                <div class="col-md-4">
                  <div class="row">
                    <div class="col-md-6 mb-3">
                      <label class="tit">Celular</label>
                      <DxTextBox id="celular" :min-length="10" value-change-event="keyup" :show-clear-button="true"
                        mask="(300) 000-0000" v-model="item.celular" class="form-control" placeholder="Celular">
                        <DxValidator>
                          <DxRequiredRule />
                        </DxValidator>
                      </DxTextBox>
                    </div>
                    <div class="col-md-6 mb-3">
                      <label class="tit">Teléfono</label>
                      <DxTextBox id="telefono" value-change-event="keyup" :show-clear-button="true"
                        v-model="item.telefono" class="form-control" placeholder="Teléfono" mask="6\0 (0) 000-0000">
                      </DxTextBox>
                    </div>
                  </div>
                </div>
                <div class="col-md-4 mb-3">
                  <label class="tit">Correo electrónico</label>
                  <DxTextBox id="correo" value-change-event="keyup" :show-clear-button="true" v-model="item.correo"
                    class="form-control" placeholder="Correo" @focus-out="$lowerCase">
                    <DxValidator>
                      <DxEmailRule />
                      <DxRequiredRule />
                      <DxAsyncRule :validation-callback="checkEmail" message="El correo ya se encuentra registrado" />
                    </DxValidator>
                  </DxTextBox>
                </div>
                <div class="col-md-4 mb-3" v-if="route.name == 'registro'">
                  <label class="tit">Confirmar correo electrónico</label>
                  <DxTextBox id="correo1" value-change-event="keyup" :show-clear-button="true" class="form-control"
                    placeholder="Correo" @focus-out="$lowerCase">
                    <DxValidator>
                      <DxRequiredRule />
                      <DxCompareRule :comparison-target="passwordComparison" message="Los correos no coinciden" />
                    </DxValidator>
                  </DxTextBox>
                </div>
              </div>
            </div>
            <div class="col-md-4 mb-3">
              <label class="tit">Dirección</label>
              <DxTextBox id="direccion" value-change-event="keyup" :show-clear-button="true" v-model="item.direccion"
                class="form-control" placeholder="Dirección" @focus-out="$capitalizeAll">
                <DxValidator>
                  <DxRequiredRule />
                </DxValidator>
              </DxTextBox>
            </div>
            <div class="col-md-4 mb-3">
              <label class="tit">Departamento</label>
              <DxSelectBox id="departamentoId" :data-source="departamentos" :grouped="false" :min-search-length="2"
                :search-enabled="true" @value-changed="itemSelected" v-model="item.departamentoId"
                :show-clear-button="true" :show-data-before-search="true" class="form-control" placeholder="Departamento"
                value-expr="id" display-expr="nombre">
                <DxValidator>
                  <DxRequiredRule />
                </DxValidator>
              </DxSelectBox>
            </div>
            <div class="col-md-4 mb-3">
              <label class="tit">Municipio</label>
              <DxSelectBox id="municipioId" :data-source="municipios" :disabled="municipios.length <= 0" :grouped="false"
                :min-search-length="2" :search-enabled="true" v-model="item.municipioId" :show-clear-button="true"
                :show-data-before-search="true" class="form-control" placeholder="Municipio" value-expr="id"
                display-expr="nombre">
                <DxValidator>
                  <DxRequiredRule />
                </DxValidator>
              </DxSelectBox>
            </div>
          </div>
          <div class="row mb-4">
            <div class="col-md-12">
              <h4 class="mb-3 pb-2 bbd">2. Información laboral</h4>
            </div>
            <div class="col-md-6 mb-3">
              <label class="tit">Entidad donde trabaja</label>
              <DxTextBox id="entidad" value-change-event="keyup" :show-clear-button="true" class="form-control"
                placeholder="Entidad donde trabaja" v-model="item.entidad" @focus-out="$capitalizeAll">
                <DxValidator>
                  <DxRequiredRule />
                </DxValidator>
              </DxTextBox>
            </div>
            <div class="col-md-6 mb-3">
              <label class="tit">Cargo actual</label>
              <DxTextBox id="cargo" value-change-event="keyup" :show-clear-button="true" class="form-control"
                v-model="item.cargoActual" placeholder="Cargo actual" @focus-out="$capitalizeAll">
                <DxValidator>
                  <DxRequiredRule />
                </DxValidator>
              </DxTextBox>
            </div>
          </div>
          <div class="row mb-4">
            <div class="col-md-12">
              <h4 class="mb-3 pb-2 bbd">3. Tipo de participante</h4>
            </div>
            <div class="col-md-5 mb-3">
              <label class="tit">Tipo de participante</label>
              <DxSelectBox id="tipoParticipante" :data-source="tipoParticipante" :grouped="false" :min-search-length="2"
                :search-enabled="true" v-model="item.tipoParticipante" :show-clear-button="true"
                :show-data-before-search="true" class="form-control" placeholder="Tipo de participante" value-expr="id"
                display-expr="nombre">
                <DxValidator>
                  <DxRequiredRule />
                </DxValidator>
              </DxSelectBox>
            </div>
            <div class="col-md-5 mb-3">
              <label class="tit">Tipo de servidor público</label>
              <DxSelectBox id="tipoServidorPublico" :data-source="tipoServidorPublico" :grouped="false"
                :min-search-length="2" :search-enabled="true" v-model="item.tipoServidorPublico" :show-clear-button="true"
                :show-data-before-search="true" class="form-control" placeholder="Tipo de servidor público"
                value-expr="id" display-expr="nombre">
                <DxValidator>
                  <DxRequiredRule />
                </DxValidator>
              </DxSelectBox>
            </div>
            <div class="col-md-2 mt-2 mb-3 text-center">
              <label class="tit" for="">Contratista del estado</label>
              <DxCheckBox />
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <h4 class="mb-3 pb-2 bbd">4. Caracterización</h4>
            </div>
            <div class="col-md-4 mb-3">
              <label class="tit">Se encuentra en</label>
              <DxSelectBox id="vulnerabilidad" :data-source="situacionEconomica" :grouped="false" :min-search-length="2"
                :search-enabled="true" v-model="item.situacionEconomica" :show-clear-button="true"
                :show-data-before-search="true" class="form-control" placeholder="Situación" value-expr="id"
                display-expr="nombre">
                <DxValidator>
                  <DxRequiredRule />
                </DxValidator>
              </DxSelectBox>
            </div>
            <div class="col-md-4 mb-3">
              <label class="tit">Tipo de discapacidad</label>
              <DxSelectBox id="discapacidad" :data-source="tipoDiscapacidad" :grouped="false" :min-search-length="2"
                :search-enabled="true" v-model="item.tipoDiscapacidad" :show-clear-button="true"
                :show-data-before-search="true" class="form-control" placeholder="Tipo de discapacidad" value-expr="id"
                display-expr="nombre">
                <DxValidator>
                  <DxRequiredRule />
                </DxValidator>
              </DxSelectBox>
            </div>
            <div class="col-md-4 mb-3">
              <label class="tit">Grupo étnico</label>
              <DxSelectBox id="grupoEtnico" :data-source="grupoEtnico" :grouped="false" :min-search-length="2"
                :search-enabled="true" v-model="item.grupoEtnico" :show-clear-button="true"
                :show-data-before-search="true" class="form-control" placeholder="Grupo étnico" value-expr="id"
                display-expr="nombre">
                <DxValidator>
                  <DxRequiredRule />
                </DxValidator>
              </DxSelectBox>
            </div>
            <!-- <div class="col-md-3 mb-3">
              <label class="tit">Participantes</label>
              <DxSelectBox id="participantes" :data-source="temasAll" :grouped="false" :min-search-length="2"
                :search-enabled="true" v-model="item.temaId" :show-clear-button="true" :show-data-before-search="true"
                class="form-control" placeholder="Participantes" value-expr="id" display-expr="nombre">
                <DxValidator>
                  <DxRequiredRule />
                </DxValidator>
              </DxSelectBox>
            </div> -->
            <div class="col-md-12 mt-3 mb-3 text-center">
              <label class="tit me-2 color-text" for="habeas">Al hacer clic en la "casilla", acepta nuestros Términos y
                condiciones así como la ley 1581 de tratamiento de datos
                personales Habeas data</label>
              <DxCheckBox id="habeas" />
            </div>
          </div>
        </div>
      </DxValidationGroup>
      <div class="card-footer">
        <div class="p-3 d-flex justify-content-between align-items-center">
          <span>
            <!-- <a class="btn btn-gray me-3" @click.prevent="next"><i class="me-1 fa-solid fa-circle-xmark"></i> CANCELAR</a> -->
            <a class="btn btn-main" @click.prevent="router.back(-1)"><i class="me-1 fa-solid fa-circle-left"></i>
              ANTERIOR</a>
          </span>
          <a class="btn btn-main" @click.prevent="save" v-if="route.name == 'registro'">
            REGISTRARSE <i class="fa-solid fa-user-pen ms-2"></i>
          </a>
          <a class="btn btn-main" @click.prevent="save" v-else>
            GUARDAR <i class="fa-solid fa-floppy-disk ms-2"></i>
          </a>
        </div>
      </div>
    </div>

  </div>
</template>
