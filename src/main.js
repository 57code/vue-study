import Vue from "vue";
import App from "./App.vue";
import "./plugins/element.js";
import router from "./krouter";
import store from "./kstore";
// import store from './store'
// import router from './router'

Vue.config.productionTip = false;
// 事件总线
Vue.prototype.$bus = new Vue();

new Vue({
  // 传入了路由器实例给根实例作为组件选项
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
