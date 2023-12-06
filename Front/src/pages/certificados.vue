<script setup>
import { ref, onMounted, toRaw, watch } from "vue";
import { DxTextBox, DxSelectBox } from "devextreme-vue";
import { useClasificadorStore } from "@/stores";
let codigo = ref(null), tipoId = ref(null), doc = ref(null), tipos = ref([]);
let store = useClasificadorStore();
let valueChanged = async (e) => {
	console.clear();
	console.log(_sep);
	let el = $(e.element);
	let id = el.attr("id");
	let val = e.value;
	console.log("id =>", id);
	console.log("value =>", val);
	if (id == "tipoPadreId" && val != null && typeof val !== "undefined") {
		console.log("value =>", val);
		let items = await store.porTipoId(val);
		padres.value = toRaw(items);
		console.log("items =>", toRaw(items));
	}
};
let certificado = async (por) => {
	$("#panel-main").lock(`Consultando por ${por == 'cod' ? 'código' : 'número de identificación'}`);
	setTimeout(function () {
		$("#panel-main").unlock();
	}, 3000);
};
let buscar = async (por) => {
	if (por == "porCodigo") {
		let cod = codigo.value;
		if (cod != null) {
			tipoId.value = null;
			doc.value = null;
			certificado("cod");
		}
	} else { // Por doc
		let docNum = doc.value;
		let tipo = tipoId.value;
		if (docNum != null && tipo != null) {
			codigo.value = null;
			certificado("doc");
		}
	}
};
onMounted(async () => {
	tipos.value = await store.porTipoNombre("tipo_documento_identidad");
	console.log("tipos =>", toRaw(tipos.value));
});
</script>
<template>
	<div class="container pt-2 pb-2 content">
		<div class="row">
			<div class="col-md-10 offset-md-1">
				<div class="card mb-4" id="panel-main">
					<div class="card-header main">
						<i class="fa-sharp fa-solid fa-file-certificate me-2"></i>
						Certificados
					</div>
					<img class="card-img-top h-6vw" src="/assets/img/banner-05.jpg" alt="Card Image" />
					<div class="card-body pt-3 pb-0">
						<div class="row">
							<div class="col-md-4 mb-3 fs">
								<fieldset>
									<div class="row">
										<div class="col pb-2">
											<legend>Buscar por código:</legend>
											<DxTextBox id="codigo" :show-clear-button="true" value-change-event="keyup" v-model="codigo"
												class="form-control" placeholder="Código" />
										</div>
									</div>
									<div class="row">
										<div class="col d-flex justify-content-end">
											<button type="button" class="btn btn-main" title="Consultar"
												@click.prevent="buscar('porCodigo')">Consultar <i
													class="fa-solid fa-magnifying-glass ms-1"></i></button>
										</div>
									</div>
								</fieldset>
							</div>
							<div class="col-md-8 mb-3 fs">
								<fieldset>
									<div class="row">
										<div class="col pb-2">
											<legend>Buscar por número de identificación:</legend>
											<div class="row">
												<div class="col-6">
													<DxSelectBox id="tipoId" :data-source="tipos" :grouped="false" class="form-control"
														display-expr="nombre" v-model="tipoId" placeholder="Tipo de identificación" value-expr="id"
														@value-changed="valueChanged" />
												</div>
												<div class="col-6">
													<DxTextBox id="doc" :show-clear-button="true" value-change-event="keyup" v-model="doc"
														class="form-control" placeholder="Identificación" />
												</div>
											</div>
										</div>
									</div>
									<div class="row">
										<div class="col d-flex justify-content-end">
											<button type="button" class="btn btn-main" title="Consultar"
												@click.prevent="buscar('porId')">Consultar <i
													class="fa-solid fa-magnifying-glass ms-1"></i></button>
										</div>
									</div>
								</fieldset>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
