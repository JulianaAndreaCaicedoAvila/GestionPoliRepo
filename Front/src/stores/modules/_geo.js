import api from "@/utils/api";
import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
export const useGeografiaStore = defineStore({
	id: "Geografia",
	state: () => ({
		paises: useStorage("paises", []),
		municipios: useStorage("municipios", []),
		departamentos: useStorage("departamentos", []),
	}),
	actions: {
		limpiar() {
			this.paises = [];
			this.municipios = [];
			this.departamentos = [];
		},
		async paisAll() {
			console.log("Pais items =>", this.paises);
			if (this.paises.length > 0) return this.paises;
			return await api()
				.get(`geo/pais/all`)
				.then(async (r) => {
					this.paises = r.data;
					return this.paises;
				});
		},
		async dptoAll() {
			// console.log("Dpto items =>", this.departamentos);
			if (this.departamentos.length > 0) return this.departamentos;
			return await api()
				.get(`geo/dpto/all`)
				.then(async (r) => {
					this.departamentos = r.data;
					return this.departamentos;
				});
		},
		async munAll() {
			console.log("Mun items =>", this.municipios);
			if (this.municipios.length > 0) return this.municipios;
			return await api()
				.get(`geo/mun/all`)
				.then(async (r) => {
					this.municipios = r.data;
					return this.municipios;
				});
		},
		async dptosPorTerritorialId(territorialId) {
			let items = await this.dptoAll();
			// console.log("departamentos =>", items);
			return items.filter((o) => o.territorialId == territorialId);
		},
		async municipiosPorDepartamentoId(dptoId) {
			let items = await this.munAll();
			return items.filter((o) => o.departamentoId == dptoId);
		},
	},
});
