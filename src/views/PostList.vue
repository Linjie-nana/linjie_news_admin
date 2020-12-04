<template>
  <div>
    <el-table :data="postList">
      <el-table-column prop="id" label="ID编号" width="100"></el-table-column>
      <el-table-column prop="title" label="浓缩图" width="200">
        <template slot-scope="scope">
          <img
            :src="scope.row.cover[0].url | fixImgUrl"
            alt
            v-if="scope.row.cover.length>0"
            class="con_img"
          />
          <img v-else src="@/assets/folder.png" alt class="con_img" />
        </template>
      </el-table-column>
      <el-table-column prop="user.nickname" label="作者" width="100"></el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            size="small"
            type="warning"
            @click="$router.push('/editpost?id=' + scope.row.id)"
          >编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      layout="total,sizes,prev, pager, next,jumper"
      :total="total"
      @size-change="sizeChange"
      @current-change="currentChange"
      :page-sizes="[2,5,10]"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageIndex: 1,
      pageSize: "",
      postList: [],
      total: 0,
    };
  },
  created() {
    this.loadPost();
  },
  methods: {
    //当页数变化的时候，重新设置页面变量，重新提交请求
    currentChange(page) {
      this.pageIndex = page;
      this.loadPost();
    },
    //请求每页显示变化
    sizeChange(page) {
      this.pageSize = page;
      this.loadPost();
    },
    loadPost() {
      this.$axios({
        url: "/post",
        params: {
          //页码提交
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
        },
      }).then((res) => {
        this.postList = res.data.data;
        this.total = res.data.total;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.con_img {
  width: 100%;
  height: 120px;
  object-fit: cover;
}
</style>