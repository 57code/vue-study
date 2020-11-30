import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'

// import router from './router'
import router from './krouter'

// import store from './store'
import store from './kstore'

Vue.config.productionTip = false
// 事件总线
Vue.prototype.$bus = new Vue()

// this.$router.push()
// Vue.prototype.$router = router
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
