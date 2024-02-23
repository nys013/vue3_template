<script setup lang="ts" name="ChartTourist">
import { ref, onMounted } from "vue";
import * as echarts from "echarts";

import BaseSection from "./BaseSection.vue";

const chartRef = ref();
onMounted(() => {
  const myChart = echarts.init(chartRef.value as HTMLDivElement);
  myChart.setOption({
    color: ["#72A9FE"],
    tooltip: {
      trigger: "item",
      formatter: (params: { data: string[] }) => {
        return `
              <span style="color:#6a7985">总额：</span>${params.data[0]}元<br>
              <span style="color:#6a7985">次数：</span>${params.data[1]}次<br>
            `;
      },
    },
    xAxis: {
      type: "value",
      name: "（元）",
      axisLine: {
        show: true,
        lineStyle: {
          color: "#fff",
        },
      },
      axisLabel: {
        textStyle: {
          color: "#fff",
        },
      },
    },
    yAxis: {
      type: "value",
      name: "（次）",
      axisLine: {
        show: true,
        lineStyle: {
          color: "#fff",
        },
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: "#fff",
        },
      },
    },
    series: [
      {
        type: "scatter",
        data: [
          [10.0, 8.04],
          [8.07, 6.95],
          [13.0, 7.58],
          [9.05, 8.81],
          [11.0, 8.33],
          [14.0, 7.66],
          [13.4, 6.81],
          [10.0, 6.33],
          [14.0, 8.96],
          [12.5, 6.82],
          [9.15, 7.2],
          [11.5, 7.2],
          [3.03, 4.23],
          [12.2, 7.83],
          [2.02, 4.47],
          [1.05, 3.33],
          [4.05, 4.96],
          [6.03, 7.24],
          [12.0, 6.26],
          [12.0, 8.84],
          [7.08, 5.82],
          [5.02, 5.68],
        ],
      },
    ],
  });
});
</script>

<template>
  <BaseSection title="散点图">
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
