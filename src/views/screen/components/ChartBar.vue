<script setup lang="ts" name="ChartTourist">
import { ref, onMounted } from "vue";
import * as echarts from "echarts";

import BaseSection from "./BaseSection.vue";

const chartRef = ref();
onMounted(() => {
  const myChart = echarts.init(chartRef.value as HTMLDivElement);
  myChart.setOption({
    color: ["#72A9FE", "#FFC533", "#56C994"],
    title: {},
    legend: {
      orient: "horizontal",
      data: [
        {
          name: "国鸡",
        },
        {
          name: "小白鸡",
        },
        {
          name: "白羽鸡",
        },
      ],
      left: "center",
      top: "4%",
      textStyle: {
        color: "#fff  ",
        fontSize: 14,
      },
    },
    grid: {
      left: "2%",
      right: "4%",
      bottom: "6%",
      top: "16%",
      containLabel: true,
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
      textStyle: {
        align: "left",
      },
    },
    xAxis: [
      {
        type: "category",
        data: [
          "2015",
          "2016",
          "2017",
          "2018",
          "2019",
          "2020",
          "2021",
          "2022",
          "2023",
        ],
        axisTick: {
          show: false,
        },
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
            fontSize: 14,
          },
          formatter: "{value}",
        },
      },
    ],
    yAxis: [
      {
        type: "value",
        max: "160",
        axisTick: {
          show: false,
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: "#ffffff",
          },
        },
        axisLabel: {
          show: true,
          textStyle: {
            color: "#fff",
            fontSize: 14,
          },
        },
        splitLine: {
          show: false,
          lineStyle: {
            color: "rgba(255,255,255,0.2)",
          },
        },
      },
    ],
    dataZoom: [
      {
        show: true,
        realtime: true,
        height: 12,
        start: 0,
        end: 70,
        bottom: "2%",
      },
      {
        type: "inside",
        realtime: true,
        height: 12,
        start: 0,
        end: 70,
      },
    ],
    series: [
      {
        name: "国鸡",
        type: "bar",
        stack: "总量",
        barWidth: "40%",
        data: [
          "42.01",
          "44.21",
          "40",
          "39.08",
          "45.72",
          "49.48",
          "45.00",
          "37.92",
          "34.02",
          "3",
        ],
        itemStyle: {
          normal: {
            label: {
              show: false,
              //
              textStyle: {
                //数值样式
                color: "#fff",
                fontSize: 14,
              },
            },
          },
        },
      },
      {
        name: "小白鸡",
        type: "bar",
        stack: "总量",
        barWidth: "40%",
        data: [
          "12.94",
          "14.25",
          "12.02",
          "12.28",
          "15.36",
          "16.71",
          "19.4",
          "20.41",
          "21",
          "3",
        ],
        itemStyle: {
          normal: {
            label: {
              show: false,
              textStyle: {
                //数值样式
                color: "#fff",
                fontSize: 14,
              },
            },
          },
        },
      },
      {
        name: "白羽鸡",
        type: "bar",
        stack: "总量",
        barWidth: "40%",
        data: [
          "33.51",
          "34.71",
          "36.07",
          "39.41",
          "44.2",
          "49.2",
          "65.32",
          "69",
          "75",
          "3",
        ],
        itemStyle: {
          normal: {
            label: {
              show: false,
              textStyle: {
                //数值样式
                color: "#fff",
                fontSize: 14,
              },
            },
          },
        },
      },
    ],
  });
});
</script>

<template>
  <BaseSection title="柱状图">
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
