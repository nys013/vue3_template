import { defineStore } from "pinia";
import { ref } from "vue";
import { ElMessage } from "element-plus";

import { loginPost, userInfoGet, logoutPost } from "@/api/user";
import { LoginParams } from "@/api/user/type";

import { constantRoutes, asyncRoutes, anyRoutes } from "@/router/routes";
import { type RouteRecordRaw } from "vue-router";
import router from "@/router";

const menuRoutes: Array<RouteRecordRaw> = [...constantRoutes];
const username = ref("");
const avatar = ref("");
const filterPermissionRoutes = (
  routes: string[],
  allRoutes: RouteRecordRaw[] = asyncRoutes,
) => {
  return allRoutes.filter((item) => {
    if (item.children && item.children.length) {
      item.children = filterPermissionRoutes(routes, item.children);
    }
    if (routes.includes(item.name as string)) {
      return true;
    } else {
      return false;
    }
  });
};

export const useUserStore = defineStore("user", () => {
  const token = ref(localStorage.getItem("TOKEN"));
  return {
    token,
    menuRoutes,
    username,
    avatar,
    loginRequest: async (params: LoginParams) => {
      const res = await loginPost(params);
      const data = res.data;
      if (res.code === 200) {
        localStorage.setItem("TOKEN", data as string);
        token.value = data as string;
        return Promise.resolve(true);
      } else {
        return Promise.reject(data);
      }
    },
    getUserInfo: async () => {
      const res = await userInfoGet();
      const data = res.data;
      if (res.code === 200) {
        username.value = data.name;
        avatar.value = data.avatar;
        const permissionRoutes = filterPermissionRoutes(data.routes);
        menuRoutes.push(...permissionRoutes);
        [...permissionRoutes, ...anyRoutes].forEach((item) => {
          router.addRoute(item as RouteRecordRaw);
        });
        return Promise.resolve(data);
      } else {
        ElMessage.error(res.message);
        return Promise.reject(res.message);
      }
    },
    logout: async () => {
      const res = await logoutPost();
      if (res.code === 200) {
        localStorage.removeItem("TOKEN");
        token.value = "";
        username.value = "";
        avatar.value = "";
        return Promise.resolve(true);
      } else {
        ElMessage.error(res.message);
        return Promise.reject(res.message);
      }
    },
  };
});
