import { defineConfig } from "vite";
const path = require("path");
import vue from "@vitejs/plugin-vue";
const resolve = (dir) => path.join(__dirname, dir);
export default defineConfig({
	plugins: [
		vue({
			script: { defineModel: true, propsDestructure: true },
			reactivityTransform: false,
		}),
	],
	base: "/",
	server: {
		port: 3000,
	},
	resolve: {
		alias: {
			"@": resolve("src"),
			"devextreme/ui": "devextreme/esm/ui",
		},
	},
	build: {
		emptyOutDir: true,
		rollupOptions: {
			treeshake: false,
		},
	},
	rollupOptions: {
		external: ["vue"],
		output: {
			globals: {
				vue: "Vue",
			},
		},
	},
});
