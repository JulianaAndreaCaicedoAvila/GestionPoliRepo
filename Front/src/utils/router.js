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
		{ name: "n/a", path: "/:catchAll(.*)", redirect: { name: DEFAULT_ROUTE, requiresAuth: false } },
		{ name: "ingreso", path: "/ingreso", meta: { title: "Ingresar", requiresAuth: false }, component: () => import("@/pages/auth/login.vue") },
		{ name: "activar", path: "/activar", meta: { title: "Activar cuenta", requiresAuth: false }, component: () => import("@/pages/auth/login.vue") },
		{ name: "recuperar", path: "/recuperar", meta: { title: "Recuperar clave", requiresAuth: false }, component: () => import("@/pages/auth/login.vue") },
		{ name: "inicio", path: "/inicio", meta: { title: "Inicio", requiresAuth: false }, component: () => import("@/pages/inicio.vue") },
		{ name: "inicio-plano", path: "/inicio-plano", meta: { title: "Inicio Plano", requiresAuth: false }, component: () => import("@/pages/inicio-plano.vue") },
		{ name: "que-es", path: "/que-es", meta: { title: "Que Es", requiresAuth: true }, component: () => import("@/pages/pnsv/que_es.vue") },
		{ name: "estructura", path: "/estructura", meta: { title: "Estructura", requiresAuth: true }, component: () => import("@/pages/pnsv/estructura.vue") },
		{
			name: "integralidad",
			path: "/integralidad",
			meta: { title: "Integralidad", requiresAuth: true },
			component: () => import("@/pages/pnsv/integralidad.vue"),
		},
		{
			name: "seguimiento",
			path: "/seguimiento",
			meta: { title: "Seguimiento", requiresAuth: true },
			component: () => import("@/pages/pnsv/seguimiento.vue"),
		},
		{ name: "area", path: "/area/:id", meta: { title: "Area", requiresAuth: true }, component: () => import("@/pages/tablero/area.vue"), props: true },
		{ name: "accion", path: "/accion", meta: { title: "Accion", requiresAuth: true }, component: () => import("@/pages/tablero/accion.vue"), props: true },
		{
			name: "accion-det",
			path: "/accion/:id",
			meta: { title: "Accion", requiresAuth: true },
			component: () => import("@/pages/tablero/accion.vue"),
			props: true,
		},

		{
			name: "evaluaciones",
			path: "/evaluaciones",
			meta: { title: "Evaluaciones", requiresAuth: true },
			component: () => import("@/pages/tablero/evaluaciones.vue"),
		},
		{ name: "admin-usuarios", path: "/admin-usuarios", meta: { title: "Usuarios", requiresAuth: true }, component: () => import("@/pages/admin/usuarios.vue") },
		{
			name: "admin-entidad",
			path: "/admin-entidad",
			meta: { title: "Entidades", requiresAuth: true },
			component: () => import("@/pages/admin/clas-entidad.vue"),
		},
		{
			name: "admin-clasificador",
			path: "/admin-clasificador",
			meta: { title: "Clasificadores", requiresAuth: true },
			component: () => import("@/pages/admin/clas-gral.vue"),
		},
		{
			name: "admin-clasificador-tipo",
			path: "/admin-clasificador-tipo",
			meta: { title: "Tipos Clasificadores", requiresAuth: true },
			component: () => import("@/pages/admin/clas-tipos.vue"),
		},
		{ name: "admin-area", path: "/admin-area", meta: { title: "Areas", requiresAuth: true }, component: () => import("@/pages/admin/clas-area.vue") },
		{ name: "admin-accion", path: "/admin-accion", meta: { title: "Acciones", requiresAuth: true }, component: () => import("@/pages/admin/clas-accion.vue") },
		{
			name: "admin-objetivo-general",
			path: "/admin-objetivo-general",
			meta: { title: "Objetivos", requiresAuth: true },
			component: () => import("@/pages/admin/clas-obj-gral.vue"),
		},
		{
			name: "admin-objetivo-especifico",
			path: "/admin-objetivo-especifico",
			meta: { title: "Objetivos", requiresAuth: true },
			component: () => import("@/pages/admin/clas-obj-esp.vue"),
		},
		{
			name: "admin-indicador",
			path: "/admin-indicador",
			meta: { title: "Indicadores", requiresAuth: true },
			component: () => import("@/pages/admin/indicadores.vue"),
		},
		{
			name: "reporte-indicador",
			path: "/reporte/indicador",
			meta: { title: "Reporte Indicador", requiresAuth: true },
			component: () => import("@/pages/admin/indicadores.vue"),
		},
		{
			name: "reporte-actividad",
			path: "/reporte/actividad",
			meta: { title: "Reporte Actividad", requiresAuth: true },
			component: () => import("@/pages/admin/clas-accion.vue"),
		},
		// {
		// 	name: "test-datagrid",
		// 	path: "/test-datagrid",
		// 	meta: { title: "Prueba Datagrid", requiresAuth: true },
		// 	component: () => import("@/pages/tests/datagrid.vue"),
		// },
	],
});
