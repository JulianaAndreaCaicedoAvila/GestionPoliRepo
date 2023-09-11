<script setup>
import api from "@/utils/api";
import DxStore from "@/utils/dx";
import { useRoute } from "vue-router";
import NumberBox from "devextreme/ui/number_box";
import { ref, toRaw, onMounted, getCurrentInstance } from "vue";
import { useGeneralStore, useClasificadorStore, useAuthStore } from "@/stores";
import DxValidator, {
  DxRequiredRule,
  DxStringLengthRule,
} from "devextreme-vue/validator";
import {
  DxSelectBox,
  DxHtmlEditor,
  DxTextBox,
  DxTextArea,
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
  DxColumnFixing,
  DxDataGrid,
  DxEditing,
  DxExport,
  DxFilterRow,
  DxGrouping,
  DxGroupItem,
  DxGroupPanel,
  DxLoadPanel,
  DxLookup,
  DxPager,
  DxPaging,
  DxScrolling,
  DxSearchPanel,
  DxSorting,
  DxSummary,
} from "devextreme-vue/data-grid";
const route = useRoute(),
  store = useClasificadorStore(),
  auth = useAuthStore();
let titulo = "Administración &raquo; Cursos &raquo; Módulos",
  dependenciaIdTxtRef = ref(null),
  valGroup = ref(null),
  entidades = ref([]),
  dependencias = ref([]),
  especificos = ref([]),
  item = ref({
    id: 0,
    dependencia: null,
    nombre: null,
    descripcion: null,
    elaboradoPor: null,
    tipoCurso: null,
    asistencia: null,
    producto: null,
    indicador: null,
    territorial: null,
    departamento: null,
    municipio: null,
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
  dxStore = DxStore({
    key: ["id"],
    userData: JSON.stringify({
      esAdmin: auth.esAdmin,
      companyId: auth.user.companyId,
      dependenceId: auth.user.dependenceId,
    }),
    endPoint: "cursoModulo/dx",
    onLoading: function (loadOptions) {
      $("#grid").lock("Cargando");
      console.log("loadOptions =>", loadOptions);
      console.log("onLoading");
    },
    onLoaded: function (results) {
      console.log("results", results);
      console.log("onLoaded!");
      $("#grid").unlock();
      $("#data").unlock();
    },
  }),
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
      } el módulo "<span class="font-weight-semibold">${data.nombre}</span>"?`,
      onConfirm: () => {
        panelGrid = $("#grid");
        panelGrid.lock(
          `${data.activo ? "Desactivando" : "Activando"}, un momento por favor`,
          async function () {
            data.activo = data.activo ? false : true;
            await api()
              .post(`cursoModulo/ed`, data)
              .then((r) => {
                console.log("r =>", r);
                store.limpiar();
                cancel(function () {
                  // panelGrid.unlock();
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
  start = async (data) => {
    // console.clear();
    console.log(_sep);
    console.log("data =>", data);
    panelData = $("#data");
    panelGrid = $("#grid");
    // Editando
    if (typeof data !== "undefined") {
      $("#tit-action").text("Editar módulo");
      panelGrid.lock("Cargando");
      item.value = Clone(data);
    } else {
      $("#tit-action").text("Nuevo módulo");
      item.value = Clone(item_copy);
    }
    panelGrid.fadeOut("normal", async function () {
      console.log(typeof data);
      panelData.fadeIn("normal", function () {
        console.log(_sep);
        console.log("item =>", item.value);
        panelGrid.unlock();
      });
    });
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
    // console.clear();
    let result = valGroup.value.instance.validate();
    if (!result.isValid) {
      $.scrollTo($(".dx-invalid:first"), {
        duration: 600,
        offset: -110,
      });
    } else {
      panelData.lock(
        `${item.id == 0 ? "Creando" : "Actualizando"} módulo`,
        async function () {
          let dto = item.value;
          console.log("dto =>", dto);
          await api({ hideErrors: true })
            .post("cursoModulo/ed", dto)
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
  console.log(_sep);
});
//----------------------------------------------------------------------------------------------------------------------------------------------
</script>
<template>
  <DxValidationGroup ref="valGroup">
    <div class="row">
      <div class="col-md-4 mb-2">
        <label class="tit">Nombre del curso</label>
        <DxTextArea
          id="nombre"
          :height="100"
          value-change-event="keyup"
          :show-clear-button="true"
          v-model="item.nombre"
          class="form-control"
          placeholder="Nombre"
        >
          <DxValidator>
            <DxRequiredRule />
          </DxValidator>
        </DxTextArea>
      </div>
      <div class="col-md-4 mb-2">
        <label class="tit">Descripción</label>
        <DxTextArea
          :height="100"
          value-change-event="keyup"
          :show-clear-button="true"
          v-model="item.descripcion"
          class="form-control"
          placeholder="Descripcion"
        >
          <DxValidator>
            <DxRequiredRule />
          </DxValidator>
        </DxTextArea>
      </div>
      <div class="col-md-4 mb-2">
        <label class="tit">Código de verificación</label>
        <DxTextArea
          height="37"
          value-change-event="keyup"
          :show-clear-button="true"
          v-model="item.descripcion"
          class="form-control"
          placeholder="Descripcion"
        >
          <DxValidator>
            <DxRequiredRule />
          </DxValidator>
        </DxTextArea>
      </div>
      <div class="col-md-6 mb-2">
        <label class="tit">Dependencia Principal</label>
        <DxSelectBox
          id="dependencia"
          :data-source="dependencia"
          :grouped="false"
          :min-search-length="3"
          :search-enabled="true"
          :show-clear-button="true"
          :show-data-before-search="true"
          class="form-control"
          display-expr="nombre"
          v-model:value="item.dependencia"
          placeholder="Dependencias"
          value-expr="id"
          @value-changed="valueChanged"
        />
      </div>
      <div class="col-md-6 mb-2">
        <label class="tit">Elaborado por</label>
        <DxSelectBox
          id="elaboradoPor"
          :data-source="elaboradoPor"
          :grouped="false"
          :min-search-length="3"
          :search-enabled="true"
          :show-clear-button="true"
          :show-data-before-search="true"
          class="form-control"
          display-expr="nombre"
          v-model:value="item.elaboradoPor"
          placeholder="Elaborado por"
          value-expr="id"
          @value-changed="valueChanged"
        />
      </div>
      <div class="col-md-6 mb-2">
        <label class="tit">Tipo de curso</label>
        <DxSelectBox
          id="tipoCurso"
          :data-source="elaboradoPor"
          :grouped="false"
          :min-search-length="3"
          :search-enabled="true"
          :show-clear-button="true"
          :show-data-before-search="true"
          class="form-control"
          display-expr="nombre"
          v-model:value="item.elaboradoPor"
          placeholder="Elaborado por"
          value-expr="id"
          @value-changed="valueChanged"
        />
      </div>
      <div class="col-md-6 mb-2">
        <label class="tit">Asistencia</label>
        <DxSelectBox
          id="asistencia"
          :data-source="asistencia"
          :grouped="false"
          :min-search-length="3"
          :search-enabled="true"
          :show-clear-button="true"
          :show-data-before-search="true"
          class="form-control"
          display-expr="nombre"
          v-model:value="item.asistencia"
          placeholder=" Asistencia"
          value-expr="id"
          @value-changed="valueChanged"
        />
      </div>
      <div class="col-md-12 mb-2">
        <label class="tit">Producto</label>
        <DxSelectBox
          id="producto"
          :data-source="producto"
          :grouped="false"
          :min-search-length="3"
          :search-enabled="true"
          :show-clear-button="true"
          :show-data-before-search="true"
          class="form-control"
          display-expr="nombre"
          v-model:value="item.producto"
          placeholder="Producto"
          value-expr="id"
          @value-changed="valueChanged"
        />
      </div>
      <div class="col-md-12 mb-2">
        <label class="tit">Indicador</label>
        <DxSelectBox
          id="indicador"
          :data-source="indicador"
          :grouped="false"
          :min-search-length="3"
          :search-enabled="true"
          :show-clear-button="true"
          :show-data-before-search="true"
          class="form-control"
          display-expr="nombre"
          v-model:value="item.indicador"
          placeholder="Indicador"
          value-expr="id"
          @value-changed="valueChanged"
        />
      </div>
      <div class="col-md-4 mb-2">
        <label class="tit">Territorial</label>
        <DxSelectBox
          id="territorial"
          :data-source="territorial"
          :grouped="false"
          :min-search-length="3"
          :search-enabled="true"
          :show-clear-button="true"
          :show-data-before-search="true"
          class="form-control"
          display-expr="nombre"
          v-model:value="item.territorial"
          placeholder="Territorial"
          value-expr="id"
          @value-changed="valueChanged"
        />
      </div>
      <div class="col-md-4 mb-2">
        <label class="tit">Departamento</label>
        <DxSelectBox
          id="departamento"
          :data-source="departamento"
          :grouped="false"
          :min-search-length="3"
          :search-enabled="true"
          :show-clear-button="true"
          :show-data-before-search="true"
          class="form-control"
          display-expr="nombre"
          v-model:value="item.departamento"
          placeholder="Departamento"
          value-expr="id"
          @value-changed="valueChanged"
        />
      </div>
      <div class="col-md-4 mb-2">
        <label class="tit">Municipio</label>
        <DxSelectBox
          id="municipio"
          :data-source="municipio"
          :grouped="false"
          :min-search-length="3"
          :search-enabled="true"
          :show-clear-button="true"
          :show-data-before-search="true"
          class="form-control"
          display-expr="nombre"
          v-model:value="item.municipio"
          placeholder="Municipio"
          value-expr="id"
          @value-changed="valueChanged"
        />
      </div>
      <div class="col-md-6 mb-2">
        <label class="tit">Cupo total</label>
        <DxTextArea
          height="37"
          value-change-event="keyup"
          :show-clear-button="true"
          v-model="item.cupoTotal"
          class="form-control"
          placeholder="Numero de cupos"
        >
          <DxValidator>
            <DxRequiredRule />
          </DxValidator>
        </DxTextArea>
      </div>
      <div class="col-md-6 mb-2">
        <label class="tit">Cupo esta aula</label>
        <DxTextArea
          height="37"
          value-change-event="keyup"
          :show-clear-button="true"
          v-model="item.cupoAula"
          class="form-control"
          placeholder="Numero de cupos"
        >
          <DxValidator>
            <DxRequiredRule />
          </DxValidator>
        </DxTextArea>
      </div>
      <div class="col-md-4 mb-2">
        <label class="tit">Responsable</label>
        <DxTextArea
          height="37"
          value-change-event="keyup"
          :show-clear-button="true"
          v-model="item.responsable"
          class="form-control"
          placeholder="Nombre Responsable"
        >
          <DxValidator>
            <DxRequiredRule />
          </DxValidator>
        </DxTextArea>
      </div>
      <div class="col-md-4 mb-2">
        <label class="tit">Correo Electrónico</label>
        <DxTextArea
          height="37"
          value-change-event="keyup"
          :show-clear-button="true"
          v-model="item.correo"
          class="form-control"
          placeholder="Correo"
        >
          <DxValidator>
            <DxRequiredRule />
          </DxValidator>
        </DxTextArea>
      </div>
      <div class="col-md-4 mb-2">
        <label class="tit">Teléfono de contacto</label>
        <DxTextArea
          height="37"
          value-change-event="keyup"
          :show-clear-button="true"
          v-model="item.telefono"
          class="form-control"
          placeholder="Contacto"
        >
          <DxValidator>
            <DxRequiredRule />
          </DxValidator>
        </DxTextArea>
      </div>
      <div class="col-md-12 mb-2">
        <label class="tit">Banco Programa</label>
        <DxSelectBox
          id="bancoPrograma"
          :data-source="bancoPrograma"
          :grouped="false"
          :min-search-length="3"
          :search-enabled="true"
          :show-clear-button="true"
          :show-data-before-search="true"
          class="form-control"
          display-expr="nombre"
          v-model:value="item.bancoPrograma"
          placeholder="Banco de Programas"
          value-expr="id"
          @value-changed="valueChanged"
        />
      </div>
      <div class="col-md-12 mb-2">
        <label class="tit">Núcleo</label>
        <DxSelectBox
          id="nucleo"
          :data-source="nucleo"
          :grouped="false"
          :min-search-length="3"
          :search-enabled="true"
          :show-clear-button="true"
          :show-data-before-search="true"
          class="form-control"
          display-expr="nombre"
          v-model:value="item.nucleo"
          placeholder="Nucleos"
          value-expr="id"
          @value-changed="valueChanged"
        />
      </div>
      <div class="col-md-12 mb-2">
        <label class="tit">Programa de Capacitación</label>
        <DxSelectBox
          id="programaCapacitacion"
          :data-source="programaCapacitacion"
          :grouped="false"
          :min-search-length="3"
          :search-enabled="true"
          :show-clear-button="true"
          :show-data-before-search="true"
          class="form-control"
          display-expr="nombre"
          v-model:value="item.programaCapacitacion"
          placeholder="Programa de capacitación"
          value-expr="id"
          @value-changed="valueChanged"
        />
      </div>
      <div class="col-md-4 mb-2">
        <label class="tit">Horas Totales</label>
        <DxTextArea
          height="37"
          value-change-event="keyup"
          :show-clear-button="true"
          v-model="item.horasTotales"
          class="form-control"
          placeholder="Total horas"
        >
          <DxValidator>
            <DxRequiredRule />
          </DxValidator>
        </DxTextArea>
      </div>
      <div class="col-md-4 mb-2">
        <label class="tit">Número de Días</label>
        <DxTextArea
          height="37"
          value-change-event="keyup"
          :show-clear-button="true"
          v-model="item.numeroDias"
          class="form-control"
          placeholder="Número de Días"
        >
          <DxValidator>
            <DxRequiredRule />
          </DxValidator>
        </DxTextArea>
      </div>
      <div class="col-md-4 mb-2">
        <label class="tit">Porcentaje Válido Asistencia</label>
        <DxTextArea
          height="37"
          value-change-event="keyup"
          :show-clear-button="true"
          v-model="item.porcentajeAsistencia"
          class="form-control"
          placeholder="Porcentaje Válido de Asistencias"
        >
          <DxValidator>
            <DxRequiredRule />
          </DxValidator>
        </DxTextArea>
      </div>
      <div class="col-md-4 mb-2">
        <label class="tit">Cantidad Aulas</label>
        <DxTextArea
          height="37"
          value-change-event="keyup"
          :show-clear-button="true"
          v-model="item.cantidadAulas"
          class="form-control"
          placeholder="Cantidad de Aulas"
        >
          <DxValidator>
            <DxRequiredRule />
          </DxValidator>
        </DxTextArea>
      </div>
      <div class="col-md-8 mb-2">
        <label class="tit">Lugar realización</label>
        <DxTextArea
          height="37"
          value-change-event="keyup"
          :show-clear-button="true"
          v-model="item.lugarRealizacion"
          class="form-control"
          placeholder="Lugar realización"
        >
          <DxValidator>
            <DxRequiredRule />
          </DxValidator>
        </DxTextArea>
      </div>
      <div class="col-md-3 mb-2">
        <label class="tit">Fecha de inicio</label>
        <DxDateBox
          id="fechaInicioInscripciones"
          class="form-control"
          v-model="item.fechaInicioInscripciones"
          display-format="dd/MM/yyyy"
          type="date"
        >
          <DxValidator>
            <DxRequiredRule />
          </DxValidator>
        </DxDateBox>
      </div>
      <div class="col-md-3 mb-2">
        <label class="tit">Fecha Fin de Inscripciones</label>
        <DxDateBox
          id="fechaFinInscripciones"
          class="form-control"
          v-model="item.fechaFinInscripciones"
          display-format="dd/MM/yyyy"
          type="date"
        >
          <DxValidator>
            <DxRequiredRule />
          </DxValidator>
        </DxDateBox>
      </div>
      <div class="col-md-3 mb-2">
        <label class="tit">Inicio Curso</label>
        <DxDateBox
          id="fechaInicio"
          class="form-control"
          v-model="item.fechaInicio"
          display-format="dd/MM/yyyy"
          type="date"
        >
          <DxValidator>
            <DxRequiredRule />
          </DxValidator>
        </DxDateBox>
      </div>
      <div class="col-md-3 mb-2">
        <label class="tit">Fin Curso</label>
        <DxDateBox
          id="fechaFin"
          class="form-control"
          v-model="item.fechaFin"
          display-format="dd/MM/yyyy"
          type="date"
        >
          <DxValidator>
            <DxRequiredRule />
          </DxValidator>
        </DxDateBox>
      </div>
      <div class="col-md-3 mb-2">
        <label class="tit">Hora Inicio</label>
        <DxDateBox
          id="horaInicio"
          class="form-control"
          v-model="item.horaInicio"
          display-format="dd/MM/yyyy"
          type="date"
        >
          <DxValidator>
            <DxRequiredRule />
          </DxValidator>
        </DxDateBox>
      </div>
      <div class="col-md-12 mb-2">
        <label class="tit">Objetivos</label>
        <DxTextArea
          :height="110"
          value-change-event="keyup"
          :show-clear-button="true"
          id="objetivos"
          v-model="item.objetivos"
          class="form-control"
          placeholder="Objetivos"
        >
          <DxValidator>
            <DxRequiredRule />
          </DxValidator>
        </DxTextArea>
      </div>
      <div class="col-md-12 mb-2">
        <label class="tit">Contenidos</label>
        <DxTextArea
          :height="110"
          value-change-event="keyup"
          :show-clear-button="true"
          id="descripcion"
          v-model="item.contenidos"
          class="form-control"
          placeholder="Contenidos"
        >
          <DxValidator>
            <DxRequiredRule />
          </DxValidator>
        </DxTextArea>
      </div>
    </div>
  </DxValidationGroup>

  <div class="card mt-4" v-if="$conf.debug">
    <div class="card-body">
      <span class="font-weight-semibold">item:</span> {{ item }}<br /><span
        class="font-weight-semibold"
        >item_copy:</span
      >
      {{ item_copy }}
    </div>
  </div>
</template>
