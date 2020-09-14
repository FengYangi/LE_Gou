<template>
    <div id="Box">
        <!-- 头部 -->
        <van-nav-bar title="修改地址" left-text="返回" left-arrow @click-left="onClickLeft" />

        <!-- 新增地址 -->
        <van-address-edit
                :address-info="new_from"
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
    import qs from "qs"
    import { patchXiuGai_DZ,patchDel_DZ } from "../api/api";
    export default {
        data() {
            return {
                searchResult: [],
                // 表单数据
                areaList: {},
                new_from:{}
            };
        },

        created() {
            this.areaList = data;

            let new_from = this.$route.query.from

            this.new_from = new_from
            console.log(this.new_from,"sadas")

            // 修改用户地址
            // patchXiuGai_DZ({
            //     CustomerAddrId:new_from.customerAddrId,
            //     CustomerId:new_from.customerId,
            //     Name:new_from.name,
            //     Phone:new_from.phone,
            //     Province:new_from.Province,
            //     City:new_from.city,
            //     District:new_from.district,
            //     Address:new_from.address,
            //     IsDefault:new_from.isDefault,
            //     IdDel:new_from.isDel
            // }).then(res=>{
            //     console.log(res)
            // })

        },
        methods: {
            // 返回上一级
            onClickLeft() {
                this.$router.push('/shouhuo_dz')
            },
            onSave(content) {
                // console.log(content,"表单内容")

            },
            onDelete(content) {
                console.log(content,"del")
                //删除接口
                patchDel_DZ({
                    userid:this.new_from.customerId,
                    areaId:this.new_from.id,
                }).then(res=>{
                    console.log(res)
                    this.$router.push('/shouhuo_dz')
                })

            },
        },
    };
</script>

<style scoped lang="scss">
</style>