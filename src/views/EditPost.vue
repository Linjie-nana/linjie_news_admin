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
          :file-list="form.cover"
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

    //如果转跳进来的时候带请求了，则获取相关文章信息
    if (this.$route.query.id) {
      this.$axios({
        url: "/post/" + this.$route.query.id,
      }).then((res) => {
        // 处理富文本框无法接受 div 的问题
        res.data.data.content = res.data.data.content.replace(/div/g, "p");
        //多选框勾选
        this.checkList = res.data.data.categories.map((item) => {
          return item.id;
        });

        //改造获取到的cover,也就是图片里面的格式
        res.data.data.cover.map((img) => {
          if (img.url.indexOf("http") == -1) {
            img.url = this.$axios.defaults.baseURL + img.url;
          }
          img.uid = img.id;
          return img;
        });
        this.form = res.data.data;
        console.log(this.form);
      });
    }
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
    //因为回显定向到form.cover,所以不能再单纯的添加id了，而是将id数据交到file中，并且将file加到要上传的form.cover中
    coverSuccess(res, file, fileList) {
      console.log(res);
      file.id = res.data.id;
      this.form.cover.push(file);
      this.$message("添加成功");
    },
    coverRemove(file, fileList) {
      //file是当前操作的图片数据
      //fileList是回显到页面上的所有图片列表
      //因为发送请求回来获取到的res.data.data.cover中有图片信息，所以要将这信息与fileList同步，这样才能完成编辑回显图片数据
      //所以有了 :file-list="form.cover"，回显拿到的数据

      //因为获取到的数据有的没有url基础，所以要判断添加
      // 上传成功后的res中的id值直接交给到当前图片的file中，
      // 然后将新的file加到form.cover中，这样发送数据的时候就可以有id值可以被服务器自动查找到。

      this.form.cover = fileList;
      this.$message("删除成功");
    },
    postArticle() {
      this.$axios({
        url: "/post",
        method: "post",
        data: this.form,
      }).then((res) => {
        console.log(res, 111111111111111111);
        this.$router.push("/postlist");
      });
    },
  },
};
</script>

<style>
</style>