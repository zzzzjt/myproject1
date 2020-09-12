<template>
  <div>
    <!-- 头部 -->
    <div class="header">
      <div>
        <i class="el-icon-s-fold"></i>
        <span>概况页</span>
      </div>
      <div>
        <i class="el-icon-date"></i>
        <span class="header-margin">数据时间：17/10/2019~31/10/2019</span>
        <el-button v-for="(item,index) in button_list" :key="index" size="small">{{item}}</el-button>
      </div>
    </div>
    <!-- 主要部分 -->
    <div class="main">
      <!-- 第一部分 -->
      <div class="top">
        <div class="top-left">
          <el-row
            type="flex"
            class="row-bg"
            justify="space-around"
            align="middle"
            style="height:100%"
          >
            <el-col :span="6" v-for="(item,index) in total_list" :key="index">
              <div class="font-big" :style="{color:item.color}">{{item.value}}</div>
              <span>{{item.name}}</span>
            </el-col>
          </el-row>
        </div>
        <div class="top-right">
          <div class="top-rightTitle">未清除告警数/告警总数</div>
          <el-row
            type="flex"
            class="row-bg"
            justify="space-around"
            align="middle"
            style="height:60%"
          >
            <el-col :span="4" v-for="(item,index) in detail_list" :key="index">
              <div>
                <span class="font-big">{{item.value_big}}</span>
                <span class="font-normal">{{item.value_samll}}</span>
              </div>
              <span>{{item.name}}</span>
            </el-col>
          </el-row>
        </div>
      </div>
      <!-- 第二部分 -->
      <div class="middle">
        <div class="middle-left">
          <my-charts :chartData="moduleData" type="ring" title="按各监控模块告警统计分布"></my-charts>
        </div>
        <div class="middle-center">
          <my-charts :chartData="gradeData" type="ring" title="按告警等级统计分布"></my-charts>
        </div>
        <div class="middle-right">
          <my-charts :chartData="totalData" type="line" title="告警总数趋势图"></my-charts>
        </div>
      </div>
      <!-- 第三部分 -->
      <div class="bottom">
        <div class="bottom-row">
          <div class="bottom-left">
            <my-table :tabledata="IaaSData" title="IaaS层监控情况" :value="10" :label="IaaSlabel"></my-table>
          </div>
          <div class="bottom-right">
            <my-table :tabledata="PaaSData" title="PaaS层监控情况" :value="10" :label="PaaSlabel"></my-table>
          </div>
        </div>
        <div class="bottom-row">
          <div class="bottom-left">
            <my-component :total="100" :alarm="0" type="service"></my-component>
          </div>
          <div class="bottom-right">
            <my-component :total="100" :alarm="8" type="scene" :tableData="SceneData"></my-component>
          </div>
        </div>
        <div class="bottom-row">
          <div class="bottom-left">
            <my-component :total="100" :alarm="8" type="quota" :tableData="QuotaData"></my-component>
          </div>
          <div class="bottom-right">
            <my-component :total="100" :alarm="8" type="link" :tableData="LinkData"></my-component>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import my_table from "../components/my_table";
import my_component from "../components/my_component";
import my_charts from "../components/my_charts";
const Mock = require("mockjs");

