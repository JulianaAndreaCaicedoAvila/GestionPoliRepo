import api from "@/utils/api";
import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";
export const useProductoStore = defineStore({
	id: "Producto",
	state: () => ({
		items: useLocalStorage("productos", []),
	}),
	actions: {
		limpiar() {
			this.items = [];
		},
		async all() {
			console.log("Producto items =>", this.items);
			if (this.items.length > 0) return this.items;
			return await api()
				.get(`producto/all`)
				.then(async (r) => {
					this.items = r.data;
					return this.items;
				});
		},
		async getById(id) {
			if (this.items.length <= 0) await this.all();
			return this.items.find((o) => o.id == id);
		},
		async productosPorDependenciaId(dependenciaId) {
			let items = await this.all();
			// console.log("departamentos =>", items);
			return items.filter((o) => o.dependenciaId == dependenciaId);
		},
	},
});
