<script setup name="Main" lang="ts">
import { useSettingStore } from "@/store/modules/setting";
const settingStore = useSettingStore();
</script>

<template>
  <div>
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" :key="settingStore.refresh" />
      </transition>
    </router-view>
  </div>
</template>

<style scoped>
.fade-enter-from {
  opacity: 0;
}

.fade-enter-active {
  transition: all 0.3s;
}

.fade-enter-to {
  opacity: 1;
}
</style>
