<template>
  <el-container class="container">
    <el-aside width="200px">侧边栏</el-aside>

    <el-container>
      <el-header>头部内容</el-header>
      <el-main>主要内容</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.container {
  height: 100vh;
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #333;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>