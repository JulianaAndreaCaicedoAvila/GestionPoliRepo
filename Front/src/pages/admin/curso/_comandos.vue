<script setup>
import { ref, toRaw, onMounted, getCurrentInstance } from "vue";

// Se expone como eventos en el componente
const emit = defineEmits(['onCancel', 'onSave'])
const callOnCancel = () => {
	emit('onCancel')
}
const callOnSave = () => {
	emit('onSave')
}

// Propiedades
let props = defineProps({
	itemId: { type: Number, default: null, required: false },
	item: { type: Object, default: null, required: false },
	showSave: { type: Boolean, default: false, required: false }
});

onMounted(async () => {
	$("#grid-archivo").lock("Cargando");
	console.log(_sep);
});
</script>
<template>
	<div class="row bt pb-3 pt-3 mt-3">
		<div class="col d-flex justify-content-between align-items-center">
			<a class="btn btn-gray" @click.prevent="callOnCancel"><i
					class="fa-solid fa-circle-xmark"></i>&nbsp;&nbsp;CANCELAR</a>
			<a class="btn btn-main" v-if="showSave" @click.prevent="callOnSave">GUARDAR&nbsp;&nbsp;<i
					class="fa-solid fa-floppy-disk"></i></a>
		</div>
	</div>
</template>
