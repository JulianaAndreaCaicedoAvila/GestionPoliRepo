<script setup>
import api from "@/utils/api";
import DxStore from "@/utils/dx";
import { ref, toRaw, onMounted } from "vue";
import { useClasificadorStore, useAuthStore } from "@/stores";
import { DxSelectBox, DxTextBox, DxValidationGroup } from "devextreme-vue";
import DxValidator, { DxRequiredRule, DxCustomRule, DxEmailRule, DxCompareRule, DxStringLengthRule } from "devextreme-vue/validator";
import {
	DxColumn,
	DxColumnChooser,
	DxExport,
	DxScrolling,
	DxFilterRow,
	DxDataGrid,
	DxLookup,
	DxGrouping,
	DxGroupItem,
	DxGroupPanel,
	DxLoadPanel,
	DxPager,
	DxPaging,
	DxSearchPanel,
	DxSorting,
	DxSummary,
} from "devextreme-vue/data-grid";
const g = window._config.general; // Configuraciones generales
const store = useClasificadorStore();
const authStore = useAuthStore();
let entidades = ref([]),
	editando = ref(false),
	esExterno = ref(false),
	dependencias = ref([]),
	convenios = ref([]),
	territoriales = ref([]),
	item = ref({
		"id": 0,
		"roleId": null, // 7 -> Docente
		"companyId": g.entidad_esap_id,
		"territorialId": g.territorial_direccion_nacional_id,
		"dependenceId": g.dependencia_capacitacion_id,
		"projectId": g.elaborado_por_convenio_na_id,
		"email": "@esap.edu.co",
		"firstName": null,
		"lastName": null,
		"password": null,
		"password1": null,
		"isActive": true,
		"emailConfirmed": true,
	}),
	item2 = { "id": 2, "roleId": 5, "roleName": "Docente", "companyId": 357, "companyName": "Departamento Nacional de Planeación (DNP)", "dependenceId": 13, "dependenceName": "Capacitación", "territorialId": null, "territorialName": null, "projectId": null, "projectName": null, "name": "Jesús Emiliano Castañeda Palacios", "firstName": "Jesús Emiliano", "lastName": "Castañeda Palacios", "email": "donjesus2008@gmail.com", "userName": "donjesus2008@gmail.com", "emailConfirmed": false, "passwordHash": "AQAAAAEAACcQAAAAEDug0UNfxf4TbUjxdD81vXYSX+IPu8nYl01tbFRkS/g7/J9OfPsAShrVO+zjq78Jfg==", "securityStamp": "UW2VI74BNEGZIC2IGM5VGKMTXHFGLDV6", "phoneNumber": null, "phoneNumberConfirmed": false, "twoFactorEnabled": false, "lockoutEnd": null, "lockoutEnabled": true, "accessFailedCount": 0, "concurrencyStamp": "9bbee46f-518e-4559-933f-8669172a92f1", "normalizedEmail": "DONJESUS2008@GMAIL.COM", "normalizedUserName": "DONJESUS2008@GMAIL.COM", "isActive": true },
	item_copy = Clone(item.value),
	valGroup = ref(null),
	panelData = null,
	panelGrid = null,
	roles = ref([]),
	dxStore = DxStore({
		key: ["id"],
		userData: "",
		endPoint: "usuario/todos/dx",
		onLoading: function (loadOptions) {
			$("#grid").lock("Cargando");
			console.log("loadOptions =>", loadOptions);
			// root.loaderShow("Cargando Dependencias", "#panel-produccion .card-body");
			console.log("onLoading...");
		},
		onLoaded: function (results) {
			// console.clear();
			console.log("results", results);
			// root.totaCount = results.totalCount;
			// root.loaderHide();
			console.log("onLoaded!");
			$("#grid").unlock();
			$("#data").unlock();
		},
	}),
	customizeColumns = () => {
		// console.log("customizeColumns!");
		// columns[0].width = 70;
	},
	passwordComparison = () => {
		return item.value.password;
	},
	ansvEmailRule = (e) => {
		if (item.value.companyId !== g.entidad_esap_id) return true;
		return e.value.toLowerCase().contains("@esap.edu.co");
	},
	grid = null,
	onInitialized = (o) => {
		grid = o.component;
		console.log("grid =>", grid);
	},
	passwordRule = (e) => {
		// console.clear();
		let el = $(e.validator._$element);
		let id = el.attr("id");
		console.log("id =>", id);
		console.log("e=>", e);
		// Actualizando usuario
		if (item.value.id !== null && item.value.id !== 0) {
			console.log("item =>", toRaw(item.value));
			// Se está actualziando la clave
			let i = toRaw(item.value);
			let pwd = i.password;
			console.log("i =>", i);
			console.log("typeof pwd =>", typeof pwd);
			console.log("ACTUALIZANDO! =>", pwd);
			if (typeof pwd !== "undefined") {
				if (pwd.length > 0) {
					if (e.value && e.value.length <= 5) {
						e.rule.message = "Debe tener más de 5 caractéres";
						return false;
					}
					return true;
				} else {
					return true;
				}
			} else {
				return true;
			}
		} else {
			console.log("CREANDO! =>", pwd);
			if (e.value == null || e.value.length <= 0) {
				e.rule.message = "Obligatorio";
				return false;
			}
			if (e.value && e.value.length <= 5) {
				e.rule.message = "Debe tener más de 5 caractéres";
				return false;
			}
			return true;
		}
	},
	save = () => {
		// console.clear();
		let result = valGroup.value.instance.validate();
		if (result.isValid) {
			panelData.lock(`${item.id == 0 ? "Creando" : "Actualizando"} usuario`, async function () {
				console.log("item =>", item.value);
				let dto = toRaw(item.value);
				if (!dto.hasOwnProperty("password")) dto["password"] = null;
				dto["emailConfirmed"] = true;
				console.log("dto =>", dto);
				await api()
					.post(`usuario/ed`, dto)
					.then((r) => {
						// console.clear();
						console.log("r =>", r);
						addCancel(function () {
							panelData.unlock();
							grid.refresh();
						});
					})
					.catch((r) => {
						console.log("r =>", r);
						addCancel(function () {
							panelData.unlock();
							grid.refresh();
						});
					});
			});
		}
	},
	itemSelected = async (e) => {
		console.log(_sep);
		let id = $(e.element).attr("id");
		console.log("id =>", id);
		let v = e.value ? e.value : e.event ? e.event.target.value : null;
		console.log("v =>", v);
		if (v !== null && v !== undefined) {
			if (id == "companyId") {
				esExterno.value = v != g.entidad_esap_id;
				if (!editando.value) item.value.email = v != g.entidad_esap_id ? null : "@esap.edu.co";
			}
			// if (id == "roleId") {
			// 	if (v >= 3 && v <= 5) {
			// 		requiereDatos.value = true;
			// 	} else {
			// 		requiereDatos.value = false;
			// 	}
			// }
			// if (id == "email") {
			// 	if (v.includes("@esap.edu.co")) {
			// 		item.companyId = companyId;
			// 		esExterno.value = false;
			// 	} else {
			// 		esExterno.value = true;
			// 	}
			// }
		}
	},
	active = (data) => {
		// console.clear();
		console.log("data =>", data);
		msg.confirm({
			// title: "otro",
			textCancel: "CANCELAR",
			textOk: data.isActive ? "DESACTIVAR" : "ACTIVAR",
			text: `¿Realmente desea ${data.isActive ? "desactivar" : "activar"} al usuario "<span class="font-weight-semibold">${data.name}</span>"?`,
			onConfirm: () => {
				panelGrid.lock(
					`${data.activo ? "Desactivando" : "Activando"} usuario, un momento por favor`,
					async function () {
						data.isActive = !data.isActive;
						console.log("dto =>", data);
						await api()
							.post(`usuario/ed`, data)
							.then((r) => {
								console.log("r =>", r);
								addCancel(function () {
									panelGrid.unlock();
									grid.refresh();
								});
							})
							.catch((r) => {
								console.log("r =>", r);
								addCancel(function () {
									panelGrid.unlock();
									grid.refresh();
								});
							});
					}
				);
			},
			onCancel: () => { },
		});
	},
	addStart = (data) => {
		// console.clear();
		panelData = $("#data");
		panelGrid = $("#grid");
		console.log("data =>", data);
		panelGrid.fadeOut("normal", function () {
			console.log(typeof data);
			if (typeof data !== "undefined") { // Editando
				editando.value = true;
				item.value = Clone(data);
				// if (data.email.contains("@esap.edu.co")) {

				// }
			} else { // Nuevo
				editando.value = false;
				item.value = Clone(item_copy);
			}
			panelData.fadeIn("normal", function () {
				console.log("item =>", item.value);
			});
		});
	},
	addCancel = (cb) => {
		// console.clear();
		console.log("CANCEL!");
		panelData.fadeOut("normal", function () {
			panelData.clear();
			panelGrid.fadeIn("normal", function () {
				item.value = Clone(item_copy);
				console.log("item =>", item);
				valGroup.value.instance.reset();
				if (typeof cb === "function") cb();
			});
		});
	};
