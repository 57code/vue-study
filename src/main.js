import Vue from "vue";
import App from "./App.vue";
import { createRouter } from './router/index';
import { createStore } from './store/index';

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

// 每次请求都必须是全新vue实例
// 此方法未来的调用者会是renderer
// context是renderer传递给我们的参数
export function createApp(context) {
  // 创建路由器实例
  const router = createRouter()
  const store = createStore()

  const app = new Vue({
    router,
    store,
    context,
    render: h => h(App)
  })

  return { app, router, store }
}

