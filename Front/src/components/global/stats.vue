<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useClasificadorStore } from "@/stores";
const store = useClasificadorStore();
const router = useRouter();
let detailClick = (e, i) => {
		console.log("e =>", e);
		console.log("i =>", i);
		router.push(`/accion`);
	},
	props = defineProps({
		showInfo: { type: Boolean, default: true, required: false },
		description: { type: String, default: "Something", required: false },
	}),
	getClass = () => {
		return props.showInfo ? "justify-content-between" : "justify-content-center";
	};
onMounted(() => {
	// $(window).resize(resize);
	// resize();
	store.load();
});
</script>
<template>
	<Transition>
		<div v-if="store.areas.length > 0" class="card mb-4">
			<div class="card-body pt-3 pb-2">
				<div class="row pt-3 pb-4">
					<div class="col-md-3">
						<div class="mb-2 text-center cifra" @click.prevent="detailClick('gen')">
							<div class="tit">Áreas de acción</div>
							<div class="num">{{ store.areas.length }}</div>
						</div>
					</div>
					<div class="col-md-3">
						<div class="mb-2 text-center cifra" @click.prevent="detailClick('gen')">
							<div class="tit">Objetivos generales</div>
							<div class="num">{{ store.generales.length }}</div>
						</div>
					</div>
					<div class="col-md-3">
						<div class="mb-2 text-center cifra" @click.prevent="detailClick('esp')">
							<div class="tit">Objetivos específicos</div>
							<div class="num">{{ store.especificos.length }}</div>
						</div>
					</div>
					<div class="col-md-3">
						<div class="mb-2 text-center cifra" @click.prevent="detailClick('acc')">
							<div class="tit">Acciones</div>
							<div class="num">{{ store.acciones_a.length }}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</Transition>
</template>
