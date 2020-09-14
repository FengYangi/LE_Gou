import Vue from 'vue'
import VueRouter from 'vue-router'
// 把vuex引入过来
import vuex from '../store/index'

Vue.use(VueRouter)

const routes = [
  // 默认进入登陆页面
  {
    path: '/',
    name: 'menu',
    component: () => import('../views/Menu.vue'),
    // 这是底部导航  给了一个名字,里面随便写一个名,让它为false   隐藏
    meta: {
      DiINAV: false
    },
    // 路由守卫
    beforeEnter: (to, form, next) => {
      // 判断当vuex里面state里的token为空的话,让它执行默认到登录页面
      if (vuex.state.token == "") {
        next()
      }
      // 要是有值的话跳到首页
      else {
        next({
          path: '/shouye'
        })
      }
    }
  },

  // 首页
  {
    path: '/shouye',
    name: 'shouye',
    component: () => import('../views/Shouye.vue'),
    // 这是底部导航  给了一个名字,里面随便写一个名,让它为ture  显示
    meta: {
      DiINAV: true
    },
    // 路由守卫
    beforeEnter: (to, form, next) => {
      // 判断当vuex里面state里的token为空的话,让它执行默认到登录页面
      if (vuex.state.token == "") {
        next("/")
      }
      // 要是有值的话就在首页
      else {
        next()
      }
    }
  },

  // 分类
  {
    path: '/fenlei',
    name: 'fenlei',
    component: () => import('../views/Fenlei.vue'),
    // 这是底部导航  给了一个名字,里面随便写一个名,让它为ture  显示
    meta: {
      DiINAV: true
    },
  },

  // 我的
  {
    path: '/my',
    name: 'my',
    component: () => import('../views/My.vue'),
    // 这是底部导航  给了一个名字,里面随便写一个名,让它为ture  显示
    meta: {
      DiINAV: true
    },
  },

  // 购物
  {
    path: '/gouwu',
    name: 'gouwu',
    component: () => import('../views/Gouwu.vue'),
    // 这是底部导航  给了一个名字,里面随便写一个名,让它为false   隐藏
    meta: {
      DiINAV: false
    },
  },

  // 详情
  {
    path: '/xiangq',
    name: 'xiangq',
    component: () => import('../views/Xiangq.vue'),
    // 这是底部导航  给了一个名字,里面随便写一个名,让它为false   隐藏
    meta: {
      DiINAV: false
    },
  },

  // 订单
  {
    path: '/dingdan',
    name: 'dingdan',
    component: () => import('../views/Dingdan.vue'),
    // 这是底部导航  给了一个名字,里面随便写一个名,让它为false   隐藏
    meta: {
      DiINAV: false
    },
  },

  // 更换地址
  {
    path: '/shouhuo_dz',
    name: 'shouhuo_dz',
    component: () => import('../views/ShouHuo_dz.vue'),
    // 这是底部导航  给了一个名字,里面随便写一个名,让它为false   隐藏
    meta: {
      DiINAV: false
    },
  },

  // 新增地址

  {
    path: '/xinzeng_dz',
    name: 'xinzeng_dz',
    component: () => import('../views/XinZeng_dz.vue'),
    // 这是底部导航  给了一个名字,里面随便写一个名,让它为false   隐藏
    meta: {
      DiINAV: false
    },
  },


  //    修改地址页面
  {
    path: '/xiugai_dz',
    name: 'xiugai_dz',
    component: () => import('../views/XiuGai_dz.vue'),
    // 这是底部导航  给了一个名字,里面随便写一个名,让它为false   隐藏
    meta: {
      DiINAV: false
    },
  },

  //  创建订单
  {
    path: '/chuang_dingdan',
    name: 'chuang_dingdan',
    component: () => import('../views/Chuang_dingdan.vue'),
    // 这是底部导航  给了一个名字,里面随便写一个名,让它为false   隐藏
    meta: {
      DiINAV: false
    },
  },

  //  搜索
  {
    path: '/sousuo',
    name: 'sousuo',
    component: () => import('../views/Sousuo.vue'),
    // 这是底部导航  给了一个名字,里面随便写一个名,让它为false   隐藏
    meta: {
      DiINAV: false
    },
  },
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
