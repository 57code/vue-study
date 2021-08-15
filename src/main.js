import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import create from './utils/create'

import router from './router'
// import router from './krouter'

import store from './store'
// import store from './kstore'

<<<<<<< HEAD
import '@/icons'
import './permission'
import vPermission from "./directives/permission";

Vue.directive("permission", vPermission);
=======
import create from "@/utils/create";
import Notice from "@/components/Notice.vue";


>>>>>>> 2c65389d71cbe23b8c86eeb55380a66a3bc0c45f
Vue.config.productionTip = false
// 事件总线
Vue.prototype.$bus = new Vue()
// Vue.prototype.$create = create
Vue.use(create)

<<<<<<< HEAD
// 3.挂载router实例，why？
new Vue({
  // Vue.prototype.$router = router
=======
Vue.prototype.$notice = function(props) {
  const notice = create(Notice, props);
  notice.show();
}

new Vue({
>>>>>>> 2c65389d71cbe23b8c86eeb55380a66a3bc0c45f
  router,
  store,
  render: h => h(App)
}).$mount('#app')
