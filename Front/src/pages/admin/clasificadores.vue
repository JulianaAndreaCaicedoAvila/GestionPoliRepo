<script setup>
import { onMounted } from "vue";
import { generateData } from "@/assets/js/generate";
import { DxDataGrid, DxScrolling, DxPager, DxPaging } from "devextreme-vue/data-grid";
let dataSource = generateData(100000),
	displayModes = [
		{ text: "Display Mode 'full'", value: "full" },
		{ text: "Display Mode 'compact'", value: "compact" },
	],
	displayMode = "full",
	pageSizes = [5, 10, 30, 50, "all"],
	showPageSizeSelector = true,
	showInfo = true,
	showNavButtons = true,
	customizeColumns = (columns) => {
		console.log("customizeColumns!");
		columns[0].width = 70;
	},
	isCompactMode = () => {
		return this.displayMode === "compact";
	};
onMounted(() => {
	console.log("MAIN ONMOUNTED");
});
</script>
<template>
	<div class="container pt-2 pb-2 content">
		<div class="card">
			<div class="card-header main">
				<i class="fa-solid fa-gears"></i>
				Administración &raquo; Usuarios
			</div>
			<div class="card-body pt-3 pb-4">
				<div class="row">
					<div class="col">
						<!-- <h2 class="font-weight-normal text-7 mb-2 color-main"><strong class="font-weight-semibold">Usuarios</strong> Principal o Interna</h2> -->
						<DxDataGrid id="gridContainer" :customize-columns="customizeColumns" :data-source="dataSource" key-expr="id" :show-borders="true">
							<DxScrolling row-rendering-mode="virtual" />
							<DxPaging :page-size="10" />
							<DxPager
								:allowed-page-sizes="pageSizes"
								:display-mode="displayMode"
								:show-info="showInfo"
								:show-navigation-buttons="showNavButtons"
								:show-page-size-selector="showPageSizeSelector"
								:visible="true"
							/>
						</DxDataGrid>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
