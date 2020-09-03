<template>
  <div>
    <div class="header">
      <div style="line-height:32px">
        <i class="el-icon-s-fold"></i>
        <span>故障处理视图</span>
      </div>
      <div>
        <i class="el-icon-date"></i>
        <span style="margin-right:10px">数据时间：17/10/2019~31/10/2019</span>
        <el-button size="small">近15天</el-button>
        <el-button size="small">近30天</el-button>
        <el-button size="small">近90天</el-button>
        <el-button size="small">自定义</el-button>
      </div>
    </div>
    <div class="main">
      <div class="left">
        <div class="left1">
          <el-row
            type="flex"
            class="row-bg"
            justify="space-around"
            align="middle"
            style="height:100%"
          >
            <el-col :span="6" style="min-width:150px">
              <div class="font-big" style="color:red">3</div>
              <span>未处理完成故障数</span>
            </el-col>
            <el-col :span="6" style="min-width:150px">
              <div class="font-big">3</div>
              <span>故障总数</span>
            </el-col>
            <el-col :span="6" style="min-width:150px">
              <div>
                <span class="font-big">32</span>分钟
              </div>
              <span>故障平均处理时长</span>
            </el-col>
          </el-row>
        </div>
        <div id="left2"></div>
        <div id="left3">
          <div id="pie"></div>
          <div class="describe">
            <el-collapse style="text-align:right">
              <el-collapse-item title="IaaS">
                <div style="padding-right:30px">
                  <span>主机</span>
                  <el-progress
                    :percentage="100"
                    :show-text="false"
                    style="width:65%"
                    :stroke-width="10"
                  ></el-progress>
                  <span>6</span>
                </div>
                <div style="padding-right:30px">
                  <span>防火墙</span>
                  <el-progress
                    :percentage="100*2/3"
                    :show-text="false"
                    style="width:65%"
                    :stroke-width="10"
                  ></el-progress>
                  <span>4</span>
                </div>
                <div style="padding-right:30px">
                  <span>交换机</span>
                  <el-progress
                    :percentage="100/3"
                    :show-text="false"
                    style="width:65%"
                    :stroke-width="10"
                  ></el-progress>
                  <span>2</span>
                </div>
              </el-collapse-item>
              <el-collapse-item title="PaaS">
                <div style="padding-right:30px">
                  <span>Mysql</span>
                  <el-progress
                    :percentage="100"
                    :show-text="false"
                    style="width:65%"
                    :stroke-width="10"
                    color="#f0a86d"
                  ></el-progress>
                  <span>6</span>
                </div>
                <div style="padding-right:30px">
                  <span>DBProxy</span>
                  <el-progress
                    :percentage="100*2/3"
                    :show-text="false"
                    style="width:65%"
                    :stroke-width="10"
                    color="#f0a86d"
                  ></el-progress>
                  <span>4</span>
                </div>
                <div style="padding-right:30px">
                  <span>Geteway</span>
                  <el-progress
                    :percentage="100/3"
                    :show-text="false"
                    style="width:65%"
                    :stroke-width="10"
                    color="#f0a86d"
                  ></el-progress>
                  <span>2</span>
                </div>
              </el-collapse-item>
              <el-collapse-item title="SaaS">
                <div style="padding-right:30px">
                  <span>应用</span>
                  <el-progress
                    :percentage="100"
                    :show-text="false"
                    style="width:65%"
                    :stroke-width="10"
                    color="#f7f476"
                  ></el-progress>
                  <span>6</span>
                </div>
                <div style="padding-right:30px">
                  <span>场景</span>
                  <el-progress
                    :percentage="100*2/3"
                    :show-text="false"
                    style="width:65%"
                    :stroke-width="10"
                    color="#f7f476"
                  ></el-progress>
                  <span>4</span>
                </div>
                <div style="padding-right:30px">
                  <span>服务</span>
                  <el-progress
                    :percentage="100/3"
                    :show-text="false"
                    style="width:65%"
                    :stroke-width="10"
                    color="#f7f476"
                  ></el-progress>
                  <span>2</span>
                </div>
              </el-collapse-item>
            </el-collapse>
          </div>
        </div>
      </div>
      <div class="right">
        <div id="right1"></div>
        <div id="right2">
          <div class="title">故障影响的资源TOP 5</div>
          <el-table :data="tableData" style="width: 90%;margin:10px 5%">
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column prop="name" label="资源名称"></el-table-column>
            <el-table-column prop="frequency" label="影响次数" width="100"></el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const Mock = require("mockjs");
