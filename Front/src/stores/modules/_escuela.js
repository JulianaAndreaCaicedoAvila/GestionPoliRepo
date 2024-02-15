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
					// 202402141926: Agrega la escuela 'NINGUNA'
					// 'splice' mete el item en el index deseado
					let d = r.data;
					d.splice(0, 0, {
						id: 0,
						nombre: "NINGUNA",
						descripcion: "Lorem ipsum ",
						niveles: [],
						creadoEl: new Date(),
						editadoEl: new Date(),
						activo: true,
						creadoPor: 1,
						editadoPor: null,
						orden: 0,
					});
					this.items = d;
					return this.items;
				});
		},
		async porId(id) {
			if (this.items.length <= 0) await this.all();
			return this.items.find((o) => o.id == id);
		},
	},
});
