<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar title="商品搜索" left-text="返回" left-arrow @click-left="onClickLeft" />

    <!-- 搜索框 -->
    <van-search
      v-model="value"
      show-action
      label="商品名"
      placeholder="请输入搜索关键词"
      @search="onSearch"
      @click="inp"
    >
      <template #action>
        <div @click="onSearch">搜索</div>
      </template>
    </van-search>

    <div v-show="isShow">
      <!-- 全网热搜 -->
      <div class="resou">
        <van-divider content-position="left">全网热搜</van-divider>
        <div class="leix" v-for="(item,index) in resou" :key="index" @click="rs(item)">{{item}}</div>
      </div>

      <!-- 搜索历史 -->
      <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">搜索历史</van-divider>
      <div class="xia">
        <div class="ls" v-for="(item,index) in Lsjl" :key="index">
          <span>{{item}}</span>
          <van-icon name="close" size="15" @click="Del(index)" />
        </div>

        <!-- 清空 -->
        <div class="del">
          <van-button plain hairline type="info" @click="qingdel">清空历史记录</van-button>
        </div>
      </div>
    </div>

    <!-- 搜索商品 -->
    <div class="divv" v-show="!isShow">
      <div class="sousuo_sp" v-for="(item,index) in sousuo_list" :key="index">
        <div class="sp_list">
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
              {{item.hot}}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import debounce from "../utils/index.js";
import { getSuosou } from "../api/api";
export default {
  data() {
    return {
      // 搜索值
      value: "",
      isShow: true,
      resou: [
        "2020夏季新款",
        "男",
        "女",
        "休闲鞋",
        "休闲装",
        "衬衫",
        "短袖",
        "裙子",
        "西装",
        "半身裙",
        "皮鞋",
        "运动鞋",
      ],
      sousuo_list: [],
    };
  },

  computed: {
    //   历史记录
    Lsjl: function () {
      return this.$store.state.Lsjl;
    },
  },
  methods: {
    // 返回上一级
    onClickLeft() {
      window.history.back();
    },

    // 热搜
    rs(item) {
      // console.log(item);
      // 搜索商品数据
      this.value = item
      debounce(_=>{
        this.onSearch()
      },2000)

    },

    // 搜索
    onSearch() {
      // 历史记录
      // console.log(this.value,"111")
      this.$store.dispatch("LSJL", this.value);

      //
      // 搜索商品数据
      getSuosou({
        goodsName: this.value,
        page: 2,
        pageSize: 20,
      }).then((res) => {
        console.log(res.data);
        this.sousuo_list = res.data;
        if (this.sousuo_list.length > 0) {
          this.isShow = false;
        }
      });

      this.value = "";
    },
    inp() {
      this.isShow = true;
    },
    // 删除
    Del(index) {
      this.$store.dispatch("DEL", index);
    },
    // 清空
    qingdel() {
      this.$store.dispatch("QK_DEL");
    },
  },
};
</script>

<style lang="scss" scoped>
.resou {
  width: 90%;
  height: 20vh;
  margin: 20px auto;
  .leix {
    color: rgb(163, 161, 161);
    border: 1px solid gray;
    border-radius: 6px;
    float: left;
    padding: 2px 15px;
    margin-left: 20px;
    margin-top: 20px;
  }
}
.xia {
  width: 100%;
  height: 43vh;
  .ls {
    width: 95%;
    height: 6vh;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgb(214, 214, 214);
  }
}

.del {
  width: 31%;
  margin: 40px auto;
}
.divv {
  width: 100%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  .sousuo_sp {
    width: 48%;
    .sp_list {
      width: 100%;
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
}
</style>