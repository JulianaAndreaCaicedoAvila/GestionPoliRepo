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
  temaStore = useTemaStore(), habeasClass = ref(""),
  store = useClasificadorStore(),
  geoStore = useGeografiaStore(),
  auth = useAuthStore();
let now = new Date(), titulo = "Temas",
  tiposParticipantes = ref([]),
  tiposServidoresPublicos = ref([]),
  situacionesEconomicas = ref([]),
  tiposDiscapacidades = ref([]),
  gruposEtnicos = ref([]),
  tiposDocumento = ref([]),
  departamentos = ref([]),
  municipios = ref([]),
  generos = ref([]),
  nivelesEscolares = ref([]),
  estadosCiviles = ref([]),
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
  user = { // Entidad 'UserRequestModel' en DataContext
    accessFailedCount: 0,
    code: null,
    companyId: null,
    concurrencyStamp: null,
    dependenceId: null,
    email: null,
    emailConfirmed: false,
    firstName: null,
    generateConfirmation: false,
    id: 0,
    isActive: true,
    lastName: null,
    lockoutEnabled: false,
    lockoutEnd: null,
    normalizedEmail: null,
    normalizedUserName: null,
    password: null,
    passwordHash: null,
    phoneNumber: null,
    phoneNumberConfirmed: false,
    projectId: null,
    roleId: 8, // Participante
    securityStamp: null,
    territorialId: null,
    twoFactorEnabled: false,
    userName: null,
    generateConfirmation: true
  },
  item1 = ref({ "id": 0, "usuarioId": 0, "tipoDocumentoId": 361, "municipioId": 149, "nivelEscolarId": 407, "estadoCivilId": 401, "entidadId": null, "generoId": 403, "vulnerabilidadId": 314, "discapacidadId": 308, "caracteristicaEsapId": null, "cargoId": null, "grupoEtnicoId": 354, "tipoServidorPublicoId": 347, "tipoParticipanteId": 340, "documentoNumero": 1007529842, "nombres": "Adriana María", "apellidos": "Pérez Gonzalez", "fechaNacimiento": "1998-09-24T05:00:00.000Z", "profesion": "Ingeniera en Informática", "telefono": "17185698", "celular": "3005263654", "correo": "aperez@nemedi.com", "direccion": "Cl. 121 # 35A-19", "contratista": true, "habeasData": true, "departamentoId": 6, "correo1": "aperez@nemedi.com", "entidad": "Panadería", "cargoActual": "Panadero" }),
  item = ref({ // Entidad 'Participante' en DataContext
    id: 0,
    usuarioId: 0,
    tipoDocumentoId: null,
    municipioId: null,
    nivelEscolarId: null,
    estadoCivilId: null,
    entidadId: null,
    generoId: null,
    vulnerabilidadId: null,
    discapacidadId: null,
    caracteristicaEsapId: null,
    cargoId: null,
    grupoEtnicoId: null,
    tipoServidorPublicoId: null,
    tipoParticipanteId: null,
    documentoNumero: null,
    nombres: null,
    apellidos: null,
    fechaNacimiento: null,
    profesion: null,
    telefono: null,
    celular: null,
    correo: null,
    direccion: null,
    contratista: false,
    habeasData: false,
    correo1: null, // Local
    departamentoId: null, // Local
    entidad: null, // Local
    cargoActual: null // Local
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
  habeasClass.value = "";
  panelData = $("#data-datos");
  panelGrid = $("#grid-tema");
  var v = valGroup.value.instance;
  console.log("v =>", v);
  let result = v.validate();
  console.log("result =>", result);
  if (!result.isValid) {
    // Hace scroll hasta el primer elemento con error
    $.scrollTo($(".dx-invalid:first"), {
      duration: 600,
      offset: -110,
    });
    // 202402071737: Verifica si "habeas" esá entre los errores y cambia la clase para que se vea en rojo el mensaje
    result.brokenRules.forEach(element => {
      let elementId = element.validator._$element[0].id;
      console.log("elementId =>", elementId);
      if (elementId == "habeas") habeasClass.value = "error";
    });
  } else {
    // Cuando es válido
    panelData.lock(
      `Registrando usuario<br>un momento por favor`,
      async function () {
        let p = toRaw(item.value);
        user.email = p.correo;
        user.firstName = p.nombres;
        user.lastName = p.apellidos;
        user.phoneNumber = p.celular;
        let dto = {
          usuario: user,
          participante: p
        };
        console.log("dto =>", dto);
        try {
          let res = await auth.registrarParticipante(dto);
          console.log("res =>", dto);
          setTimeout(function () {
            panelData.unlock();
            msg.success("¡Registro exitoso!", `<span class="font-weight-semibold d-inline-block mt-2">${p.nombres}</span>, acabamos de enviar un correo a la dirección <span class="font-weight-semibold">"${p.correo}</span>" para que realice la activación de su cuenta en el sistema.`, function () {
              router.back();
            });
          }, 1000);
        } catch (error) {
          console.log("error =>", error);
          panelData.unlock();
        }
      }
    );
  }
};

let passwordComparison = () => {
  return item.value.correo;
};

var emailTmp = null;
let checkEmail = async (params) => {
  // console.clear();
  console.log(_sep);
  let e = params.value;
  console.log("e =>", e);
  console.log("item.value.correo =>", item.value.correo);
  // Solo valida si el email cambia con base en 'emailTmp'
  if (e !== emailTmp) {
    let usr = await auth.porEmail(e);
    console.log("usr =>", usr);
    let notExists = typeof usr.firstName === "undefined";
    if (notExists) emailTmp = e;
    return notExists;
  }
  return true;
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
  tiposParticipantes.value = await store.porTipoNombre("tipo_participante");
  situacionesEconomicas.value = await store.porTipoNombre("tipo_vulnerabilidad");
  tiposDiscapacidades.value = await store.porTipoNombre("tipo_discapacidad");
  gruposEtnicos.value = await store.porTipoNombre("grupo_etnico");
  tiposServidoresPublicos.value = await store.porTipoNombre("tipo_servidor_publico");
  tiposDocumento.value = await store.porTipoNombre("tipo_documento_identidad");
  generos.value = await store.porTipoNombre("genero");
  nivelesEscolares.value = await store.porTipoNombre("nivel_escolar");
  estadosCiviles.value = await store.porTipoNombre("estado_civil");
  entidad.value = await store.porTipoNombre("entidad");
  departamentos.value = await geoStore.dptoAll();
  console.log("nivel Escolar =>", nivelesEscolares.value);
  // console.log("tipo documentos =>", tipoDocumento.value);
  console.log("genero =>", generos.value);
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
          <!-- {{ item }} <hr /> {{ user }} <hr /> -->
          <div class="row">
            <div class="col-md-12 bb mt-2 mb-4">
              <p class="font-weight-semibold"><i class="fa-solid fa-circle-info me-1 color-main"></i>
                Para realizar su registro en el sistema debe diligenciar la información solicitada
                (todos los campos son requeridos).
                Una vez haga clic en el botón <span class="font-weight-semibold">"Registrarse"</span> se le enviará un
                correo electrónico de activación a la
                dirección proporcionada para que asigne su contraseña y finalice de manera exitosa el proceso.
              </p>
            </div>
          </div>
          <div class="row mb-4">
            <div class="col-md-12">
              <h4 class="mb-3 pb-2 bbd">1. Información personal</h4>
            </div>
            <div class="col-md-7">
              <div class="row">
                <div class="col-md-5 mb-3">
                  <label class="tit">Tipo de documento</label>
                  <DxSelectBox id="tipoDocumentoId" :data-source="tiposDocumento" :grouped="false"
                    @value-changed="itemSelected" v-model="item.tipoDocumentoId" :show-clear-button="true"
                    class="form-control" placeholder="Tipo" value-expr="id" display-expr="nombre">
                    <DxValidator>
                      <DxRequiredRule />
                    </DxValidator>
                  </DxSelectBox>
                </div>
                <div class="col-md-4 mb-3">
                  <label class="tit">Documento</label>
                  <DxNumberBox id="documento" value-change-event="keyup" :show-clear-button="true"
                    v-model="item.documentoNumero" class="form-control" placeholder="Documento">
                    <DxValidator>
                      <DxRequiredRule />
                    </DxValidator>
                  </DxNumberBox>
                </div>
                <div class="col-md-3 mb-3">
                  <label class="tit">Género</label>
                  <DxSelectBox id="generoId" :data-source="generos" :grouped="false" :min-search-length="2"
                    :search-enabled="true" v-model="item.generoId" :show-clear-button="true"
                    :show-data-before-search="true" class="form-control" placeholder="Género" value-expr="id"
                    display-expr="nombre">
                    <DxValidator>
                      <DxRequiredRule />
                    </DxValidator>
                  </DxSelectBox>
                </div>
              </div>
            </div>
            <div class="col-md-5">
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label class="tit">Nombres</label>
                  <DxTextBox id="nombres" value-change-event="keyup" :show-clear-button="true" v-model="item.nombres"
                    class="form-control" placeholder="Nombres" @focus-out="$capitalizeAll">
                    <DxValidator>
                      <DxRequiredRule />
                    </DxValidator>
                  </DxTextBox>
                </div>
                <div class="col-md-6 mb-3">
                  <label class="tit">Apellidos</label>
                  <DxTextBox id="apellidos" value-change-event="keyup" :show-clear-button="true" v-model="item.apellidos"
                    class="form-control" placeholder="Apellidos" @focus-out="$capitalizeAll">
                    <DxValidator>
                      <DxRequiredRule />
                    </DxValidator>
                  </DxTextBox>
                </div>
              </div>
            </div>
            <div class="col-md-2 mb-3">
              <label class="tit">Fecha de nacimiento</label>
              <DxDateBox id="fechaNacimiento" value-change-event="keyup" :max="now" :show-clear-button="true"
                v-model="item.fechaNacimiento" class="form-control" placeholder="Fecha" display-format="dd/MM/yyyy">
                <DxValidator>
                  <DxRequiredRule />
                </DxValidator>
              </DxDateBox>
            </div>
            <div class="col-md-4 mb-3">
              <label class="tit">Profesión</label>
              <DxTextBox id="profesion" value-change-event="keyup" :show-clear-button="true" v-model="item.profesion"
                class="form-control" placeholder="Profesión" @focus-out="$capitalizeAll">
                <DxValidator>
                  <DxRequiredRule />
                </DxValidator>
              </DxTextBox>
            </div>
            <div class="col-md-3 mb-3">
              <label class="tit">Nivel escolar</label>
              <DxSelectBox id="nivelEscolarId" :data-source="nivelesEscolares" :show-clear-button="true"
                v-model="item.nivelEscolarId" class="form-control" placeholder="Nivel escolar" value-expr="id"
                display-expr="nombre">
                <DxValidator>
                  <DxRequiredRule />
                </DxValidator>
              </DxSelectBox>
            </div>
            <div class="col-md-3 mb-3">
              <label class="tit">Estado civil</label>
              <DxSelectBox id="estadoCivilId" :data-source="estadosCiviles" :grouped="false" :min-search-length="2"
                :search-enabled="true" :show-clear-button="true" :show-data-before-search="true"
                v-model="item.estadoCivilId" class="form-control" placeholder="Estado civil" value-expr="id"
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
                        mask="(000) 000-0000" v-model="item.celular" class="form-control" placeholder="Celular">
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
                  <DxTextBox id="correo1" value-change-event="keyup" :show-clear-button="true" v-model="item.correo1"
                    class="form-control" placeholder="Correo" @focus-out="$lowerCase">
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
                class="form-control" placeholder="Dirección">
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
              <DxSelectBox id="tipoParticipanteId" :data-source="tiposParticipantes" :grouped="false"
                :min-search-length="2" :search-enabled="true" v-model="item.tipoParticipanteId" :show-clear-button="true"
                :show-data-before-search="true" class="form-control" placeholder="Tipo de participante" value-expr="id"
                display-expr="nombre">
                <DxValidator>
                  <DxRequiredRule />
                </DxValidator>
              </DxSelectBox>
            </div>
            <div class="col-md-5 mb-3">
              <label class="tit">Tipo de servidor público</label>
              <DxSelectBox id="tipoServidorPublicoId" :data-source="tiposServidoresPublicos" :grouped="false"
                :min-search-length="2" :search-enabled="true" v-model="item.tipoServidorPublicoId"
                :show-clear-button="true" :show-data-before-search="true" class="form-control"
                placeholder="Tipo de servidor público" value-expr="id" display-expr="nombre">
                <DxValidator>
                  <DxRequiredRule />
                </DxValidator>
              </DxSelectBox>
            </div>
            <div class="col-md-2 mt-2 mb-3 text-center">
              <label class="tit" for="">Contratista del estado</label>
              <DxCheckBox v-model="item.contratista" />
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <h4 class="mb-3 pb-2 bbd">4. Caracterización</h4>
            </div>
            <div class="col-md-4 mb-3">
              <label class="tit">Se encuentra en</label>
              <DxSelectBox id="vulnerabilidadId" :data-source="situacionesEconomicas" :grouped="false"
                :min-search-length="2" :search-enabled="true" v-model="item.vulnerabilidadId" :show-clear-button="true"
                :show-data-before-search="true" class="form-control" placeholder="Situación" value-expr="id"
                display-expr="nombre">
                <DxValidator>
                  <DxRequiredRule />
                </DxValidator>
              </DxSelectBox>
            </div>
            <div class="col-md-4 mb-3">
              <label class="tit">Tipo de discapacidad</label>
              <DxSelectBox id="discapacidadId" :data-source="tiposDiscapacidades" :grouped="false" :min-search-length="2"
                :search-enabled="true" v-model="item.discapacidadId" :show-clear-button="true"
                :show-data-before-search="true" class="form-control" placeholder="Tipo de discapacidad" value-expr="id"
                display-expr="nombre">
                <DxValidator>
                  <DxRequiredRule />
                </DxValidator>
              </DxSelectBox>
            </div>
            <div class="col-md-4 mb-3">
              <label class="tit">Grupo étnico</label>
              <DxSelectBox id="grupoEtnicoId" :data-source="gruposEtnicos" :grouped="false" :min-search-length="2"
                :search-enabled="true" v-model="item.grupoEtnicoId" :show-clear-button="true"
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
              <label :class="'tit me-2 color-text ' + habeasClass" for="habeas">Acepta la <a class="a-ul"
                  href="https://www.esap.edu.co/portal/index.php/Descargas/228/politica-proteccion-datos-personales/48412/politica-de-proteccion-de-datos-personales.pdf"
                  target="_blank" title="Leer documento de la política...">"Política de protección de datos de la
                  ESAP"</a> como
                también la <a class="a-ul" href="http://www.secretariasenado.gov.co/senado/basedoc/ley_1581_2012.html"
                  target="_blank" title="Leer el texto de la ley...">"Ley 1581 para la protección de datos
                  personales"</a></label>
              <DxCheckBox id="habeas" v-model="item.habeasData">
                <DxValidator>
                  <DxRequiredRule />
                </DxValidator>
              </DxCheckBox>
            </div>
          </div>
        </div>
      </DxValidationGroup>
      <div class="card-footer">
        <div class="p-3 d-flex justify-content-between align-items-center">
          <span>
            <!-- <a class="btn btn-gray me-3" @click.prevent="next"><i class="me-1 fa-solid fa-circle-xmark"></i> CANCELAR</a> -->
            <a class="btn btn-main" @click.prevent="router.back(-1)"><i class="me-1 fa-solid fa-circle-left"></i>
              VOLVER</a>
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
