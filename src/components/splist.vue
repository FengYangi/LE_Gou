<template>
  <div class="sp_list" @click="goxiang">
    <!-- 图片 -->
    <img :src="img" width="100%" />
    <!-- 标题 -->
    <p class="p1">{{title}}</p>
    <div class="div1">
      <!-- 原价 -->
      <s class="s1">{{goodsOldPrice}}</s>
      <!-- 现价 -->
      <span class="s2">￥{{goodsPrice}}元</span>
      <!-- 收藏 -->
      <span class="s3">
        <van-icon name="star-o" />
        {{hot}}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    img:String,
    title:String,
    goodsOldPrice:String,
    goodsPrice:Number,
    hot:Number,
  },
  methods:{
    goxiang(){
      this.$emit('click')
      // console.log(item)
    }
  }
};
</script>

<style lang="scss">
.sp_list {
  width: 100%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
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
</style>