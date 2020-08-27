<template>
  <div>
    <div class="header">
      <div><i class="el-icon-s-fold"></i><span>故障处理视图</span></div>
      <div>
        <i class="el-icon-date"></i
        ><span style="margin-right:10px">数据时间：17/10/2019~31/10/2019</span>
        <el-button size="small">近15天</el-button>
        <el-button size="small">近30天</el-button>
        <el-button size="small">近90天</el-button>
        <el-button size="small">自定义</el-button>
      </div>
    </div>
    <div class="main"></div>
  </div>
</template>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  min-width: 750px;
}
i {
  margin-right: 10px;
}
.main {
  background-color: #c0c4cc;
  width: 100%;
  height: 500px;
}
</style>
