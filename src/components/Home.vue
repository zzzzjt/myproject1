<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="line-height:30px">
      <el-breadcrumb-item>监控资源</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/New_4G' }">4G新装详情</el-breadcrumb-item>
    </el-breadcrumb>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>

<style>
.el-breadcrumb {
  height: 30px;
  background-color: #ebeef5;
}
</style>
