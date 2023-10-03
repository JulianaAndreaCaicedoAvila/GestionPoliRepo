import api from "@/utils/api";
import { defineStore } from "pinia";
export const useProductoStore = defineStore({
  id: "Producto",
  state: () => ({
    items: [],
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
  },
});
