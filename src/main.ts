import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './krouter'
import store from './kstore'
// import store from './store'
// import router from './router'

Vue.config.productionTip = false
// 事件总线
Vue.prototype.$bus = new Vue()

new Vue({
  // 挂载，目的是什么？让我们可以在插件中访问到Router实例
  router,

  store,
  render: h => h(App)
}).$mount('#app')
