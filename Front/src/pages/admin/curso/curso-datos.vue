<script setup>
import api from "@/utils/api";
import DxStore from "@/utils/dx";
import { useRouter, useRoute } from "vue-router";
import NumberBox from "devextreme/ui/number_box";
import { ref, toRaw, onMounted, getCurrentInstance } from "vue";
import Cmds from "@/pages/admin/curso/_comandos.vue";
import {
  useProductoStore,
  useBancoStore,
  useNucleoStore,
  useIndicadorStore,
  useProgramaStore,
  useClasificadorStore,
  useEscuelaStore,
  useNivelStore,
  useAuthStore,
  useGeografiaStore,
} from "@/stores";
import DxValidator, {
  DxRequiredRule,
  DxEmailRule,
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
const router = useRouter(), route = useRoute(),
  store = useClasificadorStore(),
  storeProductos = useProductoStore(),
  storeBancos = useBancoStore(),
  storeNucleos = useNucleoStore(),
  storeNiveles = useNivelStore(),
  storeEscuelas = useEscuelaStore(),
  storeIndicadores = useIndicadorStore(),
  storeProgramas = useProgramaStore(),
  geoStore = useGeografiaStore(),
  auth = useAuthStore();
let titulo = "Administración &raquo; Cursos &raquo; Módulos",
  dependenciaIdTxtRef = ref(null),
  // asistencia = ["Presencial", "Virtual"],
  readOnly = ref(false),
  readOnlyEstado = ref(true),
  valGroup = ref(null),
  entidades = ref([]),
  asistencias = ref([]),
  indicadores = ref([]),
  municipios = ref([]),
  dependencias = ref([]),
  estados = ref([]),
  tipoCurso = ref([]),
  escuelas = ref([]),
  creadoPor = ref([]),
  productos = ref([]),
  territoriales = ref([]),
  departamentos = ref([]),
  nucleos = ref([]),
  niveles = ref([]),
  bancos = ref([]),
  programas = ref([]),
  itemId = ref(null),
  especificos = ref([]),
  item = ref(null),
  item_base = {
    id: 0,
    dependenciaId: null,
    codigoVerificacion: null,
    nombre: null,
    descripcion: null,
    creadoPor: null,
    tipoCursoId: 285, // Curso
    estadoCursoId: 421, // Borrador
    escuelaId: null,
    bancoId: null,
    nucleoId: null,
    nivelId: null,
    tipoAsistenciaId: null,
    productoId: null,
    indicadorId: null,
    elaboradoPorId: 5, // No aplica
    territorialId: null,
    programaId: null,
    departamentoId: null,
    municipioId: null,
    responsable: null,
    correoElectronico: null,
    telefonoContacto: 0,
    programaCapacitacion: null,
    horasTotales: 0,
    numeroDias: 1,
    publicado: false,
    jornadaManana: false,
    jornadaTarde: false,
    jornadaNoche: false,
    porcentajeValidoAsistencia: 80,
    cantidadAulas: 1,
    cupoAula: 10,
    cupoTotal: 10,
    lugarRealizacion: null,
    fechaInicioInscripcion: new Date(),
    fechaFinInscripcion: new Date(),
    fechaInicio: new Date(),
    fechaFin: new Date(),
    horaInicio: null,
    objetivos: null,
    contenidos: null,
    activo: true
  },
  panelData = null,
  panelGrid = null,
  grid = null,
  itemSelected = async (e) => {
    console.clear();
    console.log(_sep);
    console.log("itemSelected =>", e);
    let v = e.value;
    let id = $(e.element).attr("id");
    console.log("id =>", id);
    if (id == "fechaInicio" || id == "fechaFin") {
      const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
      let d1 = Date.parse(item.value.fechaInicio);
      let d2 = Date.parse(item.value.fechaFin);
      let days = Math.round(Math.abs((d1 - d2) / oneDay));
      item.value.numeroDias = days + 1;
      console.log("numeroDias =>", item.value.numeroDias);
    }
    if (id == "territorialId") {
      departamentos.value = [];
      municipios.value = [];
      item.value.municipioId = null;
      item.value.departamentoId = null;
      if (v !== null && v !== undefined) departamentos.value = await geoStore.dptosPorTerritorialId(v);
      console.log("departamentos =>", toRaw(departamentos.value));
    }
    if (id == "departamentoId") {
      municipios.value = [];
      item.value.municipioId = null;
      if (v !== null && v !== undefined) municipios.value = await geoStore.municipiosPorDepartamentoId(v);
      console.log("municipios =>", toRaw(municipios.value));
    }
    if (id == "escuelaId") {
      niveles.value = [];
      item.value.nivelId = null;
      if (v !== null && v !== undefined) niveles.value = await storeNiveles.nivelesPorEscuelaId(v);
      console.log("niveles =>", toRaw(niveles.value));
    }
    if (id == "dependenciaId") {
      productos.value = [];
      item.value.productoId = null;
      if (v !== null && v !== undefined) productos.value = await storeProductos.productosPorDependenciaId(v);
      console.log("productos =>", toRaw(productos.value));
    }
    if (id == "productoId") {
      indicadores.value = [];
      item.value.indicadorId = null;
      if (v !== null && v !== undefined) indicadores.value = await storeIndicadores.indicadorPorProductoId(v);
      console.log("indicadores =>", toRaw(indicadores.value));
    }
    if (id == "bancoId") {
      nucleos.value = [];
      programas.value = [];
      item.value.nucleoId = null;
      item.value.programaId = null;
      if (v !== null && v !== undefined) nucleos.value = await storeNucleos.nucleosPorBancoProgramaId(v);
      console.log("nucleos =>", toRaw(nucleos.value));
    }
    if (id == "nucleoId") {
      programas.value = [];
      item.value.programaId = null;
      if (v !== null && v !== undefined) programas.value = await storeProgramas.programaPorNucleoId(v);
      console.log("programas =>", toRaw(programas.value));
    }
    if (id == "cantidadAulas" || id == "cupoAula") {
      if (item.value.cantidadAulas != null && item.value.cupoAula != null) {
        item.value.cupoTotal = parseInt(item.value.cantidadAulas) * parseInt(item.value.cupoAula);
      }
    }
  },
  cancel = (cb) => {
    router.push("/admin/cursos");
  },
  save = async () => {
    panelData = $("#panel-data");
    panelGrid = null;
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
              console.clear();
              console.log("r =>", r);
              router.push("/admin/curso/" + r.data.id);
              // router.go();
              cancel(function () {
                // panelData.unlock();
                grid.refresh();
              });
            });
        }
      );
    }
  },
  setCode = () => {
    // 202312011657: https://stackoverflow.com/a/12502559
    item.value.codigoVerificacion = Math.random().toString(36).slice(2).toUpperCase();
    // item.value.codigoVerificacion = (Math.random() * 1e32).toString(36);
  };

