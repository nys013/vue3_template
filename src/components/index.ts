import SVGIcon from "./SVGIcon/index.vue";
import TableCreate from "./TableCreate/index.vue";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

const allGlobalComponents = { SVGIcon, TableCreate };
export default {
  install(app: any) {
    // 注册全局组件
    for (const key in allGlobalComponents) {
      app.component(
        key,
        allGlobalComponents[key as keyof typeof allGlobalComponents],
      );
    }
    // 注册Element的图标到全局
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component);
    }
  },
};
