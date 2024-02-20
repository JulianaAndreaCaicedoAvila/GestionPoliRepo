<script setup>
import { ref } from "vue";
defineProps({
	msg: String,
	pluginOptions: {
		stickyEnabled: true,
		stickyEffect: "shrink",
		stickyEnableOnBoxed: true,
		stickyEnableOnMobile: false,
		stickyChangeLogo: true,
		stickyStartAt: 120,
		stickyHeaderContainerHeight: 70,
	},
});
const count = ref(0);
</script>
<template>
	<footer id="footer" class="footer-texts-more-lighten bg-main-500 mt-4">
		<div class="footer-copyright bg-trans">
			<div class="container">
				<div class="row pb-4 pt-4">
					<div class="col text-center">
						<p class="text-color-white font-weight-semibold">
							© Copyright {{ new Date().getFullYear() }} - Escuela Superior de Administración Pública (ESAP) - Todos los
							derechos reservados - SIRECEC
							v4.0.20240220.5
						</p>
					</div>
				</div>
			</div>
		</div>
	</footer>
</template>