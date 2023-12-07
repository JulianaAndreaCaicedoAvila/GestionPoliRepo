<script setup>
import api from "@/utils/api";
import DxStore from "@/utils/dx";
import { useRouter, useRoute } from "vue-router";
import NumberBox from "devextreme/ui/number_box";
import { ref, toRaw, onMounted, getCurrentInstance } from "vue";
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
  readMode = ref(false),
  valGroup = ref(null),
  entidades = ref([]),
  asistencias = ref([]),
  indicadores = ref([]),
  municipios = ref([]),
  dependencias = ref([]),
  estados = ref([]),
  tipoCurso = ref([]),
  creadoPor = ref([]),
  escuelas = ref([]),
  productos = ref([]),
  territoriales = ref([]),
  departamentos = ref([]),
  nucleos = ref([]),
  niveles = ref([]),
  bancos = ref([]),
  itemId = ref(null),
  programas = ref([]),
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
    estadoCursoId: 359, // Sin aprobar
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
    numeroDias: 0,
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
  },
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
              console.log("r =>", r);
              router.push("/admin/curso/" + r.id);
              cancel(function () {
                // panelData.unlock();
                grid.refresh();
              });
            });
        }
      );
    }
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
  // console.clear();
  console.log(_sep);
  console.log("curso-datos.vue MOUNTED!");
  // territoriales.value = await store.porTipoNombre("territorial");
  // dependencias.value = await store.porTipoNombre("dependencia");
  // tipoCurso.value = await store.porTipoNombre("tipo_curso");
  // escuelas.value = await storeEscuelas.all();
  // asistencias.value = await store.porTipoNombre("tipo_asistencia");
  // estados.value = await store.porTipoNombre("estado_curso", true, false);
  // creadoPor.value = await store.porTipoNombre("elaborado_por");
  // bancos.value = await storeBancos.all();
  if (props.itemId != null) itemId.value = props.itemId;
  if (props.item != null) {
    // departamentos.value = await geoStore.dptoAll();
    // indicadores.value = await storeIndicadores.all();
    // municipios.value = await geoStore.munAll();
    // niveles.value = await storeNiveles.all();
    // nucleos.value = await storeNucleos.all();
    // productos.value = await storeProductos.all();
    // programas.value = await storeProgramas.all();
    item.value = props.item;
    console.log("item =>", toRaw(item.value));
  } else {
    // readMode.value = false;
    item.value = toRaw(item_base);
  };
});
//----------------------------------------------------------------------------------------------------------------------------------------------
</script>
<template>
  <div class="container content">
    <div class="card data" id="data-info">
      <div class="card-body pt-3 pb-4">
        <div class="row p-3 bbd" id="panel-data" v-if="item">
          <div class="col-md-9">
            <label class="tit">Descripción</label>
            <p>CURSO PRESENCIAL En el marco de la Escuela de Formación Política y Ciudadana Jóvenes Constructores del
              Cambio, la
              ESAP ofrece a la población entre 14 y 28 años del municipio de Santa Catalina, Bolivar, este curso para
              empoderar
              a
              los participante a incidir en la formulación e implementación de proyectos, agendas juveniles y políticas
              públicas.
              Lugar: Biblioteca de Loma de Arena, Municipio de Santa Catalina, Bolivar.</p>
          </div>
          <div class="col-md-3">
            <img class="img-fluid" :src="'/assets/img/' + item.imagen" alt="Card image cap">
          </div>
        </div>
        <div class="row p-3 pb-0 pt-4 bbd" v-if="item">
          <div class="col">
            <p class="text-center">
              <label class="tit">Asistencia</label> Presencial<br>
              <label class="tit">Departamento</label> Bogotá, D.C.<br>
              <label class="tit">Municipio</label> Bogotá, D.C.<br>
              <label class="tit">Cantidad de cupos</label> 100<br>
              <label class="tit">Horas totales</label> 16<br>
            </p>
          </div>
          <div class="col">
            <p class="text-center">
              <label class="tit">Lugar realización</label> Santa Catalina, Bolivar<br>
              <label class="tit">Hora de inicio</label> 8:00 AM<br>
              <label class="tit">Tipo de curso</label> Curso<br>
              <label class="tit">Responsable</label> Luisa Maria Rodriguez<br>
              <label class="tit">Correo electrónico</label> luisarodriguezg2@gmail.com<br>
            </p>
          </div>
          <div class="col">
            <p class="text-center">
              <label class="tit">Inicio inscripciones</label> 01/12/2023<br>
              <label class="tit">Fin inscripciones</label> 01/12/2023<br>
              <label class="tit">Inicio del curso</label> 01/12/2023<br>
              <label class="tit">Fin del curso:</label> 01/12/2023
            </p>
          </div>
        </div>
        <div class="row p-3 pb-0 pt-4 bbd" v-if="item">
          <div class="col ps-5">
            <p class="m-0"><label class="tit">Temas</label></p>
            <ul class="px-3">
              <li>Estructura del presupuesto en el orden territorial</li>
              <li>Desarrollo normativo a partir de la Constitución Política de 1991</li>
              <li>Desarrollo legislativo y su reglamentación</li>
              <li>Conceptualización de las finanzas públicas y la hacienda pública.</li>
              <li>Sistema presupuestal</li>
            </ul>
          </div>
          <div class="col pe-5">
            <p class="m-0"><label class="tit">Objetivos</label></p>
            <ul class="px-3">
              <li>Estudiar aprender y utilizar las diferentes tecnologicas en función de administración pública.</li>
              <li>Facilitar la incidencia de jóvenes pertenecientes a prácticas organizativas, movimientos sociales o
                miembros
                de algún ejercicio o práctica política con el Estado para causar mayor impacto en el desarrollo de
                prácticas,
                procesos de gestión juvenil.</li>
            </ul>
          </div>
        </div>
        <div class="row p-3 pb-0 pt-4 bbd" v-if="item">
          <div class="col ps-5">
            <p class="m-0"><label class="tit">Documentos</label></p>
            <ul class="px-3">
              <li>
                <a href="https://sirecec3.esap.edu.co/Areas/AdministrarSirecec/Archivos/Imagenes/FijasSirecec/Instructivo_Certificados_Sirecec.pdf"
                  target="_blank" title="Observar...">Instructivo para la descarga de los certificados del
                  sistema de registro y control de eventos
                  de capacitación
                  <i class="fa-solid fa-arrow-up-right-from-square fa-xs ms-1"></i>
                </a>
              </li>
              <li>
                <a href="https://sirecec3.esap.edu.co/Areas/AdministrarSirecec/Archivos/Imagenes/FijasSirecec/Instructivo_Alto_Gobierno.pdf"
                  target="_blank" title="Observar...">Instructivo
                  para la inscripción de usuarios de la escuela de
                  alto gobierno y de la dirección nacional de
                  capacitación
                  <i class="fa-solid fa-arrow-up-right-from-square fa-xs ms-1"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="card-footer">
        <div class="d-flex justify-content-between align-items-center">
          <span><a class="btn btn-gray" @click.prevent="next"><i class="me-1 fa-solid fa-circle-xmark"></i>
              CANCELAR</a></span>
          <a class="btn btn-main" @click.prevent="next">SIGUIENTE <i class="ms-1 fa-solid fa-circle-right"></i></a>
        </div>
      </div>
    </div>
  </div>
</template>
