<script setup>
import Datos from "@/pages/admin/curso/curso-datos.vue";
import Temas from "@/pages/admin/curso/curso-temas.vue";
import Archivos from "@/pages/admin/curso/curso-archivos.vue";
import Dias from "@/pages/admin/curso/curso-fechas.vue";
import Encuestas from "@/pages/admin/curso/curso-encuestas.vue";
import { useCursoStore } from "@/stores";
import { ref, onMounted, toRaw } from "vue";
import { useRouter, useRoute } from "vue-router";
// https://js.devexpress.com/Documentation/Guide/UI_Components/TabPanel/Getting_Started_with_TabPanel/
import DxTabPanel, { DxItem } from "devextreme-vue/tab-panel";
const estados = window._config.estado_curso;
const router = useRouter(), route = useRoute(), storeCursos = useCursoStore();
let selectedIndex = ref(0), cursoId = ref(null), curso = ref(null), showRevision = ref(false), showAprove = ref(false);
let cancel = () => {
  // console.clear();
  console.log(_sep);
  // storeCursos.item = data;
  console.log("Cancel in tabs!");
  router.push("/admin/cursos");
};
let getShowRevision = () => {
  if (showAprove.value == true) return false;
  return curso.value.temas > 0 && curso.value.encuestas > 0
    && curso.value.fechas > 0
    && (curso.value.documentos + curso.value.imagenes) > 0;
}
let getShowAprove = () => {
  let eId = curso.value.estadoCursoId;
  return eId == estados.revision;
}
let refresh = async () => {
  curso.value = await storeCursos.getById(cursoId.value);
  showAprove.value = getShowAprove();
  showRevision.value = getShowRevision();
}
defineExpose({ cancel, refresh });
onMounted(async () => {
  console.log(_sep);
  console.log("tabs.vue MOUNTED!");
  const id = route.params.id;
  console.log("id =>", id);
  console.log("id != null", id != null);
  console.log("id.length", id.length);
  if (id.length > 0) {
    if (storeCursos.item != null && storeCursos.item.id == parseInt(id)) curso.value = storeCursos.item;
    else curso.value = await storeCursos.getById(id);
    console.log("curso =>", toRaw(curso.value));
    console.log("CARGAR CURSO!!");
    cursoId.value = parseInt(id);
    showAprove.value = getShowAprove();
    console.log("showAprove =>", showAprove.value);
    showRevision.value = getShowRevision();
    console.log("showRevision =>", showRevision.value);
  } else {
    cursoId.value = 0;
  };
});
//----------------------------------------------------------------------------------------------------------------------------------------------
</script>
<template>
  <div class="container content">
    <div class="card data" id="data-curso-tabs">
      <div class="card-header main d-flex justify-content-between">
        <span class=" d-flex justify-content-between">
          <i class="fa-solid fa-gears"></i>
          <span v-if="cursoId == 0">Administración &raquo; Cursos &raquo; Nuevo</span>
          <span v-else>
            <span v-if="curso">Administración &raquo; Cursos<br>"{{ curso.nombre }}"</span>
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
            <p class="font-weight-semibold"><i class="fa-solid fa-circle-info me-1 color-main"></i>
              Debe completar toda la información del curso para
              someterlo a revisión.</p>
            <p><b class="font-weight-semibold color-main">Estado del curso:</b> {{ curso.estadoCursoNombre }}</p>
          </div>
        </div>
        <div class="row" v-if="curso">
          <div class="col-md-12">
            <DxTabPanel v-model:selected-index="selectedIndex" :loop="false" :scroll-by-content="true"
              :show-nav-buttons="true" :swipe-enabled="false" :scrolling-enabled="true">
              <DxItem title="1. Información">
                <Datos :item="curso" :item-id="cursoId" @on-cancel="cancel" @on-refresh="refresh"
                  :show-revision="showRevision" :show-aprove="showAprove" />
              </DxItem>
              <DxItem :title="'2. Temas (' + curso.temas + ')'">
                <Temas :item="curso" :item-id="cursoId" @on-cancel="cancel" @on-refresh="refresh"
                  :show-revision="showRevision" :show-aprove="showAprove" />
              </DxItem>
              <DxItem :title="'3. Encuestas (' + curso.encuestas + ')'">
                <Encuestas :item="curso" :item-id="cursoId" @on-cancel="cancel" @on-refresh="refresh"
                  :show-revision="showRevision" :show-aprove="showAprove" />
              </DxItem>
              <DxItem :title="'4. Fechas (' + curso.fechas + ')'">
                <Dias :item="curso" :item-id="cursoId" @on-cancel="cancel" @on-refresh="refresh"
                  :show-revision="showRevision" :show-aprove="showAprove" />
              </DxItem>
              <DxItem :title="'5. Archivos (' + (curso.documentos + curso.imagenes) + ')'">
                <Archivos :item="curso" :item-id="cursoId" @on-cancel="cancel" @on-refresh="refresh"
                  :show-revision="showRevision" :show-aprove="showAprove" />
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