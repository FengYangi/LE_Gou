<template>
  <div id="Box">
    <!-- 头部 -->
    <van-nav-bar title="商品订单" left-text="返回" left-arrow @click-left="onClickLeft" />

    <!-- 地址 -->
    <div class="site" @click="dizhi">
      <!-- 定位 -->
      <div class="yuan">
        <van-icon class="dw" name="location" />
      </div>
      <!-- 地址 -->
      <div class="dizhi">
        <div class="dizhitop">
          <!--                    姓名-->
          <span>{{XZDZ_list.name}}</span>
          <!--                    手机号-->
          <span>{{XZDZ_list.phone}}</span>
        </div>

        <div
          class="dizhixia"
        >{{XZDZ_list.province}} {{XZDZ_list.city}} {{XZDZ_list.district}} {{XZDZ_list.address}}</div>
      </div>
    </div>

    <!-- 订单商品 -->
    <div class="ding_sp" v-for="(item,index) in goods" :key="index">
      <!-- 店家信息 -->
      <div class="dj_xx">
        <img :src="item[1].shopLogo" class="img1" />
        <div>
          {{item[1].shopName}}
          <van-icon name="arrow" />
        </div>
      </div>

      <!-- 商品 -->
      <div class="shangp">
        <van-card :price="item[0].goodsPrice" :title="item[0].goodsName" :thumb="item[0].goodsLogo">
          <template #num>
            <div>x{{num[index]}}</div>
          </template>
          <template #tags>
            <van-tag plain type="danger">七天退换</van-tag>
          </template>
        </van-card>
      </div>

      <!-- 运险费 -->
      <div class="yunxianf">
        <div class="yx_1">
          <van-icon class="icon1" name="umbrella-circle" />
        </div>

        <div class="yx_2">
          <p>
            <b>运险费</b>
          </p>
          <p>确认收回前退货可理赔</p>
        </div>

        <div class="yx_3">
          <p>
            <b>￥15.00</b>
          </p>
          <p>x{{num[index]}}</p>
        </div>
      </div>

      <!-- 商品总价 -->
      <div class="sp_zj">
        <!-- 总价 -->
        <div class="zj a">
          <div>商品总价</div>
          <div>￥{{item[0].goodsPrice}}</div>
        </div>

        <!-- 运费 -->
        <div class="yf a">
          <div>运费(快递)</div>
          <div>￥0.00</div>
        </div>

        <!-- 运险费 -->
        <div class="yf a">
          <div>运险费(卖家赠送)</div>
          <div>￥0.00</div>
        </div>
      </div>

      <!-- 商品小计 -->
      <div class="sp_xj">
        <div>商品小计</div>
        <div style="color:red ; font-size:20px">￥{{zj / 100}}</div>
      </div>
    </div>

    <!-- 底部 -->
    <van-submit-bar :price="zj" button-text="去支付" @submit="onSubmit()" />
  </div>
</template>

<script>
import { getDINGDXX_list } from "../api/api";

export default {
  data() {
    return {
      //   商品数据
      // goods: [],
      // num: [],
    };
  },
  computed: {
    // 获取购物车选中的数据
    XuanZList: function () {
      return this.$store.state.XZ_list;
    },
    //获取选中地址的数组
    XZDZ_list: function () {
      return this.$store.state.XZDZ_list;
    },
    //获取的订单页面的数据
    goods:function(){
        return this.$store.state.goods;
    },
    //获取的订单页面数量的数据
    num:function(){
        return this.$store.state.num;
    },

    zj() {
      let a = 0;
      this.XuanZList.map((res) => {
        // console.log(res)
        a += res.price * 100 * res.product_amount;
      });
      return a;
    },
  },
  created() {
    //   console.log(this.XuanZList,"XuanZList")

    // 获取的订单页面的数据
    this.$store.dispatch("HUOQU_DingDan_list");
    // // 声明一个id为空数组 , 用来接收遍历XuanZList数组里面的数据id,遍历出来之后push到id数组里面
    // let id = [];
    // this.XuanZList.map((ele) => {
    //     // 这是一个num数量
    //     this.num.push(ele.product_amount);
    //     id.push(ele.product_id);
    // });
    // console.log(this.num, "aaa");

    // // console.log(id)
    // // let一个变量来接收id数组里里面的数据,转换成字符串类型
    // let strid = id.join(" ");
    // console.log(strid);
    // // 在获取订单的接口   里面的参数goodsid让它等于strid
    // getDINGDXX_list({
    //     goodsid: strid,
    // }).then((res) => {
    //     console.log(res);
    //     this.goods = res.data;
    //     console.log(this.goods,"goods");
    // });
  },
  methods: {
    // 返回上一级
    onClickLeft() {
      this.$router.push("/gouwu");
    },

    // 提交去支付
    onSubmit() {
      this.$router.push("/chuang_dingdan");
    },

    // 跳转地址页面
    dizhi() {
      this.$router.push("/shouhuo_dz");
    },
  },
};
</script>

<style scoped lang="scss">
.site {
  width: 100%;
  height: 8vh;
  border-top: 1px solid gainsboro;
  border-bottom: 1px solid gainsboro;
  display: flex;
  justify-content: left;
  align-items: center;

  .yuan {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: rgba($color: #e94921c9, $alpha: 1.3);
    margin-left: 35px;

    .dw {
      color: white;
      font-size: 38px;
      margin-left: 11px;
      margin-top: 10px;
    }
  }

  .dizhi {
    margin-left: 30px;
  }
}

.ding_sp {
  width: 100%;
  padding: 30px 0;
  border-bottom: 10px solid rgb(221, 218, 218);
  // height: 25vh;

  .dj_xx {
    width: 95%;
    height: 8vh;
    line-height: 5vh;
    margin: 0 auto;
    display: flex;
    justify-content: left;
    align-items: center;

    .img1 {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      margin-left: 5px;
    }
  }

  .shangp {
    width: 95%;
    height: 17vh;
    margin: 0 auto;
  }

  .yunxianf {
    width: 95%;
    height: 10vh;
    display: flex;
    margin: 0 auto;
    justify-content: space-between;
    align-items: center;

    .yx_1 {
      width: 10%;
      height: 5vh;
      border-radius: 50%;
      background-color: rgba(224, 224, 7, 0.897);
      margin-top: -12px;
      text-align: center;
      line-height: 5vh;
    }

    .yx_2 {
      width: 75%;
      height: 6vh;
      text-align: left;
    }

    .yx_3 {
      width: 15%;
      height: 6vh;
      text-align: left;
    }
  }

  .sp_zj {
    width: 95%;
    height: 9vh;
    margin: 0 auto;

    .a {
      width: 100%;
      height: 3vh;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }

  .sp_xj {
    width: 95%;
    height: 5vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;

    div {
      font-size: 35px;
    }
  }
}

.ding_sp .yunxianf .yx_1 .icon1[data-v-7fbeb9ee] {
  font-size: 35px;
  line-height: 60px;
}
</style>