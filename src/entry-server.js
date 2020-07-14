import { createApp } from "./main"

// 将来和渲染器打交道
// 创建vue实例
export default context => {
  const {app, router} = createApp(context)
  
  return new Promise((resolve, reject) => {
    // 跳转首屏地址去
    router.push(context.url)

    // 等待路由就绪
    router.onReady(() => {
      resolve(app)
    }, reject)
    
  })
}