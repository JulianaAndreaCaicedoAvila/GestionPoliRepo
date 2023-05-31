/* eslint-disable no-unused-vars */
// https://js.devexpress.com/Documentation/ApiReference/Data_Layer/CustomStore
import api from "@/utils/api";
import CustomStore from "devextreme/data/custom_store";
const isNotEmpty = (value) => value !== undefined && value !== null && value !== "";
let args = [
	"filter",
	"group",
	"groupSummary",
	"parentIds",
	"requireGroupCount",
	"requireTotalCount",
	"searchExpr",
	"searchOperation",
	"searchValue",
	"select",
	"skip",
	"sort",
	"take",
	"totalSummary",
	"userData",
];
export default (
	o = {
		id: null,
		key: ["id"],
		endPoint: null,
		onLoading: null,
		onApiLoaded: null,
		onLoaded: null,
		loadBaseEntity: false,
		userData: null,
	}
) => {
	// console.clear();
	// let url = "http://localhost:4500/data/_tst5.json"
	return new CustomStore({
		key: typeof o.key !== "undefined" && o.key !== null && o.key.length > 0 ? o.key : ["id"],
		loadMode: "processed", // "raw",
		load: async (loadOptions) => {
			let params = "";
			if (typeof o.Id !== "undefined" && o.Id !== null && o.Id.length > 0) params += `Id=${o.Id}&`;
			if (typeof o.ids !== "undefined" && o.ids !== null && o.ids.length > 0) params += `ids=${o.ids.join(",")}&`;
			if (typeof o.stringParam !== "undefined" && o.stringParam !== null) params += o.stringParam + "&";
			args.forEach(function (i) {
				if (i in loadOptions && isNotEmpty(loadOptions[i])) {
					params += `${i}=${JSON.stringify(loadOptions[i])}&`;
				}
			});
			params = params.slice(0, -1);
			console.log("params =>", params);
			if (typeof o.userData !== "undefined" && o.userData !== null) loadOptions["userData"] = o.userData;
			if (typeof o.id !== "undefined" && o.id !== null && o.id.length > 0) loadOptions["id"] = o.id;
			return await api()
				.post(o.endPoint, loadOptions)
				.then((r) => {
					return r.data;
				});
		},
		onModified: function () {
			console.log("onModified");
		},
		onPush: (changes) => {
			console.log("changes", changes);
		},
		onModifying: function () {
			console.log("onModifying");
		},
		onLoading: function (loadOptions) {
			console.log("onLoading", loadOptions);
			if (o.onLoading !== null) o.onLoading(loadOptions);
			// o.onLoading(loadOptions);
		},
		totalCount: function (loadOptions) {
			console.log("totalCount", loadOptions);
		},
		onLoaded: function (result) {
			console.log("onLoaded", result);
			if (o.onLoaded !== null) o.onLoaded(result);
			// if (window.vm.$isFunction(o.onLoaded)) o.onLoaded(result, baseEntity);
		},
		byKey: (key) => {
			console.log("byKey", key);
			// Needed to process selected value(s) in the SelectBox, Lookup, Autocomplete, and DropDownBox
			return fetch(`https://mydomain.com/MyDataService?id=${key}`);
		},
	});
};
