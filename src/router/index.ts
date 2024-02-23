import { createRouter, createWebHashHistory } from "vue-router";
import { constantRoutes } from "./routes";

const router = createRouter({
  history: createWebHashHistory(), // hash模式。若是要使用HTML5 模式需要服务器配合
  routes: [...constantRoutes],
});

export default router;
