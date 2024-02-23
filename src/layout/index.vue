<script setup name="Layout">
import Menu from "./Menu/index.vue";
import Main from "./Main/index.vue";
import TabBar from "./TabBar/index.vue";

import { ref } from "vue";
import { useUserStore } from "@/store/modules/user";
import { onMounted } from "vue";
const userStore = useUserStore();
onMounted(() => {
  console.log("🚀 ~ onMounted ~ userStore:", userStore);
});

const isCollapse = ref(false);
</script>

<template>
  <div class="layout-wrapper">
    <div class="layout-slider" :class="{ isFold: isCollapse }">
      <el-scrollbar class="slider-scrollbar">
        <el-menu
          active-text-color="#ffd04b"
          background-color="#001529"
          class="el-menu-vertical"
          text-color="#fff"
          router
          :collapse="isCollapse"
          :default-active="$route.path"
        >
          <Menu :menuList="userStore.menuRoutes" />
        </el-menu>
      </el-scrollbar>
      <el-icon class="fold-icon" @click="isCollapse = !isCollapse">
        <Fold v-if="!isCollapse" />
        <Expand v-else />
      </el-icon>
    </div>
    <div class="layout-top" :class="{ isFold: isCollapse }">
      <TabBar />
    </div>
    <div class="layout-content" :class="{ isFold: isCollapse }">
      <Main />
    </div>
  </div>
</template>

<style scoped lang="scss">
.layout-wrapper {
  // background-color: #f0f0f0;
  .layout-slider {
    position: relative;
    width: $base-menu-width;
    height: 100vh;
    background-color: $base-menu-background;
    color: #fff;
    transition: all 0.3s;
    &.isFold {
      width: $base-menu-fold-width;
    }
    .slider-scrollbar {
      height: calc(100vh - 40px);
      .el-menu {
        border-right: none;
      }
    }
    .fold-icon {
      position: absolute;
      bottom: 10px;
      color: white;
      font-size: 30px;
      margin-left: 10px;
      cursor: pointer;
    }
  }
  .layout-top {
    position: fixed;
    top: 0;
    left: $base-menu-width;
    width: calc(100vw - $base-menu-width);
    height: $base-tabbar-height;
    border-bottom: 1px solid rgb(228, 244, 223);
    transition: all 0.3s;
    &.isFold {
      width: calc(100vw - $base-menu-fold-width);
      left: $base-menu-fold-width;
    }
  }
  .layout-content {
    position: fixed;
    top: $base-tabbar-height;
    left: $base-menu-width;
    width: calc(100vw - $base-menu-width);
    height: calc(100vh - $base-tabbar-height);
    padding: 20px;
    overflow-y: auto;
    transition: all 0.3s;
    &.isFold {
      width: calc(100vw - $base-menu-fold-width);
      left: $base-menu-fold-width;
    }
  }
}
</style>
