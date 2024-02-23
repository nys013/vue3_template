<script setup lang="ts" name="Screen">
import { onMounted, ref } from "vue";
import TopArea from "./components/TopArea.vue";
import ChartTourist from "./components/ChartTourist.vue";
import ChartAge from "./components/ChartAge.vue";
import ChartGender from "./components/ChartGender.vue";
import ChartChinaMap from "./components/ChartChinaMap.vue";
import ChartLine from "./components/ChartLine.vue";
import ChartRadar from "./components/ChartRadar.vue";
import ChartBar from "./components/ChartBar.vue";
import ChartScatter from "./components/ChartScatter.vue";

const screenRef = ref();
onMounted(() => {
  setTransform();
});

window.onresize = () => {
  setTransform();
};

const setTransform = () => {
  screenRef.value.style.transform = `scale(${getSize()}) translate(-50%, -50%)`;
};

const getSize = () => {
  const ww = window.innerWidth / 1920;
  const wh = window.innerHeight / 1080;
  return ww < wh ? ww : wh;
};
</script>

<template>
  <div class="container">
    <div class="screen-wrapper" ref="screenRef">
      <div class="top">
        <TopArea />
      </div>
      <div class="content">
        <div class="left">
          <ChartTourist />
          <ChartAge />
          <ChartGender />
        </div>
        <div class="center">
          <ChartChinaMap />
          <ChartLine />
        </div>
        <div class="right">
          <ChartRadar />
          <ChartBar />
          <ChartScatter />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  background: url(./images/bg.png) no-repeat;
  background-size: cover;
  width: 100vw;
  height: 100vh;
  .screen-wrapper {
    position: fixed;
    width: 1920px;
    height: 1080px;
    transform-origin: left top;
    left: 50%;
    top: 50%;
  }
  .content {
    display: flex;
    height: calc(100% - 100px);
    .left,
    .right {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
    }
    .center {
      flex: 2;
      display: flex;
      flex-direction: column;
    }
  }
}
</style>
