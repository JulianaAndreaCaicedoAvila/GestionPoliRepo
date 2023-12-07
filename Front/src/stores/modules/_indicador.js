import api from "@/utils/api";
import { defineStore } from "pinia";
export const useIndicadorStore = defineStore({
  id: "Indicador",
  state: () => ({
    items: [],
  }),
  actions: {
    limpiar() {
      this.items = [];
    },
    async all() {
      console.log("Indicador items =>", this.items);
      if (this.items.length > 0) return this.items;
      return await api()
        .get(`cursoIndicador/all`)
        .then(async (r) => {
          this.items = r.data;
          return this.items;
        });
    },
    async getById(id) {
      if (this.items.length <= 0) await this.all();
      return this.items.find((o) => o.id == id);
    },
    async indicadorPorProductoId(productoId) {
      let items = await this.all();
      // console.log("departamentos =>", items);
      return items.filter((o) => o.productoId == productoId);
    },
  },
});
