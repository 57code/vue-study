import createApp from "./main";

// 客户端激活
const {app, router} = createApp()

router.onReady(() => {
  // 挂载激活
  app.$mount('#app')
})