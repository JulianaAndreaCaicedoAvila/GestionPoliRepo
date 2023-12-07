import api from "@/utils/api";
import { defineStore } from "pinia";
export const useClasificadorStore = defineStore({
	id: "clasificador",
	state: () => ({
		items: [],
		itemsTipos: [],
		acciones: [],
	}),
	getters: {
		count(state) {
			return state.items.length;
		},
		areas(state) {
			console.log("ITEMS =>", state.items);
			return state.items.filter((o) => o.tipoId == 6 && o.activo);
		},
		generales(state) {
			return state.items.filter((o) => o.tipoId == 7 && o.activo);
		},
		especificos(state) {
			return state.items.filter((o) => o.tipoId == 8 && o.activo);
		},
		acciones_a(state) {
			return state.acciones.filter((o) => o.activo);
		},
	},
	actions: {
		limpiar() {
			this.items = [];
			this.itemsTipos = [];
			this.acciones = [];
		},
		async tipos() {
			console.log("store.tipos!");
			if (this.itemsTipos.length <= 0) {
				this.itemsTipos = await api()
					.post("clasificador/tipos")
					.then((r) => {
						console.log("r =>", r);
						return r.data;
					});
				return this.itemsTipos;
			} else return this.itemsTipos;
		},
		async cargar() {
			if (this.items.length <= 0) {
				this.items = await api()
					.get("clasificador")
					.then((r) => {
						console.log("r =>", r);
						return r.data;
					});
				return this.items;
			} else return this.items;
		},
		async porId(id = null) {
			let items = await this.cargar();
			return items.find((o) => o.id == id);
		},
		async porTipoId(tipoId = null, active = true, sortByName = true) {
			let o = [];
			let items = await this.cargar();
			if (tipoId != null) o = items.filter((o) => o.tipoId == tipoId);
			else o = items;
			o = active ? o.filter((o) => o.activo == true) : o;
			if (sortByName) o = o.sort((a, b) => (a.nombre > b.nombre ? 1 : b.nombre > a.nombre ? -1 : 0));
			return o;
		},
		async porTipoNombre(tipoNombre = null, active = true, sortByName = true) {
			// console.log("porTipo");
			// console.log("config =>", _config);
			// console.log("");
			let o = [];
			let items = await this.cargar();
			let tipo = _config.tipo_clasificador.find((o) => o.name == tipoNombre);
			if (tipo != null) o = items.filter((o) => o.tipoId == tipo.id);
			else o = items;
			o = active ? o.filter((o) => o.activo == true) : o;
			if (sortByName) o = o.sort((a, b) => (a.nombre > b.nombre ? 1 : b.nombre > a.nombre ? -1 : 0));
			return o;
		},
		async porPadre(padreId = null, active = true, sortByName = true) {
			let o = [];
			let items = await this.cargar();
			if (padreId != null) o = items.filter((o) => o.padreId == padreId);
			else o = items;
			if (sortByName) o = o.sort((a, b) => (a.nombre > b.nombre ? 1 : b.nombre > a.nombre ? -1 : 0));
			return active ? o.filter((o) => o.activo == true) : o;
		},
	},
});
