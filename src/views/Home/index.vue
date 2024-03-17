<script setup lang="ts">
import { useUserStore } from "@/store/modules/user";
const userStore = useUserStore();
const subtitle = import.meta.env.VITE_APP_TITLE;
console.log("测试生产环境有无打印");
</script>

<template>
  <div>
    <el-card class="box-card">
      <img
        :src="userStore.avatar"
        width="100"
        height="100"
        class="avatar-img"
      />
      <div class="title-wrapper">
        <h1 class="title">你好 {{ userStore.username }}</h1>
        <h2 class="subtitle">欢迎来到{{ subtitle }}</h2>
      </div>
    </el-card>
    <SVGIcon
      name="welcome"
      :style="{
        width: '500px',
        height: '500px',
        position: 'absolute',
        left: 0,
        right: 0,
        margin: 'auto',
      }"
      class="welcome-svg"
    />
  </div>
</template>

<style scoped lang="scss">
:deep(.el-card__body) {
  display: flex;
  flex-direction: row;
  .avatar-img {
    border-radius: 50%;
    margin-right: 20px;
  }
  .title-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .title {
      font-size: 30px;
      font-weight: 700;
    }
    .subtitle {
      font-size: 20px;
      font-weight: 500;
      color: rgb(67, 169, 125);
    }
  }
}
</style>
