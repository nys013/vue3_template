<script setup lang="ts" name="ChartChinaMap">
import { ref, onMounted } from "vue";
import { ElMessage } from "element-plus";

import * as echarts from "echarts";

import chinaJson from "../json/china.json";
import guangxiJson from "../json/guangxi.json";
import beijingJson from "../json/beijing.json";
import xinjiangJson from "../json/xinjiang.json";
import shanghaiJson from "../json/shanghai.json";

echarts.registerMap("china", chinaJson as any);
echarts.registerMap("guangxi", guangxiJson as any);
echarts.registerMap("beijing", beijingJson as any);
echarts.registerMap("xinjiang", xinjiangJson as any);
echarts.registerMap("shanghai", shanghaiJson as any);

const chartRef = ref();
const mapJsonArr = [
  {
    name: "广西壮族自治区",
    egName: "guangxi",
  },
  {
    name: "北京市",
    egName: "beijing",
  },
  {
    name: "新疆维吾尔自治区",
    egName: "xinjiang",
  },
  {
    name: "上海市",
    egName: "shanghai",
  },
];
let mapName = ref("china");
let myChart = ref();

onMounted(() => {
  myChart.value = echarts.init(chartRef.value as HTMLDivElement);
  setChart();
  myChart.value.on("click", (params: { name: string }) => {
    const map = mapJsonArr.find((item) => item.name == params.name);
    if (map) {
      setChart(map.egName);
    } else {
      ElMessage({
        message: "暂无数据",
        type: "warning",
      });
    }
  });
});

const setChart = (map: string = "china") => {
  mapName.value = map;
  if (!myChart.value) return;
  myChart.value.setOption({
    geo: [
      {
        top: 100,
        bottom: 0,
        left: 100,
        right: 100,
        map: map,
        // roam: "scale",
        zoom: 1.2,
        aspectScale: 0.75, //长宽比
        itemStyle: {
          //地图区域的多边形 图形样式
          normal: {
            areaColor: "#12235C", //地区颜色
            shadowColor: "#2AB8FF", //阴影颜色
            shadowOffsetX: 0, //阴影偏移量
            shadowOffsetY: 3, //阴影偏移量
          },
          emphasis: {
            areaColor: "#2fB1F1", //地区颜色
            label: {
              show: false, //是否在高亮状态下显示标签
            },
          },
        },
        label: {
          show: true,
          textStyle: {
            color: "#fff",
          },
          fontSize: 14,
        },
      },
    ],
    series: [
      {
        type: "lines",
        effect: {
          show: true,
          symbol: "arrow",
          symbolSize: 8,
        },
        data:
          map == "china"
            ? [
                {
                  coords: [
                    [116.405285, 39.904989],
                    [121.472644, 31.231706],
                  ],
                  lineStyle: {
                    normal: {
                      color: "skyblue",
                      width: 3,
                      type: "dotted",
                      curveness: 0.1,
                    },
                  },
                },
                {
                  coords: [
                    [108.320004, 22.82402],
                    [116.405285, 39.904989],
                  ],
                  lineStyle: {
                    normal: {
                      color: "skyblue",
                      width: 3,
                      type: "dotted",
                      curveness: 0.1,
                    },
                  },
                },
                {
                  coords: [
                    [115.892151, 28.676493],
                    [87.617733, 43.792818],
                  ],
                  lineStyle: {
                    normal: {
                      color: "skyblue",
                      width: 3,
                      type: "dotted",
                      curveness: 0.1,
                    },
                  },
                },
              ]
            : [],
      },
    ],
  });
};
</script>

<template>
  <el-button
    class="back-btn"
    type="primary"
    size="default"
    @click="setChart()"
    v-if="mapName !== 'china'"
    >返回</el-button
  >

  <div class="myChart" ref="chartRef"></div>
</template>

<style scoped lang="scss">
.myChart {
  width: 100%;
  height: 100%;
}
.back-btn {
  position: absolute;
  top: 100px;
  z-index: 99;
}
</style>
