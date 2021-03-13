import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
// import router from './krouter'
// import store from './kstore'
import store from './store'
import router from './router'

import create from '@/utils/create'
import Notice from '@/components/Notice.vue'

// icons
import '@/icons'

Vue.config.productionTip = false
// 事件总线
Vue.prototype.$bus = new Vue()
Vue.prototype.$notice = function (props) {
  const notice = create(Notice, props);
  notice.show();
  return notice
}
new Vue({
  // 实例挂到这里，是为了插件安装时可以注册实例
  router,

  store,
  render: h => h(App)
}).$mount('#app')
