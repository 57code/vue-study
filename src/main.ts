import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import {create} from '@/utils/create'

// import router from './router'
import router from './krouter/index'

import store from './store'
// import store from './kstore'

import './test'

import axios from 'axios'
Vue.prototype.$axios = axios;


Vue.config.productionTip = false
// 事件总线
Vue.prototype.$bus = new Vue()
Vue.prototype.$create = create

// new Vue结果是根实例  $root
// App是根组件  $children[0]
// 选项为什么要放进去
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
