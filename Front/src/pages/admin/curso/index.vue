<script setup>
import Datos from "@/pages/admin/curso/datos.vue";
import Temas from "@/pages/admin/curso/tema-curso.vue";
import Encuestas from "@/pages/admin/curso/encuestas-curso.vue";
import { ref, onMounted } from "vue";
// https://js.devexpress.com/Documentation/Guide/UI_Components/TabPanel/Getting_Started_with_TabPanel/
import DxTabPanel, { DxItem } from "devextreme-vue/tab-panel";
let titulo = "Administración &raquo; Cursos",
  selectedIndex = ref(0),
  panelData = null,
  panelGrid = null;
onMounted(async () => {
  console.clear();
  console.log(_sep);
});
//----------------------------------------------------------------------------------------------------------------------------------------------
</script>
<template>
  <div class="container content">
    <div class="card data" id="data">
      <div class="card-header main d-flex justify-content-between">
        <span>
          <i class="fa-solid fa-gears"></i>
          <span v-html="titulo" /> &raquo;
          <span id="tit-action">Nuevo curso o existente</span>
        </span>
        <span>
          <router-link :to="{ path: '/admin/cursos' }" class="btn btn-trans"
            ><i class="fa-solid fa-circle-arrow-left"></i>VOLVER</router-link
          >
        </span>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-md-12">
            <DxTabPanel
              v-model:selected-index="selectedIndex"
              :loop="false"
              :animation-enabled="true"
              :swipe-enabled="false"
            >
              <DxItem title="1. Datos del curso">
                <Datos />
              </DxItem>
              <DxItem title="2. Gestión de Temas">
                <Temas />
              </DxItem>
              <DxItem title="3. Imágenes">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                urna eros, lacinia eu ullamcorper a, egestas porta nulla. Donec
                nec est nibh, rhoncus lobortis magna.
              </DxItem>
              <DxItem title="4. Documentos">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                urna eros, lacinia eu ullamcorper a, egestas porta nulla. Donec
                nec est nibh, rhoncus lobortis magna.
              </DxItem>
              <DxItem title="5. Gestión de Encuestas">
                <Encuestas />
              </DxItem>
              <DxItem title="6. Configuración de días">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                urna eros, lacinia eu ullamcorper a, egestas porta nulla. Donec
                nec est nibh, rhoncus lobortis magna.
              </DxItem>
              <DxItem title="7. Configuración certificado">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                urna eros, lacinia eu ullamcorper a, egestas porta nulla. Donec
                nec est nibh, rhoncus lobortis magna.
              </DxItem>
            </DxTabPanel>
          </div>
        </div>
      </div>
    </div>

    <div class="card mt-4" v-if="$conf.debug">
      <div class="card-body">
        <span class="font-weight-semibold">item:</span> {{ item }}<br /><span
          class="font-weight-semibold"
          >item_copy:</span
        >
        {{ item_copy }}
      </div>
    </div>
  </div>
</template>
