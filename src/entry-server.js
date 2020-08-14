// 主要用于首屏渲染
import { createApp } from './main'

// renderer传入一个url地址，即首屏地址
export default context => {
  // 返回一个Promise，确保路由中可能有异步操作
  return new Promise((resolve, reject) => {
    const { app, router, store } = createApp()

    // 获取首屏地址, 并且跳转过去
    router.push(context.url)

    router.onReady(() => {
      // 检查一下当前匹配的组件是否需要请求异步数据
      const matchedComponents = router.getMatchedComponents();
        
      // 若无匹配则抛出异常
      if (!matchedComponents.length) {
        return reject({ code: 404 });
      }

      console.log(matchedComponents);

      Promise.all(
        matchedComponents.map(Component => {
          if (Component.asyncData) {
            return Component.asyncData({
              store,
              route: router.currentRoute,
            });
          }
        }),
      ).then(() => {
        // 所有异步请求结束，需要将这些状态同步到前端
        // 状态将自动序列化为window.__INITIAL_STATE__ = 'xxxxx'
        // 这个工作是有renderer
        context.state = store.state
        resolve(app)
      }).catch(reject)
     
    }, reject)
  })

}