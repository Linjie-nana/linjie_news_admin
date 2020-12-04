<template>
  <div>
    <!-- 请求已被封装在组件内，要cation发送链接，要加入公共链接 -->
    <!-- header要加入请求头 设置一个token变量以便直接加入到组件中-->
    <el-upload
      :action="$axios.defaults.baseURL + '/upload'"
      :headers="{
                Authorization: token,
            }"
      :on-success="coverSuccess"
      :on-remove="coverRemove"
      list-type="picture-card"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
  </div>
</template>

<script>
export default {
  data() {
    return {
      token: localStorage.getItem("token"),
    };
  },
  methods: {
    coverSuccess(res, file, fileList) {
      console.log("上传成功");
    },
    coverRemove(file, fileList) {
      console.log("删除成功");
    },
  },
};
</script>

<style>
</style>