<script setup>
import { useAuthStore, useCursoStore } from "@/stores";
import Info from "@/pages/inscripcion/curso-info.vue";
import Datos from "@/pages/inscripcion/curso-datos.vue";
import Tipo from "@/pages/inscripcion/curso-tipo.vue";
const auth = useAuthStore();
import { ref, onMounted, toRaw } from "vue";
import { useRouter, useRoute } from "vue-router";
// https://js.devexpress.com/Documentation/Guide/UI_Components/TabPanel/Getting_Started_with_TabPanel/
import DxTabPanel, { DxItem } from "devextreme-vue/tab-panel";
const router = useRouter(),
  route = useRoute(),
  store = useCursoStore();
let titulo = "Administración &raquo; Cursos",
  selectedIndex = ref(0),
  cursoId = ref(null),
  cursos = ref([]),
  curso = ref(null);
let cancel = () => {
  console.clear();
  console.log(_sep);
  store.item = data;
  console.log("Cancel in tabs!");
  router.push("/oferta");
};
defineExpose({ cancel });
onMounted(async () => {
  console.log(_sep);
  console.log("tabs.vue MOUNTED!");
  const id = route.params.id;
  console.log("id =>", id);
  console.log("id != null", id != null);
  console.log("id.length", id.length);
  if (id.length > 0) {
    cursoId.value = id;
    curso.value = await store.cursoPorId(id);
    console.log("curso =>", toRaw(curso.value));
    console.log("CARGAR CURSO!!");
    cursoId.value = parseInt(id);
  } else {
    cursoId.value = 0;
  }
});
//----------------------------------------------------------------------------------------------------------------------------------------------
</script>
<template>
  <div class="container content">
    <div class="card data" id="data">
      <div class="card-header main d-flex justify-content-between">
        <span class="d-flex justify-content-between">
          <span v-if="cursoId && cursoId != 0">
            <span v-if="curso" class="d-flex justify-content-between">
              <span><i class="fa fa-pencil me-1"></i></span>
              <span class="ms-2">Inscripción al curso <small>[AG2562]</small><br />{{
                curso.nombre
              }}</span>
            </span>
            <span v-else>Cargando curso...</span>
          </span>
        </span>
        <span>
          <router-link :to="{ name: 'oferta', params: { por: 'capacitacion' } }" class="btn btn-trans">
            <i class="fa-solid fa-circle-arrow-left"></i>VOLVER
          </router-link>
        </span>
      </div>
      <div class="card-body" v-if="cursoId > 0">
        <div class="row" v-if="curso">
          <div class="col-md-12">
            <DxTabPanel v-model:selected-index="selectedIndex" :loop="false" :scroll-by-content="true"
              :show-nav-buttons="true" :swipe-enabled="false" :scrolling-enabled="true">
              <DxItem title="1. Resumen del curso">
                <Info :item="curso" :item-id="cursoId" @on-cancel="cancel" />
              </DxItem>
              <DxItem title="2. Información personal y laboral" v-if="auth.user">
                <Datos :item="curso" :item-id="cursoId" @on-cancel="cancel" />
              </DxItem>
              <DxItem title="3. Tipo de participante y caracterización" v-if="auth.user">
                <Tipo :item="curso" :item-id="cursoId" @on-cancel="cancel" />
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
                <Datos @on-cancel="cancel" />
              </DxItem>
            </DxTabPanel>
          </div>
        </div>
      </div>
    </div>
    {{ curso }}
  </div>
</template>
