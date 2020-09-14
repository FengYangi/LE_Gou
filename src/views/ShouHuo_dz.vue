<template>
  <div id="Box">
    <!-- 头部 -->
    <van-nav-bar
      title="更换收货地址"
      left-text="返回"
      right-text="新增"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />

    <!-- 地址列表 -->
    <van-address-list
      v-model="chosenAddressId"
      :list="lists"
      default-tag-text="默认"
      @add="onAdd"
      @edit="onEdit"
      @select="onSelect"
      add-button-text="选择该地址"
    />

  </div>
</template>

<script>
import {getHuoquShouHuo_DZ} from "../api/api"
export default {
  data() {
    return {
      chosenAddressId: "1",
      lists: [],
      lists2:[]
    };
  },

  created(){
    //获取数据
    getHuoquShouHuo_DZ({
      page:1,
      pageSize:30
    }).then(res=>{
      console.log(res)
      this.lists = res.data
      console.log(this.lists,"list")
    })

    this.lists.forEach((ele,index)=>{

    })
  },
  methods: {
    //新增
    onAdd() {
      this.$router.push('/dingdan')
    },
    //修改
    onEdit(item,index){
      console.log(item,"item")
      console.log("这是修改内容")
      this.$router.push({
        path:'/xiugai_dz',
        query:{
          from:item
        }
      })
    },
    //选中
    onSelect(item,index){
      // console.log(item,"当前选中id")
      this.$store.dispatch("XZ",item)
      // console.log(this.XZDZ_list,"获取选中地址的数组")
    },
    // 返回上一级
    onClickLeft() {
      this.$router.push('/dingdan')
    },
    // 新增
    onClickRight() {
      this.$router.push("/xinzeng_dz");
    },
    // 回到订单
    hddd() {
      this.$router.push("/dingdan");
    },
  },
};
</script>

<style scoped lang="scss">
.dibu {
  .but {
    position: fixed;
    bottom: 0;
    left: 0;
  }
}
</style>