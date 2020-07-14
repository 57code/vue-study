import { createApp } from "./main"
// 首屏渲染
// 将来和渲染器打交道
// 创建vue实例
export default context => {
  const {app, router, store} = createApp(context)
  
  return new Promise((resolve, reject) => {
    // 跳转首屏地址去
    router.push(context.url)
    
    // 等待路由就绪
    router.onReady(() => {
      // 判断是否存在asyncData选项
      // 获取匹配路由相关组件
      const comps = router.getMatchedComponents()
      // 遍历它们，并执行可能存在的asyncData
      Promise.all(comps.map(comp => {
        if (comp.asyncData) {
          return comp.asyncData({
            store,
            route: router.currentRoute
          })
        }
      })).then(() => {
        // 数据已经存入store，只需要序列化它，传到前端在复原
        // 设置到上下文中的state，renderer将来会转换它
        context.state = store.state
        // 返回实例
        resolve(app)
      })
      .catch(reject)
    }, reject)
    
  })
}