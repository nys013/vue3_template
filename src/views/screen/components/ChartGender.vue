<script setup lang="ts" name="ChartTourist">
import { ref, onMounted } from "vue";
import * as echarts from "echarts";

import BaseSection from "./BaseSection.vue";

const chartRef = ref();
onMounted(() => {
  const myChart = echarts.init(chartRef.value as HTMLDivElement);
  myChart.setOption({
    title: {
      text: "男女比例",
      left: "40%",
      top: "30%",
      textStyle: {
        color: "white",
      },
    },
    grid: {
      top: 0,
      bottom: 0,
      left: "10%",
      right: "10%",
    },
    xAxis: {
      show: false,
      type: "value",
      boundaryGap: [0, 0],
    },
    yAxis: [
      {
        type: "category",
        data: [""],
        axisLine: { show: false },
        axisTick: [
          {
            show: false,
          },
        ],
      },
    ],
    series: [
      {
        name: "男",
        type: "bar",
        zlevel: 1,
        itemStyle: {
          normal: {
            barBorderRadius: 30,
            color: new echarts.graphic.LinearGradient(1, 0, 0, 1, [
              {
                offset: 1,
                color: "skyblue",
              },
              {
                offset: 0,
                color: "#45BDFF",
              },
            ]),
          },
        },
        barWidth: 20,
        data: [30],
        label: {
          show: true,
          verticalAlign: "middle",
          position: ["0%", "-50%"],
          fontSize: 20,
          color: "white",
          formatter: ({ data }: { data: string }) => {
            return `男士${data}%`;
          },
        },
      },
      {
        name: "女",
        type: "bar",
        barWidth: 20,
        barGap: "-100%",
        data: [70],
        itemStyle: {
          normal: {
            color: "pink",
            borderWidth: 1,
            barBorderRadius: 30,
          },
        },
        label: {
          show: true,
          verticalAlign: "middle",
          position: ["75%", "-50%"],
          fontSize: 20,
          color: "white",
          formatter: ({ data }: { data: string }) => {
            return `女士${data}%`;
          },
        },
      },
    ],
  });
});
</script>

<template>
  <BaseSection title="性别比例">
    <div class="myChart" ref="chartRef"></div>
  </BaseSection>
</template>

<style scoped lang="scss">
.myChart {
  width: 100%;
  height: 250px;
  position: absolute;
  bottom: 0;
}
</style>
