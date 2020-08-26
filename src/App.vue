<template>
  <div id="app">
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right" style="line-height:30px">
        <el-breadcrumb-item>监控资源</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/New_4G' }" style="color:#000000">4G新装详情</el-breadcrumb-item>
      </el-breadcrumb>
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>
<style lang='scss' scoped>
.el-breadcrumb {
  height: 30px;
  background-color: #f2f6fc;
}
::v-deep .el-breadcrumb__item:last-child .el-breadcrumb__inner {
  color: #000000;
}
</style>
