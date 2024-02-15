<script setup>
import Datos from "@/pages/admin/curso/curso-datos.vue";
import Temas from "@/pages/admin/curso/curso-temas.vue";
import Archivos from "@/pages/admin/curso/curso-archivos.vue";
import Dias from "@/pages/admin/curso/curso-fechas.vue";
import Encuestas from "@/pages/admin/curso/curso-encuestas.vue";
import { useCursoStore } from "@/stores";
import { ref, onMounted, toRaw, watch, getCurrentInstance } from "vue";
import { useRouter, useRoute } from "vue-router";
// https://js.devexpress.com/Documentation/Guide/UI_Components/TabPanel/Getting_Started_with_TabPanel/
import DxTabPanel, { DxItem } from "devextreme-vue/tab-panel";
const instance = getCurrentInstance();
const estados = window._config.estado_curso;
const router = useRouter(), route = useRoute(), storeCursos = useCursoStore();
let cursoOri = null, selectedIndex = ref(0), cursoId = ref(null), curso = ref(null), toast = null,
  showRevision = ref(false), showAprove = ref(false), showSave = ref(false), isClean = ref(true);
let cancel = () => {
  // console.clear();
  console.log(_sep);
  // storeCursos.item = data;
  console.log("Cancel in tabs!");
  router.push("/admin/cursos");
};
let getShowRevision = () => {
  let eId = curso.value.estadoCursoId;
  if (eId == estados.aprobado || showAprove.value == true) return false;
  return curso.value.temas > 0 && curso.value.encuestas > 0
    && curso.value.fechas > 0
    && (curso.value.documentos + curso.value.imagenes) > 0;
}
let getShowSave = () => {
  let eId = curso.value.estadoCursoId;
  if (eId == estados.borrador || cursoId.value == 0) return true;
  return false;
}
let getShowAprove = () => {
  let eId = curso.value.estadoCursoId;
  return eId == estados.revision;
}
let refresh = async (id = null) => {
  // router.push(`/admin/curso/${curso.value.id}`);
  // if (id != null) window.location.href = window.window._basePath + window._baseUrl + "admin/curso/" + id;
  // console.clear();
  console.log(_sep);
  console.log("REFRESH!!");
  if (curso.value.escuelaId == null) curso.value.escuelaId = 0;
  cursoOri = Clone(curso.value);
  // if (cursoId == null) {
  // cursoOri = Clone(await storeCursos.porId(id != null ? id : curso.value.id));
  // if (cursoOri.escuelaId == null) cursoOri.escuelaId = 0;
  // console.log("cursoOri =>", cursoOri);
  // curso.value = Clone(cursoOri);
  // cursoId.value = cursoOri.id;
  finals();
  watchCheck();
  // }
  $("#data-curso-tabs").unlock();
}
let watchCheck = (source) => {
  console.log(_sep);
  console.log("watchCheck() => Source =>", source);
  if (curso.value.id > 0) {
    console.log("curso =>", toRaw(curso.value));
    console.log("cursoOri =>", cursoOri);
    isClean.value = IsEqual(cursoOri, curso.value);
    console.log("isClean =>", isClean.value);
    if (isClean.value) {
      showAprove.value = getShowAprove();
      showRevision.value = getShowRevision();
      // $.toast().reset('all');
      toast = null;
    } else {
      /*
      if (toast == null) {
        // https://kamranahmed.info/toast
        toast = $.toast({
          heading: 'Information',
          text: 'Here is some information that will be later on turned to an error',
          icon: 'info',
          hideAfter: false,
          position: 'bottom-center',
          stack: false,
          afterHidden: function () {
            $.toast().reset('all');
            toast = null;
          }
        });
      }
      */
      let eId = curso.value.estadoCursoId;
      if (eId == estados.borrador) showRevision.value = false;
      if (eId == estados.revision) showAprove.value = false;
    }
  }
}

function finals() {
  showAprove.value = getShowAprove();
  console.log("showAprove =>", showAprove.value);
  showRevision.value = getShowRevision();
  console.log("showRevision =>", showRevision.value);
  showSave.value = getShowSave();
  console.log("showSave =>", showSave.value);
}

// 202402150144: Deep Watchers
// https://vuejs.org/guide/essentials/watchers.html#deep-watchers
// function setWatchers() {
// watch(curso, () => { watchCheck("Objeto"); }); // Al reemplazar objeto
watch(() => curso, () => { watchCheck("Propiedad"); }, { deep: true }); // Al cambiar propiedad 
// }

// function setOnChanged() {
//   $("#tab-datos input,select").each(function (index) {
//     var el = $(this);
//     el.change(function (ev) {
//       console.clear();
//       console.log(el);
//       watchCheck();
//     })
//   });
// }

defineExpose({ cancel, refresh });

