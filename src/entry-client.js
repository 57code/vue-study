import { createApp } from "./main";

// 客户端激活，这里的代码都在浏览器执行
// 创建Vue实例
const {app, router, store} = createApp()

// 恢复state
if (window.__INITIAL_STATE__) {
  console.log(window.__INITIAL_STATE__);  
  store.replaceState(window.__INITIAL_STATE__)
}

// 等待router就绪
router.onReady(() => {
  // 挂载激活
  app.$mount('#app')
})