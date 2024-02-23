<script setup lang="ts" name="ChartTourist">
import { ref, onMounted } from "vue";
import * as echarts from "echarts";

import BaseSection from "./BaseSection.vue";

const chartRef = ref();
onMounted(() => {
  const myChart = echarts.init(chartRef.value as HTMLDivElement);
  myChart.setOption({
    tooltip: {
      trigger: "item",
      fontSize: 14,
    },
    legend: {
      top: "center",
      right: "15",
      orient: "vertical",
      textStyle: {
        color: "skyblue",
      },
    },
    series: [
      {
        type: "pie",
        radius: ["40%", "70%"],
        center: ["35%", "50%"],

        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: true,
          position: "inside",
          fontSize: 12,
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 14,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 1048, name: "18岁以下" },
          { value: 735, name: "18-25" },
          { value: 580, name: "26-35" },
          { value: 484, name: "36-59" },
          { value: 300, name: "60岁以上" },
        ],
      },
    ],
  });
});
</script>

<template>
  <BaseSection title="年龄比例">
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
