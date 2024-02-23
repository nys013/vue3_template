import { createApp } from "vue";

import App from "./App.vue";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "element-plus/theme-chalk/dark/css-vars.css";

// @ts-expect-error
import zhCn from "element-plus/dist/locale/zh-cn.mjs";

import "virtual:svg-icons-register";
import globalComponents from "@/components/index.ts";

import "@/styles/index.scss";

import router from "@/router";

import store from "@/store";

import "@/utils/permission";

import formValidate from "@/utils/formValidate";

const app = createApp(App);

app.use(globalComponents);

app.use(ElementPlus, {
  locale: zhCn,
});

app.use(router);

app.use(store);

app.provide("formValidate", formValidate);

app.mount("#app");
