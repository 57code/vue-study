import Vue from 'vue'
import App from './App.vue'
import router from './router'
import focus from './directives/focus'
import store from './store'
import './plugins/element.js'

Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()
Vue.directive('focus', focus)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
