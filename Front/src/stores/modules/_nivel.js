import api from "@/utils/api";
import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
export const useNivelStore = defineStore({
	id: "nivel",
	state: () => ({
		items: useStorage("niveles", []),
	}),
	actions: {
		limpiar() {
			this.items = [];
		},
		async all() {
			console.log("Nivel items =>", this.items);
			if (this.items.length > 0) return this.items;
			return await api()
				.get(`nivel/all`)
				.then(async (r) => {
					this.items = r.data;
					return this.items;
				});
		},
		async getById(id) {
			if (this.items.length <= 0) await this.all();
			return this.items.find((o) => o.id == id);
		},
		async nivelesPorEscuelaId(escuelaId) {
			let items = await this.all();
			// console.log("departamentos =>", items);
			return items.filter((o) => o.escuelaId == escuelaId);
		},
	},
});
