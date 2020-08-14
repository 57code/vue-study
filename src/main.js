import Vue from "vue";
import App from "./App.vue";
import { createRouter } from './router/index';

Vue.config.productionTip = false;

// 每次请求都必须是全新vue实例
// 此方法未来的调用者会是renderer
// context是renderer传递给我们的参数
export function createApp(context) {
  // 创建路由器实例
  const router = createRouter()
  
  const app = new Vue({
    router,
    context,
    render: h => h(App)
  })

  return {app, router}
}

