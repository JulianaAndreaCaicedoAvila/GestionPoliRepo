<script setup>
import { onMounted, ref } from "vue";
import HeaderMenu from "./header_menu.vue";
import { DxFileManager, DxPermissions, DxUpload } from 'devextreme-vue/file-manager';
import CustomFileSystemProvider from 'devextreme/file_management/custom_provider';
import { DxTooltip } from 'devextreme-vue/tooltip';
import {
	DxColumn,
	DxColumnChooser,
	DxExport,
	DxScrolling,
	DxFilterRow,
	DxDataGrid,
	DxGrouping,
	DxGroupItem,
	DxLookup,
	DxGroupPanel,
	DxLoadPanel,
	DxPager,
	DxPaging,
	DxSelection,
	DxSorting,
	DxSummary,
} from "devextreme-vue/data-grid";
import { DxPopup } from 'devextreme-vue/popup';
import { useArchivoStore } from "@/stores";
let store = useArchivoStore();
const onSelectionChanged = ({ selectedRowsData }) => {
	const data = selectedRowsData[0];
	console.clear();
	console.log("data =>", data);
	// showEmployeeInfo.value = !!data;
	// selectedRowNotes.value = data?.Notes;
	// selectedRowPicture.value = data?.Picture;
};
// https://js.devexpress.com/jQuery/Documentation/ApiReference/UI_Components/dxFileManager/File_System_Providers/Custom/Configuration/#getItems
let getItems = async (pathInfo) => {
	let o = await store.obtenerImagenes();
	items.value = [...o];
}
let deleteItem = (item) => {

}
let renaming = (e, a) => {
	let currentName = e.item.name;
	let newName = e.newName;
	console.clear();
	console.log("currentName =>", currentName);
	console.log("newName =>", newName);
}
let uploadFileChunk = (fileData, uploadInfo, destinationDirectory) => {
	let deferred = null;
	if (uploadInfo.chunkIndex === 0) {
		const filePath = destinationDirectory.path ? `${destinationDirectory.path}/${fileData.name}` : fileData.name;
		deferred = gateway.getUploadAccessUrl(filePath).done((accessUrl) => {
			uploadInfo.customData.accessUrl = accessUrl;
		});
	} else {
		deferred = $.Deferred().resolve().promise();
	}
	deferred = deferred.then(() => gateway.putBlock(
		uploadInfo.customData.accessUrl,
		uploadInfo.chunkIndex,
		uploadInfo.chunkBlob,
	));
	if (uploadInfo.chunkIndex === uploadInfo.chunkCount - 1) {
		deferred = deferred.then(() => gateway.putBlockList(
			uploadInfo.customData.accessUrl,
			uploadInfo.chunkCount,
		));
	}
	return deferred.promise();
}
let popupVisible = ref(false), imageItemToDisplay = ref({}), items = ref(null);
let displayImagePopup = (e) => {
	console.clear();
	console.log("e =>", e);
	imageItemToDisplay.value = {
		name: e.name,
		url: e.url,
	};
	popupVisible.value = true;
};
let onReady = (e) => {
	e.component.selectRows([0]);
}
onMounted(async () => {
	items.value = await store.obtenerImagenes();
	// items.value = [...o];
});
</script>
<template>
	<div v-if="items">
		<DxDataGrid :data-source="items" :hover-state-enabled="true" :remote-operations="false" :word-wrap-enabled="true"
			@content-ready="onReady" :row-alternation-enabled="true" :show-borders="false" id="gridContainer"
			@selection-changed="onSelectionChanged">
			<DxLoadPanel :enabled="false" />
			<DxFilterRow :visible="false" />
			<DxSelection mode="single" />
			<DxSorting mode="single" /><!-- single, multiple, none" -->
			<DxPaging :page-size="15" />
			<DxPager :visible="true" :show-info="true" :show-page-size-selector="false" :show-navigation-buttons="true"
				:allowed-page-sizes="[15, 50, 'Todos']" info-text="{2} departamentos (página {0} de {1})" />
			<DxColumn data-field="name" caption="Nombre" :visible="true" />
			<DxColumn data-field="size" caption="Tamaño" :visible="true" width="200" alignment="center" />
			<DxColumn data-field="dateModified" caption="Fecha" format="dd/MM/yyyy" dataType="date" width="200"
				alignment="center" :visible="true" sort-order="desc" />
			<template #tpl1="{ data }">
				<span v-if="data.data.activo">SI</span>
				<span v-else>NO</span>
			</template>
			<DxColumn :width="70" alignment="center" cell-template="tpl" caption="" name="cmds" :fixed="true"
				fixed-position="right" />
			<template #tpl="{ data }">
				<span class="cmds">
					<a title="Editar" class="cmd-item color-main-600 me-2" @click.prevent="displayImagePopup(data.data)" href="#">
						<i class="fa-solid fa-image fa-lg"></i>
					</a>
					<a v-if="data.data.activo" title="Desactivar" class="cmd-item color-main-600"
						@click.prevent="active(data.data, false)" href="#">
						<i class="fa-regular fa-square-minus fa-lg"></i>
					</a>
					<a v-else title="Activar" class="cmd-item color-main-600" @click.prevent="active(data.data, true)" href="#">
						<i class="fa-regular fa-circle-xmark fs-lg"></i>
					</a>
				</span>
			</template>
		</DxDataGrid>
	</div>
	<DxPopup :hide-on-outside-click="true" v-model:visible="popupVisible" v-model:title="imageItemToDisplay.name"
		max-height="600" class="photo-popup-content">
		<img :src="imageItemToDisplay.url" class="photo-popup-image">
	</DxPopup>
</template>
<style>
.photo-popup-content {
	text-align: center;
}

.photo-popup-content .photo-popup-image {
	height: 300px !important;
	max-width: 500px !important;
}
</style>