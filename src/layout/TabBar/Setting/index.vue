<script setup name="Setting">
import { ref } from "vue";
import { useSettingStore } from "@/store/modules/setting";
import { useUserStore } from "@/store/modules/user";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";

const $router = useRouter();

const userStore = useUserStore();
const settingStore = useSettingStore();
const handleRefreshClick = () => {
  settingStore.refresh++;
};

const handleFullScreenClick = () => {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    document.documentElement.requestFullscreen();
  }
};

const handleLogoutClick = async () => {
  console.log("退出登陆");
  // 一般来说 1.调退出登陆接口，2.接口返回成功清楚前端储存的token和用户相关信息，3.然后跳转到登录页
  const res = await userStore.logout();
  if (res) {
    $router.push("/login");
    ElMessage.success("退出登陆成功");
  }
};

const visible = ref(false);
const darkMode = ref(false);
const htmlEl = document.documentElement;
const handleDarkMoonChange = (value) => {
  if (value) {
    htmlEl.classList.add("dark");
  } else {
    htmlEl.classList.remove("dark");
  }
};

const themeColor = ref("#409eff");
const handleThemeColorChange = (color) => {
  getComputedStyle(htmlEl).getPropertyValue(`--el-color-primary`);
  htmlEl.style.setProperty("--el-color-primary", color);
};
</script>

<template>
  <el-button icon="Refresh" circle @click="handleRefreshClick" />
  <el-button icon="FullScreen" circle @click="handleFullScreenClick" />
  <el-popover
    :visible="visible"
    placement="top-start"
    title="主题设置"
    :width="300"
  >
    <el-form label-width="70px">
      <el-form-item label="暗黑模式">
        <el-switch
          v-model="darkMode"
          inline-prompt
          active-icon="Moon"
          inactive-icon="Sunny"
          @change="handleDarkMoonChange"
        />
      </el-form-item>
      <el-form-item label="主题颜色">
        <el-color-picker
          v-model="themeColor"
          @change="handleThemeColorChange"
        />
      </el-form-item>
    </el-form>
    <template #reference>
      <el-button icon="Setting" circle @click="visible = !visible" />
    </template>
  </el-popover>
  <img :src="userStore.avatar" alt="avatar" class="admin-avatar" />
  <el-dropdown class="admin-name" @command="handleLogoutClick">
    <span class="el-dropdown-link">
      {{ userStore.username }}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>退出登陆</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style scoped lang="scss">
.admin-avatar {
  width: 32px;
  height: 32px;
  margin-left: 10px;
  border-radius: 50%;
}
.admin-name {
  margin-left: 10px;
}
</style>
