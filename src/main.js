import Vue from "vue";
import App from "./App.vue";
import { createRouter } from './router'
import { createStore } from "./store";

Vue.config.productionTip = false;

Vue.mixin({
  beforeMount() {
    const { asyncData } = this.$options;
    if (asyncData) {
      // 将获取数据操作分配给 promise
      // 以便在组件中，我们可以在数据准备就绪后
      // 通过运行 `this.dataPromise.then(...)` 来执行其他任务
      this.dataPromise = asyncData({
        store: this.$store,
        route: this.$route,
      });
    }
  },
});

// 需要每个请求返回一个Vue实例
export function createApp(context) {
  const router = createRouter()
  const store = createStore()
  const app = new Vue({
    router,
    store,
    context, // 用于和外面renderer交互
    render: h => h(App)
  })

  return {app,router,store}
}

