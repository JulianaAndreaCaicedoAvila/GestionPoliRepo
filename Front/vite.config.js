import { defineConfig } from "vite";
const path = require("path");
import vue from "@vitejs/plugin-vue";
const resolve = (dir) => path.join(__dirname, dir);

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue({
			script: { defineModel: true, propsDestructure: true },
			// 202301150803: https://vuejs.org/guide/extras/reactivity-transform.html#explicit-opt-in
			reactivityTransform: false,
		}),
	],
	base: "/",
	// base: "/sirecec4/",
	// base: "/esap/sirecec4/",
	server: {
		port: 3000,
	},
	resolve: {
		alias: {
			"@": resolve("src"),
			"devextreme/ui": "devextreme/esm/ui",
		},
	},
	// 202207060922: https://supportcenter.devexpress.com/ticket/details/t1054272/vue3-react-vite-rollup-devextreme-fails-in-production-because-some-modules-do-not-pass
	build: {
		// outDir: "\\\\172.23.0.32\\e$\\pnsv",
		// outDir: "D:\\Web\\ansv\\pnsv\\app\\_front",
		// outDir: "\\\\172.24.0.23\\c$\\inetpub\\sites\\pnsv",
		// outDir: "\\\\orion\\e$\\web\\support\\ansv\\pnsv",
		emptyOutDir: true,
		rollupOptions: {
			treeshake: false,
		},
	},
	rollupOptions: {
		// make sure to externalize deps that shouldn't be bundled into your library
		external: ["vue"],
		output: {
			// Provide global variables to use in the UMD build for externalized deps
			globals: {
				vue: "Vue",
			},
		},
	},
});
