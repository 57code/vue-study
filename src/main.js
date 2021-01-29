import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './krouter'
// import router from './router'

Vue.config.productionTip = false
// 事件总线
Vue.prototype.$bus = new Vue()

new Vue({
  router, // 实例挂到这里，是为了插件安装时可以注册实例
  render: h => h(App)
}).$mount('#app')
