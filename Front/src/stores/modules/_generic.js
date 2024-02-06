import api from "@/utils/api";
import { defineStore } from "pinia";
import { useSessionStorage } from "@vueuse/core";
export const useGenericStore = defineStore({
	id: "generico",
	state: () => ({
		items: [],
	}),
	actions: {
		limpiar() {
			this.items = [];
		},
		post: async (endPoint, item) => {
			let url = `${window._apiUrl}${endPoint}`;
			console.log("url =>", url);
			return await api()
				.post(url, item)
				.then(async (r) => {
					return r.data;
				});
		},
		get: async (endPoint, item) => {
			return await api()
				.get(`${window._apiUrl}${endPoint}`, item)
				.then(async (r) => {
					return r.data;
				});
		},
	},
});