export default {
  data() {
    return {
      button_list: ["近7天", "近15天", "近30天", "自定义"],
      total_list: [
        {
          name: "告警总数",
          value: 24,
          color: "blue",
        },
        {
          name: "未清除警告数",
          value: 8,
          color: "red",
        },
        {
          name: "涉及资料",
          value: 30,
          color: "blue",
        },
      ],
      detail_list: [
        {
          name: "IaaS层",
          value_big: 1,
          value_samll: " / 3",
        },
        {
          name: "PaaS层",
          value_big: 3,
          value_samll: " / 7",
        },
        {
          name: "服务",
          value_big: 1,
          value_samll: " / 5",
        },
        {
          name: "IT场景",
          value_big: 1,
          value_samll: " / 4",
        },
        {
          name: "客户监控",
          value_big: 1,
          value_samll: " / 2",
        },
        {
          name: "营业效能",
          value_big: 1,
          value_samll: " / 3",
        },
      ],
      moduleData: {
        columns: ["name", "value"],
        rows: [
          { name: "IaaS层", value: 4 },
          { name: "PaaS层", value: 6 },
          { name: "服务", value: 2 },
          { name: "IT场景", value: 2 },
          { name: "客户监控", value: 1 },
          { name: "营销效能", value: 3 },
        ],
      },
      gradeData: {
        columns: ["name", "value"],
        rows: [
          { name: "严重告警", value: 2 },
          { name: "重要告警", value: 6 },
          { name: "一般告警", value: 8 },
          { name: "预警", value: 4 },
        ],
      },
      totalData: {
        columns: ["date", "value"],
        rows: [
          { date: "01/12", value: Mock.mock("@integer(0, 30)") },
          { date: "02/12", value: Mock.mock("@integer(0, 30)") },
          { date: "03/12", value: Mock.mock("@integer(0, 30)") },
          { date: "04/12", value: Mock.mock("@integer(0, 30)") },
          { date: "05/12", value: Mock.mock("@integer(0, 30)") },
          { date: "06/12", value: Mock.mock("@integer(0, 30)") },
          { date: "07/12", value: Mock.mock("@integer(0, 30)") },
        ],
      },
      IaaSData: [
        { type: "主机", number: 6, proportion: "15/33", rate: "5%" },
        { type: "交换机", number: 1, proportion: "2/20", rate: "10%" },
        { type: "存储", number: 2, proportion: "1/15", rate: "6.7%" },
        { type: "光纤交换机", number: 1, proportion: "1/5", rate: "20%" },
        { type: "防火墙", number: 0, proportion: "0/4", rate: "0%" },
      ],
      IaaSlabel: [
        "设备类型",
        "告警数分布",
        "告警设备数/设备总数",
        "设备告警率",
      ],
      PaaSData: [
        { type: "分布式数据库", number: 6, proportion: "15/33", rate: "5%" },
        { type: "分布式缓存", number: 1, proportion: "2/20", rate: "10%" },
        { type: "分布式消息", number: 2, proportion: "1/15", rate: "6.7%" },
        { type: "容器", number: 1, proportion: "1/5", rate: "20%" },
        { type: "其他", number: 0, proportion: "0/4", rate: "0%" },
      ],
      PaaSlabel: [
        "设备类型",
        "告警数分布",
        "告警实例数/实例总数",
        "实例告警率",
      ],
      SceneData: [
        {
          name: "计费系统",
          value: 8,
        },
        {
          name: "CRM",
          value: 12,
        },
        {
          name: "渠道受理",
          value: 3,
        },
        {
          name: "客户服务",
          value: 1,
        },
        {
          name: "财务辅助",
          value: 7,
        },
      ],
      QuotaData: [
        {
          name: "线上查询端到端成功率",
          value: 23,
        },
        {
          name: "电渠发货及时率",
          value: 19,
        },
        {
          name: "投诉工单一次性解决率",
          value: 17,
        },
        {
          name: "缴费复机及时率",
          value: 15,
        },
        {
          name: "营业厅服务满意率",
          value: 12,
        },
      ],
      LinkData: [
        {
          name: "新建客户",
          value: 8,
        },
        {
          name: "业务选择",
          value: 12,
        },
        {
          name: "信息录入",
          value: 3,
        },
        {
          name: "实名认证",
          value: 1,
        },
        {
          name: "客户定位",
          value: 7,
        },
      ],
    };
  },
  components: {
    "my-table": my_table,
    "my-component": my_component,
    "my-charts": my_charts,
  },
};
</script>
<style lang="scss" scoped>
.header {
  color: #606266;
  font-size: 14px;
  line-height: 32px;
  display: flex;
  justify-content: space-between;
  min-width: 850px;
  padding: 10px;
}
i {
  margin-right: 10px;
}
.header-margin {
  margin-right: 10px;
}
.main {
  font-size: 14px;
  color: #909399;
  background-color: #ebeef5;
  padding: 10px;
  min-width: 1025px;
}
.top {
  display: flex;
  height: 100px;
  width: 100%;
}
.top-left {
  background-color: white;
  height: 100%;
  width: 45%;
  margin-right: 10px;
  text-align: center;
}
.font-big {
  color: red;
  font-size: 22px;
  font-weight: 500;
}
.font-normal {
  color: black;
  font-size: 15px;
}
.top-right {
  background-color: white;
  height: 100%;
  width: 55%;
  text-align: center;
}
.top-rightTitle {
  height: 25%;
  text-align: right;
  padding-right: 20px;
  line-height: 30px;
}
.middle {
  display: flex;
  height: 200px;
  margin-top: 10px;
  width: 100%;
}
.middle-left {
  height: 100%;
  width: 32%;
  background-color: white;
  margin-right: 10px;
}
.middle-center {
  height: 100%;
  width: 32%;
  margin-right: 10px;
  background-color: white;
}
.middle-right {
  height: 100%;
  background-color: white;
  width: 36%;
}
.bottom {
  height: 920px;
  width: 100%;
}
.bottom-row {
  display: flex;
  height: 300px;
  width: 100%;
  margin-top: 10px;
}
.bottom-left {
  height: 100%;
  width: 50%;
  margin-right: 10px;
  background-color: white;
}
.bottom-right {
  height: 100%;
  width: 50%;
  background-color: white;
}
</style>