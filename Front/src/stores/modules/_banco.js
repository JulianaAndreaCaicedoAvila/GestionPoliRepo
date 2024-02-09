import api from "@/utils/api";
import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";
export const useBancoStore = defineStore({
	id: "Banco",
	state: () => ({
		items: useLocalStorage("bancos", []),
	}),
	actions: {
		limpiar() {
			this.items = [];
		},
		async all() {
			console.log("Banco items =>", this.items);
			if (this.items.length > 0) return this.items;
			return await api()
				.get(`banco/all`)
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
