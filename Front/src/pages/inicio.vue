<script setup>
import { onMounted } from "vue";
import Intro from "@/components/global/intro.vue";
import Stats from "@/components/global/stats.vue";
import AvanceArea from "@/components/global/avance-area.vue";
import AvanceIndGral from "@/components/global/avance-indicador-general.vue";
import AvanceIndProd from "@/components/global/avance-indicador-producto.vue";
onMounted(() => {});
</script>
<template>
	<div class="container pt-2 pb-2 content">
		<Intro />
		<Stats />
		<AvanceArea />
		<AvanceIndGral />
		<AvanceIndProd />
	</div>
</template>
