import api from "@/utils/api";
import { defineStore } from "pinia";
export const useAccionStore = defineStore({
	id: "accion",
	state: () => ({
		items: [],
	}),
	actions: {
		clean() {
			this.items = [];
		},
		cargar: async (endPoint, id) => {
			return await api()
				.post(`accion/${endPoint}`, id)
				.then(async (r) => {
					return r.data;
				});
		},
		avances: async (actividadId) => {
			return await api()
				.post(`actividad/acv/${actividadId}`)
				.then(async (r) => {
					return r.data;
				});
		},
		guardar: async (indicador) => {
			return await api()
				.post(`accion/ed`, indicador)
				.then(async (r) => {
					return r.data;
				});
		},
		guardarAvance: async (avance) => {
			return await api()
				.post(`actividad/av`, avance)
				.then(async (r) => {
					return r.data;
				});
		},
		actualizarAvance: async (accionId) => {
			return await api()
				.post(`actividad/acc/${accionId}`)
				.then(async (r) => {
					return r.data;
				});
		},
		guardarItems: async (endPoint, items) => {
			return await api()
				.post(`accion/${endPoint}`, items)
				.then(async (r) => {
					return r.data;
				});
		},
		// 202210101950: https://stackoverflow.com/a/72564917
		guardarCompleto: async (indicador, metas, series, objetivos) => {
			let store = useAccionStore();
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
		cumplimientoObtener: async (indicador, avance) => {
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
			if (taf.name == "mantenimiento" || taf.name == "flujo" || taf.name == "acumulado") {
				cumplimiento = avance.dato / avance.meta;
			} else if (taf.name == "capacidad") {
				cumplimiento = avance.dato - avance.linea_base / avance.meta - avance.linea_base;
			} else if (taf.name == "reduccion") {
				cumplimiento = avance.linea_base - avance.dato / avance.linea_base - avance.meta;
			} else if (taf.name == "reduccion_anual") {
				cumplimiento = avance.linea_base - avance.dato / avance.linea_base - avance.meta;
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
