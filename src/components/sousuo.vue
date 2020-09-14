<template>
  <div id="Box">
    <!-- 搜索 -->
    <van-search v-model="value" placeholder="请输入搜索关键词" />
  </div>
</template>

<script>
export default {
    data(){
        return{
            value:""
        }
    }
};
</script>

<style  lang="scss" scoped>
</style>