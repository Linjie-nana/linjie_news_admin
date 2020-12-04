<template>
  <div>
    <el-form label-width="80px">
      <el-form-item label="文章标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="内容">
        <VueEditor v-model="form.content" :editorToolbar="customToolbar" />
        <!-- 请求已被封装在组件内，要cation发送链接，要加入公共链接 -->
        <!-- header要加入请求头 设置一个token变量以便直接加入到组件中-->
      </el-form-item>
      <el-form-item label="所属栏目">
        <el-checkbox-group v-model="checkList">
          <!-- <el-checkbox v-for="item in postList" :key="item.id"></el-checkbox> -->
          <el-checkbox :label="item.id" v-for="item in postList" :key="item.id">{{item.name}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="上传照片">
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
      </el-form-item>
      <el-form-item label="文章类别">
        <el-radio v-model="radio" label="1">文章</el-radio>
        <el-radio v-model="radio" label="2">视频</el-radio>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="postArticle">提交修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";

export default {
  components: {
    VueEditor,
  },
  data() {
    return {
      token: localStorage.getItem("token"),
      customToolbar: [
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["image", "code-block"],
      ],
      form: {
        title: "",
        content: "",
        categories: [],
        cover: [],
        type: 1,
      },
      //获取的文章类别
      postList: [],
      // 勾选的文章类别
      checkList: [],
      // 选择的文章类型
      radio: "1",
    };
  },
  created() {
    this.$axios({
      url: "/category",
    }).then((res) => {
      res.data.data.splice(0, 2);
      this.postList = res.data.data;
      console.log(this.postList);
    });
  },
  watch: {
    checkList() {
      this.form.categories = this.checkList.map((num) => {
        return { id: num };
      });
    },
    radio() {
      this.form.type = this.radio;
    },
  },
  methods: {
    coverSuccess(res, file, fileList) {
      console.log(res);
      this.form.cover.push({ id: res.data.id });
      console.log("上传成功");
    },
    coverRemove(file, fileList) {
      console.log(file);
      this.form.cover.pop({ id: file.response.data.id });
      console.log("删除成功");
    },
    postArticle() {
      this.$axios({
        url: "/post",
        method: "post",
        data: this.form,
      }).then((res) => {
        console.log(res);
        this.$router.push("/postlist");
      });
    },
  },
};
</script>

<style>
</style>