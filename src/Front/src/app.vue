<script setup>
import { onMounted } from "vue";
import Header from "./components/global/header.vue";
import Footer from "./components/global/footer.vue";
// import Login from "./components/global/login.vue";
onMounted(() => {
	console.log("MAIN ONMOUNTED");
});
</script>
<template>
	<Header />
	<div role="main" class="main flex-grow pt-3 pb-0">
		<router-view v-slot="{ Component, route }">
			<transition name="fade" mode="out-in">
				<div :key="route.name">
					<component :is="Component"></component>
				</div>
			</transition>
		</router-view>
	</div>
	<Footer />
</template>
