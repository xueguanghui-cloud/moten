import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { createVuePlugin } from "vite-plugin-vue2";
import { resolve } from "path";
import { isVue2 } from "vue-demi";
import dts from "vite-plugin-dts";

const name = isVue2 ? "vue2" : "vue3";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [isVue2 ? createVuePlugin() : vue(), dts()],
  build: {
    outDir: `dist/${name}`,
    lib: {
      entry: resolve(__dirname, "src/main.ts"),
      name: "moten",
      fileName: "moten",
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ["vue", "vue-demi"],
      output: {
        // 在UMD构建模式下，为这些外部化的依赖关系提供一个全局变量
        globals: {
          vue: "Vue",
          "vue-demi": "VueDemi",
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