let divipola = (item) => {
  console.log("item =>", item);
  if (item != null) return `${item.nombre} (${item.codigo})`;
}

// Se expone como evento en el componente
const emit = defineEmits(['onCancel'])
const callOnCancel = () => {
  emit('onCancel')
}

// Propiedades
let props = defineProps({
  itemId: { type: Number, default: null, required: false },
  item: { type: Object, default: null, required: false }
});

onMounted(async () => {
  console.clear();
  console.log(_sep);
  console.log("curso-datos.vue MOUNTED!");
  territoriales.value = await store.porTipoNombre("territorial");
  dependencias.value = await store.porTipoNombre("dependencia");
  tipoCurso.value = await store.porTipoNombre("tipo_curso");
  escuelas.value = await storeEscuelas.all();
  asistencias.value = await store.porTipoNombre("tipo_asistencia");
  estados.value = await store.porTipoNombre("estado_curso", true, false);
  creadoPor.value = await store.porTipoNombre("elaborado_por");
  bancos.value = await storeBancos.all();
  if (props.itemId != null) itemId.value = props.itemId;
  if (props.item != null) {
    departamentos.value = await geoStore.dptoAll();
    indicadores.value = await storeIndicadores.all();
    municipios.value = await geoStore.munAll();
    niveles.value = await storeNiveles.all();
    nucleos.value = await storeNucleos.all();
    productos.value = await storeProductos.all();
    programas.value = await storeProgramas.all();
    item.value = props.item;
  } else {
    readOnly.value = false;
    item.value = toRaw(item_base);
  };
  console.log("item =>", toRaw(item.value));
});
//----------------------------------------------------------------------------------------------------------------------------------------------
</script>
<template>
  <div class="row" id="panel-data">
    <div class="col py-4 px-4 ms-3">
      <!-- <div class="row">
        <div class="col pb-3 mb-3 bbd">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec urna
          eros, lacinia eu ullamcorper a, egestas porta nulla. Donec nec est
          nibh, rhoncus lobortis magna. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Donec urna eros, lacinia eu ullamcorper a, egestas
          porta nulla. Donec nec est nibh, rhoncus lobortis magna. Lorem ipsum
          dolor sit amet, consectetur adipiscing elit. Donec urna eros, lacinia
          eu ullamcorper a, egestas porta nulla. Donec nec est nibh, rhoncus
          lobortis magna.
        </div>
      </div> -->
      <!-- <div class="row">
        <div class="col pb-3 mb-3 bbd">
          {{ item }}
        </div>
      </div> -->
      <DxValidationGroup ref="valGroup" v-if="item">
        <div class="row">
          <div class="col-md-9">
            <label class="tit">Nombre del curso</label>
            <DxTextBox :read-only="readOnly" id="nombre" value-change-event="keyup" :show-clear-button="true"
              v-model="item.nombre" class="form-control" placeholder="Nombre del curso" @focus-out="$capitalizeAll">
              <DxValidator>
                <DxRequiredRule />
              </DxValidator>
            </DxTextBox>
          </div>
          <div class="col-md-3 mb-3">
            <label class="tit">Estado del curso</label>
            <DxSelectBox :read-only="readOnlyEstado" id="estadoCursoId" :data-source="estados" :grouped="false"
              :min-search-length="2" :search-enabled="true" v-model="item.estadoCursoId" :show-clear-button="true"
              :disabled="item.id == 0" :show-data-before-search="true" class="form-control" @value-changed="itemSelected"
              placeholder="Estado del curso" value-expr="id" display-expr="nombre" item-template="item">
              <DxValidator>
                <DxRequiredRule />
              </DxValidator>
            </DxSelectBox>
          </div>
          <div class="col-md-9 mb-3">
            <label class="tit">Descripción</label>
            <DxTextArea :read-only="readOnly" :height="80" value-change-event="keyup" :show-clear-button="true"
              v-model="item.descripcion" class="form-control" placeholder="Descripcion" @focus-out="$capitalize">
              <DxValidator>
                <DxRequiredRule />
              </DxValidator>
            </DxTextArea>
          </div>
          <div class="col-md-3 mb-3">
            <label class="tit">Código de verificación</label>
            <div class="input-group">
              <DxTextBox :read-only="readOnly" value-change-event="keyup" :show-clear-button="true"
                v-model="item.codigoVerificacion" class="form-control" placeholder="Código de verificación" />
              <div class="input-group-append">
                <a class="btn btn-main" title="Generar código..." @click.prevent="setCode()"><i
                    class="fa-solid fa-arrows-rotate"></i></a>
              </div>
            </div>
          </div>
          <div class="col-md-4 mb-1">
            <label class="tit">Dependencia</label>
            <DxSelectBox :read-only="readOnly" id="dependenciaId" ref="dependenciaIdTxtRef" :data-source="dependencias"
              :grouped="false" :min-search-length="2" :search-enabled="true" v-model="item.dependenciaId"
              :show-clear-button="true" :show-data-before-search="true" class="form-control" @value-changed="itemSelected"
              placeholder="Dependencia" value-expr="id" display-expr="nombre" item-template="item">
              <template #item="{ data }">
                {{ data.nombre }}
              </template>
              <DxValidator>
                <DxRequiredRule />
              </DxValidator>
            </DxSelectBox>
          </div>
          <div class="col-md-4 mb-3">
            <label class="tit">Elaborado por (convenio)</label>
            <DxSelectBox :read-only="readOnly" id="tipo_de_curso" :data-source="creadoPor" :grouped="false"
              :min-search-length="2" :search-enabled="true" :show-clear-button="true" :show-data-before-search="true"
              class="form-control" display-expr="nombre" v-model="item.elaboradoPorId" placeholder="Elaborado por"
              value-expr="id" @value-changed="itemSelected">
              <DxValidator>
                <DxRequiredRule />
              </DxValidator>
            </DxSelectBox>
          </div>
          <div class="col-md-4 mb-3">
            <label class="tit">Tipo de curso</label>
            <DxSelectBox :read-only="readOnly" id="creadoPor" :data-source="tipoCurso" :grouped="false"
              :min-search-length="2" :search-enabled="true" :show-clear-button="true" :show-data-before-search="true"
              class="form-control" display-expr="nombre" v-model="item.tipoCursoId" placeholder="Tipo de curso"
              value-expr="id" @value-changed="itemSelected">
              <DxValidator>
                <DxRequiredRule />
              </DxValidator>
            </DxSelectBox>
          </div>
          <div class="col-md-4 mb-3">
            <label class="tit">Asistencia</label>
            <DxSelectBox :read-only="readOnly" id="asistencia" :data-source="asistencias" :grouped="false"
              :min-search-length="2" :search-enabled="true" :show-clear-button="true" :show-data-before-search="true"
              class="form-control" display-expr="nombre" v-model="item.tipoAsistenciaId" placeholder="Tipo de asistencia"
              value-expr="id" @value-changed="itemSelected">
              <DxValidator>
                <DxRequiredRule />
              </DxValidator>
            </DxSelectBox>
          </div>
          <div class="col-md-4 mb-3">
            <label class="tit">Escuela</label>
            <DxSelectBox :read-only="readOnly" id="escuelaId" :data-source="escuelas" :grouped="false"
              :min-search-length="2" :search-enabled="true" :show-clear-button="true" :show-data-before-search="true"
              class="form-control" display-expr="nombre" v-model="item.escuelaId" placeholder="Escuela" value-expr="id"
              @value-changed="itemSelected" />
          </div>
          <div class="col-md-4 mb-3">
            <label class="tit">Nivel</label>
            <DxSelectBox :read-only="readOnly" id="nivel" :data-source="niveles" :grouped="false" :min-search-length="2"
              :search-enabled="true" :disabled="item.escuelaId == null" :show-clear-button="true"
              :show-data-before-search="true" class="form-control" display-expr="nombre" v-model="item.nivelId"
              placeholder="Nivel" value-expr="id" @value-changed="itemSelected" />
          </div>
          <div class="col-md-12 mb-3">
            <label class="tit">Producto</label>
            <DxSelectBox :read-only="readOnly" id="productoId" :data-source="productos" :grouped="false"
              :min-search-length="2" :disabled="productos.length <= 0" :search-enabled="true" :show-clear-button="true"
              :show-data-before-search="true" class="form-control" display-expr="nombre" v-model="item.productoId"
              placeholder="Producto" value-expr="id" @value-changed="itemSelected">
              <DxValidator>
                <DxRequiredRule />
              </DxValidator>
            </DxSelectBox>
          </div>
          <div class="col-md-12 mb-3">
            <label class="tit">Indicador</label>
            <DxSelectBox :read-only="readOnly" id="indicadorId" :data-source="indicadores" :grouped="false"
              :min-search-length="2" :disabled="indicadores.length <= 0" :search-enabled="true" :show-clear-button="true"
              :show-data-before-search="true" class="form-control" display-expr="nombre" v-model="item.indicadorId"
              placeholder="Indicador" value-expr="id" @value-changed="itemSelected">
              <DxValidator>
                <DxRequiredRule />
              </DxValidator>
            </DxSelectBox>
          </div>
          <div class="col-md-4 mb-3">
            <label class="tit">Territorial</label>
            <DxSelectBox :read-only="readOnly" id="territorialId" :data-source="territoriales" :grouped="false"
              :min-search-length="2" :search-enabled="true" :show-clear-button="true" :show-data-before-search="true"
              class="form-control" display-expr="nombre" v-model="item.territorialId" placeholder="Territoriales"
              value-expr="id" @value-changed="itemSelected">
              <DxValidator>
                <DxRequiredRule />
              </DxValidator>
            </DxSelectBox>
          </div>
          <div class="col-md-4 mb-3">
            <label class="tit">Departamento</label>
            <DxSelectBox :read-only="readOnly" id="departamentoId" :data-source="departamentos" :grouped="false"
              :disabled="departamentos.length <= 0" :min-search-length="2" :search-enabled="true"
              :show-clear-button="true" :show-data-before-search="true" class="form-control" :display-expr="divipola"
              v-model="item.departamentoId" placeholder="Departamentos" value-expr="id" @value-changed="itemSelected">
              <DxValidator>
                <DxRequiredRule />
              </DxValidator>
            </DxSelectBox>
          </div>
          <div class="col-md-4 mb-3">
            <label class="tit">Municipio</label>
            <DxSelectBox :read-only="readOnly" id="municipioId" :data-source="municipios" :grouped="false"
              :disabled="municipios.length <= 0" :min-search-length="2" :search-enabled="true" :show-clear-button="true"
              :show-data-before-search="true" class="form-control" :display-expr="divipola" v-model="item.municipioId"
              placeholder="Municipios" value-expr="id" @value-changed="itemSelected" item-template="item">
              <!-- <template #field="{ data }">
            <DxTextBox :read-only="readMode" :value="data.nombre + '(' + data.codigo + ')'" style="display:inline-block" />
          </template> -->
              <template #item="{ data }">{{ data.nombre }} ({{ data.codigo }})</template>
              <DxValidator>
                <DxRequiredRule />
              </DxValidator>
            </DxSelectBox>
          </div>
          <div class="col-md-6 mb-3">
            <label class="tit">Banco de programas</label>
            <DxSelectBox :read-only="readOnly" id="bancoId" :data-source="bancos" :grouped="false" :min-search-length="2"
              :search-enabled="true" :show-clear-button="true" :show-data-before-search="true" class="form-control"
              display-expr="nombre" v-model="item.bancoId" placeholder="Banco de programas" value-expr="id"
              @value-changed="itemSelected">
              <DxValidator>
                <DxRequiredRule />
              </DxValidator>
            </DxSelectBox>
          </div>
          <div class="col-md-6 mb-3">
            <label class="tit">Núcleo</label>
            <DxSelectBox :read-only="readOnly" id="nucleoId" :data-source="nucleos" :grouped="false"
              :min-search-length="2" :disabled="nucleos.length <= 0" :search-enabled="true" :show-clear-button="true"
              :show-data-before-search="true" class="form-control" display-expr="nombre" v-model="item.nucleoId"
              placeholder="Nucleo" value-expr="id" @value-changed="itemSelected">
              <DxValidator>
                <DxRequiredRule />
              </DxValidator>
            </DxSelectBox>
          </div>
          <div class="col-md-12 mb-3">
            <label class="tit">Programa</label>
            <DxSelectBox :read-only="readOnly" id="programaId" :data-source="programas" :grouped="false"
              :min-search-length="2" :disabled="programas.length <= 0" :search-enabled="true" :show-clear-button="true"
              :show-data-before-search="true" class="form-control" display-expr="nombre" v-model="item.programaId"
              placeholder="Programa" value-expr="id" @value-changed="itemSelected">
              <DxValidator>
                <DxRequiredRule />
              </DxValidator>
            </DxSelectBox>
          </div>
          <div class="col-md-3 mb-3">
            <label class="tit">Responsable</label>
            <DxTextBox :read-only="readOnly" value-change-event="keyup" :show-clear-button="true"
              v-model="item.responsable" class="form-control" placeholder="Nombre Responsable"
              @focus-out="$capitalizeAll">
              <DxValidator>
                <DxRequiredRule />
              </DxValidator>
            </DxTextBox>
          </div>
          <div class="col-md-3 mb-3">
            <label class="tit">Correo Electrónico</label>
            <DxTextBox :read-only="readOnly" value-change-event="keyup" :show-clear-button="true"
              v-model="item.correoElectronico" class="form-control" placeholder="Correo" @focus-out="$lowerCase">
              <DxValidator>
                <DxRequiredRule />
                <DxEmailRule />
              </DxValidator>
            </DxTextBox>
          </div>
          <div class="col-md-2 mb-3">
            <label class="tit">Teléfono</label>
            <DxTextBox :read-only="readOnly" value-change-event="keyup" :show-clear-button="true"
              v-model="item.telefonoContacto" class="form-control" placeholder="Teléfono">
              <DxValidator>
                <DxRequiredRule />
              </DxValidator>
            </DxTextBox>
          </div>
          <div class="col-md-4 mb-3">
            <label class="tit">Lugar de realización</label>
            <DxTextBox :read-only="readOnly" value-change-event="keyup" :show-clear-button="true"
              v-model="item.lugarRealizacion" class="form-control" placeholder="Lugar de realización">
              <DxValidator>
                <DxRequiredRule />
              </DxValidator>
            </DxTextBox>
          </div>

          <div class="col-md-10">
            <div class="row">
              <div class="col-md-3 mb-3">
                <label class="tit">Fecha inicio inscripciones</label>
                <DxDateBox :read-only="readOnly" id="fechaInicioInscripciones" class="form-control"
                  v-model="item.fechaInicioInscripcion" display-format="dd/MM/yyyy" type="date">
                  <DxValidator>
                    <DxRequiredRule />
                  </DxValidator>
                </DxDateBox>
              </div>
              <div class="col-md-3 mb-3">
                <label class="tit">Fecha fin inscripciones</label>
                <DxDateBox :read-only="readOnly" id="fechaFinInscripciones" class="form-control"
                  v-model="item.fechaFinInscripcion" display-format="dd/MM/yyyy" type="date"
                  :min="item.fechaInicioInscripcion">
                  <DxValidator>
                    <DxRequiredRule />
                  </DxValidator>
                </DxDateBox>
              </div>
              <div class="col-md-3 mb-3">
                <label class="tit">Fecha inicio curso</label>
                <DxDateBox :read-only="readOnly" id="fechaInicio" class="form-control" v-model="item.fechaInicio"
                  display-format="dd/MM/yyyy" type="date" :min="item.fechaFinInscripcion">
                  <DxValidator>
                    <DxRequiredRule />
                  </DxValidator>
                </DxDateBox>
              </div>
              <div class="col-md-3 mb-3">
                <label class="tit">Fecha fin curso</label>
                <DxDateBox :read-only="readOnly" id="fechaFin" class="form-control" v-model="item.fechaFin"
                  display-format="dd/MM/yyyy" type="date" :min="item.fechaInicio" @value-changed="itemSelected">
                  <DxValidator>
                    <DxRequiredRule />
                  </DxValidator>
                </DxDateBox>
              </div>
            </div>
          </div>
          <div class="col-md-2 mb-3">
            <label class="tit">Hora inicio</label>
            <DxDateBox :read-only="readOnly" id="horaInicio" class="form-control" v-model="item.horaInicio" type="time"
              :display-format="{ hour: 'numeric', minute: 'numeric', hour12: true }"
              :input-attr="{ 'aria-label': 'Time' }">
              <DxValidator>
                <DxRequiredRule />
              </DxValidator>
            </DxDateBox>
            <!-- {{ item.horaInicio }} -->
          </div>

          <div class="col-md-6">
            <div class="row">
              <div class="col-md-4 mb-3">
                <label class="tit">Cantidad de aulas</label>
                <DxNumberBox :read-only="readOnly" value-change-event="keyup" :show-spin-buttons="true" :min="1"
                  :max="100" :show-clear-button="false" v-model="item.cantidadAulas" class="form-control"
                  placeholder="Cantidad de aulas" @value-changed="itemSelected" id="cantidadAulas">
                  <DxValidator>
                    <DxRequiredRule />
                  </DxValidator>
                </DxNumberBox>
              </div>
              <div class="col-md-4 mb-3">
                <label class="tit">Cupo por aula</label>
                <DxNumberBox :read-only="readOnly" value-change-event="keyup" :show-spin-buttons="true" :min="1"
                  :show-clear-button="false" v-model="item.cupoAula" class="form-control" placeholder="Numero de cupos"
                  @value-changed="itemSelected" id="cupoAula">
                  <DxValidator>
                    <DxRequiredRule />
                  </DxValidator>
                </DxNumberBox>
              </div>
              <div class="col-md-4 mb-3">
                <label class="tit">Cupo total</label>
                <DxNumberBox :read-only="true" value-change-event="keyup" :show-spin-buttons="true" :min="0"
                  :show-clear-button="false" v-model="item.cupoTotal" class="form-control" placeholder="Numero de cupos"
                  @value-changed="itemSelected">
                  <DxValidator>
                    <DxRequiredRule />
                  </DxValidator>
                </DxNumberBox>
              </div>
            </div>
          </div>
          <div class="col-md-2 mb-3">
            <label class="tit">Total de horas</label>
            <DxNumberBox :read-only="readOnly" value-change-event="keyup" :show-spin-buttons="true" :min="1"
              :show-clear-button="false" v-model="item.horasTotales" class="form-control" placeholder="Total horas"
              @value-changed="itemSelected">
              <DxValidator>
                <DxRequiredRule />
              </DxValidator>
            </DxNumberBox>
          </div>
          <div class="col-md-2 mb-3">
            <label class="tit">Número de días</label>
            <DxNumberBox :read-only="readOnly" value-change-event="keyup" :show-spin-buttons="true" :min="1"
              :show-clear-button="false" v-model="item.numeroDias" class="form-control" placeholder="Número de días"
              @value-changed="itemSelected">
              <DxValidator>
                <DxRequiredRule />
              </DxValidator>
            </DxNumberBox>
          </div>
          <div class="col-md-2 mb-3">
            <label class="tit">Porcentaje asistencia</label>
            <DxNumberBox :read-only="readOnly" value-change-event="keyup" :show-spin-buttons="true" :min="50" :max="100"
              :show-clear-button="false" v-model="item.porcentajeValidoAsistencia" class="form-control"
              placeholder="Porcentaje válido asistencia" @value-changed="itemSelected">
              <DxValidator>
                <DxRequiredRule />
              </DxValidator>
            </DxNumberBox>
          </div>

          <div class="col-md-3 mt-2 mb-3 text-center">
            <label class="tit d-inline-block me-2" for="">Publicado</label>
            <DxCheckBox :read-only="readOnly" v-model="item.publicado" />
          </div>
          <div class="col-md-3 mt-2 mb-3 text-center">
            <label class="tit d-inline-block me-2">Jornada mañana</label>
            <DxCheckBox :read-only="readOnly" v-model="item.jornadaManana" />
          </div>
          <div class="col-md-3 mt-2 mb-3 text-center">
            <label class="tit d-inline-block me-2">Jornada tarde</label>
            <DxCheckBox :read-only="readOnly" v-model="item.jornadaTarde" />
          </div>
          <div class="col-md-3 mt-2 mb-3 text-center">
            <label class="tit d-inline-block me-2">Jornada noche</label>
            <DxCheckBox :read-only="readOnly" v-model="item.jornadaNoche" />
          </div>
          <div class="col-md-12 mb-3">
            <label class="tit">Objetivos</label>
            <DxTextArea :read-only="readOnly" :height="110" value-change-event="keyup" :show-clear-button="true"
              id="objetivos" v-model="item.objetivos" class="form-control" placeholder="Objetivos">
              <DxValidator>
                <DxRequiredRule />
              </DxValidator>
            </DxTextArea>
          </div>
          <div class="col-md-12 mb-3">
            <label class="tit">Contenidos</label>
            <DxTextArea :read-only="readOnly" :height="110" value-change-event="keyup" :show-clear-button="true"
              id="descripcion" v-model="item.contenidos" class="form-control" placeholder="Contenidos">
              <DxValidator>
                <DxRequiredRule />
              </DxValidator>
            </DxTextArea>
          </div>
        </div>
      </DxValidationGroup>
      <Cmds v-if="item" :item="item" :item-id="item.id" @on-cancel="callOnCancel" @on-save="save" :show-save="true" />
    </div>
  </div>
</template>
