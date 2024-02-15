import api from "@/utils/api";
import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";
export const useTemaStore = defineStore({
	id: "Tema",
	state: () => ({
		items: useLocalStorage("temas", []),
	}),
	actions: {
		limpiar() {
			this.items = [];
		},
		async all() {
			console.log("Tema items =>", this.items);
			if (this.items.length > 0) return this.items;
			return await api()
				.get(`tema/all`)
				.then(async (r) => {
					this.items = r.data.sortBy("nombre");
					return this.items;
				});
		},
		async porCursoId(cursoId) {
			return await api()
				.post(`curso/by-curso-id`, cursoId)
				.then(async (r) => {
					return r.data;
				});
		},
		async porDependenciaId(dependenciaId) {
			let items = await this.all();
			return items.filter((o) => o.dependenciaId == dependenciaId);
		},
		async porId(id) {
			if (this.items.length <= 0) await this.all();
			return this.items.find((o) => o.id == id);
		},
	},
});
