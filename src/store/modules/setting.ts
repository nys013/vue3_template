import { defineStore } from "pinia";
import { ref } from "vue";
import { ElLoading } from "element-plus";

const loadingInstance = ref();
export const useSettingStore = defineStore("settingStore", () => {
  return {
    refresh: ref(0),
    showLoading() {
      loadingInstance.value = ElLoading.service({
        lock: true,
        text: "Loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
    },
    hideLoading() {
      loadingInstance.value.close();
    },
  };
});
