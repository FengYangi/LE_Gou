<template>
  <div id="Box">
    <!-- 头部 -->
    <van-nav-bar
      title="购物车"
      left-text="返回"
      right-text="管理"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />

    <!-- 复选框包括所有 -->
    <!-- 商品 -->
    <van-swipe-cell v-for="(item,index) in CartList" :key="index">
      <!-- 布局 -->
      <van-row>
        <van-col span="2">
          <van-checkbox v-model="item.ischecked" @click="check"></van-checkbox>
        </van-col>
        <van-col span="22">
          <van-card :price="item.price" :title="item.title" class="goods-card" :thumb="item.image">
            <!-- 步进器 -->
            <template #num>
              <div v-show="isShow">
                <van-stepper
                  v-model="item.product_amount"
                  theme="round"
                  button-size="22"
                  disable-input
                  @change="bjq(item)"
                />
              </div>
            </template>
          </van-card>
          <div class="jia" v-show="!isShow">数量:{{item.product_amount}}</div>
        </van-col>
      </van-row>
    </van-swipe-cell>
    <!-- 提交订单 -->
    <van-submit-bar :price="zj" button-text="去结算" @submit="tjdingdan" v-show="!isShow">
      <van-checkbox v-model="checked" @click="qx">全选</van-checkbox>
    </van-submit-bar>

    <van-submit-bar button-text="删除" @submit="onSubmitDEL" v-show="isShow">
      <van-checkbox v-model="checked" @click="qx">全选</van-checkbox>
    </van-submit-bar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checked: false,
      result: [],
      isShow: false,
    };
  },

  computed: {
    // 获取购物车数据
    CartList: function () {
      return this.$store.state.gwsl;
    },
    // 选中商品的数组
    XuanZList: function () {
      return this.$store.state.XZ_list;
    },
    // 总价
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
    // 获取购物车数组里的数据
    this.$store.dispatch("GOUWU");
  },

  mounted() {
    console.log(this.CartList, "购物页面的数据");
  },
  methods: {
    // 返回上一级
    onClickLeft() {
      this.$router.push("/xiangq");
    },
    // 管理和正常布局切换
    onClickRight() {
      this.is = !this.is;
      if (this.is) {
        this.isShow = true;
      } else {
        this.isShow = false;
      }
    },
    // 点击单选
    check() {
      // console.log(item,"cart_id")
      this.$store.dispatch("CHECK");
    },

    // 全选
    qx() {
      if (this.XuanZList.length == this.CartList.length) {
        this.checked = true;
      } else {
        this.checked = false;
      }
    },
    // 步进器
    bjq(item) {
      this.$store.dispatch("BJQ", item);
    },
    // 删除
    onSubmitDEL() {
      this.$store.dispatch("onSubmitDEL");
    },
    // 提交订单
    tjdingdan() {
      this.$router.push({
        path: "/dingdan",
      });
    },
  },
};
</script>

<style lang="scss">
.goods-card {
  margin: 0;
  background-color: white;
}

.delete-button {
  height: 100%;
}
.jia {
  z-index: 999;
  font-size: 20px;
  position: absolute;
  top: 125px;
  right: 75px;
}
</style
</style>