<template>
  <div id="Box">
    <!-- 头部 -->
    <van-nav-bar title="新增收货地址" left-text="返回" left-arrow @click-left="onClickLeft" />

    <!-- 新增地址 -->
    <van-address-edit
      :area-list="areaList"
      show-delete
      show-set-default
      show-search-result
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      area-placeholder
      @save="onSave"
      @delete="onDelete"
    />
  </div>
</template>

<script>
import { Notify } from "vant";
import data from "../../public/san";
import { postShouHuo_DZ } from "../api/api";
export default {
  data() {
    return {
      searchResult: [],
      // 表单数据  省市县
      areaList: {},
    //  from数组
      from:[]
    };
  },
  created() {
    // 表单数据  省市县
    this.areaList = data;

  },
  methods: {
    // 返回上一级
    onClickLeft() {
      this.$router.push('/shouhuo_dz')
    },
    onSave(content) {
      // console.log(content,"表单内容")
      this.from.push(content);
      console.log(this.from, "表单数据");
      // 添加地址接口
      postShouHuo_DZ({
        // 名字
        Name: this.from[0].name,
        // 手机号
        Phone: this.from[0].tel,
        // 省
        Province: this.from[0].province,
        // 市
        City: this.from[0].city,
        // 区/县
        District: this.from[0].county,
        // 详细地址
        Address: this.from[0].addressDetail,
      }).then((res) => {
        console.log(res);
        if (res.code == 201) {
          Notify({ type: "success", message: res.msg });
        }
        setTimeout(()=> {
            this.$router.push('/shouhuo_dz')
        },2000)
      });
    },
    onDelete() {
      Toast("delete");
    },
  },
};
</script>

<style scoped lang="scss">
</style>