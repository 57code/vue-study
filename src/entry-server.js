import createApp from "./main";

// 用于首屏渲染
// context有renderer传入
export default (context) => {
  return new Promise((resolve, reject) => {
    // 1.获取路由器和app实例
    const { app, router, store } = createApp(context);
    // 获取首屏地址
    router.push(context.url);
    router.onReady(() => {
      // 获取当前匹配的所有组件
      const matched = router.getMatchedComponents();

      // 404
      if (!matched.length) {
        return reject({code: 404})
      }
      
      // 遍历matched，判断他们内部有没有asyncData
      // 如果有就执行他们，等待执行完毕在返回app
      Promise.all(
        matched.map((Component) => {
          if (Component.asyncData) {
            return Component.asyncData({
              store,
              route: router.currentRoute,
            });
          }
        })
      )
        .then(() => {
          // 约定将app数据状态放入context.state
          // 渲染器会将state序列化变成字符串, window.__INITIAL_STATE__
          // 未来在前端激活之前可以再恢复它
          context.state = store.state;
          resolve(app);
        })
        .catch(reject);
    }, reject);
  });
};