onMounted(async () => {
  $("#data-curso-tabs").lock("Cargando curso<br>un momento por favor", async function (params) {
    console.log(_sep);
    console.log("tabs.vue MOUNTED!");
    const id = route.params.id;
    console.log("id =>", id);
    console.log("id != null", id != null);
    console.log("id.length", id.length);
    if (id.length > 0) {
      if (storeCursos.item != null && storeCursos.item.id == parseInt(id)) {
        console.log("DESDE STORE!");
        curso.value = storeCursos.item;
      } else {
        console.log("DESDE API!");
        curso.value = await storeCursos.porId(id);
      }
      if (curso.value.escuelaId == null) curso.value.escuelaId = 0;
      cursoOri = Clone(curso.value);
      console.log("curso =>", toRaw(curso.value));
      console.log("CARGAR CURSO!!");
      cursoId.value = parseInt(id);
      finals();
    } else {
      cursoId.value = 0;
    };
    $("#data-curso-tabs").unlock(function (params) {
      // setTimeout(function () {
      //   setOnChanged();
      // }, 500);
    });
  });

});
//----------------------------------------------------------------------------------------------------------------------------------------------
</script>
<template>
  <div class="container content">
    <div class="card data" id="data-curso-tabs">
      <div class="card-header main d-flex justify-content-between align-items-end">
        <span class=" d-flex justify-content-between">
          <i class="fa-solid fa-gears"></i>
          <span v-if="cursoId == 0">Administración &raquo; Cursos &raquo; Nuevo</span>
          <span v-else>
            <span v-if="curso">Administración &raquo; Cursos<br>"{{ cursoOri.nombre }}"</span>
            <span v-else>Cargando curso...</span>
          </span>
        </span>
        <span>
          <router-link :to="{ path: '/admin/cursos' }" class="btn btn-trans">
            <i class="fa-solid fa-circle-arrow-left"></i>VOLVER
          </router-link>
        </span>
      </div>
      <div class="card-body" v-if="cursoId > 0">
        <div class="row" v-if="curso.id > 0">
          <div class="col-md-12 mb-2 d-flex justify-content-between">
            <p class="font-weight-semibold" v-if="isClean"><i class="fa-solid fa-circle-info me-1 color-main"></i>
              Debe completar toda la información del curso para
              someterlo a revisión.</p>
            <p class="m-0 d-inline-block me-3 font-weight-semibold error" v-else>
              <i class="fa-solid fa-circle-info me-1"></i>
              Debe guardar los cambios realizados para continuar
              <i class="fa-regular fa-hand-back-point-down fa-lg ms-1"></i>
            </p>
            <p><b class="font-weight-semibold color-main">Estado del curso:</b> {{ curso.estadoCursoNombre }}</p>
          </div>
        </div>
        <div class="row" v-if="curso">
          <div class="col-md-12">
            <DxTabPanel v-model:selected-index="selectedIndex" :loop="false" :scroll-by-content="true"
              :show-nav-buttons="true" :swipe-enabled="false" :scrolling-enabled="true">
              <DxItem title="1. Información">
                <Datos :item="curso" :item-id="cursoId" @on-cancel="cancel" @on-refresh="refresh"
                  :show-revision="showRevision" :show-aprove="showAprove" :show-save="showSave" :show-must-save="!isClean"
                  id="tab-datos" />
              </DxItem>
              <DxItem :disabled="!isClean" :title="'2. Temas (' + curso.temas + ')'">
                <Temas :item="curso" :item-id="cursoId" @on-cancel="cancel" @on-refresh="refresh"
                  :show-revision="showRevision" :show-aprove="showAprove" :show-save="showSave" />
              </DxItem>
              <DxItem :disabled="!isClean" :title="'3. Encuestas (' + curso.encuestas + ')'">
                <Encuestas :item="curso" :item-id="cursoId" @on-cancel="cancel" @on-refresh="refresh"
                  :show-revision="showRevision" :show-aprove="showAprove" :show-save="showSave" />
              </DxItem>
              <DxItem :disabled="!isClean" :title="'4. Fechas (' + curso.numeroDias + ')'">
                <Dias :item="curso" :item-id="cursoId" @on-cancel="cancel" @on-refresh="refresh"
                  :show-revision="showRevision" :show-aprove="showAprove" :show-save="showSave" />
              </DxItem>
              <DxItem :disabled="!isClean" :title="'5. Archivos (' + (curso.documentos + curso.imagenes) + ')'">
                <Archivos :item="curso" :item-id="cursoId" @on-cancel="cancel" @on-refresh="refresh"
                  :show-revision="showRevision" :show-aprove="showAprove" :show-save="showSave" />
              </DxItem>
            </DxTabPanel>
          </div>
        </div>
      </div>
      <div class="card-body" v-else>
        <div class="row">
          <div class="col-md-12">
            <DxTabPanel :loop="false" :scroll-by-content="true" :show-nav-buttons="true" :swipe-enabled="false"
              :scrolling-enabled="true">
              <DxItem title="1. Información">
                <Datos @on-cancel="cancel" @on-refresh="refresh" />
              </DxItem>
            </DxTabPanel>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>