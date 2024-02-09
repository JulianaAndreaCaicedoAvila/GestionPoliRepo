import api from "@/utils/api";
import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";
export const useCapacitacionStore = defineStore({
	id: "Capacitacion",
	state: () => ({
		cursos: [],
		cursosSrc: [],
		cursosFiltradas: [],
		otras: 0,
		pagina: null,
		cursos: [],
		cursosSrc: [],
		sectoresIds: [],
		tipos: [],
		tiposSrc: [],
		tiposIds: [],
		externas: 0,
		internas: 0,
		total: 0,
		filtroAsistencia: null,
		filtroTerritorial: null,
		filtroDepartamento: null,
		filtroMunicipio: null,
		filtroTipoCurso: null,
		filtroEscuelas: null,
		filtroNiveles: null,
		filtroTexto: null,
	}),
	actions: {
		limpiar() {
			this.items = [];
			this.itemsPublicados = [];
		},
		async getAll() {
			// console.clear();
			if (this.cursos.length > 0) return this.cursos;
			return await axios.get(bUrl + "data/evaluaciones-data.json").then((res) => {
				let data = res.data;
				console.log("data =>", data);
				console.log("sectores_data =>", g.sectores_data);
				data.forEach((item) => {
					item.EvaluacionId = parseInt(item.EvaluacionId);
					if (item.SectorId != null) item.SectorId = parseInt(item.SectorId);
					if (item.SectorCodigo != null) item.SectorCodigo = parseInt(item.SectorCodigo);
					if (item.EstadoId != null) item.EstadoId = parseInt(item.EstadoId);
					if (item.LevantamientoId != null) item.LevantamientoId = parseInt(item.LevantamientoId);
					if (item.MetodologiaId != null) item.MetodologiaId = parseInt(item.MetodologiaId);
					if (item.InstrumentoId != null) item.InstrumentoId = parseInt(item.InstrumentoId);
					// if (item.EsInterna != null) item.EsInterna = item.EsInterna == "1";
					if (item.EsInterna != null) item.EsInterna = parseInt(item.EsInterna);
					if (item.DesarrolladoPor != null) item.DesarrolladoPor = parseInt(item.DesarrolladoPor);
					if (item.Activa != null) item.Activa = item.Activa == "1";

					// Fecha y años
					if (item.Fecha != null) {
						item.Fecha = new Date(item.Fecha);
						let y = item.Fecha.getFullYear();
						item["Anno"] = y;
						if (!this.annos.includes(y) && !isNaN(y)) this.annos.push(y);
					} else item["Anno"] = null;

					// Sector
					let sector = g.sectores_data.find((o) => parseInt(o.Codigo) == item.SectorCodigo);
					if (sector == null) {
						sector = g.sectores_data.find((o) => o.IdSector == item.SectorId);
					} else {
						item["Sector"] = sector;
						// item.SectorId = parseInt(sector.Codigo);
						// item.Sector.Codigo = parseInt(sector.Codigo);
						item.Sector.Codigo = parseInt(item.Sector.Codigo);
						item.Sector.IdSector = parseInt(item.Sector.IdSector);
						// Si el sector no existe en la colección 'sectoresIds' del state lo agrega
						if (!this.sectoresIds.includes(item.Sector.Codigo)) {
							let num = data.filter((o) => o.SectorCodigo != null && o.SectorCodigo == sector.Codigo).length;
							// if (num == 0) num = data.filter((o) => o.SectorId != null && o.SectorId == parseInt(sector.Codigo)).length;
							item.Sector["Evaluaciones"] = num;
							this.sectoresIds.push(item.Sector.Codigo);
							this.sectores.push(item.Sector);
						}
					}

					// Tipo
					let ids = item.TipoId.split(", ");
					let names = item.TipoNombre.split(", ");
					item["Tipos"] = [];
					for (let x = 0; x < ids.length; x++) {
						const id = parseInt(ids[x]);
						const name = names[x];
						let num = data.filter((o) => o.TipoId.split(", ").includes(id.toString())).length;
						// Valida el número
						if (!isNaN(num) && num > 0) {
							let el = { TipoId: id, TipoNombre: name, Evaluaciones: num };
							item.Tipos.push(el);
							// State
							if (!this.tiposIds.includes(id)) {
								this.tiposIds.push(id);
								this.tipos.push(el);
							}
						}
					}
				});
				// # de evaluaciones por año
				if (this.annos.length > 0 && this.porAnno.length <= 0) {
					this.annos.forEach((anno) => {
						let num = data.filter((o) => o.Anno != null && o.Anno == anno).length;
						this.porAnno.push({
							anno: anno.toString(), // Evita formato '2,010'
							evaluaciones: num,
						});
					});
					this.porAnno.sort((a, b) => b.evaluaciones - a.evaluaciones); // Ordena descendentemente por # evaluaciones
					this.annos = this.annos.sort().reverse();
				}
				console.log("data =>", data);
				console.log("this.annos =>", this.annos);
				console.log("this.porAnno =>", this.porAnno);
				this.evaluaciones = data.sort((a, b) => b.EvaluacionId - a.EvaluacionId); // 202310241713: Ordena descendentemente por 'EvaluacionId', la más reciente primero
				this.total = this.evaluaciones.length;
				this.internas = this.evaluaciones.filter((o) => o.DesarrolladoPor == 1).length;
				this.externas = this.evaluaciones.filter((o) => o.DesarrolladoPor == 2).length;
				this.evaluacionesSrc = toRaw(this.evaluaciones);
				this.tiposSrc = toRaw(this.tipos);
				console.log("tiposSrc =>", this.tiposSrc);
				console.log("sectores =>", this.sectores);
				this.sectoresSrc = toRaw(this.sectores);
				console.log("sectoresSrc =>", this.sectoresSrc);
				this.annosSrc = toRaw(this.annos);
				return this.evaluaciones;
			});
		},
		hasFilter() {
			return (
				this.filtroAsistencia != null ||
				this.filtroTerritorial != null ||
				this.filtroDepartamento != null ||
				this.filtroMunicipio != null ||
				this.filtroTipoCurso != null ||
				this.filtroEscuelas != null ||
				this.filtroTexto != null ||
				this.filtroNiveles != null
			);
		},
		doFilter() {
			if (this.hasFilter()) {
				let sep = "----------------------";
				console.log(sep);
				let aFiltrar = toRaw(this.cursosSrc);
				console.log("aFiltrar =>", aFiltrar);
				if (this.filtroTexto != null && this.filtroTexto.length > 3) {
					console.log(sep);
					console.log("this.filtroTexto =>", toRaw(this.filtroTexto));
					aFiltrar = aFiltrar.filter((o) => o.Nombre.toLowerCase().includes(this.filtroTexto.toLowerCase()));
					console.log("aFiltrar =>", toRaw(aFiltrar));
				}
				if (this.filtroAnno != null && this.filtroAnno.length > 0) {
					console.log(sep);
					console.log("this.filtroAnno =>", toRaw(this.filtroAnno));
					aFiltrar = aFiltrar.filter((o) => this.filtroAnno.includes(o.Anno));
					console.log("aFiltrar =>", toRaw(aFiltrar));
				}
				if (this.filtroTerritorial != null) {
					console.log(sep);
					console.log("this.filtroTerritorial =>", toRaw(this.filtroTerritorial));
					aFiltrar = aFiltrar.filter((o) => o.TerritorialId == toRaw(this.filtroTerritorial));
					console.log("aFiltrar =>", toRaw(aFiltrar));
				}
				if (this.filtroDepartamento != null) {
					console.log(sep);
					console.log("this.filtroDepartamento =>", toRaw(this.filtroDepartamento));
					aFiltrar = aFiltrar.filter((o) => o.DepartamentoId == toRaw(this.filtroDepartamento));
					console.log("aFiltrar =>", toRaw(aFiltrar));
				}
				if (this.filtroMunicipio != null) {
					console.log(sep);
					console.log("this.filtroMunicipio =>", toRaw(this.filtroMunicipio));
					aFiltrar = aFiltrar.filter((o) => o.MunicipioId == toRaw(this.filtroMunicipio));
					console.log("aFiltrar =>", toRaw(aFiltrar));
				}
				if (this.filtroAsistencia != null && this.filtroAsistencia.length > 0) {
					console.log(sep);
					console.log("this.filtroAsistencia =>", toRaw(this.filtroAsistencia));
					aFiltrar = aFiltrar.filter((o) => o.TipoAsistenciaId != null && this.filtroAsistencia.includes(o.TipoAsistenciaId));
					console.log("aFiltrar =>", toRaw(aFiltrar));
				}
				if (this.filtroTipoCurso != null && this.filtroTipoCurso.length > 0) {
					console.log(sep);
					console.log("this.filtroTipoCurso =>", toRaw(this.filtroTipoCurso));
					aFiltrar = aFiltrar.filter((o) => o.TipoCursoId != null && this.filtroTipoCurso.includes(o.TipoCursoId));
					console.log("aFiltrar =>", toRaw(aFiltrar));
				}
				if (this.filtroEscuelas != null && this.filtroEscuelas.length > 0) {
					console.log(sep);
					console.log("this.filtroEscuelas =>", toRaw(this.filtroEscuelas));
					aFiltrar = aFiltrar.filter((o) => o.EscuelaId != null && this.filtroEscuelas.includes(o.EscuelaId));
					console.log("aFiltrar =>", toRaw(aFiltrar));
				}
				if (this.filtroNiveles != null && this.filtroNiveles.length > 0) {
					console.log(sep);
					console.log("this.filtroNiveles =>", toRaw(this.filtroNiveles));
					aFiltrar = aFiltrar.filter((o) => o.NivelId != null && this.filtroNiveles.includes(o.NivelId));
					console.log("aFiltrar =>", toRaw(aFiltrar));
				}
				console.log(sep);
				this.cursosFiltradas = aFiltrar;
				this.total = this.evaluacionesFiltradas.length;
			}
		},
		setFiltered() {
			let years = [];
			let perYear = [];
			let sectors = [];
			let sectorIds = [];
			let typeIds = [];
			let types = [];
			console.clear();
			// console.log("Filtro evaluaciones =>", toRaw(this.evaluaciones));
			// console.log("sectors =>", toRaw(sectors));
			// console.log("sectorIds =>", toRaw(sectorIds));
			if (this.cursos.length > 0) {
				this.cursos.forEach((item) => {
					// Años
					if (item.Anno != null && !years.includes(item.Anno) && !isNaN(item.Anno)) years.push(item.Anno);

					// Sectores
					if (item.SectorCodigo != null && !sectorIds.includes(item.SectorCodigo)) {
						let num = this.evaluaciones.filter((o) => o.SectorCodigo != null && o.SectorCodigo == item.SectorCodigo).length;
						if (num > 0) {
							// console.clear();
							// console.log(window._sep);
							// console.log("Agrega item =>", toRaw(item));
							// console.log("sectorIds =>", toRaw(sectorIds));
							item.Sector.Evaluaciones = num;
							sectorIds.push(item.SectorCodigo);
							sectors.push(item.Sector);
						}
					}

					// Tipos
					item.Tipos.forEach((tipo) => {
						if (!typeIds.includes(tipo.TipoId)) {
							let num = this.evaluaciones.filter((o) => o.TipoId.split(", ").includes(tipo.TipoId.toString())).length;
							if (num > 0) {
								let el = { TipoId: tipo.TipoId, TipoNombre: tipo.TipoNombre, Evaluaciones: num };
								typeIds.push(tipo.TipoId);
								types.push(el);
							}
						}
					});
				});

				// Por año
				years = years.sort().reverse();
				years.forEach((year) => {
					let num = this.evaluaciones.filter((o) => o.Anno != null && o.Anno == year).length;
					if (num > 0) {
						perYear.push({
							anno: year.toString(), // Evita formato '2,010'
							evaluaciones: num,
						});
					}
				});

				// Asigna variables
				this.total = this.cursos.length;
				console.log("sectores =>", toRaw(this.sectores));
				console.log("sectors =>", toRaw(sectors));
				console.log("sectorIds =>", toRaw(sectorIds));
				this.sectores = sectors;
				console.log("sectores =>", toRaw(this.sectores));
				console.log("annos =>", toRaw(this.annos));
				this.sectoresIds = sectorIds;
				this.tipos = types;
				this.tiposIds = typeIds;
			}
		},
		clearFilter() {
			this.clearFields();
			this.evaluacionesFiltradas = [];
		},
		clearFields() {
			this.filtroSector = null;
			this.filtroTipo = null;
			this.filtroAnno = null;
			this.filtroTexto = null;
			this.filtroInterna = null;
			this.filtroDesarrollo = null;
			this.evaluaciones = this.evaluacionesSrc;
			this.total = this.evaluaciones.length;
			this.evaluaciones = this.evaluacionesSrc;
			this.total = this.evaluaciones.length;
		},
		async CursoPorDependenciaId(dependenciaId) {
			let items = await this.all();
			return items.filter((o) => o.dependenciaId == dependenciaId);
		},
	},
});
