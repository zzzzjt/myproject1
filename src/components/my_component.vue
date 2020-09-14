<template>
  <div>
    <div class="header">{{title}}</div>
    <div class="main">
      <div class="main-left">
        <el-progress
          type="circle"
          :percentage="alarm/total*100"
          :width="100"
          :stroke-width="14"
          color="red"
        ></el-progress>
        <div>{{ alarm/total*100 == 0 ? "无警告" : "警告占比"}}</div>
        <div class="text">
          {{text[0]}}：{{total}}
          <br />
          {{text[1]}}：{{alarm}}
        </div>
      </div>
      <div class="main-right">
        <el-table :data="Data">
          <el-table-column
            v-for="(item,index) in top_list"
            :key="index"
            :type="item.type"
            :prop="item.prop"
            :label="item.label"
            :width="item.width"
          ></el-table-column>
          <svg width="100%" height="100%">
            <defs>
              <linearGradient id="write" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style="stop-color:red" stop-opacity="1" />
                <stop offset="100%" style="stop-color:#ebeef5" stop-opacity="0.8" />
              </linearGradient>
            </defs>
          </svg>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: [],
      title: "",
      service: {
        title: "服务监控情况",
        text: ["服务总数", "告警服务数"],
        label: ["", "服务告警最多的系统TOP 5", "告警服务数/服务总数"],
      },
      scene: {
        title: "IT场景监控情况",
        text: ["场景总数", "异常场景数"],
        label: ["", "告警最多场景TOP 5", "告警数量"],
      },
      quota: {
        title: "客户监控情况",
        text: ["指标总数", "告警指标数"],
        label: ["", "告警最多的指标TOP 5", "告警数量"],
      },
      link: {
        title: "营业效能监控情况",
        text: ["监控环节数", "告警环节数"],
        label: ["", "告警最多的环节TOP 5", "告警数量"],
      },
      top_list: [
        {
          prop: "index",
          width: "35",
        },
        {
          prop: "name",
          width: "",
        },
        {
          prop: "value",
          width: "155",
        },
      ],
      Data: [
        {
          index: 1,
        },
        {
          index: 2,
        },
        {
          index: 3,
        },
        {
          index: 4,
        },
        {
          index: 5,
        },
      ],
    };
  },
  mounted() {
    this.type_judge();
    this.init();
  },
  // watch: {
  //   tableData: {
  //     handler: function (newV) {
  //       console.log(newV, "监听");
  //     },
  //     deep: true,
  //     immediate: true,
  //   },
  // },
  methods: {
    type_judge() {
      switch (this.type) {
        case "service":
          this.title = this.service.title;
          this.text = this.service.text;
          for (let i = 0; i < this.service.label.length; i++) {
            this.top_list[i].label = this.service.label[i];
          }
          break;
        case "scene":
          this.title = this.scene.title;
          this.text = this.scene.text;
          for (let i = 0; i < this.scene.label.length; i++) {
            this.top_list[i].label = this.scene.label[i];
          }
          break;
        case "quota":
          this.title = this.quota.title;
          this.text = this.quota.text;
          for (let i = 0; i < this.quota.label.length; i++) {
            this.top_list[i].label = this.quota.label[i];
          }
          break;
        case "link":
          this.title = this.link.title;
          this.text = this.link.text;
          for (let i = 0; i < this.link.label.length; i++) {
            this.top_list[i].label = this.link.label[i];
          }
          break;
      }
    },
    init() {
      if (this.tableData) {
        for (let i = 0; i < this.tableData.length; i++) {
          this.Data[i].name = this.tableData[i].name;
          this.Data[i].value = this.tableData[i].value;
        }
      }
    },
  },
  props: {
    type: {
      type: String,
      default: "service",
    },
    tableData: {
      type: Array,
      require: true,
    },
    total: Number,
    alarm: Number,
  },
};
</script>

<style lang="scss" scoped>
.header {
  color: #404142;
  padding: 10px 20px;
  font-size: 15px;
  font-weight: 600;
  line-height: 28px;
}
.main {
  display: flex;
  justify-content: space-between;
}
.main-left {
  width: 30%;
  text-align: center;
  padding-top: 40px;
}
.text {
  margin-top: 10px;
  color: #606266;
}
.main-right {
  width: 70%;
  margin-right: 20px;
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
::v-deep .el-table__row {
  > td {
    &:nth-child(2) {
      text-align: left;
    }
  }
}
::v-deep .el-table__row {
  > td {
    &:nth-child(3) {
      padding-right: 20px;
    }
  }
}
::v-deep .el-table tr {
  > th {
    &:nth-child(2) {
      text-align: left;
    }
  }
}
::v-deep .el-table tr {
  > th {
    &:nth-child(3) {
      > div {
        padding: 0 20px 0 0;
      }
    }
  }
}
::v-deep .el-progress-circle svg {
  > path:nth-child(2) {
    stroke: url(#write);
    color: #f13607;
  }
}
</style>