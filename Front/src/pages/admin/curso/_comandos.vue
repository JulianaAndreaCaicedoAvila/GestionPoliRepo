<script setup>
import { useRouter } from "vue-router";
import { onMounted } from "vue";
import { useAuthStore, useCursoStore } from "@/stores";
const estado = window._config.estado_curso;
const router = useRouter(), storeAuth = useAuthStore(), storeCurso = useCursoStore();

let setEstado = async (estadoId) => {
	let action = "volver a borrador";
	let title = "¡Vuelta a borrador exitosa!";
	let end = "está pendiente de modificación";
	let pd = $("#data-curso-tabs");
	switch (estadoId) {
		case estado.revision:
			action = "enviar a revisión";
			title = "¡Envío a revisión exitoso!";
			end = "está pendiente de revisión";
			break;
		case estado.aprobado:
			action = "aprobar";
			title = "¡Aprobación exitosa!";
			end = "fue aprobado";
			break;
		case estado.rechazado:
			action = "rechazar";
			title = "¡Rechazo exitoso!";
			end = "fue rechazado";
			break;
	}
	msg.confirm({
		// title: "otro",
		textCancel: "CANCELAR",
		textOk: action.toUpperCase(),
		text: `¿Realmente desea ${action} el curso <span class="font-weight-semibold">"${props.item.nombre}"</span>?`,
		onConfirm: async () => {
			pd.lock(`Cambiando el estado del curso,<br>un momento por favor`);
			let res = await storeCurso.estado(props.item.id, estadoId);
			storeCurso.cursosPublicados = [];
			storeCurso.cursos = [];
			console.log("res =>", res);
			setTimeout(function () {
				pd.unlock();
				msg.success(title, `<span class="font-weight-semibold d-inline-block mt-2">${storeAuth.user.firstName}</span>, acabamos de comunicar al usuario encargado que el curso <span class="font-weight-semibold">"${props.item.nombre}"</span> ${end}.`, function () {
					router.push("/admin/cursos");
				});
			}, 1500);
		},
		onCancel: () => { },
	});
}

// Se expone como eventos en el componente
const emit = defineEmits(['onCancel', 'onSave'])
const callOnCancel = () => {
	emit('onCancel');
}
const callOnSave = () => {
	emit('onSave')
}

// Propiedades
let props = defineProps({
	itemId: { type: Number, default: null, required: false },
	item: { type: Object, default: null, required: false },
	showSave: { type: Boolean, default: false, required: false },
	showRevision: { type: Boolean, default: false, required: false },
	showAprove: { type: Boolean, default: false, required: false }
});

onMounted(async () => {
	console.log(_sep);
	console.log("_comandos.vue MOUNTED!");
	console.log("estados =>", estado);
});
</script>
<template>
	<div class="row bt pb-3 pt-3 mt-3">
		<div class="col d-flex justify-content-between align-items-center">
			<a class="btn btn-gray" @click.prevent="callOnCancel">
				<i class="fa-solid fa-arrow-left me-2"></i>VOLVER
			</a>
			<span>
				<a class="btn btn-main" v-if="showSave" @click.prevent="callOnSave">GUARDAR<i
						class="fa-solid fa-floppy-disk ms-2"></i></a>
				<a class="btn btn-green ms-3" v-if="showRevision" @click.prevent="setEstado(estado.revision)">ENVIAR A REVISIÓN<i
						class="fa-solid fa-share-from-square ms-2"></i></a>
				<a class="btn btn-red ms-3" v-if="showAprove" @click.prevent="setEstado(estado.rechazado)">
					<i class="fa-regular fa-circle-xmark me-2"></i>RECHAZAR</a>
				<a class="btn btn-green ms-3" v-if="showAprove" @click.prevent="setEstado(estado.aprobado)">APROBAR<i
						class="fa-regular fa-circle-check ms-2"></i></a>
			</span>
		</div>
	</div>
</template>
