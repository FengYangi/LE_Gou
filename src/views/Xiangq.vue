<template>
  <!-- <div id="Box">我是详情</div> -->
  <div id="Box">
    <div class="iconfont icon-fanhui" @click="fanhui"></div>
    <van-tabs v-model="active" color="hotpink" class="tabs" scrollspy sticky>
      <van-tab title="商品">
        <!-- 图片 -->
        <img :src="XQ_swiper.goodsLogo" width="100%" />

        <!-- 标题 -->
        <!-- 商品标题 -->
        <div class="biaoti">
          <p class="p1">
            <b>{{XQ_swiper.goodsName}}</b>
          </p>

          <div class="p2">
            <b class="s1">￥{{XQ_swiper.goodsPrice}}</b>
            <s class="s2">{{XQ_swiper.goodsOldPrice}}</s>
            <span class="s3">
              <van-tag round type="primary">7折</van-tag>
            </span>
          </div>

          <div class="p3">
            <span>销量{{XQ_swiper.hot}}</span>
            <span>收藏{{XQ_swiper.goodsFav}}</span>
            <span>地区</span>
          </div>

          <div class="p4">
            <span v-for="(item,index) in XQ_bp" :key="index">
              <img :src="item.icon" width="20px" class="iimg11" />
              {{item.name}}
            </span>
          </div>
        </div>
      </van-tab>
      <van-tab title="评论">
        <!-- 评价 -->
        <div class="pjia">
          <p class="pj_p1">
            <span>买家评价</span>
            <span>更多></span>
          </p>
          <hr />
          <div class="pj_yh" v-for="(item,index) in XQ_pj" :key="index">
            <div class="yh_top">
              <img :src="item.comment_body.user_img" />
              <div class="mingzi">{{item.comment_body.user_name}}</div>
            </div>

            <div class="yh_xia">
              <p style="color:gray">{{item.comment_body.content}}</p>
              <p style="color:gray">2020-07-03 16:42:26 颜色:默认 尺码:默认</p>
            </div>
          </div>
        </div>
        <hr />
        <!-- 店名 -->
        <div class="dianming">
          <div class="dm_top">
            <!-- 头像 -->
            <img :src="XQ_dm.shopLogo" class="tx" />
            <!-- 店名 -->
            <span class="spp1">{{XQ_dm.shopName}}</span>
          </div>

          <div class="dm_xia">
            <!-- 总销量 -->
            <div class="xl x">
              <div>{{XQ_dm.snum}}</div>
              <div>总销量</div>
            </div>
            <!-- 全部宝贝 -->
            <div class="baobei x">
              <div>{{XQ_dm.sells}}</div>
              <div>全部宝贝</div>
            </div>
            <!-- 描述 -->
            <div class="miaoshu">
              <div>描述相符 5</div>
              <div>价格合理 5</div>
              <div>质量满意 5</div>
            </div>
          </div>
          <!-- 进店逛逛 -->
          <div class="jdgg">进店逛逛</div>
        </div>
      </van-tab>
      <van-tab title="详情">
        <div></div>
        <div v-html="XQ_swiper.goodsIntroduce" class="xiangq"></div>
      </van-tab>
      <van-tab title="推荐">
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
          ></SPLIST>
        </div>
      </van-tab>
      <!-- 加入购物车 -->
      <van-goods-action>
        CartList.length
        <van-goods-action-icon icon="chat-o" text="客服" dot />
        <van-goods-action-icon icon="cart-o" @click="go" text="购物车" :badge="0" />
        <van-goods-action-icon icon="shop-o" text="店铺" />
        <van-goods-action-button type="warning" text="加入购物车" @click="goGowu" />
        <van-goods-action-button type="danger" text="立即购买" />
      </van-goods-action>
    </van-tabs>
  </div>
</template>

