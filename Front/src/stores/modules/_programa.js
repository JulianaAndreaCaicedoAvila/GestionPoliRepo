import api from "@/utils/api";
import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
export const useProgramaStore = defineStore({
	id: "Programa",
	state: () => ({
		items: useStorage("programas", []),
	}),
	actions: {
		limpiar() {
			this.items = [];
		},
		async all() {
			console.log("Programa items =>", this.items);
			if (this.items.length > 0) return this.items;
			return await api()
				.get(`programa/all`)
				.then(async (r) => {
					this.items = r.data;
					return this.items;
				});
		},
		async getById(id) {
			if (this.items.length <= 0) await this.all();
			return this.items.find((o) => o.id == id);
		},
		async programaPorNucleoId(nucleoId) {
			let items = await this.all();
			// console.log("departamentos =>", items);
			return items.filter((o) => o.nucleoId == nucleoId);
		},
	},
});
