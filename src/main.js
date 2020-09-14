import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// rem
import 'lib-flexible/flexible';

import 'vant/lib/index.css';
// 全局引入按需引入UI库 vant
import '@/plugins/vant'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
