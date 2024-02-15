import api from "@/utils/api";
import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";
export const useEncuestaStore = defineStore({
	id: "Encuesta",
	state: () => ({
		items: useLocalStorage("encuestas", []),
	}),
	actions: {
		limpiar() {
			this.items = [];
		},
		async all() {
			console.log("Encuesta items =>", this.items);
			if (this.items.length > 0) return this.items;
			return await api()
				.get(`encuesta/all`)
				.then(async (r) => {
					this.items = r.data;
					return this.items;
				});
		},
		async byEncuestaId(eId) {
			return await api()
				.post(`encuesta/by-encuesta-id`, eId)
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
