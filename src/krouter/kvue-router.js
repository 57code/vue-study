// 1.实现vue插件VueRouter
let Vue;
class VueRouter {
  constructor() {
    console.log(Vue);
  }
}

// 静态install方法
// 形参1是Vue构造函数
VueRouter.install = function(_Vue) {
  Vue = _Vue;

  // 1.1.注册全局组件
  Vue.component("router-link", {
    // template: "<a>router-link</a>",
    render(h) {
      // h -> createElement
      // 返回vnode
      return h('a', 'router-link')
    }
  });
  Vue.component("router-view", {
    // template: "<div>router-view</div>",
    render(h) {
      return h('div', 'router-view')
    }
  });

  // 1.2.注册$router
};

export default VueRouter;
