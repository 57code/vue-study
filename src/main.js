import Vue from "vue";
import App from "./App.vue";
import createRouter from "./router";

Vue.config.productionTip = false;

// 需要返回一个应用程序工厂: 返回Vue实例和Router实例、Store实例
export default function createApp(context) {
  // 处理首屏，就要先处理路由跳转
  const router = createRouter()
  const app = new Vue({
    router,
    context,
    render: (h) => h(App),
  })
  return { app, router }
}
