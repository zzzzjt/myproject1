<template>
  <div class="el-collapse-item" :class="{'is-active': isActive}">
    <div
      role="tab"
      :aria-expanded="isActive"
      :aria-controls="`el-collapse-content-${id}`"
      :aria-describedby="`el-collapse-content-${id}`"
    >
      <!--面板头部，包含面板标题和箭头图标-->
      <div
        class="collapse-item__header"
        @click="handleHeaderClick"
        role="button"
        :id="`el-collapse-head-${id}`"
        tabindex="0"
        @keyup.space.enter.stop="handleEnterClick"
        :class="{
          'focusing': focusing,
          'is-active': isActive
        }"
        @focus="handleFocus"
        @blur="focusing = false"
      >
        <!--折叠面板的收起或折叠的箭头图标-->
        <i class="collapse-item__arrow el-icon-arrow-right" :class="{'is-active': isActive}"></i>
        <!--折叠面板的标题-->
        <slot name="title">{{title}}</slot>
      </div>
    </div>
    <!--折叠面板内容区域 el-collapse-transition组件主要是为了添加内容显示隐藏时的动画效果-->
    <el-collapse-transition>
      <div
        class="collapse-item__wrap"
        v-show="isActive"
        role="tabpanel"
        :aria-hidden="!isActive"
        :aria-labelledby="`el-collapse-head-${id}`"
        :id="`el-collapse-content-${id}`"
      >
        <div class="el-collapse-item__content">
          <slot></slot>
        </div>
      </div>
    </el-collapse-transition>
  </div>
</template>
<script>
import ElCollapseTransition from "element-ui/src/transitions/collapse-transition";
import Emitter from "element-ui/src/mixins/emitter";
import { generateId } from "element-ui/src/utils/util";

export default {
  name: "collapse-item",
  componentName: "ElCollapseItem",
  mixins: [Emitter],
  components: { ElCollapseTransition },
  data() {
    return {
      contentWrapStyle: {
        height: "auto",
        display: "block",
      },
      contentHeight: 0,
      focusing: false,
      isClick: false,
    };
  },

  inject: ["collapse"],

  props: {
    title: String,
    name: {
      type: [String, Number],
      default() {
        return this._uid;
      },
    },
  },

  computed: {
    // 返回当前面板是否被激活
    isActive() {
      // 判断当前面板的名称是否在activeNames中
      return this.collapse.activeNames.indexOf(this.name) > -1;
    },
    id() {
      // 返回随机数id
      return generateId();
    },
  },

  methods: {
    handleFocus() {
      setTimeout(() => {
        if (!this.isClick) {
          this.focusing = true;
        } else {
          this.isClick = false;
        }
      }, 50);
    },
    handleHeaderClick() {
      // 触发父组件的item-click事件
      this.dispatch("ElCollapse", "item-click", this);
      this.focusing = false;
      this.isClick = true;
    },
    handleEnterClick() {
      this.dispatch("ElCollapse", "item-click", this);
    },
  },
};
</script>

<style lang="scss" scoped>
.collapse-item__header {
  display: flex;
  align-items: center;
  height: 30px;
  line-height: 30px;
  background-color: #fff;
  color: #303133;
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
  transition: border-bottom-color 0.3s;
  outline: 0;
}
.collapse-item__arrow {
  margin-right: 8px;
  transition: transform 0.3s;
  font-weight: 300;
}
.icon-arrow-right:before {
  content: "\e6e0";
}
.collapse-item__arrow.is-active {
  transform: rotate(-90deg);
}
</style>