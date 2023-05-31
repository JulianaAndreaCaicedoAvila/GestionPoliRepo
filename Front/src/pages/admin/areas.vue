<template>
	<section class="page-header page-header-modern bg-color-light-scale-1 page-header-sm mb-4">
		<div class="container">
			<div class="row">
				<div class="col-md-8 order-2 order-md-1 align-self-center p-static">
					<h1 class="text-dark color-main"><span class="font-weight-semibold">PRUEBAS &raquo; </span> Datagrid</h1>
				</div>
				<div class="col-md-4 order-1 order-md-2 align-self-center">
					<ul class="breadcrumb d-block text-md-end">
						<li><a href="#">INICIO</a></li>
						<li>PRUEBAS</li>
						<li class="active">Datagrid</li>
					</ul>
				</div>
			</div>
		</div>
	</section>
	<div class="container">
		<div class="row pt-2">
			<div class="col">
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
		<div class="row">
			<div class="col">
				<div class="options">
					<div class="caption">Options</div>
					<div class="option-container">
						<div class="option">
							<DxSelectBox id="displayModes" :items="displayModes" display-expr="text" value-expr="value" v-model:value="displayMode" />
						</div>
						<div class="option">
							<DxCheckBox id="showPageSizes" text="Show Page Size Selector" v-model:value="showPageSizeSelector" />
						</div>
						<div class="option">
							<DxCheckBox id="showInfo" text="Show Info Text" :disabled="isCompactMode" v-model:value="showInfo" />
						</div>
						<div class="option">
							<DxCheckBox id="showNavButtons" text="Show Navigation Buttons" :disabled="isCompactMode" v-model:value="showNavButtons" />
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="row pt-5">
			<div class="col">
				<DxDataGrid :columns="columns" :show-borders="true" data-source="data/customers.json" />
			</div>
		</div>
	</div>
</template>
<script setup>
import { onMounted } from "vue";
import { generateData } from "@/assets/js/generate";
import DxSelectBox from "devextreme-vue/select-box";
import DxCheckBox from "devextreme-vue/check-box";
import DataSource from "devextreme/data/data_source";
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
<style>
.options {
	margin-top: 20px;
	padding: 20px;
	background-color: rgba(191, 191, 191, 0.15);
	position: relative;
}

.caption {
	font-size: 18px;
	font-weight: 500;
}

.option-container {
	display: flex;
	margin: 0 auto;
	justify-content: space-between;
}

.option {
	margin-top: 10px;
	display: flex;
	align-items: center;
}

.option-caption {
	white-space: nowrap;
	margin: 0 8px;
}
</style>
