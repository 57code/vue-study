import Vue from "vue";
import App from "./App.vue";
import { createRouter } from './router'

Vue.config.productionTip = false;

// 需要每个请求返回一个Vue实例
export function createApp(context) {
  const router = createRouter()
  const app = new Vue({
    router,
    context, // 用于和外面renderer交互
    render: h => h(App)
  })

  return {app,router}
}

