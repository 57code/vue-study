import { createApp } from "./main"

// 服务端入口：将来请求进来之后，可以获取一个vue实例
// 跳转到首屏

export default context => {
  return new Promise((resolve, reject) => {
    const { app, router, store } = createApp(context)

    // 跳转至首屏
    router.push(context.url)

    // 路由就绪，返回结果
    router.onReady(() => {
      // 1.获取匹配组件, [Parent, Child]
      const matchedComponents = router.getMatchedComponents()

      // 404
      if (!matchedComponents.length) {
        return reject({ code: 404 })
      }

      // 2.如果组件里面有异步请求需要asyncData，就调用
      Promise.all(matchedComponents.map(Component => {
        // k看看有没有asyncData
        if (Component.asyncData) {
          return Component.asyncData({ store, route: router.currentRoute })
        }
      })).then(() => {
        // 约定：把store放入context.state, renderer会将它序列化
        // 存放在window.__INITIAL_STATE__, 前端获取它并且还原即可
        context.state = store.state

        // 给renderer返回Vue实例
        resolve(app)
      }).catch(reject)

    }, reject)
  })

}