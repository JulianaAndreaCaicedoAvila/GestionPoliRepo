// 202402060148: imple Local Storage implementation using Vue 3, Vueuse and Pinia with zero extra lines of code
// https://stephanlangeveld.medium.com/simple-local-storage-implementation-using-vue-3-vueuse-and-pinia-with-zero-extra-lines-of-code-cb9ed2cce42a
// https://vueuse.org/core/useLocalStorage/#useLocalStorage
import api from "@/utils/api";
import { defineStore } from "pinia";
import { useAuthStore } from "@/stores";
import { useLocalStorage } from "@vueuse/core";
export const useCursoStore = defineStore({
	id: "Curso",
	state: () => ({
		item: null,
		curso: useLocalStorage("curso", null),
		cursos: useLocalStorage("cursos", []),
		cursosTemas: useLocalStorage("cursosTemas", []),
		cursosUsuario: useLocalStorage("cursosUsuario", []),
		cursosPublicados: useLocalStorage("cursosPublicados", []),
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
		async codigos() {
			return await api()
				.post(`curso/codigos`)
				.then(async (r) => {
					return r.data;
				});
		},
		async fechas(id) {
			return await api()
				.post(`curso/fechas`, id)
				.then(async (r) => {
					return r.data;
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
		async porUsuarioId(usuarioId) {
			if (this.cursosUsuario.length > 0) return this.cursosUsuario;
			console.log(`porUsuarioId(${usuarioId})`);
			return await api()
				.get(`curso/cursos-por-usuario/${usuarioId}`)
				.then(async (r) => {
					this.cursosUsuario = r.data;
					return this.cursosUsuario;
				});
		},
		async inscribir(data) {
			return await api()
				.post(`curso/inscribir`, data) // { cursoId:0, usuarioId:0 }
				.then(async (r) => {
					return r.data;
				});
		},
		async estado(cursoId, estadoId) {
			return await api()
				.get(`curso/estado/${cursoId}/${estadoId}`)
				.then(async (r) => {
					return r.data;
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
		async cursoInscrito(cursoId) {
			const authStore = useAuthStore();
			if (authStore.user) {
				let items = await this.porUsuarioId(authStore.user.id);
				if (items.length > 0) return items.filter((o) => o.id == cursoId).length > 0;
			}
			return false;
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
