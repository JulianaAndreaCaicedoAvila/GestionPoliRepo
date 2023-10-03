<script setup>
import api from "@/utils/api";
import DxStore from "@/utils/dx";
import { useRoute } from "vue-router";
import NumberBox from "devextreme/ui/number_box";
import { ref, toRaw, onMounted, getCurrentInstance } from "vue";
import {
  useProductoStore,
  useBancoStore,
  useNucleoStore,
  useIndicadorStore,
  useProgramaStore,
  useClasificadorStore,
  useAuthStore,
  useGeografiaStore,
} from "@/stores";
import DxValidator, {
  DxRequiredRule,
  DxStringLengthRule,
} from "devextreme-vue/validator";
import {
  DxSelectBox,
  DxHtmlEditor,
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
const route = useRoute(),
  store = useClasificadorStore(),
  storeProductos = useProductoStore(),
  storeBancos = useBancoStore(),
  storeNucleos = useNucleoStore(),
  storeIndicadores = useIndicadorStore(),
  storeProgramas = useProgramaStore(),
  storeGeografia = useGeografiaStore(),
  auth = useAuthStore();
let titulo = "Administración &raquo; Cursos &raquo; Módulos",
  dependenciaIdTxtRef = ref(null),
  // asistencia = ["Presencial", "Virtual"],
  valGroup = ref(null),
  entidades = ref([]),
  asistencias = ref([]),
  indicadores = ref([]),
  municipios = ref([]),
  dependencias = ref([]),
  tipo_de_curso = ref([]),
  productos = ref([]),
  territoriales = ref([]),
  departamentos = ref([]),
  nucleos = ref([]),
  bancos = ref([]),
  programas = ref([]),
  especificos = ref([]),
  item = ref({
    id: 0,
    dependenciaId: null,
    codigoVerificacion: null,
    nombre: null,
    descripcion: null,
    elaboradoPor: null,
    tipoCurso: null,
    asistencia: null,
    producto: null,
    indicador: null,
    territorialId: null,
    departamentoId: null,
    municipioId: null,
    cupoTotal: null,
    cupoAula: null,
    responsable: null,
    correo: null,
    telefono: 0,
    bancoPrograma: null,
    nucleo: null,
    programaCapacitacion: null,
    horasTotales: 0,
    numeroDias: 0,
    publicado: false,
    jornadaManana: false,
    jornadaTarde: false,
    jornadaNoche: false,
    porcentajeAsistencia: 0,
    cantidadAulas: 0,
    lugarRealizacion: null,
    fechaInicioInscripciones: new Date(),
    fechaFinInscripciones: new Date(),
    fechaInicio: new Date(),
    fechaFin: new Date(),
    horaInicio: null,
    objetivos: null,
    contenidos: null,
  }),
  item_copy = Clone(item.value),
  panelData = null,
  panelGrid = null,
  grid = null,
  itemSelected = async (e) => {
    // console.clear();
    console.log(_sep);
    console.log("itemSelected =>", e);
    let v = e.value;
    let id = $(e.element).attr("id");
    console.log("id =>", id);
    if (v !== null && v !== undefined) {
      let hijos = await store.porPadre(v);
      if (id == "dependenciaId") {
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
  },
  save = async () => {
    (panelData = null), (panelGrid = null);
    // console.clear();
    let result = valGroup.value.instance.validate();
    if (!result.isValid) {
      $.scrollTo($(".dx-invalid:first"), {
        duration: 600,
        offset: -110,
      });
    } else {
      panelData.lock(
        `${item.id == 0 ? "Creando" : "Actualizando"} cursos`,
        async function () {
          let dto = item.value;
          console.log("dto =>", dto);
          await api({ hideErrors: true })
            .post("curso/ed", dto)
            .then((r) => {
              console.log("r =>", r);
              cancel(function () {
                // panelData.unlock();
                grid.refresh();
              });
            })
            .catch(function (error) {
              if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
              } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
              } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
              }
              console.log(error.config);
              // console.log("r =>", r);
              cancel(function () {
                // panelData.unlock();
                grid.refresh();
              });
            });
        }
      );
    }
  };

