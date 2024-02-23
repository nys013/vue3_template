<script setup lang="ts" name="404"></script>

<template>
  <div class="container">
    <el-button
      class="btn"
      type="primary"
      size="default"
      @click="$router.push('/')"
      >回到首页</el-button
    >
  </div>
</template>

<style scoped lang="scss">
.container {
  width: 100vw;
  height: 100vh;
  background: url(../../assets/images/error_images/404.png) no-repeat;
  background-position: 50%;
  .btn {
    margin: 50px;
  }
}
</style>
