<script setup lang="ts" name="ChartTourist">
import { ref, onMounted } from "vue";
import * as echarts from "echarts";
import "echarts-liquidfill";

import BaseSection from "./BaseSection.vue";
const people = ref("129738人");

const chartRef = ref();
onMounted(() => {
  const myChart = echarts.init(chartRef.value as HTMLDivElement);
  myChart.setOption({
    series: [
      {
        data: [0.7, 0.5, 0.4],
        type: "liquidFill",
        color: ["#294D99", "#156ACF", "#1598ED", "#45BDFF"],
        center: ["50%", "58%"],
        radius: "70%", // 半径
        outline: {
          show: true,
          borderDistance: 8,
          itemStyle: {
            color: "none",
            borderColor: "#294D99",
            borderWidth: 8,
            shadowBlur: 20,
            shadowColor: "rgba(0, 0, 0, 0.25)",
          },
        },

        label: {
          show: true,
          fontSize: 30,
        },
      },
    ],
  });
});
</script>

<template>
  <BaseSection title="实时游客统计">
    <div class="sub-title">可预约<span class="person">2904834</span>人</div>
    <div class="people-wrapper">
      <div class="people-item" v-for="item in people" :key="item">
        {{ item }}
      </div>
    </div>
    <div class="myChart" ref="chartRef"></div>
  </BaseSection>
</template>

<style scoped lang="scss">
.sub-title {
  float: right;
  margin: 20px 10px 0 0;
  .person {
    color: skyblue;
  }
}
.people-wrapper {
  position: absolute;
  top: 60px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  .people-item {
    font-size: 20px;
    background: url("../images/total.png") no-repeat;
    background-size: cover;
    margin: 0 5px;
    line-height: 30px;
    width: 30px;
    height: 30px;
    text-align: center;
  }
}
.myChart {
  width: 100%;
  height: 250px;
  position: absolute;
  bottom: 0;
}
</style>
