<template>
  <div id="app">
    <router-view />
    <van-tabbar
      v-model="active"
      route
      v-show="this.$route.meta.DiINAV"
      active-color="red"
      inactive-color="#000"
    >
      <van-tabbar-item icon="home-o" to="/shouye">首页</van-tabbar-item>
      <van-tabbar-item icon="apps-o" to="/fenlei">商城</van-tabbar-item>
      <van-tabbar-item icon="cart-o" to="/gouwu">购物车</van-tabbar-item>
      <van-tabbar-item icon="contact" to="/my">我的</van-tabbar-item>
    </van-tabbar>

    <div class="di"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: 0,
    };
  },
};
</script>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
.di {
  width: 100%;
  height: 8vh;
}
</style>
