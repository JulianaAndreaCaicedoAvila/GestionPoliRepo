// 202402060148: imple Local Storage implementation using Vue 3, Vueuse and Pinia with zero extra lines of code
// https://stephanlangeveld.medium.com/simple-local-storage-implementation-using-vue-3-vueuse-and-pinia-with-zero-extra-lines-of-code-cb9ed2cce42a
// https://vueuse.org/core/useSessionStorage/#useSessionStorage

import api from "@/utils/api";
import { defineStore } from "pinia";
import { useSessionStorage } from "@vueuse/core";
export const useCursoStore = defineStore({
	id: "Curso",
	state: () => ({
		item: null,
		curso: useSessionStorage("curso", null),
		cursos: useSessionStorage("cursos", []),
		cursosTemas: useSessionStorage("cursosTemas", []),
		cursosPublicados: useSessionStorage("cursosPublicados", []),
	}),
	actions: {
		limpiar() {
			this.cursos = [];
			this.cursosPublicados = [];
		},
		async all() {
			console.log("Curso items =>", this.cursos);
			if (this.cursos.length > 0) return this.cursos;
			return await api()
				.get(`curso/all`)
				.then(async (r) => {
					this.cursos = r.data;
					return this.cursos;
				});
		},
		async publicados() {
			console.log("Cursos publicados =>", this.cursosPublicados);
			if (this.cursosPublicados.length > 0) return this.cursosPublicados;
			return await api()
				.get(`curso/published`)
				.then(async (r) => {
					this.cursosPublicados = r.data;
					return this.cursosPublicados;
				});
		},
		async allCursosTemas() {
			console.log("CursoTemas items =>", this.cursosTemas);
			if (this.cursosTemas.length > 0) return this.cursosTemas;
			return await api()
				.get(`curso/cursos-temas`)
				.then(async (r) => {
					this.cursosTemas = r.data;
					return this.cursosTemas;
				});
		},
		async allCursosDocumentos() {
			console.log("CursoDocumentos items =>", this.cursos);
			if (this.cursos.length > 0) return this.cursos;
			return await api()
				.get(`curso/cursos-documentos`)
				.then(async (r) => {
					this.cursos = r.data;
					return this.cursos;
				});
		},
		async getById(id) {
			return await api()
				.get(`curso/${id}`)
				.then(async (r) => {
					this.cursos = r.data;
					return this.cursos;
				});
		},
		async cursoPorId(cursoId) {
			let items = await this.all();
			console.log("cursoPorId items =>", items);
			return items.find((o) => o.id == cursoId);
		},
		async temasPorCursoId(cursoId) {
			let items = await this.allCursosTemas();
			return items.filter((o) => o.cursoId == cursoId);
		},
		async CursoPorNucleoId(nucleoId) {
			let items = await this.all();
			// console.log("departamentos =>", items);
			return items.filter((o) => o.nucleoId == nucleoId);
		},
		async CursoPorDependenciaId(dependenciaId) {
			let items = await this.all();
			return items.filter((o) => o.dependenciaId == dependenciaId);
		},
		async PublicadosPorDependenciaId(dependenciaId) {
			let items = await this.publicados();
			return items.filter((o) => o.dependenciaId == dependenciaId);
		},
	},
});
