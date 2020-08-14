// 客户端入口，用于客户端激活
// 下面代码在浏览器执行
import {createApp} from './main'

// 创建vue、router实例
const {app, router}=createApp()

router.onReady(() => {
  // 挂载
  app.$mount('#app')
})