// 客户端入口：激活当前app
import { createApp } from "./main"

const { app, router, store } = createApp()

// 欢迎状态
if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

// 路由就绪，返回结果
router.onReady(() => {
  app.$mount('#app')
})