import Vue from 'vue'
import Vuex from 'vuex'
// 安装vuex数据持久化   vuex-persistedstate
// vuex数据持久化
import createisitate from "vuex-persistedstate"
import {
  getTGgouwu_list,
  getXGnum_list,
  getDELgouwu_list,
  getDINGDXX_list
} from "../api/api";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: "",
    // 保存搜索历史记录
    Lsjl: [],
    // 保存首页传过来的id
    ID: [],
    // 购物数量
    gwsl: [],
    // 选中的商品
    XZ_list: [],
    id: '',
    // 选中地址数组
    XZDZ_list: [],
    // 订单数据
    goods: [],
    // 订单数量
    num: [],
  },
  mutations: {
    ADDdenglu(state, val) {
      state.token = val
    },

    // 保存搜索历史记录
    LSJL(state, value) {
      // 在头部添加
      state.Lsjl.unshift(value)
      console.log(state.Lsjl, "这是Lsjl")
      // 要是长度大于7  就删除最后一个
      if (state.Lsjl.length > 7) {
        state.Lsjl.pop()
      }

    },

    // 删除历史记录
    DEL(state, index) {
      state.Lsjl.splice(index, 1)
    },

    // 清空历史记录
    QK_DEL(state) {
      state.Lsjl = []
    },

    // 保存首页传过来的id
    ID(state, item) {
      state.ID = item
    },

    // 购物车数组
    GOUWU(state) {
      // 获取用户购物车信息
      getTGgouwu_list({
        page: 1,
        pageSize: 10,
      }).then((res) => {
        console.log(res.data);
        state.gwsl = res.data;

        var index = res.data.length - 1;
        state.gwsl.splice(index, 1)

        state.gwsl.forEach(ele => {
          if (ele.ischecked == true) {
            ele.ischecked = false
          }
        })
      });
    },
    // 步进器
    BJQ(state, item) {
      // console.log(item, "步进器")
      getXGnum_list({
        catId: item.cart_id,
        product_amount: item.product_amount
      }).then(res => {
        console.log(res)
      })
    },
    // 删除
    onSubmitDEL(state) {
      // 声明一个id等于""
      state.id = ''
      // 遍历选中数组
      state.XZ_list.forEach((ele, index) => {
        // 让声明的id += 遍历数组里面的cart_id 再加 "," 分割
        state.id += ele.cart_id + ','
        // console.log(state.id)
      })
      // 删除数据的接口
      getDELgouwu_list({
        // 删除数据的接口的id 等于 声明的那个id
        carid: state.id
      }).then(res => {
        console.log(res)
      })
      // 以上执行的是接口里面的删除

      // 接口删除完之后页面得刷新一下才能删除，所以这个时候  需要遍历两个数组   （第一个是选中数据的数组，第二个是购物车的数组）
      state.XZ_list.forEach((ele, index) => {
        state.gwsl.forEach((item, index) => {
          // 判断 选中数据的数组的id == 购物车的数组的id时  ， 让购物车数组删除
          if (ele.cart_id == item.cart_id) {
            state.gwsl.splice(index, 1)
          }
        })
      })

    },
    // 单选
    CHECK(state) {
      // 先让存放选中的数组为空
      state.XZ_list = []
      // 遍历一下购物车数组
      state.gwsl.forEach(ele => {
        // 判断  要是购物车数组里面的ischecked为true的话，让它往选中的数组存数据
        if (ele.ischecked) {
          state.XZ_list.push(ele)
        }
      })
    },
    //  选中地址
    XZ(state, item) {
      state.XZDZ_list = item
    },

    // 获取订单数据
    HUOQU_DingDan_list(state) {
      // 每次点击进去让它为空
      state.num = []
      // 声明一个id为空数组 , 用来接收遍历XZ_list数组里面的数据id,遍历出来之后push到id数组里面
      let id = [];
      state.XZ_list.map((ele) => {
        // 这是一个num数量
        state.num.push(ele.product_amount);
        id.push(ele.product_id);
      });
      console.log(state.num, "aaa");

      // console.log(id)
      // let一个变量来接收id数组里里面的数据,转换成字符串类型
      let strid = id.join(" ");
      console.log(strid);
      // 在获取订单的接口   里面的参数goodsid让它等于strid
      getDINGDXX_list({
        goodsid: strid,
      }).then((res) => {
        console.log(res);
        state.goods = res.data;
        // console.log(state.goods, "goods");
      });
    },

  },
  actions: {
    ADDdenglu(context, val) {
      context.commit('ADDdenglu', val)
    },
    // 保存搜索历史记录
    LSJL(context, value) {
      context.commit("LSJL", value)
    },

    // 删除历史记录
    DEL(context, index) {
      context.commit("DEL", index)
    },

    // 清空历史记录
    QK_DEL(context) {
      context.commit("QK_DEL")
    },

    // 保存首页传过来的id
    ID(context, item) {
      context.commit("ID", item)
    },

    // 购物车数组
    GOUWU(context) {
      context.commit("GOUWU")
    },
    // 购物数据
    // GouWuShuJu(context) {
    //   context.commit("GouWuShuJu")
    // },
    // 步进器
    BJQ(context, product_id) {
      context.commit("BJQ", product_id)
    },
    // 删除
    onSubmitDEL(context) {
      context.commit('onSubmitDEL')
    },
    // 单选
    CHECK(context) {
      context.commit('CHECK')
    },
    //  选中地址
    XZ(context, item) {
      context.commit("XZ", item)
    },
    // 获取订单数据
    HUOQU_DingDan_list(context) {
      context.commit("HUOQU_DingDan_list")
    },

  },
  modules: {
  },
  // vuex数据持久化
  plugins: [createisitate({
    storage: window.localStorage
  })]
})
