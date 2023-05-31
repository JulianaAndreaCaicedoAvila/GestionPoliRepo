<script setup>
import { onMounted } from "vue";
import Intro from "@/components/global/intro.vue";
let bUrl = window._baseUrl;
onMounted(() => {
	// console.log("MAIN ONMOUNTED");
});
</script>
<template>
	<div class="container pt-2 pb-2 content">
		<Intro :show-info="false" />
	</div>
</template>
