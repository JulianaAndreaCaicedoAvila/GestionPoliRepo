<script setup>
import { ref, onMounted } from "vue";
import { RouterLink } from "vue-router";
import { useAuthStore } from "@/stores";
const un = ref(null),
  auth = useAuthStore(),
  logout = () => {
    msg.confirm({
      // title: "otro",
      textCancel: "CANCELAR",
      textOk: "CERRAR SESIÓN",
      text: "¿Realmente desea cerrar sesión?",
      onConfirm: async () => {
        auth.logout();
      },
      onCancel: () => { },
    });
  },
  check = () => {
    console.log("isTokenExpired =>", auth.isTokenExpired);
    if (auth.isTokenExpired) {
      window.clearInterval(window._int);
      auth.logout();
    }
  };

onMounted(() => {
  // console.clear();
  // console.log("---------");
  // console.log("Mounted header menu!!");
  // console.log("auth.usuario =>", auth.usuario);
  // console.log("auth.user =>", auth.user);
  // console.log(typeof auth.user);
  // setShow();
  if (auth.user) {
    check();
    un.value = auth.user.name.capitalizeAll();
    console.log("UN =>", un.value);
    window._int = setInterval(function () {
      check();
    }, 10000);
  } else window.clearInterval(window._int);
});
</script>
<template>
  <div class="header-column bt">
    <div class="header-row">
      <div
        class="header-nav header-nav-line header-nav-top-line header-nav-top-line-with-border order-2 order-lg-1 justify-content-start w-100">
        <div class="header-nav-main header-nav-main-square header-nav-main-effect-2 header-nav-main-sub-effect-1 w-100">
          <nav class="collapse w-100">
            <ul class="nav nav-pills flex-column flex-lg-row w-100" id="mainNav">
              <li class="dropdown">
                <router-link class="dropdown-item dropdown-toggle" :to="{ name: 'inicio' }"><i
                    class="fa-solid fa-home"></i>&nbsp;&nbsp;INICIO</router-link>
              </li>
              <!-- <li class="dropdown">
								<a class="dropdown-item dropdown-toggle" href="#">
									<i class="fa-solid fa-car-side me-2"></i>EL PNSV<i class="ms-2 fa-solid fa-angle-down"></i>
									<i class="fas fa-chevron-down"></i>
								</a>
								<ul class="dropdown-menu">
									<li><router-link :to="{ name: 'que-es' }" class="dropdown-item">¿Que es?</router-link></li>
									<li><router-link :to="{ name: 'estructura' }" class="dropdown-item">Estructura</router-link></li>
									<li><router-link :to="{ name: 'integralidad' }" class="dropdown-item">Integralidad</router-link></li>
									<li><router-link :to="{ name: 'seguimiento' }" class="dropdown-item">Seguimiento</router-link></li>
								</ul>
							</li> -->
              <li class="dropdown" v-if="auth.user && auth.esAdmin">
                <a class="dropdown-item dropdown-toggle" href="#">
                  <i class="fa fa-gear me-2"></i>ADMINISTRACIÓN<i class="ms-2 fa-solid fa-angle-down"></i></a>
                <ul class="dropdown-menu">
                  <li>
                    <router-link :to="{ name: 'admin-usuarios' }" class="dropdown-item">Usuarios</router-link>
                  </li>
                  <li class="dropdown-submenu">
                    <a class="dropdown-item" href="#">Ubicaciones<i class="fas fa-chevron-down"></i></a>
                    <ul class="dropdown-menu">
                      <li>
                        <router-link :to="{ path: '/admin/territorial' }"
                          class="dropdown-item">Territoriales</router-link>
                      </li>
                      <li>
                        <router-link :to="{ path: '/admin/departamento' }"
                          class="dropdown-item">Departamentos</router-link>
                      </li>
                      <li>
                        <router-link :to="{ path: '/admin/municipio' }" class="dropdown-item">Municipios</router-link>
                      </li>
                    </ul>
                  </li>
                  <li class="dropdown-submenu">
                    <a class="dropdown-item" href="#">Encuestas<i class="fas fa-chevron-down"></i></a>
                    <ul class="dropdown-menu">
                      <li>
                        <router-link :to="{ path: '/admin/encuesta' }" class="dropdown-item">Banco de
                          Encuestas</router-link>
                      </li>
                      <li>
                        <router-link :to="{ path: '/admin/pregunta' }" class="dropdown-item">Banco de
                          Preguntas</router-link>
                      </li>
                    </ul>
                  </li>
                  <li class="dropdown-submenu">
                    <a class="dropdown-item" href="#">Cursos<i class="fas fa-chevron-down"></i></a>
                    <ul class="dropdown-menu">
                      <li class="dropdown-submenu">
                        <a class="dropdown-item" href="#">Estructura<i class="fas fa-chevron-down"></i></a>
                        <ul class="dropdown-menu">
                          <li>
                            <router-link :to="{ path: '/admin/clasificador/7' }"
                              class="dropdown-item">Dependencias</router-link>
                          </li>
                          <li>
                            <router-link :to="{ path: '/admin/producto' }" class="dropdown-item">Productos =>
                              Objetivos</router-link>
                          </li>
                          <li>
                            <router-link :to="{ path: '/admin/indicador' }"
                              class="dropdown-item">Indicadores</router-link>
                          </li>
                          <li>
                            <router-link :to="{ path: '/admin/banco-programas' }" class="dropdown-item">Bancos de
                              Programas</router-link>
                          </li>
                          <li>
                            <router-link :to="{ path: '/admin/nucleos' }" class="dropdown-item">Núcleos</router-link>
                          </li>
                          <li>
                            <router-link :to="{ path: '/admin/programa-capacitacion' }" class="dropdown-item">Programas de
                              Capacitación</router-link>
                          </li>
                          <li>
                            <router-link :to="{ path: '/admin/temas' }" class="dropdown-item">Temas</router-link>
                          </li>
                          <li>
                            <router-link :to="{ path: '/admin/modulos' }" class="dropdown-item">Módulos</router-link>
                          </li>
                          <li>
                            <router-link :to="{ path: '/admin/clasificador/14' }" class="dropdown-item">Tipos de
                              curso</router-link>
                          </li>
                        </ul>
                      </li>
                      <li class="dropdown-submenu">
                        <a class="dropdown-item" href="#">Escuelas<i class="fas fa-chevron-down"></i></a>
                        <ul class="dropdown-menu">
                          <li>
                            <router-link :to="{ path: '/admin/escuela' }" class="dropdown-item">Escuelas</router-link>
                          </li>
                          <li>
                            <router-link :to="{ path: '/admin/nivel' }" class="dropdown-item">Niveles</router-link>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <router-link :to="{ path: '/admin/cursos' }" class="dropdown-item">Gestión de cursos</router-link>
                      </li>
                    </ul>
                  </li>
                  <li class="dropdown-submenu">
                    <a class="dropdown-item" href="#">Catálogo<i class="fas fa-chevron-down"></i></a>
                    <ul class="dropdown-menu">
                      <li>
                        <router-link :to="{ name: 'admin-clasificador-tipo' }" class="dropdown-item">Tipos de
                          Clasificadores</router-link>
                      </li>
                      <li>
                        <router-link :to="{ name: 'admin-clasificador' }"
                          class="dropdown-item">Clasificadores</router-link>
                      </li>
                    </ul>
                  </li>
                  <li class="dropdown-submenu">
                    <a class="dropdown-item" href="#">Archivos<i class="fas fa-chevron-down"></i></a>
                    <ul class="dropdown-menu">
                      <li>
                        <router-link :to="{ name: 'admin-documentos' }" class="dropdown-item">Documentos</router-link>
                      </li>
                      <li>
                        <router-link :to="{ name: 'admin-imagenes' }" class="dropdown-item">Imágenes</router-link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
              <!-- <li class="dropdown" v-if="auth.user && !auth.esAdmin">
								<a class="dropdown-item dropdown-toggle" href="#"
									><i class="fa-solid fa-pen-to-square me-2"></i>REPORTAR<i class="ms-2 fa-solid fa-angle-down"></i
								></a>
								<ul class="dropdown-menu">
									<li>
										<router-link :to="{ name: 'reporte-indicador' }" class="dropdown-item">Indicadores</router-link>
									</li>
									<li>
										<router-link :to="{ name: 'reporte-actividad' }" class="dropdown-item">Acciones y actividades</router-link>
									</li>
								</ul>
							</li> -->
              <li class="dropdown ms-lg-auto no-line-effect" v-if="!auth.user">
                <router-link class="dropdown-item dropdown-toggle pe-0 ps-2" :to="{ name: 'ingreso' }">
                  <i class="fa-solid fa-user-lock me-2"></i>INGRESAR</router-link>
              </li>
              <li class="dropdown dropdown-reverse ms-lg-auto no-line-effect" v-if="auth.user">
                <a class="dropdown-item dropdown-toggle" href="#">
                  <i class="fa-solid fa-user me-2"></i> {{ un }} <i class="ms-2 fa-solid fa-angle-down"></i>
                </a>
                <ul class="dropdown-menu">
                  <li>
                    <router-link :to="{ name: 'admin-clasificador-tipo' }" class="dropdown-item">Mi
                      información</router-link>
                  </li>
                  <li>
                    <router-link :to="{ name: 'admin-clasificador-tipo' }" class="dropdown-item">Mis eventos</router-link>
                  </li>
                  <li>
                    <a href="#" @click.prevent="logout" class="dropdown-item"><i
                        class="fa-solid fa-right-from-bracket me-1"></i>
                      Cerrar Sesión</a>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>
        <button class="btn header-btn-collapse-nav" data-bs-toggle="collapse" data-bs-target=".header-nav-main nav">
          <i class="fas fa-bars"></i>
        </button>
      </div>
    </div>
  </div>
</template>
