<template>
  <div>
    <ve-line
      :data="chartData"
      :settings="lineSettings"
      :extend="lineExtend"
      height="200px"
      v-if="type==='line'"
    ></ve-line>
    <ve-ring
      :data="chartData"
      :settings="ringSettings"
      :colors="colors"
      :extend="ringExtend"
      height="200px"
      v-if="type==='ring'"
    ></ve-ring>
  </div>
</template>

<script>
const echarts = require("echarts");
export default {
  data() {
    return {
      rows: [],
      ringSettings: {
        radius: [25, 60],
        offsetY: 100,
        label: {
          show: false,
        },
        itemStyle: {
          borderWidth: 2,
          borderColor: "#fff",
        },
        left: 0,
      },
      lineSettings: {
        area: true,
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "#3398DB",
            },
            {
              offset: 1,
              color: "#ffe",
            },
          ]),
        },
        itemStyle: {
          color: "#3398DB",
        },
      },
      colors: [
        "#f39477",
        "#ffcb9b",
        "#f1dbb2",
        "#6397d3",
        "#7eaee6",
        "#bdd5f1",
      ],
      ringExtend: {
        title: {
          left: "15",
          top: "10",
          text: this.title,
          textStyle: {
            color: "#404142",
            fontSize: 15,
          },
        },
        series: {
          type: "pie",
          top: 10,
          left: -180,
        },
        legend: {
          orient: "vertical",
          top: "center",
          right: 10,
          itemHeight: 12,
          itemWidth: 12,
          formatter: (name) => {
            console.log(this);
            let data = this.rows;
            let total = 0;
            let value = 0;
            for (let i = 0, l = data.length; i < l; i++) {
              total += data[i].value;
              if (data[i].name == name) {
                value = data[i].value;
              }
            }
            let percent = ((value / total) * 100).toFixed(2);
            return `{a|${name}} {b|${value}} {c|${percent}}%`;
          },
          textStyle: {
            rich: {
              a: {
                color: "#4d5574",
                width: 65,
              },
              b: {
                width: 30,
              },
              c: {
                width: 30,
              },
            },
          },
        },
      },
      lineExtend: {
        title: {
          left: 15,
          top: 10,

          text: this.title,
          textStyle: {
            color: "#404142",
            fontSize: 15,
          },
        },
        grid: {
          top: 50,
          bottom: 10,
          left: 10,
          right: 20,
        },
        xAxis: {
          type: "category",
          splitLine: {
            show: true,
            lineStyle: {
              type: "dashed",
            },
          },
          boundaryGap: false,
          axisTick: { show: false },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#C0C4CC",
            },
          },
          axisLabel: {
            color: "#C0C4CC",
          },
        },
        yAxis: {
          type: "value",
          splitLine: {
            show: true,
            lineStyle: {
              type: "dashed",
            },
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#C0C4CC",
            },
          },
          axisTick: { show: false },
          interval: 15,
          max: 30,
        },
        legend: {
          show: false,
        },
      },
    };
  },
  props: {
    type: {
      type: String,
      default: "line",
    },
    chartData: {
      type: Object,
      require: true,
    },
    title: {
      type: String,
    },
  },
  mounted() {
    this.rows = this.chartData.rows;
    console.log(this.chartData);
  },
};
</script>

<style lang="scss" scoped>
</style>