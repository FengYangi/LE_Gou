<template>
  <div id="Box">
    <!-- 头部 -->
    <div class="top">
      <img src="../../public/img/logo.png" width="100%" />
    </div>

    <!-- 搜索 -->
    <van-search v-model="value" placeholder="请输入搜索关键词" @click="gosousuo" />

    <!-- 轮播 -->
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(item, index) in lunbo" :key="index">
        <img :src="item.slide_show_imgUrl" width="100%" />
      </van-swipe-item>
    </van-swipe>

    <!-- 分类专栏 -->
    <div class="fenleizl">
      <div class="fen_lei" v-for="(item,index) in fenleizl" :key="index">
        <img class="img1" :src="item.sp_home_ico" />
        <div>{{item.sp_home_title}}</div>
      </div>
    </div>

    <!-- 吸顶 -->
    <van-sticky>
      <van-button
        type="default"
        class="vat_but"
        v-for="(item,index) in xiding"
        :key="index"
        @click="xid(item.sort)"
      >{{item.title}}</van-button>
    </van-sticky>

    <!-- 下拉刷新 -->
    <van-list
      v-if="splist1.length != 0"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <!-- 商品 -->
      <div class="sp_list">
        <SPLIST
          class="sp"
          v-for="(item,index) in splist"
          :key="index"
          :img="item.goodsLogo"
          :title="item.goodsName"
          :goodsOldPrice="item.goodsOldPrice"
          :goodsPrice="item.goodsPrice"
          :hot="item.hot"
          @click="goxiang(item.goodsId)"
        ></SPLIST>
      </div>
    </van-list>
  </div>
</template>

<script>
import { getshouye_list, getshangping_list } from "../api/api";
import SPLIST from "../components/splist";
export default {
  components: {
    SPLIST,
  },
  data() {
    return {
      // 搜索
      value: "",
      // 轮播数据
      lunbo: [],
      // 分类专栏
      fenleizl: [],
      // 吸顶分类
      xiding: [
        {
          title: "流行",
          sort: "syn",
        },
        {
          title: "新款",
          sort: "new",
        },
        {
          title: "精选",
          sort: "sell",
        },
      ],
      // 吸顶
      active: 0,
      // 商品数据
      splist: [],
      splist1: [],
      loading: false,
      finished: false,
      num: 0,
    };
  },
  mounted() {
    // 首页数据
    getshouye_list().then((res) => {
      // console.log(res.data);
      // 轮播数据
      this.lunbo = res.data[1];
      // 分类专栏
      this.fenleizl = res.data[0];
    });

    // 商品数据
    getshangping_list({
      page: 1,
      pageSize: 20,
      sortType: "syn",
    }).then((res) => {
      console.log(res.data);
      this.splist1 = res.data;
    });
  },
  methods: {
    // 去搜索页面
    gosousuo() {
      this.$router.push("/sousuo");
    },

    goxiang(item) {
      // 保存首页传过来的id
      this.$store.dispatch("ID", item);
      console.log(item, "goxiang");
      this.$router.push({
        path: "/xiangq",
        query: {
          id: item,
        },
      });
    },
    xid(sort) {
      // 商品数据
      getshangping_list({
        page: 1,
        pageSize: 20,
        sortType: sort,
      }).then((res) => {
        console.log(res.data);
        // this.splist = res.data;
        res.data.forEach((element) => {
          if (element == null) {
            this.splist = [];
          } else {
            this.splist = res.data;
          }
        });
      });
    },
    // 下拉加载
    onLoad() {
      setTimeout(() => {
        for (let i = 0; i < 4; i++) {
          this.splist.push(this.splist1[this.num++]);
        }
        this.loading = false;

        if (this.splist.length >= 20) {
          this.finished = true;
        }
      }, 3000);
    },
  },
};
</script>

<style lang="scss" scoped>
.fenleizl {
  width: 100%;
  height: 25vh;
  padding: 20px 0;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  .fen_lei {
    width: 20%;
    height: 12.5vh;
    text-align: center;
    .img1 {
      width: 80%;
    }
  }
}
.vat_but {
  width: 33.33%;
}
.sp_list {
  width: 100%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  .sp {
    width: 46%;
    text-align: center;
    margin: 10px 0;
    border-radius: 5px;
  }
}
</style>