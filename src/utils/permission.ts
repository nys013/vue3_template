import router from "@/router";

import nprogress from "nprogress";
import "nprogress/nprogress.css";
nprogress.configure({ showSpinner: false });

import pinia from "@/store/index";
import { useUserStore } from "@/store/modules/user";
const userStore = useUserStore(pinia);

router.beforeEach(async (to, _from, next) => {
  document.title = import.meta.env.VITE_APP_TITLE + " | " + to.meta.title;

  // 接口报错，先把导航相关注释
  const { token, username } = userStore;
  if (token) {
    // 有token，但是没有用户信息，需要重新调接口获取用户信息
    // 这里有个思考点，用户信息其实是可以存在localStorage中的，但是这里需要重新调接口获取用户信息，因为考虑token会过期的情况，用户信息也会过期，还是调接口是业内的公认做法
    if (!username) {
      try {
        await userStore.getUserInfo();
        next({ ...to });
      } catch (error) {
        // 若是没有获取到用户信息，那就清除token，返回登录页
        await userStore.logout();
        next("/login");
      }
    } else {
      next();
    }
  } else {
    // 没有token，跳转到登录页
    if (to.path !== "/login") {
      next("/login");
    } else {
      next();
    }
  }
  nprogress.start();
});
router.afterEach(() => {
  nprogress.done();
});
