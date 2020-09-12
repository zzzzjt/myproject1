<template>
  <div
    class="el-progress"
    :class="[
      'el-progress--' + type,
      status ? 'is-' + status : '',
      {
        'el-progress--without-text': !showText,
        'el-progress--text-inside': textInside,
      }
    ]"
    role="progressbar"
    :aria-valuenow="percentage"
    aria-valuemin="0"
    aria-valuemax="100"
  >
    <!--线形进度条-->
    <div class="el-progress-bar" v-if="type === 'line'">
      <!--进度条外部背景；strokeWidth:文档中说是宽度，这里是高度呀-->
      <div class="el-progress-bar__outer" :style="{height: strokeWidth + 'px'}">
        <!--进度条内部百分比-->
        <div class="el-progress-bar__inner" :style="barStyle">
          <!--线形进度条内部文字-->
          <div class="el-progress-bar__innerText" v-if="showText && textInside">{{percentage}}%</div>
        </div>
      </div>
    </div>
    <!--环形进度条-->
    <div class="el-progress-circle" :style="{height: width + 'px', width: width + 'px'}" v-else>
      <svg viewBox="0 0 100 100">
        <path
          class="el-progress-circle__track"
          :d="trackPath"
          stroke="#e5e9f2"
          :stroke-width="relativeStrokeWidth"
          fill="none"
        />
        <path
          class="el-progress-circle__path"
          :d="trackPath"
          stroke-linecap="round"
          :stroke="stroke"
          :stroke-width="relativeStrokeWidth"
          fill="none"
          :style="circlePathStyle"
        />
      </svg>
    </div>
    <!--进度条外面文字内容-->
    <div
      class="el-progress__text"
      v-if="showText && !textInside"
      :style="{fontSize: progressTextSize + 'px'}"
    >
      <!--进度条当前状态status值不存在时，显示百分比-->
      <template v-if="!status">{{percentage}}%</template>
      <!--进度条当前状态status值存在时-->
      <template v-else>
        <!--status为text，将文本内容插入显示-->
        <slot v-if="status === 'text'"></slot>
        <!--status为其他值时，显示对应的图标-->
        <i v-else :class="iconClass"></i>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      //进度条类型
      type: String,
      default: "line",
      validator: (val) => ["line", "circle"].indexOf(val) > -1,
    },
    percentage: {
      //百分比（必填）
      type: Number,
      default: 0,
      required: true,
      validator: (val) => val >= 0 && val <= 100,
    },
    status: {
      //进度条当前状态
      type: String,
      validator: (val) => ["text", "success", "exception"].indexOf(val) > -1,
    },
    strokeWidth: {
      //进度条的宽度，单位 px
      type: Number,
      default: 6,
    },
    textInside: {
      //进度条显示文字内置在进度条内（只在 type=line 时可用）
      type: Boolean,
      default: false,
    },
    width: {
      //环形进度条画布宽度（只在 type=circle 时可用）
      type: Number,
      default: 126,
    },
    showText: {
      //是否显示进度条文字内容
      type: Boolean,
      default: true,
    },
    color: {
      //进度条背景色（会覆盖 status 状态颜色）
      type: String,
      default: "",
    },
  },
  computed: {
    //进度条内部百分比和背景颜色显示
    barStyle() {
      const style = {};
      style.width = this.percentage + "%";
      style.backgroundColor = this.color;
      return style;
    },
    relativeStrokeWidth() {
      return ((this.strokeWidth / this.width) * 100).toFixed(1);
    },
    trackPath() {
      const radius = parseInt(
        50 - parseFloat(this.relativeStrokeWidth) / 2,
        10
      );

      return `M 50 50 m 0 -${radius} a ${radius} ${radius} 0 1 1 0 ${
        radius * 2
      } a ${radius} ${radius} 0 1 1 0 -${radius * 2}`;
    },
    perimeter() {
      const radius = 50 - parseFloat(this.relativeStrokeWidth) / 2;
      return 2 * Math.PI * radius;
    },
    circlePathStyle() {
      const perimeter = this.perimeter;
      return {
        strokeDasharray: `${perimeter}px,${perimeter}px`,
        strokeDashoffset: (1 - this.percentage / 100) * perimeter + "px",
        transition: "stroke-dashoffset 0.6s ease 0s, stroke 0.6s ease",
      };
    },
    stroke() {
      let ret;
      if (this.color) {
        ret = this.color;
      } else {
        switch (this.status) {
          case "success":
            ret = "#13ce66";
            break;
          case "exception":
            ret = "#ff4949";
            break;
          default:
            ret = "#20a0ff";
        }
      }
      return ret;
    },
    iconClass() {
      if (this.type === "line") {
        return this.status === "success"
          ? "el-icon-circle-check"
          : "el-icon-circle-close";
      } else {
        return this.status === "success" ? "el-icon-check" : "el-icon-close";
      }
    },
    //  进度条外文字的大小
    progressTextSize() {
      return this.type === "line"
        ? 12 + this.strokeWidth * 0.4
        : this.width * 0.111111 + 2;
    },
  },
};
</script>
<style lang="scss" scoped>
</style>