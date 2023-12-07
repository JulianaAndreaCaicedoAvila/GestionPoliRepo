import api from "@/utils/api";
import { defineStore } from "pinia";
export const useCursoStore = defineStore({
	id: "Curso",
	state: () => ({
		item: null,
		items: [],
	}),
	actions: {
		limpiar() {
			this.items = [];
		},
		async all() {
			console.log("Curso items =>", this.items);
			if (this.items.length > 0) return this.items;
			return await api()
				.get(`curso/all`)
				.then(async (r) => {
					this.items = r.data;
					return this.items;
				});
		},
		async getById(id) {
			return await api()
				.get(`curso/${id}`)
				.then(async (r) => {
					this.items = r.data;
					return this.items;
				});
		},
		async CursoPorNucleoId(nucleoId) {
			let items = await this.all();
			// console.log("departamentos =>", items);
			return items.filter((o) => o.nucleoId == nucleoId);
		},
	},
});
