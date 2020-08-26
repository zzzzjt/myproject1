<template>
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="指标看板" name="first">指标看板</el-tab-pane>
      <el-tab-pane label="告警信息" name="second">告警信息</el-tab-pane>
      <el-tab-pane label="监控列表" name="third">
        <div class="header">
          <div>
            <el-button type="primary" size="small">新增监控</el-button>
            <i class="el-icon-setting"></i>
          </div>
          <div>
            <span>当前网元共监控指标5个</span>
            <el-pagination
              small
              :pager-count="11"
              :current-page="currentPage4"
              :page-sizes="[10, 15, 20]"
              :page-size="100"
              layout=" sizes, prev, pager, next, jumper"
              :total="msg"
            ></el-pagination>
          </div>
        </div>
        <!-- 表格 -->
        <div class="table">
          <el-table
            :data="tableData"
            :span-method="objectSpanMethod"
            max-height="300"
            row-key="id"
            border
            lazy
            :load="load"
            :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
          >
            <el-table-column prop="target" label="监控指标" min-width="200"></el-table-column>
            <el-table-column label="监控方法" min-width="200">
              <template slot-scope="scope">
                <i class="el-icon-warning"></i>
                <span style="margin-left: 10px">{{ scope.row.method }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="time" label="监控时段" width="220"></el-table-column>
            <el-table-column prop="change_person" label="修改人" width="150" align="center"></el-table-column>
            <el-table-column prop="change_time" label="修改时间" width="220" align="center"></el-table-column>
            <el-table-column prop="operation" label="操作" align="center" width="250">
              <template>
                <el-button type="text">修改</el-button>
                <el-button type="text">删除</el-button>
                <el-button type="text">查看告警接收人</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
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
      tableData: [
        {
          id: 1,
          target: "内存使用率",
          method: "周期不确定性预测",
          time: "全天",
          change_person: "张三",
          change_time: "2019-06-20 09:00:00",
        },
        {
          id: 2,
          target: "文件系统使用率",
          method: "周期不确定性预测",
          time: "全天",
          change_person: "张三",
          change_time: "2019-06-20 09:00:00",
          children: [
            {
              id: 21,
              target: "/opt root",
              method: "周期不确定性预测",
              time: "全天",
              change_person: "张三",
              change_time: "2019-06-20 09:00:00",
            },
            {
              id: 22,
              target: "/tmp root",
              method: "周期不确定性预测",
              time: "全天",
              change_person: "张三",
              change_time: "2019-06-20 09:00:00",
            },
          ],
        },
        {
          id: 3,
          target: "内存使用率",
          method: "周期不确定性预测",
          time: "全天",
          change_person: "张三",
          change_time: "2019-06-20 09:00:00",
        },
        {
          target: "内存使用率",
          method: "周期不确定性预测",
          time: "节假日",
          change_person: "张三",
          change_time: "2019-06-20 09:00:00",
        },
      ],
    };
  },
  methods: {
    objectSpanMethod({ rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex === 4) {
          return {
            rowspan: 2,
            colspan: 1,
          };
        }
        if (rowIndex === 5) {
          return {
            rowspan: 0,
            colspan: 0,
          };
        }
      }
    },
    load(tree, treeNode, resolve) {
      setTimeout(() => {
        resolve([
          {
            target: "/opt root",
            method: "周期不确定性预测",
            time: "全天",
            change_person: "张三",
            change_time: "2019-06-20 09:00:00",
          },
          {
            target: "/tmp root",
            method: "周期不确定性预测",
            time: "全天",
            change_person: "张三",
            change_time: "2019-06-20 09:00:00",
          },
        ]);
      }, 1000);
    },
  },
};
</script>

<style lang="scss" scoped>
.el-row {
  margin-bottom: 20px;
}
.el-col {
  height: 32px;
  line-height: 32px;
}
.el-icon-setting {
  margin-left: 15px;
}
.el-tabs {
  border-left: 3px solid #f2f6fc;
  height: 93vh;
  width: 100%;
}
.table {
  margin: 0 20px;
}
::v-deep .el-table th {
  padding: 8px 0;
}
::v-deep .el-table td {
  padding: 5px 0;
}
::v-deep .el-tabs--top .el-tabs__item.is-top:nth-child(2) {
  padding-left: 20px;
}
.el-pagination {
  display: inline-block;
}
.header {
  display: flex;
  justify-content: space-between;
  padding: 0 20px 15px 20px;
  min-width: 850px;
}
</style>
