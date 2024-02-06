import api from "@/utils/api";
import { defineStore } from "pinia";
import { useSessionStorage } from "@vueuse/core";
export const useModuloStore = defineStore({
	id: "Modulo",
	state: () => ({
		items: useSessionStorage("modulos", []),
	}),
	actions: {
		limpiar() {
			this.items = [];
		},
		async all() {
			console.log("Modulo items =>", this.items);
			if (this.items.length > 0) return this.items;
			return await api()
				.get(`modulo/all`)
				.then(async (r) => {
					this.items = r.data;
					return this.items;
				});
		},
		async byCursoId(eId) {
			return await api()
				.post(`curso/by-curso-id`, eId)
				.then(async (r) => {
					return r.data;
				});
		},
		async getById(id) {
			if (this.items.length <= 0) await this.all();
			return this.items.find((o) => o.id == id);
		},
	},
});