onMounted(async () => {
	// console.clear();
	console.log(_sep);
	roles.value = await authStore.getRoles();
	console.log("roles =>", toRaw(roles.value));
	let res = await store.porTipoNombre("entidad");
	// res = res.filter((o) => o.hijos > 0);
	entidades.value = res;
	console.log("entidades =>", toRaw(entidades.value));
	res = await store.porTipoNombre("dependencia");
	dependencias.value = res;
	convenios.value = await store.porTipoNombre("elaborado_por");
	territoriales.value = await store.porTipoNombre("territorial");
	console.log("dependencias =>", toRaw(dependencias.value));
	console.log("territoriales =>", toRaw(territoriales.value));
	console.log("convenios =>", toRaw(convenios.value));
	console.log("valGroup =>", valGroup);
	console.log("valGroup.value =>", valGroup.value);
	// console.log($config);
	console.log("MAIN ONMOUNTED");
	// console.log("window._config MOUNTED =>", window._config);
	panelData = $("#data");
	panelGrid = $("#grid");
	// panelGrid.lock("Cargando");
	// setTimeout(function () {
	// 	panelGrid.lock("Testing");
	// }, 300);
});
</script>
<template>
	<div class="container pt-2 pb-2 content">
		<div class="card data hidden" id="data">
			<div class="card-header main d-flex justify-content-between">
				<span>
					<i class="fa-solid fa-gears"></i>
					Administración &raquo; Usuarios &raquo; <span title="tit-action">Nuevo usuario</span>
				</span>
			</div>

			<DxValidationGroup ref="valGroup">
				<div class="card-body pt-3 pb-4">
					<!-- {{ item }} -->
					<div class="row">
						<div class="col-md-5 mb-3">
							<label class="tit">Entidad</label>
							<DxSelectBox id="companyId" :data-source="entidades" :grouped="false" :min-search-length="3"
								:search-enabled="true" :show-clear-button="true" :show-data-before-search="true" v-model="item.companyId"
								@value-changed="itemSelected" class="form-control" display-expr="nombre" placeholder="Entidad"
								:read-only="editando" value-expr="id">
								<DxValidator>
									<DxRequiredRule />
								</DxValidator>
							</DxSelectBox>
						</div>
						<div class="col-md-3 mb-3">
							<label class="tit">Rol</label>
							<DxSelectBox id="roleId" :data-source="roles" :grouped="false" :min-search-length="3" :search-enabled="true"
								:show-clear-button="true" :show-data-before-search="true" v-model="item.roleId" class="form-control"
								display-expr="name" placeholder="Rol" value-expr="id" @value-changed="itemSelected">
								<DxValidator>
									<DxRequiredRule />
								</DxValidator>
							</DxSelectBox>
						</div>
						<div class="col-md-4 mb-3">
							<label class="tit">Correo electrónico</label>
							<DxTextBox id="email" value-change-event="keyup" :show-clear-button="true" v-model="item.email"
								class="form-control" placeholder="Correo electrónico" :read-only="editando"
								@focus-out="$lowerCase($event); itemSelected($event);">
								<!-- https://js.devexpress.com/Demos/WidgetsGallery/Demo/Validation/Overview/Vue/Light/ -->
								<DxValidator>
									<DxRequiredRule />
									<DxEmailRule />
									<DxCustomRule :validationCallback="ansvEmailRule"
										message="El correo debe ser de la ESAP (@esap.edu.co)" />
								</DxValidator>
							</DxTextBox>
						</div>
						<div class="col-md-4 mb-3">
							<label class="tit">Territorial</label>
							<DxSelectBox id="territorialId" :data-source="territoriales" :grouped="false" :min-search-length="3"
								:search-enabled="true" :show-clear-button="true" :show-data-before-search="true"
								@value-changed="itemSelected" v-model="item.territorialId" class="form-control" display-expr="nombre"
								placeholder="Territorial" value-expr="id">
								<DxValidator>
									<DxRequiredRule />
								</DxValidator>
							</DxSelectBox>
						</div>
						<div class="col-md-4 mb-3">
							<label class="tit">Dependencia</label>
							<DxSelectBox id="dependenceId" :data-source="dependencias" :disabled="dependencias.length <= 0"
								:grouped="false" :min-search-length="3" :search-enabled="true" :show-clear-button="true"
								:show-data-before-search="true" v-model="item.dependenceId" class="form-control" display-expr="nombre"
								placeholder="Dependencia" value-expr="id">
								<DxValidator>
									<DxRequiredRule />
								</DxValidator>
							</DxSelectBox>
						</div>
						<div class="col-md-4 mb-3">
							<label class="tit">Elaborado por (convenio)</label>
							<DxSelectBox id="projectId" :data-source="convenios" :disabled="dependencias.length <= 0" :grouped="false"
								:min-search-length="3" :search-enabled="true" :show-clear-button="true" :show-data-before-search="true"
								v-model="item.projectId" class="form-control" display-expr="nombre" placeholder="Dependencia"
								value-expr="id">
								<DxValidator>
									<DxRequiredRule />
								</DxValidator>
							</DxSelectBox>
						</div>
						<div class="col-md-12 text-center pt-2" v-if="!esExterno">
							<span class="subtitle font-weight-semibold"><i class="fa-solid fa-circle-info fa-sm me-2"></i> El
								usuario ingresa con credenciales ESAP</span>
						</div>
						<div class="col-md-3" v-if="esExterno">
							<label class="tit">Nombre(s)</label>
							<DxTextBox id="firstName" value-change-event="keyup" :show-clear-button="true" v-model="item.firstName"
								class="form-control text-capitalize" placeholder="Nombre" @focus-out="$capitalizeAll">
								<DxValidator>
									<DxRequiredRule />
									<DxStringLengthRule :min="3" />
								</DxValidator>
							</DxTextBox>
						</div>
						<div class="col-md-3" v-if="esExterno">
							<label class="tit">Apellido(s)</label>
							<DxTextBox id="lastName" value-change-event="keyup" :show-clear-button="true" v-model="item.lastName"
								@focus-out="$capitalizeAll" class="form-control text-capitalize" placeholder="Apellido">
								<DxValidator>
									<DxRequiredRule />
									<DxStringLengthRule :min="3" />
								</DxValidator>
							</DxTextBox>
						</div>
						<div class="col-md-3" v-if="esExterno">
							<label class="tit" id="pwd">Contraseña</label>
							<DxTextBox id="password" mode="password" value-change-event="keyup" :show-clear-button="true"
								v-model="item.password" class="form-control" placeholder="Contraseña">
								<DxValidator>
									<!-- <DxRequiredRule />
											<DxStringLengthRule :min="5" /> -->
									<DxCustomRule :validationCallback="passwordRule" />
								</DxValidator>
							</DxTextBox>
						</div>
						<div class="col-md-3" v-if="esExterno">
							<label class="tit">Confirmar contraseña</label>
							<DxTextBox id="password1" mode="password" value-change-event="keyup" :show-clear-button="true"
								v-model="item.password1" class="form-control" placeholder="Confirmar contraseña">
								<DxValidator>
									<DxCompareRule :comparison-target="passwordComparison" message="Las contraseñas no coinciden" />
								</DxValidator>
							</DxTextBox>
						</div>
					</div>
				</div>
			</DxValidationGroup>
			<div class="card-footer">
				<div class="d-flex justify-content-between align-items-center">
					<a class="btn btn-gray" @click.prevent="addCancel"><i
							class="fa-solid fa-circle-xmark"></i>&nbsp;&nbsp;CANCELAR</a>
					<a class="btn btn-main" @click.prevent="save">GUARDAR&nbsp;&nbsp;<i class="fa-solid fa-floppy-disk"></i></a>
				</div>
			</div>
		</div>

		<div class="card content" id="grid">
			<div class="card-header main d-flex justify-content-between">
				<span>
					<i class="fa-solid fa-gears"></i>
					Administración &raquo; Usuarios
				</span>
				<span>
					<button type="button" class="btn btn-trans" @click.prevent="addStart()" title="Nuevo..."><i
							class="fa-solid fa-square-plus"></i>NUEVO</button>
				</span>
			</div>

			<div class="card-body pt-3 pb-4">
				<div class="row">
					<div class="col">
						<!-- <h2 class="font-weight-normal text-7 mb-2 color-main"><strong class="font-weight-semibold">Usuarios</strong> Principal o Interna</h2> -->
						<!-- <DxDataGrid id="gridContainer" :customize-columns="customizeColumns" :data-source="dxStore" key-expr="id" :show-borders="true"></DxDataGrid> -->
						<DxDataGrid witdh="100%" :customize-columns="customizeColumns" :data-source="dxStore"
							:allow-column-reordering="true" :hover-state-enabled="true" :remote-operations="true"
							:row-alternation-enabled="true" :show-borders="false" :word-wrap-enabled="true" id="gridContainer"
							@initialized="onInitialized">
							<DxColumnChooser :enabled="false" mode="dragAndDrop" />
							<DxExport :enabled="false" />
							<DxFilterRow :visible="true" />
							<DxGrouping :auto-expand-all="true" />
							<DxGroupPanel :visible="true" :allow-column-dragging="true" />
							<DxLoadPanel :enabled="false" />
							<DxPaging :page-size="15" />
							<DxScrolling row-rendering-mode="virtual" />
							<DxSearchPanel :visible="false" :highlight-case-sensitive="false" />
							<DxSorting mode="single" /><!-- single, multiple, none" -->
							<DxSummary>
								<DxGroupItem summary-type="count" column="group_type_name" display-format="{0}" />
							</DxSummary>
							<DxPager :visible="true" :show-info="true" :show-page-size-selector="true" :show-navigation-buttons="true"
								:allowed-page-sizes="[15, 30, 50, 'Todos']" info-text="{2} usuarios (página {0} de {1})" />
							<DxColumn data-field="name" caption="Nombre" width="200" :sort-index="0" sort-order="asc" />
							<DxColumn data-field="email" caption="Correo (usuario)" width="200" />
							<DxColumn data-field="companyId" caption="Entidad" :visible="true">
								<DxLookup :data-source="entidades" value-expr="id" display-expr="nombre" />
							</DxColumn>
							<!-- :group-index="0" -->
							<DxColumn data-field="dependenceId" caption="Dependencia" width="120">
								<DxLookup :data-source="dependencias" value-expr="id" display-expr="nombre" />
							</DxColumn>
							<DxColumn data-field="roleId" caption="Rol" width="120">
								<DxLookup :data-source="roles" value-expr="id" display-expr="name" />
							</DxColumn>
							<DxColumn :width="100" data-field="isActive" caption="Activo" alignment="center" :visible="true"
								cell-template="tpl1">
								<DxLookup :data-source="$si_no" value-expr="value" display-expr="name" />
							</DxColumn>
							<DxColumn :width="100" data-field="emailConfirmed" caption="Correo confirmado" alignment="center"
								:visible="true" cell-template="tpl1">
								<DxLookup :data-source="$si_no" value-expr="value" display-expr="name" />
							</DxColumn>
							<template #tpl1="{ data }">
								<span v-if="data.data.isActive">SI</span>
								<span v-else>NO</span>
							</template>
							<DxColumn :width="100" alignment="center" cell-template="tpl" caption="" name="cmds" :fixed="true"
								fixed-position="right" />
							<template #tpl="{ data }">
								<span class="cmds">
									<a title="Modificar..." class="cmd-item color-main-600 me-2" @click.prevent="addStart(data.data)"
										href="#">
										<i class="fa-solid fa-pen-to-square fa-lg"></i>
									</a>
									<a v-if="data.data.isActive" title="Desactivar..." class="cmd-item color-main-600"
										@click.prevent="active(data.data, false)" href="#">
										<i class="fa-regular fa-square-check fa-lg"></i>
									</a>
									<a v-else title="Activar..." class="cmd-item color-main-600" @click.prevent="active(data.data, true)"
										href="#">
										<i class="fa-regular fa-square-minus fa-lg"></i>
									</a>
									<!-- <a title="Eliminar..." class="cmd-item color-main-600 me-2" @click.prevent="remove(data.data)" href="#">
										<i class="fa-regular fa-trash-can fa-lg"></i>
									</a> -->
								</span>
							</template>
						</DxDataGrid>
					</div>
				</div>
			</div>
		</div>

		<div class="card mt-4" v-if="$conf.debug">
			<div class="card-body">
				<span class="font-weight-semibold">item:</span> {{ item }}<br /><span
					class="font-weight-semibold">item_copy:</span> {{ item_copy }}
			</div>
		</div>
	</div>
</template>
