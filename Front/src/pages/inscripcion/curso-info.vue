<script setup>
import api from "@/utils/api";
import { useRouter, useRoute } from "vue-router";
import { ref, toRaw, onMounted, getCurrentInstance } from "vue";
import { useCursoStore } from "@/stores";

const router = useRouter(),
  route = useRoute(),
  storeCursos = useCursoStore();

let cursoId = ref(null),
  cursos = ref([]),
  curso = ref(null),
  temas = ref([]),
  itemId = ref(null),
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
  cancel = (cb) => {
    router.push("/admin/cursos");
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
});

onMounted(async () => {
  console.clear();
  console.log(_sep);
  console.log("curso-datos.vue MOUNTED!");

  const id = route.params.id;
  if (id.length > 0) {
    cursos.value = await storeCursos.all();
    cursoId.value = id;
    temas.value = await storeCursos.TemasPorCursoId(cursoId.value);
    let ev = cursos.value.find((o) => o.id == id);
    curso.value = ev;
    console.log("ev =>", ev);
    console.log("temas =>", toRaw(temas.value));
    console.log("curso =>", toRaw(curso.value));
    console.log("CARGAR CURSO!!");
    cursoId.value = parseInt(id);
  } else {
    cursoId.value = 0;
  }
  if (props.itemId != null) itemId.value = props.itemId;
  if (props.item != null) {
    item.value = props.item;
    console.log("item =>", toRaw(item.value));
  } else {
    // readMode.value = false;
    item.value = toRaw(item_base);
  }
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
            <p>{{ curso.descripcion }}</p>
          </div>
          <div class="col-md-3">
            <img
              class="img-fluid"
              :src="'/assets/img/' + item.imagen"
              alt="Card image cap"
            />
          </div>
        </div>
        <div class="row p-3 pb-0 pt-4 bbd" v-if="item">
          <div class="col">
            <p class="text-center">
              <label class="tit">Asistencia</label>
              {{ curso.tipoAsistenciaNombre }}<br />
              <label class="tit">Departamento</label>
              {{ curso.departamentoNombre }}<br />
              <label class="tit">Municipio</label> {{ curso.municipioNombre
              }}<br />
              <label class="tit">Cantidad de cupos</label> {{ curso.cupoTotal
              }}<br />
              <label class="tit">Horas totales</label> {{ curso.horasTotales
              }}<br />
            </p>
          </div>
          <div class="col">
            <p class="text-center">
              <label class="tit">Lugar realización</label>
              {{ curso.lugarRealizacion }}<br />
              <label class="tit">Hora de inicio</label> {{ curso.horaInicio
              }}<br />
              <label class="tit">Tipo de curso</label> {{ curso.tipoCursoNombre
              }}<br />
              <label class="tit">Responsable</label> {{ curso.responsable
              }}<br />
              <label class="tit">Correo electrónico</label>
              {{ curso.correoElectronico }}<br />
            </p>
          </div>
          <div class="col">
            <p class="text-center">
              <label class="tit">Inicio inscripciones</label>
              {{ curso.fechaInicioInscripcion }}<br />
              <label class="tit">Fin inscripciones</label>
              {{ curso.fechaFinInscripcion }}<br />
              <label class="tit">Inicio del curso</label> {{ curso.fechaInicio
              }}<br />
              <label class="tit">Fin del curso:</label> {{ curso.fechaFin }}
            </p>
          </div>
        </div>
        <div class="row p-3 pb-0 pt-4 bbd" v-if="item">
          <div class="col ps-5">
            <p class="m-0"><label class="tit">Temas</label></p>
            <ul class="px-3">
              <li v-for="(item, index) in temas.temaNombre" :key="index">
                {{ item }}
              </li>
            </ul>
          </div>
          <div class="col pe-5">
            <p class="m-0"><label class="tit">Objetivos</label></p>
            <ul class="px-3">
              <li>
                Estudiar aprender y utilizar las diferentes tecnologicas en
                función de administración pública.
              </li>
              <li>
                Facilitar la incidencia de jóvenes pertenecientes a prácticas
                organizativas, movimientos sociales o miembros de algún
                ejercicio o práctica política con el Estado para causar mayor
                impacto en el desarrollo de prácticas, procesos de gestión
                juvenil.
              </li>
            </ul>
          </div>
        </div>
        <div class="row p-3 pb-0 pt-4 bbd" v-if="item">
          <div class="col ps-5">
            <p class="m-0"><label class="tit">Documentos</label></p>
            <ul class="px-3">
              <li>
                <a
                  href="https://sirecec3.esap.edu.co/Areas/AdministrarSirecec/Archivos/Imagenes/FijasSirecec/Instructivo_Certificados_Sirecec.pdf"
                  target="_blank"
                  title="Observar..."
                  >Instructivo para la descarga de los certificados del sistema
                  de registro y control de eventos de capacitación
                  <i
                    class="fa-solid fa-arrow-up-right-from-square fa-xs ms-1"
                  ></i>
                </a>
              </li>
              <li>
                <a
                  href="https://sirecec3.esap.edu.co/Areas/AdministrarSirecec/Archivos/Imagenes/FijasSirecec/Instructivo_Alto_Gobierno.pdf"
                  target="_blank"
                  title="Observar..."
                  >Instructivo para la inscripción de usuarios de la escuela de
                  alto gobierno y de la dirección nacional de capacitación
                  <i
                    class="fa-solid fa-arrow-up-right-from-square fa-xs ms-1"
                  ></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="card-footer">
        <div class="d-flex justify-content-between align-items-center">
          <span
            ><a class="btn btn-gray" @click.prevent="next"
              ><i class="me-1 fa-solid fa-circle-xmark"></i> CANCELAR</a
            ></span
          >
          <a class="btn btn-main" @click.prevent="next"
            >SIGUIENTE <i class="ms-1 fa-solid fa-circle-right"></i
          ></a>
        </div>
      </div>
    </div>
  </div>
</template>
