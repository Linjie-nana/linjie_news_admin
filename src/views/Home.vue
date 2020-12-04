<template>
  <el-container class="container">
    <el-aside width="200px">
      <h2>黑马头条</h2>

      <!-- 侧边栏 -->
      <el-menu
        class="el-menu-vertical-demo"
        background-color="#000000"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="1" @click="$router.push('/postlist').catch(()=>{})">
          <i class="el-icon-menu"></i>
          <span slot="title">导航二</span>
        </el-menu-item>
        <el-menu-item index="2" @click="$router.push('/editpost').catch(()=>{})">
          <i class="el-icon-setting"></i>
          <span slot="title">导航四</span>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header>头部内容</el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
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
  background-color: #333333;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #000000;
  color: #fff;
  text-align: center;
  line-height: 60px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  // text-align: center;
  // line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

// .el-container:nth-child(5) .el-aside,
// .el-container:nth-child(6) .el-aside {
//   line-height: 260px;
// }

// .el-container:nth-child(7) .el-aside {
//   line-height: 320px;
// }

.el-menu {
  border-right: none;
}
</style>