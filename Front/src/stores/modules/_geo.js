import api from "@/utils/api";
import { defineStore } from "pinia";
export const useGeografiaStore = defineStore({
  id: "Geografia",
  state: () => ({
    items: [],
  }),
  actions: {
    limpiar() {
      this.items = [];
    },
    async paisAll() {
      console.log("Pais items =>", this.items);
      if (this.items.length > 0) return this.items;
      return await api()
        .get(`pais/all`)
        .then(async (r) => {
          this.items = r.data;
          return this.items;
        });
    },
    async dptoAll() {
      console.log("Dpto items =>", this.items);
      if (this.items.length > 0) return this.items;
      return await api()
        .get(`dpto/all`)
        .then(async (r) => {
          this.items = r.data;
          return this.items;
        });
    },
    async munAll() {
      console.log("Mun items =>", this.items);
      if (this.items.length > 0) return this.items;
      return await api()
        .get(`mun/all`)
        .then(async (r) => {
          this.items = r.data;
          return this.items;
        });
    },
    async getByIdPais(id) {
      if (this.items.length <= 0) await this.PaisAll();
      return this.items.find((o) => o.id == id);
    },
    async getByIdDpto(id) {
      if (this.items.length <= 0) await this.DptoAll();
      return this.items.find((o) => o.id == id);
    },
    async getByIdMun(id) {
      if (this.items.length <= 0) await this.MunAll();
      return this.items.find((o) => o.id == id);
    },
  },
});