const echarts = require("echarts");
const moment = require("moment");

export default {
  data() {
    return {
      datebase: moment().subtract(15, "days"),
      datenow: moment(),
      data: [],
      tableData: [
        {
          name: "[服务] 服开轮询接受接口",
          frequency: "10",
        },
        {
          name: "[KEEPER集群] 134.332.24.31|KEEPER_CR",
          frequency: "7",
        },
        {
          name: "[MYSQL集群] 134.332.24.31|MYSQL_CRM",
          frequency: "5",
        },
        {
          name: "[主机] BO_134.233.78.35",
          frequency: "2",
        },
        {
          name: "[主机] BO_134.178.67.1",
          frequency: "1",
        },
      ],
    };
  },
  methods: {
    initEchart() {
      let dom1 = echarts.init(document.getElementById("left2"));
      for (let i = 1; i <= 15; i++) {
        let dayStr = this.datebase.add(1, "days").format("D/M");
        let value = Mock.mock("@integer(0, 10)");
        this.data.push([dayStr, value]);
      }

      let option1 = {
        animation: false,
        title: {
          left: 20,
          top: 10,
          text: "故障趋势图",
          textStyle: {
            fontSize: 17,
          },
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
            lineStyle: {
              color: "#C0C4CC",
            },
          },
          axisLabel: {
            color: "#C0C4CC",
          },
          splitNumber: 15,
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
            lineStyle: {
              color: "#C0C4CC",
            },
          },
          axisTick: { show: false },
          // max: 10,
          // min: 0,
          splitNumber: 2,
        },
        grid: {
          top: 50,
          bottom: 30,
          left: 40,
          right: 30,
          show: true,
          borderColor: "#C0C4CC",
        },
        series: [
          {
            name: "模拟数据",
            type: "line",
            smooth: true,
            symbol: "circle",
            symbolSize: 5,
            itemStyle: {
              color: "#3398DB",
            },
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
            data: this.data,
          },
        ],
      };
      dom1.setOption(option1);
      window.addEventListener("resize", function () {
        dom1.resize();
        dom2.resize();
        dom3.resize();
      });
      let dom2 = echarts.init(document.getElementById("right1"));
      // 指定图表的配置项和数据
      let option2 = {
        color: ["#3398DB"],
        title: {
          left: "20",
          top: "10",
          text: "按故障等级统计故障数量",
          textStyle: {
            fontSize: 17,
          },
        },
        tooltip: {},
        xAxis: {
          data: ["一级故障", "二级故障", "三级故障", "四级故障"],
          axisTick: { show: false },
          axisLabel: {
            textStyle: {
              color: () => "#303133",
            },
            fontWeight: 500,
            fontSize: 14,
          },
          axisLine: {
            lineStyle: {
              color: "#C0C4CC",
            },
          },
        },
        yAxis: {
          axisTick: { show: false },
          splitNumber: 2,
          axisLine: {
            lineStyle: {
              color: "#C0C4CC",
            },
          },
        },
        grid: {
          left: "20",
          right: "8%",
          bottom: "10",
          containLabel: true,
          show: true,
          borderColor: "#C0C4CC",
        },
        series: [
          {
            name: "故障数",
            type: "bar",
            barWidth: "30%",
            data: [10, 8, 3, 5],
            itemStyle: {
              //上方显示数值
              normal: {
                label: {
                  show: true, //开启显示
                  position: "top", //在上方显示
                  textStyle: {
                    //数值样式
                    color: "blue",
                    fontSize: 12,
                  },
                },
              },
            },
          },
        ],
      };
      dom2.setOption(option2);
      let dom3 = echarts.init(document.getElementById("pie"));
      let option3 = {
        title: {
          left: "20",
          top: "10",
          text: "各资源故障占比",
          textStyle: {
            fontSize: 17,
          },
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          top: "40%",
          left: "50%",
          itemHeight: 12,
          itemWidth: 12,
          data: ["IaaS", "PaaS", "SaaS"],
          formatter: function (name) {
            let index = 0;
            const clientlabels = ["IaaS", "PaaS", "SaaS"];
            const clientcounts = [12, 12, 8];
            const clientradius = ["37.5%", "37.5%", "25%"];
            clientlabels.forEach(function (value, i) {
              if (value == name) {
                index = i;
              }
            });
            return `${name}       ${clientcounts[index]}       ${clientradius[index]}`;
            // return (
            //   name + "   " + clientcounts[index] + "   " + clientradius[index]
            // );
          },
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "50%",
            center: [100, "55%"],
            label: {
              show: false,
            },
            data: [
              { value: 12, name: "IaaS", itemStyle: { color: "#98b6f0" } },
              { value: 12, name: "PaaS", itemStyle: { color: "#fcc695" } },
              { value: 8, name: "SaaS", itemStyle: { color: "#f8ea9d" } },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 20,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
            itemStyle: {
              borderWidth: 2,
              borderColor: "#fff",
            },
          },
        ],
      };
      dom3.setOption(option3);
    },
  },
  mounted() {
    this.initEchart();
  },
};
</script>
<style lang="scss" scoped>
.header {
  color: #606266;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  min-width: 850px;
  padding: 10px;
}
i {
  margin-right: 10px;
}
.main {
  display: flex;
  font-size: 14px;
  color: #909399;
  background-color: #ebeef5;
  padding: 10px 0;
  min-width: 1025px;
  width: 100%;
}
.left {
  width: 60%;
  //min-width: 500px;
  border-right: 10px solid #ebeef5;
  height: 100%;
}
.right {
  width: 40%;
  //min-width: 350px;
  height: 100%;
}
.left1 {
  height: 80px;
  background-color: white;
  text-align: center;
}
#left2 {
  height: 180px;
  margin: 10px 0;
  background-color: white;
}
#left3 {
  height: 270px;
  min-width: 350px;
  background-color: white;
  display: flex;
  justify-content: space-between;
}
#pie {
  height: 100%;
  width: 55%;
  //border: 1px solid steelblue;
}
.describe {
  width: 40%;
  max-height: 270px;
  overflow-y: scroll;
  border-left: 1px solid #ebeef5;
  margin: 20px 0;
  padding-left: 20px;
}
#right1 {
  height: 270px;
  margin-bottom: 10px;
  background-color: white;
}
#right2 {
  height: 270px;
  background-color: white;
}
.font-big {
  color: #303133;
  font-size: 17px;
  font-weight: 600;
}
.el-progress {
  display: inline-block;
  margin: 0 8px;
}
::v-deep .el-table .cell {
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: keep-all;
}
::v-deep .el-table th {
  padding: 6px 0;
  background-color: #dee3f0;
  color: #303133;
}
::v-deep .el-table td {
  padding: 6px 0;
}
.title {
  color: #303133;
  min-width: 300px;
  padding-left: 30px;
  font-weight: 600;
  font-size: 17px;
  padding-top: 10px;
}
::v-deep .el-collapse-item__header {
  border: none;
}
::v-deep .el-collapse-item__wrap {
  border: none;
}
::v-deep .el-collapse {
  border: none;
}
::v-deep .el-collapse-item__content {
  padding-bottom: 0px;
}
::v-deep .el-table_1_column_1 {
  text-align: center;
  color: #c0c4cc;
}
::v-deep .el-collapse-item__header {
  height: 30px;
  line-height: 30px;
}
</style>
