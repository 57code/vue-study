import { createApp } from "./main";

// 客户端激活，这里的代码都在浏览器执行
// 创建Vue实例
const {app, router} = createApp()

// 等待router就绪
router.onReady(() => {
  // 挂载激活
  app.$mount('#app')
})