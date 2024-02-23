<script lang="ts">
export default {
  name: "Menu",
};
</script>
<script setup lang="ts">
import type { RouteRecordRaw } from "vue-router";
defineProps({
  menuList: {
    type: Array,
    default: (): RouteRecordRaw[] => [],
  },
});
</script>

<template>
  <template v-for="item in menuList">
    <template v-if="!(item.meta && item.meta.hidden)">
      <el-menu-item
        v-if="!item.children || !item.children.length"
        :index="item.path"
        :key="item.name"
        :route="item.path"
      >
        <el-icon><component :is="item.meta.icon" /></el-icon>
        <span>{{ item.meta.title }}</span>
      </el-menu-item>
      <el-menu-item
        v-else-if="item.name === 'layout'"
        :index="item.children[0].path"
        :key="item.children[0].name"
        :route="item.children[0].path"
      >
        <el-icon><component :is="item.children[0].meta.icon" /></el-icon>
        <span>{{ item.children[0].meta.title }}</span>
      </el-menu-item>
      <el-sub-menu
        v-else-if="item.children && item.children.length"
        :index="item.path"
        :key="item.name"
      >
        <template #title>
          <el-icon><component :is="item.meta.icon" /></el-icon>
          <span>{{ item.meta.title }}</span>
        </template>
        <Menu :menuList="item.children"></Menu>
      </el-sub-menu>
    </template>
  </template>
</template>

<style scoped></style>
