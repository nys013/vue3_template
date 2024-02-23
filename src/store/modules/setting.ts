import { defineStore } from "pinia";
import { ref } from "vue";

export const useSettingStore = defineStore("settingStore", () => {
  return {
    refresh: ref(0),
  };
});