<script>
import {
  getxiangq_list,
  getshangping_list,
  postgouwuche_list,
  getTGgouwu_list,
} from "../api/api";
// 导入首页商品组件
import SPLIST from "../components/splist";
export default {
  components: {
    SPLIST,
  },
  data() {
    return {
      active: 0,
      // 轮播
      XQ_swiper: [],
      XQ_bp: [],
      XQ_pj: [],
      //   商店名
      XQ_dm: {},
      // 商品
      splist: [],
    };
  },
  computed: {
    // 获取购物车数据
    CartList: function () {
      return this.$store.state.gwsl;
    },
  },
  created() {
    // 获取用户购物车信息
    this.$store.dispatch("GOUWU");
  },
  computed:{
    id:function(){
      return this.$store.state.ID
    }
  },
  mounted() {
    // 接收首页商品传来的id
    // let id = this.$route.query.id;
    console.log(this.id, "id");

    // 详情页的接口
    getxiangq_list({
      // 详情页的id等于传过来的id
      goodsId: this.id,
    }).then((res) => {
      // console.log(res.data);
      // //   轮播
      // res.data[3].forEach(element=>{
      //   if(element == null){
      //     this.XQ_pj = []
      //   }else{
      //     this.XQ_pj = res.data[3];
      //   }
      // })

      this.XQ_swiper = res.data[0];
      //   必赔
      this.XQ_bp = res.data[2];
      //   评价
      // this.XQ_pj = res.data[3];
      //   店名
      this.XQ_dm = res.data[1];
    });

    // 推荐 商品数据
    getshangping_list({
      page: 1,
      pageSize: 20,
      sortType: "syn",
    }).then((res) => {
      // console.log(res.data);
      this.splist = res.data;
    });
  },
  methods: {
    // 返回上一级
    fanhui() {
      this.$router.push("/shouye");
    },

    // 加入购物车
    async goGowu() {
      // 判断是否添加成功
      await postgouwuche_list({
        product_id: this.XQ_swiper.goodsId,
        product_amount: 1,
        price: this.XQ_swiper.goodsPrice,
      }).then((res) => {
        // 判断要是res.code == 201  让它提示添加成功
        if (res.code == 201) {
          this.$dialog
            .alert({
              message: res.msg,
            })
            .then(() => {
              // on close
            });
        }
        console.log(res);
      });
    },

    // 进入购物页面
    go() {
      this.$router.push("/gouwu");
    },
  },
};
</script>

<style lang="scss" scoped>
.tbs {
  position: fixed;
  top: 0;
  left: 0;
}
.iconfont {
  font-size: 30px;
  position: fixed;
  top: 18px;
  left: 15px;
  z-index: 999;
}
.biaoti {
  width: 90%;
  height: 15vh;
  //   margin: 8px 0;
  font-size: 17px;
  margin: 10px auto;
  .p1 {
    b {
      font-size: 30px;
    }
  }
  .p2 {
    width: 100%;
    height: 4vh;
    align-items: center;
    .s1 {
      color: hotpink;
      font-size: 20px;
    }
    .s2 {
      font-size: 13px;
      color: gray;
    }
    .s3 {
      background-color: hotpink;
      color: white;
      font-size: 13px;
    }
  }
  .p3 {
    width: 100%;
    height: 4vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgb(199, 197, 197);
    span {
      font-size: 13px;
      color: gray;
    }
  }
  .p4 {
    width: 100%;
    height: 5vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgb(199, 197, 197);
    .iimg11 {
      width: 20px;
      height: 20px;
      line-height: 20px;
    }
  }
}
.pjia {
  width: 90%;
  margin-top: 50px;
  margin: 50px auto;
  .pj_p1 {
    width: 100%;
    height: 6vh;
    line-height: 6vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .pj_yh {
    width: 100%;
    margin: 0 auto;
    .yh_top {
      width: 100%;
      height: 8vh;
      display: flex;
      justify-content: left;
      align-items: center;
      img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
      }
      .mingzi {
        padding: 0 20px;
      }
    }
    .yh_xia {
      width: 100%;
      p {
        padding: 10px 10px;
      }
    }
  }
}
.dianming {
  width: 95%;
  // height: 40vh;
  margin: 0 auto;
  padding: 30px 0;
  .dm_top {
    width: 100%;
    display: flex;
    justify-content: left;
    align-items: center;
    .tx {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }
    .spp1 {
      padding: 0 30px;
      font-size: 25px;
    }
  }
  .dm_xia {
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .x {
      text-align: center;
      align-items: center;
    }
    .miaoshu {
      align-items: center;
    }
  }
  .jdgg {
    margin: 0 auto;
    width: 200px;
    height: 50px;
    text-align: center;
    line-height: 50px;
    background-color: gainsboro;
    font-size: 20px;
    border-radius: 20px;
  }
}
.xiangq {
  width: 100%;
}
.lazy {
  width: 100% !important;
  background-size: 100% 100%;
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