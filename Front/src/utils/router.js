import { useAuthStore } from "@/stores";
import { createWebHistory, createRouter } from "vue-router";
const DEFAULT_ROUTE = "inicio";
const DEFAULT_TITLE = "ESAP SIRECEC v4.0";
const BASE_URL = import.meta.env.BASE_URL;
export const router = createRouter({
  linkActiveClass: "active",
  linkExactActiveClass: "exact-active",
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", redirect: { name: DEFAULT_ROUTE, requiresAuth: true } },
    {
      name: "n/a",
      path: "/:catchAll(.*)",
      redirect: { name: DEFAULT_ROUTE, requiresAuth: false },
    },
    {
      name: "ingreso",
      path: "/ingreso",
      meta: { title: "Ingresar", requiresAuth: false },
      component: () => import("@/pages/auth/login.vue"),
    },
    {
      name: "activar",
      path: "/activar",
      meta: { title: "Activar cuenta", requiresAuth: false },
      component: () => import("@/pages/auth/login.vue"),
    },
    {
      name: "recuperar",
      path: "/recuperar",
      meta: { title: "Recuperar clave", requiresAuth: false },
      component: () => import("@/pages/auth/login.vue"),
    },
    {
      name: "inicio",
      path: "/inicio",
      meta: { title: "Inicio", requiresAuth: false },
      component: () => import("@/pages/inicio.vue"),
    },
    {
      name: "inicio-plano",
      path: "/inicio-plano",
      meta: { title: "Inicio Plano", requiresAuth: false },
      component: () => import("@/pages/inicio-plano.vue"),
    },
    {
      name: "clasificador",
      path: "/admin/clasificador/:id",
      meta: { title: "Clasificador", requiresAuth: true },
      component: () => import("@/pages/admin/clasificadores.vue"),
      props: true,
    },
    {
      name: "curso",
      path: "/admin/curso/:id?",
      meta: { title: "Curso", requiresAuth: true },
      component: () => import("@/pages/admin/curso/index.vue"), // 202309071141: Lleva al Wizard
    },
    {
      name: "cursos",
      path: "/admin/cursos",
      meta: { title: "Cursos", requiresAuth: true },
      component: () => import("@/pages/admin/curso.vue"),
    },
    {
      name: "producto",
      path: "/admin/producto",
      meta: { title: "Productos", requiresAuth: true },
      component: () => import("@/pages/admin/producto.vue"),
    },
    {
      name: "banco-programas",
      path: "/admin/banco-programas",
      meta: { title: "Banco Programas", requiresAuth: true },
      component: () => import("@/pages/admin/banco-programa.vue"),
    },
    {
      name: "escuela",
      path: "/admin/escuela",
      meta: { title: "Escuelas", requiresAuth: true },
      component: () => import("@/pages/admin/escuela.vue"),
    },
    {
      name: "indicador",
      path: "/admin/indicador",
      meta: { title: "Indicadores", requiresAuth: true },
      component: () => import("@/pages/admin/indicador.vue"),
    },
    {
      name: "nivel",
      path: "/admin/nivel",
      meta: { title: "Niveles", requiresAuth: true },
      component: () => import("@/pages/admin/nivel.vue"),
    },
    {
      name: "nucleos",
      path: "/admin/nucleos",
      meta: { title: "Nucleos", requiresAuth: true },
      component: () => import("@/pages/admin/nucleo.vue"),
    },
    {
      name: "programa-capacitacion",
      path: "/admin/programa-capacitacion",
      meta: { title: "Programas de capacitacion", requiresAuth: true },
      component: () => import("@/pages/admin/programa-capacitacion.vue"),
    },
    {
      name: "temas",
      path: "/admin/temas",
      meta: { title: "temas", requiresAuth: true },
      component: () => import("@/pages/admin/tema.vue"),
    },
    {
      name: "modulos",
      path: "/admin/modulos",
      meta: { title: "modulos", requiresAuth: true },
      component: () => import("@/pages/admin/modulo.vue"),
    },
    {
      name: "admin-usuarios",
      path: "/admin-usuarios",
      meta: { title: "Usuarios", requiresAuth: true },
      component: () => import("@/pages/admin/usuario.vue"),
    },
    {
      name: "admin-clasificador",
      path: "/admin-clasificador",
      meta: { title: "Clasificadores", requiresAuth: true },
      component: () => import("@/pages/admin/clasificador.vue"),
    },
    {
      name: "admin-clasificador-tipo",
      path: "/admin-clasificador-tipo",
      meta: { title: "Tipos Clasificadores", requiresAuth: true },
      component: () => import("@/pages/admin/clasificador-tipo.vue"),
    },
  ],
});
