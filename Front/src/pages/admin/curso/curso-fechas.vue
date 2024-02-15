<script setup>
import api from "@/utils/api";
import NumberBox from "devextreme/ui/number_box";
import { useRoute } from "vue-router";
import { useGenericStore } from "@/stores";
import { ref, toRaw, watch, onMounted } from "vue";
import Cmds from "@/pages/admin/curso/_comandos.vue";
import DxValidator, { DxRequiredRule, } from "devextreme-vue/validator";
import { DxNumberBox, DxDateBox, DxValidationGroup } from "devextreme-vue";
const store = useGenericStore();
const route = useRoute();
let itemId = ref(null),
	valGroup = ref(null),
	items = ref([]),
	pond = ref(0),
	porcentaje = ref(100),
	item = ref({
		id: 0,
		cursoId: props.itemId,
		fechaClase: null,
		ponderacion: null,
		activo: true,
		creadoEl: null,
		creadoPor: null,
		editadoEl: null,
		editadoPor: null,
		orden: 0,
	}),
	item_copy = Clone(item.value),
	panelData = null,
	save = async () => {
		console.clear();
		panelData = $("#data-dias");
		let result = valGroup.value.instance.validate();
		if (!result.isValid) {
			$.scrollTo($(".dx-invalid:first"), {
				duration: 600,
				offset: -110,
			});
		} else {
			// Cuando es válido
			panelData.lock(
				`"Actualizando fechas`,
				async function () {
					let dto = JSON.stringify(items.value);
					// dto.forEach(element => {
					// 	element.fechaClase = element.fechaClase.toISOString()
					// });
					console.log("dto =>", dto);
					await api()
						.post(`cursoFecha/ed`, dto)
						.then((r) => {
							emit('onRefresh');
							console.log("r =>", r);
							panelData.unlock();
							// cancel(function () {
							// 	panelData.unlock();
							// 	grid.refresh();
							// });
						});
				}
			);
		}
	},
	itemSelected = async (e) => {
		console.clear();
		console.log("value =>", e.value);
		let id = $(e.element).attr("id");
		if (id.includes("fecha-")) {
			console.log("items =>", toRaw(items.value));
			let t = [];
			items.value.forEach(el => {
				t.push(window.formatDate(el.fechaClase));
			});
			console.log("fechas =>", t);
			let u = t.filter(o => o == window.formatDate(e.value));
			console.log("fechas1 =>", u);
			setTimeout(function () {
				if (u.length > 1) {
					e.component.option("value", e.previousValue);
					console.log("CAMBIO! =>", e.previousValue);
				}
			}, 100);
		}
		if (id.includes("pond-")) {
			let t = 0;
			items.value.forEach(el => { t += el.ponderacion; });
			porcentaje.value = t;
			setTimeout(function () {
				if (t > 100) {
					porcentaje.value = 100;
					e.component.option("value", e.previousValue);
				}
			}, 100);
		}
	},
	prevent = async (e) => {
		// console.log("e =>", e);
		e.event.preventDefault();
	};

// Se expone como evento en el componente
const emit = defineEmits(['onCancel', 'onRefresh']);
const callOnCancel = () => {
	emit('onCancel');
}

// Propiedades
let props = defineProps({
	itemId: { type: Number, default: null, required: false },
	item: { type: Object, default: null, required: false },
	showRevision: { type: Boolean, default: false, required: false },
	showAprove: { type: Boolean, default: false, required: false }
});

// watch(
// 	() => porcentaje.value,
// 	(newV, oldV) => {
// 		console.log("newId, oldId =>", newV, oldV);
// 	}
// );

