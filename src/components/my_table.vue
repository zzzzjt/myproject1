<template>
  <div class="all">
    <div class="header">
      <div class="header-left">{{title}}</div>
      <div class="header-right">
        <span>告警总数：</span>
        <span class="red">{{value}}</span>
      </div>
    </div>
    <el-table :data="tabledata">
      <!-- <el-table-column
        v-for="(item,index) in top_list"
        :type="item.type"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
      ></el-table-column>-->
      <el-table-column prop="type" width="110" :label="label[0]"></el-table-column>
      <el-table-column prop="number" :label="label[1]">
        <template slot-scope="scope">
          <el-progress :percentage="scope.row.number/value*100" :stroke-width="10" :text="6"></el-progress>
        </template>
      </el-table-column>
      <el-table-column prop="proportion" width="155" :label="label[2]"></el-table-column>
      <el-table-column prop="rate" width="100" :label="label[3]"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // top_list: [
      //   {
      //     prop: "type",
      //     label: "设备类型",
      //     width: "100",
      //   },
      //   {
      //     prop: "number",
      //     label: "告警数分布",
      //     width: "",
      //   },
      //   {
      //     prop: "proportion",
      //     label: "告警实例数/实例总数",
      //     width: "150",
      //   },
      //   {
      //     prop: "rate",
      //     label: "设备告警率",
      //     width: "120",
      //   },
      // ],
    };
  },
  props: {
    title: String,
    value: Number,
    tabledata: {
      type: Array,
      require: true,
    },
    label: {
      type: Array,
      require: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.all {
  padding: 10px 20px;
}
.header {
  color: #404142;
  font-size: 15px;
  font-weight: 600;
  line-height: 28px;
  display: flex;
  padding-bottom: 10px;
  justify-content: space-between;
}
.header-right {
  color: #606266;
  font-size: 14px;
  font-weight: 500;
}
::v-deep .el-table th {
  text-align: right;
  padding: 6px 0;
  background-color: #dee3f0;
  color: #303133;
}
::v-deep .el-table td {
  text-align: right;
  padding: 7px 0;
}
.red {
  color: red;
}
::v-deep .el-progress-bar__outer {
  border-radius: 0;
}
::v-deep .el-progress-bar__inner {
  background-image: linear-gradient(to right, rgb(93, 93, 252), #ebeef5);
  border-radius: 0;
}
::v-deep .el-progress__text {
  font-size: 14px;
  color: red;
}
::v-deep .has-gutter {
  > tr {
    > th {
      &:nth-child(2) {
        text-align: left;
      }
    }
  }
}
::v-deep .el-table__row {
  > td {
    &:nth-child(2) {
      text-align: left;
    }
  }
}
::v-deep .has-gutter {
  > tr {
    > th {
      &:nth-child(4) {
        padding-right: 10px;
      }
    }
  }
}
::v-deep .el-table__row {
  > td {
    &:nth-child(4) {
      padding-right: 10px;
    }
  }
}
::v-deep .el-progress-bar {
  padding-right: 53px;
  margin-right: -57px;
}
</style>