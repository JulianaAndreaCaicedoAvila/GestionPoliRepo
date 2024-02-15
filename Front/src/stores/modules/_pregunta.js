import api from "@/utils/api";
import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";
export const usePreguntaStore = defineStore({
	id: "Pregunta",
	state: () => ({
		items: useLocalStorage("preguntas", []),
	}),
	actions: {
		limpiar() {
			this.items = [];
		},
		async all() {
			console.log("Pregunta items =>", this.items);
			if (this.items.length > 0) return this.items;
			return await api()
				.get(`pregunta/all`)
				.then(async (r) => {
					this.items = r.data;
					return this.items;
				});
		},
		async porId(id) {
			if (this.items.length <= 0) await this.all();
			return this.items.find((o) => o.id == id);
		},
	},
});