onMounted(async () => {
	$("#data-dias").lock("Cargando fechas");
	console.log(_sep);
	console.log("curso-fechas.vue MOUNTED!");
	console.log("route.name =>", route.name);
	itemId.value = props.itemId;
	item.value = props.item;
	console.log("item.value =>", item.value);
	pond.value = 100 / item.value.numeroDias;
	items.value = await store.post("/curso/fechas", props.itemId);
	console.log("items =>", items);
	// Crea los items iniciales
	if (items.value.length <= 0) {
		let r = [];
		let b = item.value.fechaInicio.split("T")[0].split("-"); // "2023-11-02T15:17:57.894786"
		let d = new Date(b[0], b[1] - 1, b[2]);
		for (let x = 0; x < item.value.numeroDias; x++) {
			let o = Clone(item_copy);
			o.fechaClase = window.addDays(d, x);
			o.ponderacion = pond.value;
			console.log("o =>", o);
			r.push(o);
		}
		console.log("r =>", toRaw(r));
		items.value = r;
	}
	$("#data-dias").unlock();
});
</script>
<template>
	<div class="container content">
		<div class="card data mt-3 mb-4" id="data-dias">
			<DxValidationGroup ref="valGroup">
				<div class="card-body pt-4 pb-2" style="min-height: 280px;">
					<!-- {{ items }}<br><br> -->
					<div class="row">
						<div class="col text-center mb-4 bb d-flex justify-content-between align-items-end">
							<h4 class="mb-2">Número de fechas en el curso: {{ item.numeroDias }}</h4>
							<h4 class="mb-2">Porcentaje total: {{ porcentaje }}%</h4>
						</div>
					</div>
					<div class="row">
						<div class="col-md-4 mb-2 text-center" v-for="(el, x) in  items ">
							<label class="tit mb-1" style="line-height: 1.2rem;">Fecha {{ x + 1 }}<br><span class="font-size-sm">(Fecha
									|
									Ponderación)</span></label>
							<div class="input-group mb-3">
								<DxDateBox :read-only="props.showAprove" :id="'fecha-' + (x + 1)" class="form-control" style="width:8%"
									:value="el.fechaClase" v-model="el.fechaClase" display-format="dd/MM/yyyy" type="date"
									:min="item.fechaInicio" :max="item.fechaFin" @value-changed="itemSelected" @key-down="prevent"
									@key-up="prevent">
									<DxValidator>
										<DxRequiredRule />
									</DxValidator>
								</DxDateBox>
								<DxNumberBox :read-only="props.showAprove" :show-spin-buttons="true" :step="5" :id="'pond-' + (x + 1)"
									:min="5" :value="el.ponderacion" :max="100" :show-clear-button="false" class="form-control"
									placeholder="Ponderación" v-model="el.ponderacion" @value-changed="itemSelected" @key-down="prevent"
									@key-up="prevent">
									<DxValidator>
										<DxRequiredRule />
									</DxValidator>
								</DxNumberBox>
								<span class="input-group-text">%</span>
							</div>
						</div>
					</div>
				</div>
			</DxValidationGroup>
			<!-- <div class="card-footer">
				<div class="d-flex justify-content-between align-items-center">
					<span></span>
					<a class="btn btn-gray" @click.prevent="cancel"><i class="fa-solid fa-circle-xmark"></i>&nbsp;&nbsp;CANCELAR</a>
					<a :class="'btn btn-main' + (porcentaje < 100 ? ' disabled' : '')" @click.prevent="save">GUARDAR&nbsp;&nbsp;<i
							class="fa-solid fa-floppy-disk"></i></a>
				</div>
			</div> -->
		</div>

		<Cmds :show-revision="showRevision" :show-aprove="showAprove" v-if="item" :item="item" :item-id="item.id"
			@on-cancel="callOnCancel" @on-save="save" :show-save="!props.showAprove" />

		<div class="card mt-4" v-if="$conf.debug">
			<div class="card-body">
				<span class="font-weight-semibold">item:</span> {{ item }}<br /><span
					class="font-weight-semibold">item_copy:</span>
				{{ item_copy }}
			</div>
		</div>
	</div>
</template>
