import api from "@/utils/api";
import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";
export const useArchivoStore = defineStore({
	id: "Archivo",
	state: () => ({
		imagenes: useLocalStorage("imagenes", []),
		documentos: useLocalStorage("documentos", []),
	}),
	actions: {
		limpiar() {
			this.imagenes = [];
		},
		async obtenerImagenes() {
			console.log("obtenerImagenes items =>", this.imagenes);
			// if (this.imagenes.length > 0) return this.imagenes;
			return await api()
				.get(`archivo/imagenes`)
				.then(async (r) => {
					let d = r.data;
					d.forEach((item) => {
						item["thumbnail"] = `${window._baseUrl}store/img/${item.name}`;
						item["url"] = `${window._baseUrl}store/img/${item.name}`;
					});
					this.imagenes = d;
					return this.imagenes;
				});
		},
		async obtenerDocumentos() {
			console.log("obtenerDocumentos items =>", this.documentos);
			if (this.documentos.length > 0) return this.documentos;
			return await api()
				.get(`archivo/documentos`)
				.then(async (r) => {
					this.documentos = r.data;
					return this.documentos;
				});
		},
	},
});
