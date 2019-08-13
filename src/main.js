import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import './permission';

// import router from './krouter'
import Bus from "./plugins/bus";

import store from './store'
// import store from "./store/kindex";

import "./icons/";

Vue.config.productionTip = false;
Vue.use(Bus);
// Vue.prototype.$bus = new Vue();

// <div id="box" class="foo"><span>aaa</span></div>
Vue.component("comp", {
  // template:'<div id="box" class="foo"><span>aaa</span></div>',
  render(h) {
    return h("div", { class: { foo: true }, attrs: { id: "box" } }, [
      h("span", "aaa")
    ]);
  }
  // render(h) {
  //   return <div id="box" class="foo"><span>aaa</span></div>
  // }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
