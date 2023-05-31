import api from "@/utils/api";
import { defineStore } from "pinia";
export const useIndicadorStore = defineStore({
	id: "indicador",
	state: () => ({
		items: [],
		areaAvances: [],
		indicadorAvances: [],
	}),
	actions: {
		clean() {
			this.items = this.areaAvances = this.indicadorAvances = [];
		},
		cargar: async (endPoint, id) => {
			return await api()
				.post(`indicador/${endPoint}`, id)
				.then(async (r) => {
					return r.data;
				});
		},
		async avances() {
			console.log("avances =>", this.indicadorAvances);
			if (this.indicadorAvances.length <= 0) {
				this.indicadorAvances = await api()
					.post("indicador/ia")
					.then((r) => {
						console.log("r =>", r);
						return r.data;
					});
				return this.indicadorAvances;
			} else return this.indicadorAvances;
		},
		async avancesPorTipo(tipoNombre = "general") {
			let o = [];
			let items = await this.avances();
			console.log("avancesPorTipo =>", items);
			let tipo = _config.tipo_indicador.find((o) => o.name == tipoNombre);
			if (tipo != null) o = items.filter((o) => o.tipoIndicadorId == tipo.id);
			else o = items;
			return o;
		},
		async avancesArea() {
			console.log("avancesArea =>", this.areaAvances);
			if (this.areaAvances.length <= 0) {
				this.areaAvances = await api()
					.post("indicador/aa")
					.then((r) => {
						console.log("r =>", r);
						return r.data;
					});
				return this.areaAvances;
			} else return this.areaAvances;
		},
		async guardar(indicador) {
			this.clean();
			return await api()
				.post(`indicador/ed`, indicador)
				.then(async (r) => {
					return r.data;
				});
		},
		async guardarAvance(avance) {
			this.clean();
			return await api()
				.post(`indicador/av`, avance)
				.then(async (r) => {
					return r.data;
				});
		},
		async guardarItems(endPoint, items) {
			this.clean();
			return await api()
				.post(`indicador/${endPoint}`, items)
				.then(async (r) => {
					return r.data;
				});
		},
		// 202210101950: https://stackoverflow.com/a/72564917
		async guardarCompleto(indicador, metas, series, objetivos) {
			this.clean();
			let store = useIndicadorStore();
			let ind = await store.guardar(indicador);
			metas.forEach((item) => {
				item.indicadorId = ind.id;
			});
			series.forEach((item) => {
				item.indicadorId = ind.id;
			});
			let metasR = await store.guardarItems("mt", metas);
			let seriesR = await store.guardarItems("sh", series);
			let objetivosR = await store.guardarItems("ob", objetivos);
			return { ind: ind, metas: metasR, series: seriesR, objetivos: objetivosR };
		},
		async cumplimientoObtener(indicador, avance) {
			// console.clear();
			console.log("avance =>", avance);
			// https://colaboracion.dnp.gov.co/CDT/Sinergia/Documentos/Guia_para_elaborar_Indicadores.pdf
			let taf = null;
			let cumplimiento = null;
			// Obtiene el tipo de acumulación
			let tas = window._config.tipo_acumulacion;
			for (let x = 0; x < tas.length; x++) {
				const ta = tas[x];
				if (ta.id == indicador.tipoAcumulacionId) {
					taf = ta;
					break;
				}
			}
			let lb = indicador.lineaBase;
			if (taf.name == "mantenimiento" || taf.name == "flujo" || taf.name == "acumulado") {
				cumplimiento = avance.dato / avance.meta;
			} else if (taf.name == "capacidad") {
				cumplimiento = avance.dato - avance.linea_base / avance.meta - avance.linea_base;
			} else if (taf.name == "reduccion" || taf.name == "reduccion_anual") {
				console.log(`(${avance.dato} - ${lb}) / (${avance.meta} - ${lb})`);
				cumplimiento = (avance.dato - lb) / (avance.meta - lb);
				// console.log("cumplimiento =>", cumplimiento);
				// cumplimiento = lb - avance.dato / lb - avance.meta;
				// } else if (taf.name == "reduccion_anual") {
				// cumplimiento = avance.dato - lb / avance.meta - lb;
				// cumplimiento = lb - avance.dato / lb - avance.meta;
			}
			console.log("cumplimientoCalcular");
			console.log("tipoAcumulacion =>", taf);
			console.log("indicador =>", indicador);
			console.log("avance =>", avance);
			console.log("window._config =>", window._config.tipo_acumulacion);
			// 202210122203: 2 decimales https://stackoverflow.com/a/11832950
			let final = Math.round((cumplimiento * 100 + Number.EPSILON) * 100) / 100;
			return final;
		},
	},
});
