<script setup lang="ts" name="TopArea">
import { ref, onMounted, onBeforeUnmount } from "vue";
import moment from "moment";
const time = ref(moment().format("YYYY年MM月DD日 HH:mm:ss"));
let timer;
onMounted(() => {
  timer = setInterval(() => {
    time.value = moment().format("YYYY年MM月DD日 HH:mm:ss");
  }, 1000);
});

onBeforeUnmount(() => {
  clearInterval(timer);
});
</script>

<template>
  <div class="wrapper">
    <div class="left">
      <div class="button" @click="$router.push('/')">首页</div>
    </div>
    <div class="title">数据大屏</div>
    <div class="right">
      <div
        class="button"
        @click="$message({ message: `暂未开发`, type: 'warning' })"
      >
        统计报告
      </div>
      <div class="time">{{ time }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  color: skyblue;
  font-size: 22px;
  .left {
    flex: 1;
    background: url(../images/dataScreen-header-left-bg.png) no-repeat;
    background-size: 100% 100%;
    .button {
      width: 134px;
      height: 42px;
      line-height: 42px;
      background: url(../images/dataScreen-header-btn-bg-l.png) no-repeat;
      background-size: 100% 100%;
      text-align: center;
      float: right;
      cursor: pointer;
    }
  }
  .title {
    flex: 2;
    height: 74px;
    line-height: 74px;
    background: url(../images/dataScreen-header-center-bg.png) no-repeat;
    background-size: 100% 100%;
    text-align: center;
    font-size: 40px;
    font-weight: 700;
  }
  .right {
    flex: 1;
    background: url(../images/dataScreen-header-right-bg.png) no-repeat;
    background-size: 100% 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .button {
      width: 134px;
      height: 42px;
      line-height: 42px;
      background: url(../images/dataScreen-header-btn-bg-r.png) no-repeat;
      background-size: 100% 100%;
      text-align: center;
      cursor: pointer;
    }
    .time {
      padding-right: 30px;
    }
  }
}
</style>
