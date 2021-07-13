import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'
// import router from './kvue-router'
import store from './store'
// import store from './kstore'

import Notice from "@/components/Notice.vue";
import create from "@/utils/create";

//icons
import '@/icons'

Vue.config.productionTip = false
// 事件总线
Vue.prototype.$bus = new Vue()

Vue.prototype.$notice = function(props) {
  const notice = create(Notice, props);
  notice.show();
  return notice
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
