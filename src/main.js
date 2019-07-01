import Vue from "vue";
import App from "./App.vue";
import create from "@/utils/create";

// import router from './router'
import router from './krouter'

// import store from './store'
import store from './kstore'

Vue.config.productionTip = false;

Vue.prototype.$dispatch = function(eventName, data) {
  let parent = this.$parent;
  // 查找父元素
  while (parent) {
    if (parent) {
      // 父元素用$emit触发
      parent.$emit(eventName, data);
      // 递归查找父元素
      parent = parent.$parent;
    } else {
      break;
    }
  }
};

Vue.prototype.$boardcast = function(eventName, data) {
  boardcast.call(this, eventName, data);
};
function boardcast(eventName, data) {
  this.$children.forEach(child => {
    // 子元素触发$emit
    child.$emit(eventName, data);
    if (child.$children.length) {
      // 递归调用，通过call修改this指向 child
      boardcast.call(child, eventName, data);
    }
  });
}

class Bus {
  constructor() {
    // {
    //   eventName1:[fn1,fn2],
    //   eventName2:[fn3,fn4],
    // }
    this.callbacks = {};
  }
  $on(name, fn) {
    this.callbacks[name] = this.callbacks[name] || [];
    this.callbacks[name].push(fn);
  }
  $emit(name, args) {
    if (this.callbacks[name]) {
      // 存在 遍历所有callback
      this.callbacks[name].forEach(cb => cb(args));
    }
  }
}

Vue.prototype.$bus = new Bus();
Vue.prototype.$create = create;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
