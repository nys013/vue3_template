<script setup lang="ts" name="ChartTourist">
import { ref, onMounted } from "vue";
import * as echarts from "echarts";

import BaseSection from "./BaseSection.vue";

const chartRef = ref();
onMounted(() => {
  const myChart = echarts.init(chartRef.value as HTMLDivElement);
  myChart.setOption({
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#000",
        },
      },
    },
    legend: {
      data: ["Email", "Union Ads", "Video Ads", "Direct", "Search Engine"],
      top: "40px",
      left: "30%",
      textStyle: {
        color: "fff",
        fontSize: 14,
      },
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "6%",
      top: "40%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
    series: [
      {
        name: "Email",
        type: "line",
        stack: "Total",
        areaStyle: {},
        emphasis: {
          focus: "series",
        },
        data: [120, 132, 101, 134, 90, 230, 210],
      },
      {
        name: "Union Ads",
        type: "line",
        stack: "Total",
        areaStyle: {},
        emphasis: {
          focus: "series",
        },
        data: [220, 182, 191, 234, 290, 330, 310],
      },
      {
        name: "Video Ads",
        type: "line",
        stack: "Total",
        areaStyle: {},
        emphasis: {
          focus: "series",
        },
        data: [150, 232, 201, 154, 190, 330, 410],
      },
      {
        name: "Direct",
        type: "line",
        stack: "Total",
        areaStyle: {},
        emphasis: {
          focus: "series",
        },
        data: [320, 332, 301, 334, 390, 330, 320],
      },
      {
        name: "Search Engine",
        type: "line",
        stack: "Total",
        label: {
          show: true,
          position: "top",
        },
        areaStyle: {},
        emphasis: {
          focus: "series",
        },
        data: [820, 932, 901, 934, 1290, 1330, 1320],
      },
    ],
  });
});
</script>

<template>
  <BaseSection class="base-section" title="折线图" backWidth="100%">
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

.base-section {
  background: url(../images/dataScreen-main-cb.png) !important;
}
</style>
<style></style>
