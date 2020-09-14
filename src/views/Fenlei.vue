<template>
  <div id="Box">
    <!-- 头部 -->
    <van-nav-bar title="商品分类" />

    <!-- 搜索 -->
    <van-search v-model="value" placeholder="请输入搜索关键词" />

    <!-- 中部 -->
    <div class="center">
      <!-- 一级分类 -->
      <div class="center_left">
        <van-sidebar v-model="activeKey" class="left">
          <van-sidebar-item
            v-for="(item,index) in yilist"
            :key="index"
            :title="item.cat_name"
            @click="goer(item.cat_id)"
          />
        </van-sidebar>
      </div>
      <!-- 二级分类 -->
      <div class="center_right">
        <!-- 吸顶 -->
        <van-sticky class="sticky">
          <van-button class="but">综合</van-button>
          <van-button class="but" @click="xl">销量</van-button>
          <van-button class="but">新品</van-button>
        </van-sticky>

        <div class="ding"></div>

        <!-- 商品 -->
        <div class="shangping">
          <div class="right_sp" v-for="(item,index) in erlist" :key="index">
            <!-- 图片 -->
            <img :src="item.goodsLogo" width="100%" />
            <!-- 标题 -->
            <p class="p1">{{item.goodsName}}</p>
            <div class="div1">
              <!-- 原价 -->
              <s class="s1">{{item.goodsOldPrice}}</s>
              <!-- 现价 -->
              <span class="s2">￥{{item.goodsPrice}}元</span>
              <!-- 收藏 -->
              <span class="s3">
                <van-icon name="star-o" />
                {{item.goodsFav}}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getyiji_list, geterji_list } from "../api/api";
export default {
  data() {
    return {
      // 搜索
      value: "",
      activeKey: 0,
      //   一级分类
      yilist: [],
      //   二级分类
      erlist: [],
    };
  },
  mounted() {
    //   一级分类
    getyiji_list().then((res) => {
      console.log(res.data);
      this.yilist = res.data;
    });
    //二级
    geterji_list({
      cat_id: 85,
      page: 2,
      pageSize: 10,
      // sortType
    }).then((res) => {
      console.log(res.data);
      this.erlist = res.data;
    });
  },
  methods: {
    goer(cat_id) {
      console.log(cat_id);
      // 二级分类
      geterji_list({
        cat_id: cat_id,
        page: 2,
        pageSize: 10,
        // sortType
      }).then((res) => {
        console.log(res.data);
        this.erlist = res.data;
      });
    },
    // 销量
    xl() {
      this.aou = !this.aou;
      if (this.aou) {
        this.erlist.sort((a, b) => {
          return b.goodsFav - a.goodsFav;
        });
      } else {
        this.erlist.sort((a, b) => {
          return a.goodsFav - b.goodsFav;
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.center {
  width: 100%;
  height: 78vh;
  display: flex;
  justify-content: space-between;
  .center_left {
    width: 25%;
    height: 100%;
    overflow: auto;
    .left {
      width: 100%;
    }
  }
  .center_right {
    width: 75%;
    height: 100%;
    overflow: auto;
    .sticky {
      position: fixed;
      width: 73%;
      top: 2.28571rem;
      right: 0.14286rem;
      z-index: 999;
      .but {
        width: 33.33%;
      }
    }
  }
}
.shangping {
  width: 100%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  .right_sp {
    width: 46%;
  }
  .p1 {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
  }
  .div1 {
    width: 100%;
    height: 4vh;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .s1 {
      color: gray;
    }
    .s2 {
      color: rgb(250, 90, 143);
    }
  }
}
.ding {
  width: 100%;
  height: 70px;
}
</style>