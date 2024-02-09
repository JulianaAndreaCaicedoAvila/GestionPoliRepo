import api from "@/utils/api";
import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";
export const useEscuelaStore = defineStore({
	id: "Escuela",
	state: () => ({
		items: useLocalStorage("escuelas", []),
	}),
	actions: {
		limpiar() {
			this.items = [];
		},
		async all() {
			console.log("Escuela items =>", this.items);
			if (this.items.length > 0) return this.items;
			return await api()
				.get(`escuela/all`)
				.then(async (r) => {
					this.items = r.data;
					return this.items;
				});
		},
		async getById(id) {
			if (this.items.length <= 0) await this.all();
			return this.items.find((o) => o.id == id);
		},
	},
});
