<script setup>
import Datos from "@/pages/admin/curso/curso-datos.vue";
import Temas from "@/pages/admin/curso/curso-tema.vue";
import Archivos from "@/pages/admin/curso/curso-archivo.vue";
import Dias from "@/pages/admin/curso/curso-dias.vue";
import Encuestas from "@/pages/admin/curso/curso-encuesta.vue";
import { useCursoStore } from "@/stores";
import { ref, onMounted, toRaw } from "vue";
import { useRouter, useRoute } from "vue-router";
// https://js.devexpress.com/Documentation/Guide/UI_Components/TabPanel/Getting_Started_with_TabPanel/
import DxTabPanel, { DxItem } from "devextreme-vue/tab-panel";
const router = useRouter(), route = useRoute(), storeCursos = useCursoStore();
let titulo = "Administración &raquo; Cursos", selectedIndex = ref(0), cursoId = ref(null), curso = ref(null);
let cancel = () => {
  console.clear();
  console.log(_sep);
  storeCursos.item = data;
  console.log("Cancel in tabs!");
  router.push("/admin/cursos");
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
    cursoId.value = 1;
    if (storeCursos.item != null && storeCursos.item.id == parseInt(id)) curso.value = storeCursos.item;
    else curso.value = await storeCursos.getById(id);
    console.log("curso =>", toRaw(curso.value));
    console.log("CARGAR CURSO!!");
    cursoId.value = parseInt(id);
  } else {
    cursoId.value = 0;
  };
});
//----------------------------------------------------------------------------------------------------------------------------------------------
</script>
<template>
  <div class="container content">
    <div class="card data" id="data">
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
        <div class="row" v-if="curso">
          <div class="col-md-12">
            <DxTabPanel v-model:selected-index="selectedIndex" :loop="false" :scroll-by-content="true"
              :show-nav-buttons="true" :swipe-enabled="false" :scrolling-enabled="true">
              <DxItem title="1. Información">
                <Datos :item="curso" :item-id="cursoId" @on-cancel="cancel" />
              </DxItem>
              <DxItem title="2. Temas">
                <Temas :item="curso" :item-id="cursoId" @on-cancel="cancel" />
              </DxItem>
              <DxItem title="3. Encuestas">
                <Encuestas :item="curso" :item-id="cursoId" @on-cancel="cancel" />
              </DxItem>
              <DxItem title="4. Días">
                <Dias :item="curso" :item-id="cursoId" @on-cancel="cancel" />
              </DxItem>
              <DxItem title="5. Documentos">
                <Archivos :item="curso" :item-id="cursoId" @on-cancel="cancel" />
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
  </div>
</template>
