import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import create from './utils/create'
// import router from './router'
import router from './krouter'

Vue.config.productionTip = false
// 事件总线
Vue.prototype.$bus = new Vue()
// Vue.prototype.$create = create
Vue.use(create)

// 3.挂载router实例，why？
new Vue({
  router, // Vue.prototype.$router = router
  render: h => h(App)
}).$mount('#app')
