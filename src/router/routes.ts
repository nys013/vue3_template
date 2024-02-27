export const constantRoutes = [
  {
    path: "/",
    name: "layout",
    component: () => import("@/layout/index.vue"),
    meta: {
      title: "layout",
    },
    redirect: "/home",
    children: [
      {
        path: "/home",
        name: "Home",
        component: () => import("@/views/Home/index.vue"),
        meta: {
          title: "首页",
          icon: "HomeFilled",
        },
      },
    ],
  },
  {
    path: "/screen",
    component: () => import("@/views/screen/index.vue"),
    name: "Screen",
    meta: {
      title: "数据大屏",
      icon: "Platform",
    },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login/index.vue"),
    meta: {
      hidden: true,
      title: "登陆",
    },
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/views/404/index.vue"),
    meta: {
      hidden: true,
      title: "404",
    },
  },
];

//异步路由
export const asyncRoutes = [
  {
    path: "/acl",
    component: () => import("@/layout/index.vue"),
    name: "Acl",
    meta: {
      title: "权限管理",
      icon: "Lock",
    },
    redirect: "/acl/user",
    children: [
      {
        path: "/acl/user",
        component: () => import("@/views/acl/user/index.vue"),
        name: "User",
        meta: {
          title: "用户管理",
          icon: "User",
        },
      },
      {
        path: "/acl/role",
        component: () => import("@/views/acl/role/index.vue"),
        name: "Role",
        meta: {
          title: "角色管理",
          icon: "UserFilled",
        },
      },
      {
        path: "/acl/permission",
        component: () => import("@/views/acl/permission/index.vue"),
        name: "Permission",
        meta: {
          title: "菜单管理",
          icon: "Monitor",
        },
      },
    ],
  },
  {
    path: "/product",
    component: () => import("@/layout/index.vue"),
    name: "Product",
    meta: {
      title: "商品管理",
      icon: "Goods",
    },
    redirect: "/product/trademark",
    children: [
      {
        path: "/product/trademark",
        component: () => import("@/views/product/trademark/index.vue"),
        name: "Trademark",
        meta: {
          title: "品牌管理",
          icon: "ShoppingCartFull",
        },
      },
      // {
      //   path: "/product/attr",
      //   component: () => import("@/views/product/attr/index.vue"),
      //   name: "Attr",
      //   meta: {
      //     title: "属性管理",
      //     icon: "ChromeFilled",
      //   },
      // },
      // {
      //   path: "/product/spu",
      //   component: () => import("@/views/product/spu/index.vue"),
      //   name: "Spu",
      //   meta: {
      //     title: "SPU管理",
      //     icon: "Calendar",
      //   },
      // },
      // {
      //   path: "/product/sku",
      //   component: () => import("@/views/product/sku/index.vue"),
      //   name: "Sku",
      //   meta: {
      //     title: "SKU管理",
      //     icon: "Orange",
      //   },
      // },
    ],
  },
];

// 任意路由——单独提出来，而不放在常量路由中，是因为不能一开始就注册，需要和异步路由一起addRoute注册。
// 若是放在常量路由中，在异步路由页面刷新页面，路由导航会优先重定向到任意路由
// 若是和异步路由一起，则通过next({...to})就可以保持原有的异步路由
export const anyRoutes = [
  {
    path: "/:pathMatch(.*)*",
    name: "any",
    component: () => import("@/views/404/index.vue"),
    redirect: "/404",
    meta: {
      hidden: true,
      title: "404",
    },
  },
];
