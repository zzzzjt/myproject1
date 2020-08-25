<template>
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="指标看板" name="first">指标看板</el-tab-pane>
      <el-tab-pane label="告警信息" name="second">告警信息</el-tab-pane>
      <el-tab-pane label="监控列表" name="third">
        <el-row>
          <el-col :xs="6" :sm="6" :md="4" :lg="5" :xl="1">
            <el-button type="primary" size="small">新增监控</el-button>
            <i class="el-icon-setting"></i>
          </el-col>
          <el-col
            :xs="10"
            :sm="8"
            :md="8"
            :lg="9"
            :xl="11"
            style="text-align:right"
          >当前网元共监控指标{{msg}}个</el-col>
          <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
            <el-pagination
              small
              :pager-count="11"
              :current-page="currentPage4"
              :page-sizes="[10, 15, 20]"
              :page-size="100"
              layout=" sizes, prev, pager, next, jumper"
              :total="msg"
            ></el-pagination>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="告警接收规则" name="fourth">告警接收规则</el-tab-pane>
    </el-tabs>
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "third",
      msg: 100,
      currentPage4: 4,
    };
  },
  methods: {
    // handleClick(tab, event) {
    //   //console.log(tab, event);
    // },
  },
};
</script>

<style>
.el-row {
  margin-bottom: 20px;
}
.el-col {
  height: 32px;
  line-height: 32px;
}
.bg-purple {
  background: #d3dce6;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.el-icon-setting {
  margin-left: 20px;
}
</style>