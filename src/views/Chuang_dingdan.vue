<template>
  <div id="Box">
    <!-- 头部 -->
    <van-nav-bar title="商品订单" left-text="返回" left-arrow @click-left="onClickLeft" />

    <div class="div" v-show="isShow">
      <!-- 支付时间 -->
      <div class="top">
        <span>剩余支付时间</span>
        <span class="blick">
          <van-count-down :time="time" />
        </span>
      </div>

      <!-- 支付价格 -->
      <div class="div1">总价:￥{{zj}}元</div>

      <!-- 支付类型 -->
      <div class="zf_lx" v-show="isShow">
        <!-- 支付宝支付 -->
        <div class="zfb_zf">
          <div class="zf_left">
            <img src="../../public/img/支付宝.png" />
          </div>
          <div class="zf_wz">支付宝支付</div>
          <van-radio-group v-model="radio" class="radio">
            <van-radio name="1" checked-color="#07c160" @click="Nradio"></van-radio>
          </van-radio-group>
        </div>

        <!-- 微信支付 -->
        <div class="zfb_zf">
          <div class="zf_left">
            <img src="../../public/img/微信支付.png" />
          </div>
          <div class="zf_wz">支付宝支付</div>
          <van-radio-group v-model="radio" class="radio">
            <van-radio name="2" checked-color="#07c160" @click="Nradio"></van-radio>
          </van-radio-group>
        </div>

        <!-- 余额支付 -->
        <div class="zfb_zf">
          <div class="zf_left">
            <img src="../../public/img/余额.png" />
          </div>
          <div class="zf_wz">余额支付</div>
          <van-radio-group v-model="radio" class="radio">
            <van-radio name="3" checked-color="#07c160" @click="Nradio"></van-radio>
          </van-radio-group>
        </div>

        <van-action-sheet v-model="show" title="请输入密码">
          <div class="content">
            <!-- 密码输入框 -->
            <van-password-input
              :value="value"
              info="密码为 6 位数字"
              :focused="showKeyboard"
              @focus="showKeyboard = true"
            />
            <!-- 数字键盘 -->
            <van-number-keyboard
              :show="showKeyboard"
              @input="onInput"
              @delete="onDelete"
              @blur="showKeyboard = false"
            />
          </div>
        </van-action-sheet>

        <van-submit-bar button-text="点击支付" @submit="onSubmit" />
      </div>
    </div>

    <!-- 支付成功 -->
    <div class="zfcg" v-show="!isShow">
      <van-empty
        class="custom-image"
        image="http://localhost:8080/img/%E6%94%AF%E4%BB%98%E6%88%90%E5%8A%9F.png"
        description="支付成功"
      />
    </div>
  </div>
</template>

<script>
import qs from "qs";
import { Notify } from "vant";
import md5 from "js-md5";
import {
  postCJ_Dd,
  postyuer_zf,
  postYZ_password,
  postZFB_zf,
} from "../api/api";
export default {
  data() {
    return {
      time: 15 * 60 * 1000,
      show: false,
      radio: "1",
      value: "",
      showKeyboard: true,
      yuerzf: [],
      order: "",
      isShow: true,
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

    // 总价
    zj: function () {
      let a = 0;
      this.XuanZList.map((res) => {
        // console.log(res)
        a += res.price * res.product_amount;
      });
      return a;
    },
  },
  created() {
    // console.log(this.XZDZ_list, "这是选中地址数组");
    console.log(this.XuanZList, "这是选中数组");

    let id = [];
    this.XuanZList.forEach((ele) => {
      // console.log(ele.customer_id,"ididid")
      id.push(ele.product_id);
    });
    let strid = id.join(" ");
    console.log(strid, "strid");

    // 创建订单接口
    postCJ_Dd({
      // 订单总价
      price: this.zj,
      //   // 收货地址
      consignee_addr: this.XZDZ_list,
      //   // 商品ID
      goodsId: strid,
      // 是否从购物车过来
      isFcart: true,
    }).then((res) => {
      console.log(res, "resres");
      // 支付当前商品的编码
      let list = res.data;
      console.log(list);
      list.forEach((Element) => {
        this.yuerzf.push(Element.orderNumber);
      });
      this.order = this.yuerzf.join(" ");

      console.log(this.order);
      if (res.code == 201) {
        this.$dialog
          .alert({
            message: res.msg,
          })
          .then(() => {
            // on close
          });
      }
    });
  },

  methods: {
    onClickLeft() {
      this.$router.push("/dingdan");
    },
    onInput(key) {
      this.value = (this.value + key).slice(0, 6);
      console.log(this.value);
      let str = md5(this.value);
      if (this.value.length == 6) {
        // 验证密码
        postYZ_password(
          qs.stringify({
            paypwd: str,
          })
        ).then((res) => {
          console.log(this.order);
          if (res.code == 200) {
            Notify({ type: "success", message: res.msg });
          }
          if (res.code == 404) {
            Notify({ type: "danger", message: res.msg });
          }
          if (res.code == 202) {
            Notify({ type: "danger", message: res.msg });
          }
          // 余额支付
          postyuer_zf(
            qs.stringify({
              orderNum: this.order,
            })
          ).then((res) => {
            console.log(res);
            if (res.code == 201) {
              setTimeout(() => {
                // this.$router.push("/zf_cg");
                this.isShow = false;
              }, 1000);
            }
          });
        });
      }
    },
    onDelete() {
      this.value = this.value.slice(0, this.value.length - 1);
    },
    // 选择支付方式
    Nradio() {},
    onSubmit() {
      console.log(this.radio, "sssss");

      switch (this.radio) {
        case "1":
          console.log("支付宝支付");
          // 支付宝订单支付   手机网页支付
          postZFB_zf({
            OutTradeNo: 'Oct20200910210141246714359',
            TotalAmount: 100,
            Subject: "手机网站支付测试",
            ProductCode: "QUICK_WAP_WAY"
          }).then((res) => {
            console.log(res);
          });
          break;

        case "2":
          console.log("微信支付");
          break;

        case "3":
          this.show = true;
          console.log("余额支付");

          break;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  width: 100%;
  height: 40vh;
  padding: 16px 16px 160px;
}
.blick {
  color: gray;
}
.top {
  width: 100%;
  height: 5vh;
  color: gray;
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid gray;
}
.div1 {
  width: 100%;
  height: 10vh;
  color: rgb(230, 80, 80);
  font-weight: 500;
  font-size: 50px;
  text-align: center;
  line-height: 10vh;
  border-bottom: 1px solid gray;
}
.zf_lx {
  width: 100%;
  height: 68vh;
}
.zfb_zf {
  width: 95%;
  height: 8vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 15px auto;
  background-color: honeydew;
  padding: 10px 0;

  .zf_left {
    width: 20%;
    height: 100%;
    img {
      width: 85px;
      height: 85px;
    }
  }
  .zf_wz {
    width: 70%;
    height: 100%;
    text-align: left;
    line-height: 8vh;
    font-size: 25px;
  }
  .radio {
    width: 10%;
    height: 100%;
    margin-top: 55px;
  }
  // .radio {
  //     width: 40px;
  //     height: 40px;
  //     color:#07c160 ;
  // }
}
.zfcg {
  width: 100%;
  height: 68vh;
}
.bottom-button {
  width: 160px;
  height: 40px;
}
</style>