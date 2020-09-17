import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './krouter'
import store from './kstore'
// import router from './router'
// import store from './store'
import '@/icons'

Vue.config.productionTip = false
// 事件总线
Vue.prototype.$bus = new Vue()

new Vue({
  router, // 此处挂上VueRouter实例，this.$router.push(...)
  store,
  render: h => h(App)
}).$mount('#app')