onMounted(async () => {
  console.clear();
  territoriales.value = await store.porTipoNombre("territorial");
  departamentos.value = await store.porTipoNombre("departamento");
  municipios.value = await store.porTipoNombre("municipio");
  dependencias.value = await store.porTipoNombre("dependencia");
  tipo_de_curso.value = await store.porTipoNombre("tipo_curso");
  asistencias.value = await store.porTipoNombre("tipo_asistencia");
  productos.value = await storeProductos.all();
  indicadores.value = await storeIndicadores.all();
  bancos.value = await storeBancos.all();
  nucleos.value = await storeNucleos.all();
  programas.value = await storeProgramas.all();
  programas.value = await storeProgramas.all();
  departamentos.value = await storeGeografia.dptoAll();
  municipios.value = await storeGeografia.munAll();
});
//----------------------------------------------------------------------------------------------------------------------------------------------
</script>
<template>
  <DxValidationGroup ref="valGroup">
    <div class="row">
      <div class="col-md-4 mb-2">
        <label class="tit">Nombre del curso</label>
        <DxTextArea id="nombre" :height="100" value-change-event="keyup" :show-clear-button="true" v-model="item.nombre"
          class="form-control" placeholder="Nombre">
          <DxValidator>
            <DxRequiredRule />
          </DxValidator>
        </DxTextArea>
      </div>
      <div class="col-md-4 mb-2">
        <label class="tit">Descripción</label>
        <DxTextArea :height="100" value-change-event="keyup" :show-clear-button="true" v-model="item.descripcion"
          class="form-control" placeholder="Descripcion">
          <DxValidator>
            <DxRequiredRule />
          </DxValidator>
        </DxTextArea>
      </div>
      <div class="col-md-4 mb-2">
        <label class="tit">Código de verificación</label>
        <DxTextBox value-change-event="keyup" :show-clear-button="true" v-model="item.codigoVerificacion"
          class="form-control" placeholder="Codigo de verificacion">
          <DxValidator>
            <DxRequiredRule />
          </DxValidator>
        </DxTextBox>
      </div>
      <div class="col-md-6 mb-1">
        <label class="tit">Dependencia</label>
        <DxSelectBox id="dependenciaId" ref="dependenciaIdTxtRef" :data-source="dependencias" :grouped="false"
          :min-search-length="3" :search-enabled="true" v-model="item.dependenciaId" :show-clear-button="true"
          :show-data-before-search="true" class="form-control" @value-changed="itemSelected" placeholder="Dependencia"
          value-expr="id" display-expr="nombre" item-template="item">
          <template #item="{ data }">
            {{ data.nombre }}
          </template>
          <DxValidator>
            <DxRequiredRule />
          </DxValidator>
        </DxSelectBox>
      </div>
      <div class="col-md-6 mb-1">
        <label class="tit">Elaborado Por</label>
        <DxTextBox value-change-event="keyup" :show-clear-button="true" v-model="item.elaboradoPor" class="form-control"
          placeholder="Elaborado Por">
          <DxValidator>
            <DxRequiredRule />
          </DxValidator>
        </DxTextBox>
      </div>
      <div class="col-md-6 mb-2">
        <label class="tit">Tipo de curso</label>
        <DxSelectBox id="tipo_de_curso" :data-source="tipo_de_curso" :grouped="false" :min-search-length="3"
          :search-enabled="true" :show-clear-button="true" :show-data-before-search="true" class="form-control"
          display-expr="nombre" v-model="item.tipoCurso" placeholder="tipo de curso" value-expr="id"
          @value-changed="valueChanged">
          <DxValidator>
            <DxRequiredRule />
          </DxValidator>
        </DxSelectBox>
      </div>
      <div class="col-md-6 mb-2">
        <label class="tit">Asistencia</label>
        <DxSelectBox id="asistencia" :data-source="asistencias" :grouped="false" :min-search-length="3"
          :search-enabled="true" :show-clear-button="true" :show-data-before-search="true" class="form-control"
          display-expr="nombre" v-model="item.asistencia" placeholder="tipo de asistencia" value-expr="id"
          @value-changed="valueChanged">
          <DxValidator>
            <DxRequiredRule />
          </DxValidator>
        </DxSelectBox>
      </div>
      <div class="col-md-12 mb-2">
        <label class="tit">Producto</label>
        <DxSelectBox id="producto" :data-source="productos" :grouped="false" :min-search-length="3" :search-enabled="true"
          :show-clear-button="true" :show-data-before-search="true" class="form-control" display-expr="nombre"
          v-model="item.producto" placeholder="Producto" value-expr="id" @value-changed="valueChanged">
          <DxValidator>
            <DxRequiredRule />
          </DxValidator>
        </DxSelectBox>
      </div>
      <div class="col-md-12 mb-2">
        <label class="tit">Indicador</label>
        <DxSelectBox id="indicadores" :data-source="indicadores" :grouped="false" :min-search-length="3"
          :search-enabled="true" :show-clear-button="true" :show-data-before-search="true" class="form-control"
          display-expr="nombre" v-model="item.indicador" placeholder="Indicadores" value-expr="id"
          @value-changed="valueChanged">
          <DxValidator>
            <DxRequiredRule />
          </DxValidator>
        </DxSelectBox>
      </div>
      <div class="col-md-4 mb-2">
        <label class="tit">Territorial</label>
        <DxSelectBox id="territorialId" :data-source="territoriales" :grouped="false" :min-search-length="3"
          :search-enabled="true" :show-clear-button="true" :show-data-before-search="true" class="form-control"
          display-expr="nombre" v-model="item.territorialId" placeholder="Territoriales" value-expr="id"
          @value-changed="valueChanged">
          <DxValidator>
            <DxRequiredRule />
          </DxValidator>
        </DxSelectBox>
      </div>
      <div class="col-md-4 mb-2">
        <label class="tit">Departamento</label>
        <DxSelectBox id="departamentoId" :data-source="departamentos" :grouped="false" :min-search-length="3"
          :search-enabled="true" :show-clear-button="true" :show-data-before-search="true" class="form-control"
          display-expr="nombre" v-model="item.departamentoId" placeholder="Departamentos" value-expr="id"
          @value-changed="valueChanged">
          <DxValidator>
            <DxRequiredRule />
          </DxValidator>
        </DxSelectBox>
      </div>
      <div class="col-md-4 mb-2">
        <label class="tit">Municipio</label>
        <DxSelectBox id="municipioId" :data-source="municipios" :grouped="false" :min-search-length="3"
          :search-enabled="true" :show-clear-button="true" :show-data-before-search="true" class="form-control"
          display-expr="nombre" v-model="item.municipioId" placeholder="Municipios" value-expr="id"
          @value-changed="valueChanged">
          <DxValidator>
            <DxRequiredRule />
          </DxValidator>
        </DxSelectBox>
      </div>
      <div class="col-md-6 mb-2">
        <label class="tit">Cupo total</label>
        <DxTextArea height="37" value-change-event="keyup" :show-clear-button="true" v-model="item.cupoTotal"
          class="form-control" placeholder="Numero de cupos">
          <DxValidator>
            <DxRequiredRule />
          </DxValidator>
        </DxTextArea>
      </div>
      <div class="col-md-6 mb-2">
        <label class="tit">Cupo esta aula</label>
        <DxTextArea height="37" value-change-event="keyup" :show-clear-button="true" v-model="item.cupoAula"
          class="form-control" placeholder="Numero de cupos">
          <DxValidator>
            <DxRequiredRule />
          </DxValidator>
        </DxTextArea>
      </div>
      <div class="col-md-4 mb-2">
        <label class="tit">Responsable</label>
        <DxTextArea height="37" value-change-event="keyup" :show-clear-button="true" v-model="item.responsable"
          class="form-control" placeholder="Nombre Responsable">
          <DxValidator>
            <DxRequiredRule />
          </DxValidator>
        </DxTextArea>
      </div>
      <div class="col-md-4 mb-2">
        <label class="tit">Correo Electrónico</label>
        <DxTextArea height="37" value-change-event="keyup" :show-clear-button="true" v-model="item.correo"
          class="form-control" placeholder="Correo">
          <DxValidator>
            <DxRequiredRule />
          </DxValidator>
        </DxTextArea>
      </div>
      <div class="col-md-4 mb-2">
        <label class="tit">Teléfono de contacto</label>
        <DxTextArea height="37" value-change-event="keyup" :show-clear-button="true" v-model="item.telefono"
          class="form-control" placeholder="Contacto">
          <DxValidator>
            <DxRequiredRule />
          </DxValidator>
        </DxTextArea>
      </div>
      <div class="col-md-12 mb-2">
        <label class="tit">Banco Programa</label>
        <DxSelectBox id="bancoPrograma" :data-source="bancos" :grouped="false" :min-search-length="3"
          :search-enabled="true" :show-clear-button="true" :show-data-before-search="true" class="form-control"
          display-expr="nombre" v-model="item.bancoPrograma" placeholder="Banco de Programas" value-expr="id"
          @value-changed="valueChanged" />
      </div>
      <div class="col-md-12 mb-2">
        <label class="tit">Núcleo</label>
        <DxSelectBox id="nucleo" :data-source="nucleos" :grouped="false" :min-search-length="3" :search-enabled="true"
          :show-clear-button="true" :show-data-before-search="true" class="form-control" display-expr="nombre"
          v-model="item.nucleo" placeholder="Nucleos" value-expr="id" @value-changed="valueChanged" />
      </div>
      <div class="col-md-12 mb-2">
        <label class="tit">Programas</label>
        <DxSelectBox id="programas" :data-source="programas" :grouped="false" :min-search-length="3"
          :search-enabled="true" :show-clear-button="true" :show-data-before-search="true" class="form-control"
          display-expr="nombre" v-model="item.programas" placeholder="Programas" value-expr="id"
          @value-changed="valueChanged" />
      </div>
      <div class="col-md-4 mb-2">
        <label class="tit">Horas Totales</label>
        <DxTextArea height="37" value-change-event="keyup" :show-clear-button="true" v-model="item.horasTotales"
          class="form-control" placeholder="Total horas">
          <DxValidator>
            <DxRequiredRule />
          </DxValidator>
        </DxTextArea>
      </div>
      <div class="col-md-4 mb-2">
        <label class="tit">Número de Días</label>
        <DxTextArea height="37" value-change-event="keyup" :show-clear-button="true" v-model="item.numeroDias"
          class="form-control" placeholder="Número de Días">
          <DxValidator>
            <DxRequiredRule />
          </DxValidator>
        </DxTextArea>
      </div>
      <div class="col-md-4 mb-2">
        <label class="tit">Porcentaje Válido Asistencia</label>
        <DxTextArea height="37" value-change-event="keyup" :show-clear-button="true" v-model="item.porcentajeAsistencia"
          class="form-control" placeholder="Porcentaje Válido de Asistencias">
          <DxValidator>
            <DxRequiredRule />
          </DxValidator>
        </DxTextArea>
      </div>
      <div class="col-md-4 mb-2">
        <label class="tit">Cantidad Aulas</label>
        <DxTextArea height="37" value-change-event="keyup" :show-clear-button="true" v-model="item.cantidadAulas"
          class="form-control" placeholder="Cantidad de Aulas">
          <DxValidator>
            <DxRequiredRule />
          </DxValidator>
        </DxTextArea>
      </div>
      <div class="col-md-8 mb-2">
        <label class="tit">Lugar realización</label>
        <DxTextArea height="37" value-change-event="keyup" :show-clear-button="true" v-model="item.lugarRealizacion"
          class="form-control" placeholder="Lugar realización">
          <DxValidator>
            <DxRequiredRule />
          </DxValidator>
        </DxTextArea>
      </div>
      <div class="col-md-3 mb-2">
        <label class="tit">Fecha de inicio</label>
        <DxDateBox id="fechaInicioInscripciones" class="form-control" v-model="item.fechaInicioInscripciones"
          display-format="dd/MM/yyyy" type="date">
          <DxValidator>
            <DxRequiredRule />
          </DxValidator>
        </DxDateBox>
      </div>
      <div class="col-md-3 mb-2">
        <label class="tit">Fecha Fin de Inscripciones</label>
        <DxDateBox id="fechaFinInscripciones" class="form-control" v-model="item.fechaFinInscripciones"
          display-format="dd/MM/yyyy" type="date">
          <DxValidator>
            <DxRequiredRule />
          </DxValidator>
        </DxDateBox>
      </div>
      <div class="col-md-3 mb-2">
        <label class="tit">Inicio Curso</label>
        <DxDateBox id="fechaInicio" class="form-control" v-model="item.fechaInicio" display-format="dd/MM/yyyy"
          type="date">
          <DxValidator>
            <DxRequiredRule />
          </DxValidator>
        </DxDateBox>
      </div>
      <div class="col-md-3 mb-2">
        <label class="tit">Fin Curso</label>
        <DxDateBox id="fechaFin" class="form-control" v-model="item.fechaFin" display-format="dd/MM/yyyy" type="date">
          <DxValidator>
            <DxRequiredRule />
          </DxValidator>
        </DxDateBox>
      </div>
      <div class="col-md-3 mb-2">
        <label class="tit">Hora Inicio</label>
        <DxDateBox id="horaInicio" class="form-control" v-model="item.horaInicio" display-format="dd/MM/yyyy" type="date">
          <DxValidator>
            <DxRequiredRule />
          </DxValidator>
        </DxDateBox>
      </div>

      <div class="col-md-3 mb-2">
        <label class="tit">Publicado</label>
        <div class="form-control no-border">
          <DxCheckBox v-model="item.publicado" />
        </div>
      </div>
      <div class="col-md-3 mb-2">
        <label class="tit">Jornada Mañana</label>
        <div class="form-control no-border">
          <DxCheckBox v-model="item.publicado" />
        </div>
      </div>
      <div class="col-md-3 mb-2">
        <label class="tit">Jornada Tarde</label>
        <div class="form-control no-border">
          <DxCheckBox v-model="item.publicado" />
        </div>
      </div>
      <div class="col-md-3 mb-2">
        <label class="tit">Jornada Noche</label>
        <div class="form-control no-border">
          <DxCheckBox v-model="item.publicado" />
        </div>
      </div>

      <div class="col-md-12 mb-2">
        <label class="tit">Objetivos</label>
        <DxTextArea :height="110" value-change-event="keyup" :show-clear-button="true" id="objetivos"
          v-model="item.objetivos" class="form-control" placeholder="Objetivos">
          <DxValidator>
            <DxRequiredRule />
          </DxValidator>
        </DxTextArea>
      </div>
      <div class="col-md-12 mb-2">
        <label class="tit">Contenidos</label>
        <DxTextArea :height="110" value-change-event="keyup" :show-clear-button="true" id="descripcion"
          v-model="item.contenidos" class="form-control" placeholder="Contenidos">
          <DxValidator>
            <DxRequiredRule />
          </DxValidator>
        </DxTextArea>
      </div>
    </div>
  </DxValidationGroup>
  <div class="card-footer">
    <div class="d-flex justify-content-between align-items-center">
      <a class="btn btn-gray" @click.prevent="cancel"><i class="fa-solid fa-circle-xmark"></i>&nbsp;&nbsp;CANCELAR</a>
      <a class="btn btn-main" @click.prevent="save">GUARDAR&nbsp;&nbsp;<i class="fa-solid fa-floppy-disk"></i></a>
    </div>
  </div>
  <div class="card mt-4" v-if="$conf.debug">
    <div class="card-body">
      <span class="font-weight-semibold">item:</span> {{ item }}<br /><span class="font-weight-semibold">item_copy:</span>
      {{ item_copy }}
    </div>
  </div>
  {{ item }}
</template>
