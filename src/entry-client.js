import { createApp } from "./main";

// 激活
const { app, router, store } = createApp()

// 还原store.state
// renderer会把它放到window.__INITIAL_STATE__
if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

router.onReady(() => {
  app.$mount('#app')
})
