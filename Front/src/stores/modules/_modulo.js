import api from "@/utils/api";
import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";
export const useModuloStore = defineStore({
	id: "Modulo",
	state: () => ({
		items: useLocalStorage("modulos", []),
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
		async porCursoId(eId) {
			return await api()
				.post(`curso/by-curso-id`, eId)
				.then(async (r) => {
					return r.data;
				});
		},
		async porId(id) {
			if (this.items.length <= 0) await this.all();
			return this.items.find((o) => o.id == id);
		},
	},
});
