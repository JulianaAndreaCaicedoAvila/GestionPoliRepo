import { useAuthStore } from "@/stores";
import { createWebHistory, createRouter } from "vue-router";
const DEFAULT_ROUTE = "inicio";
const DEFAULT_TITLE = "ESAP SIRECEC v4.0";
const BASE_URL = import.meta.env.BASE_URL;
export const router = createRouter({
	linkActiveClass: "active",
	linkExactActiveClass: "exact-active",
	history: createWebHistory(BASE_URL),
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
			name: "certificados",
			path: "/certificados",
			meta: { title: "Certificados", requiresAuth: false },
			component: () => import("@/pages/certificados.vue"),
		},
		{
			name: "oferta",
			path: "/oferta/:por?",
			meta: { title: "Oferta académica", requiresAuth: false },
			component: () => import("@/pages/oferta.vue"),
		},
		{
			name: "tablero",
			path: "/tablero",
			meta: { title: "Inicio Plano", requiresAuth: true, roles: [1] },
			component: () => import("@/pages/tablero.vue"),
		},
		{
			name: "clasificador",
			path: "/admin/clasificador/:id",
			meta: { title: "Clasificador", requiresAuth: true, roles: [1] },
			component: () => import("@/pages/admin/clasificadores.vue"),
			props: true,
		},
		{
			name: "territoriales",
			path: "/admin/territorial",
			meta: { title: "Territoriales", requiresAuth: true, roles: [1] },
			component: () => import("@/pages/admin/territorial.vue"),
		},
		{
			name: "departamento",
			path: "/admin/departamento",
			meta: { title: "Departamentos", requiresAuth: true, roles: [1] },
			component: () => import("@/pages/admin/departamento.vue"),
		},
		{
			name: "municipio",
			path: "/admin/municipio",
			meta: { title: "Municipios", requiresAuth: true, roles: [1] },
			component: () => import("@/pages/admin/municipio.vue"),
		},
		{
			name: "banco-programas",
			path: "/admin/banco-programas",
			meta: { title: "Banco Programas", requiresAuth: true, roles: [1] },
			component: () => import("@/pages/admin/banco-programa.vue"),
		},
		{
			name: "curso",
			path: "/admin/curso/:id?",
			meta: { title: "Curso", requiresAuth: true, roles: [] },
			component: () => import("@/pages/admin/curso/tabs.vue"), // 202309071141: Lleva al Wizard
		},
		{
			name: "inscripcion",
			path: "/inscripcion/:id?",
			meta: { title: "Inscripción", requiresAuth: false },
			component: () => import("@/pages/inscripcion/tabs.vue"), // 202312060755: Lleva al Wizard
		},
		{
			name: "cursos",
			path: "/admin/cursos",
			meta: { title: "Cursos", requiresAuth: true, roles: [] },
			component: () => import("@/pages/admin/curso.vue"),
		},
		{
			name: "producto",
			path: "/admin/producto",
			meta: { title: "Productos", requiresAuth: true, roles: [1, 2] },
			component: () => import("@/pages/admin/producto.vue"),
		},
		{
			name: "escuela",
			path: "/admin/escuela",
			meta: { title: "Escuelas", requiresAuth: true, roles: [1, 2] },
			component: () => import("@/pages/admin/escuela.vue"),
		},
		{
			name: "nivel",
			path: "/admin/nivel",
			meta: { title: "Niveles", requiresAuth: true, roles: [1, 2] },
			component: () => import("@/pages/admin/nivel.vue"),
		},
		{
			name: "encuesta",
			path: "/admin/encuesta",
			meta: { title: "Encuestas", requiresAuth: true, roles: [1, 2] },
			component: () => import("@/pages/admin/encuesta.vue"),
		},
		{
			name: "pregunta",
			path: "/admin/pregunta",
			meta: { title: "Preguntas", requiresAuth: true, roles: [1, 2] },
			component: () => import("@/pages/admin/pregunta.vue"),
		},
		{
			name: "indicador",
			path: "/admin/indicador",
			meta: { title: "Indicadores", requiresAuth: true, roles: [1, 2] },
			component: () => import("@/pages/admin/indicador.vue"),
		},
		{
			name: "nucleos",
			path: "/admin/nucleos",
			meta: { title: "Nucleos", requiresAuth: true, roles: [1, 2] },
			component: () => import("@/pages/admin/nucleo.vue"),
		},
		{
			name: "programa-capacitacion",
			path: "/admin/programa-capacitacion",
			meta: { title: "Programas de capacitacion", requiresAuth: true, roles: [1, 2] },
			component: () => import("@/pages/admin/programa-capacitacion.vue"),
		},
		{
			name: "temas",
			path: "/admin/temas",
			meta: { title: "temas", requiresAuth: true, roles: [1, 2] },
			component: () => import("@/pages/admin/tema.vue"),
		},
		{
			name: "modulos",
			path: "/admin/modulos",
			meta: { title: "modulos", requiresAuth: true, roles: [1, 2] },
			component: () => import("@/pages/admin/modulo.vue"),
		},
		{
			name: "admin-usuarios",
			path: "/admin/usuarios",
			meta: { title: "Usuarios", requiresAuth: true, roles: [1] },
			component: () => import("@/pages/admin/usuario.vue"),
		},
		{
			name: "admin-clasificador",
			path: "/admin/clasificador",
			meta: { title: "Clasificadores", requiresAuth: true, roles: [1] },
			component: () => import("@/pages/admin/clasificador.vue"),
		},
		{
			name: "admin-clasificador-tipo",
			path: "/admin/clasificador-tipo",
			meta: { title: "Tipos Clasificadores", requiresAuth: true, roles: [1] },
			component: () => import("@/pages/admin/clasificador-tipo.vue"),
		},
		{
			name: "admin-documentos",
			path: "/admin/documentos",
			meta: { title: "Documentos", requiresAuth: true, roles: [1] },
			component: () => import("@/pages/admin/archivos.vue"),
		},
		{
			name: "admin-imagenes",
			path: "/admin/imagenes",
			meta: { title: "Imagenes", requiresAuth: true, roles: [1] },
			component: () => import("@/pages/admin/archivos.vue"),
		},
	],
});

router.beforeEach((to, from, next) => {
	const auth = useAuthStore();
	if (to.meta.requiresAuth) {
		console.log("roleId =>");
		// User is authenticated
		if (auth.user) {
			if (to.meta.roles.length == 0 || to.meta.roles.includes(auth.user.roleId)) next();
			else {
				next({ name: DEFAULT_ROUTE });
			}
		} else {
			next({ name: DEFAULT_ROUTE });
		}
	} else {
		// Non-protected route, allow access
		next();
	}
});

router.afterEach((to, from) => {
	let t = DEFAULT_TITLE;
	if (typeof to.meta.title !== undefined) t = DEFAULT_TITLE + " » " + to.meta.title;
	document.title = t;
});
