import createApp from "./main";

// 客户端激活
const {app, router, store} = createApp()

// 还原state
if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

router.onReady(() => {
  // 挂载激活
  app.$mount('#app')
})