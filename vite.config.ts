import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";

import path from "path";
import { viteMockServe } from "vite-plugin-mock";

import vueSetupExtend from "vite-plugin-vue-setup-extend-plus";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [
      vue(),
      vueSetupExtend(),
      createSvgIconsPlugin({
        // Specify the icon folder to be cached
        iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
        // Specify symbolId format
        symbolId: "icon-[dir]-[name]",
      }),
      viteMockServe({
        localEnabled: command === "serve", // 保证开发阶段可以使用mock
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve("./src"),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          // 全局引入scss变量配置
          additionalData: '@import "./src/styles/variable.scss";',
        },
      },
    },
    server: {
      proxy: {
        [env.VITE_APP_BASE_API]: {
          target: env.VITE_SERVE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
  };
});
