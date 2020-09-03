<template>
  <div id="app">
    <el-container>
      <el-aside width="200px">
        <el-menu default-active="2" class="el-menu-vertical-demo">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>监控资源</span>
            </template>
            <router-link :to="{ path: '/New_4G' }">
              <el-menu-item index="1-1">4G新装详情</el-menu-item>
            </router-link>
            <router-link :to="{ path: '/Trouble_view' }">
              <el-menu-item index="1-2">故障处理视图</el-menu-item>
            </router-link>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header></el-header>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  beforeCreate() {
    document.querySelector("body").setAttribute("style", "margin:0");
  },
  beforeDestroy() {
    document.querySelector("body").removeAttribute("style");
  },
};
</script>
<style lang="scss" scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
}
.el-main {
  padding: 0;
}
.el-aside {
  background-color: #d3dce6;
  color: #333;
}
a {
  text-decoration: none;
}
</style>
