<script setup>
import HeaderMenu from "./header_menu.vue";
</script>
<template>
	<header
		id="header"
		class="header-effect-shrink"
		data-plugin-options="{'stickyEnabled': true, 'stickyEffect': 'shrink', 'stickyEnableOnBoxed': true, 'stickyEnableOnMobile': false, 'stickyChangeLogo': true, 'stickyStartAt': 120, 'stickyHeaderContainerHeight': 70}"
	>
		<div class="header-body border-top-0">
			<div class="header-top bg-dark bg-main-500">
				<div class="container">
					<div class="header-row py-2">
						<div class="header-column justify-content-start">
							<div class="header-row">
								<nav class="header-nav-top">
									<li class="nav-item d-none d-md-block">
										<a href="https://www.gov.co/" target="_blank" class="p-0 pe-4">
											<img src="/assets/img/logo_govco.svg" alt="Logo Gov.co" width="100" />
										</a>
									</li>
									<!-- <ul class="nav nav-pills text-uppercase text-2">
										<li class="nav-item nav-item-anim-icon d-none d-md-block">
											<a class="nav-link ps-0" href="#"><i class="fas fa-angle-right"></i> LINK INSTITUCIONAL 1</a>
										</li>
										<li class="nav-item nav-item-anim-icon d-none d-md-block">
											<a class="nav-link" href="contact-us.html"><i class="fas fa-angle-right"></i> LINK INSTITUCIONAL 2</a>
										</li>
									</ul> -->
								</nav>
							</div>
						</div>
						<div class="header-column justify-content-end">
							<div class="header-row">
								<nav class="header-nav-top">
									<ul class="nav nav-pills">
										<li class="nav-item">
											<a href="mailto:sirecec4@esap.edu.co"><i class="far fa-envelope text-4 text-color-primary" style="top: 1px"></i> sirecec4@esap.edu.co</a>
										</li>
										<!-- <li class="nav-item">
											<a href="tel:123-456-7890"><i class="fab fa-whatsapp text-4 text-color-primary" style="top: 0"></i> +57 (601) 739-9080</a>
										</li> -->
									</ul>
								</nav>
								<!-- <ul class="header-social-icons social-icons d-none d-sm-block social-icons-clean">
									<li class="social-icons-facebook">
										<a href="http://www.facebook.com/" target="_blank" title="Facebook"><i class="fab fa-facebook-f"></i></a>
									</li>
									<li class="social-icons-twitter">
										<a href="http://www.twitter.com/" target="_blank" title="Twitter"><i class="fab fa-twitter"></i></a>
									</li>
									<li class="social-icons-linkedin">
										<a href="http://www.linkedin.com/" target="_blank" title="Linkedin"><i class="fab fa-linkedin-in"></i></a>
									</li>
								</ul> -->
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="header-container container">
				<div class="header-row">
					<div class="header-column">
						<div class="header-row">
							<div class="header-logo">
								<router-link :to="{ name: 'inicio' }">
									<img alt="Sinergia" width="218" height="80" data-sticky-width="150" data-sticky-height="55" src="/assets/img/ansv-logo-v8.svg" />
									<!-- <img alt="Sinergia" width="191" height="50" data-sticky-width="153" data-sticky-height="40" src="/assets/img/logo-sinergia.png" /> -->
								</router-link>
							</div>
						</div>
					</div>
					<HeaderMenu />
				</div>
			</div>
		</div>
	</header>
</template>
