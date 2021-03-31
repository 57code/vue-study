let Vue;
// 1.实现一个VueRouter类

class VueRouter {
  // new VueRouter({routes: [...]})
  constructor(options) {
    this.$options = options;

    // 保存当前url
    // current属性应该是响应式的，这样哪些依赖它的组件在current发生变化的时候
    // 会重新执行渲染函数
    // 如何声明一个响应式属性？
    // 1.new Vue({data: {current: ...}})
    // 2.Vue.util.defineReactive(obj, 'current')
    Vue.util.defineReactive(
      this, 'current', window.location.hash.slice(1) || "/")
    // this.current = window.location.hash.slice(1) || "/";

    // 监听hashchange
    window.addEventListener('hashchange', () => {
      this.current = window.location.hash.slice(1)
      console.log(this.current);
    })
  }
}

// 如果要实现一个Vue插件，要给当前类实现一个静态的install方法
// install方法将来会被Vue调用
// 该函数接收Vue构造函数
// install.call(VueRouter, Vue)
VueRouter.install = function(_Vue) {
  Vue = _Vue;

  // 1.挂载路由器实例$router
  // 利用混入Vue.mixin()
  Vue.mixin({
    beforeCreate() {
      // 这些代码延迟到了组件实例化的时候才执行
      // 这时就可以获取组件选项了
      // 一下代码只会在根组件实例化时执行一次
      // this是组件实例
      if (this.$options.router) {
        Vue.prototype.$router = this.$options.router;
      }
    },
  });

  // 2. 注册两个全局组件：router-view, router-link
  Vue.component("router-link", {
    props: {
      to: {
        type: String,
        required: true,
      },
    },
    render(h) {
      // h是createElement => vdom
      // <router-link to="/about">xxx</router-link>
      // <a href="#/about">xxx</a>
      // return <a href={"#" + this.to}>{this.$slots.default}</a>;
      return h("a", { attrs: { href: "#" + this.to } }, this.$slots.default);
    },
  });
  Vue.component("router-view", {
    render(h) {
      // 1.获取url
      // 2.根据url获取对应的component
      console.log(this.$router.current);
      console.log(this.$router.$options.routes);
      const route = this.$router.$options.routes.find(
        (route) => route.path === this.$router.current
      );
      const component = route ? route.component : null
      return h(component);
    },
  });
};

export default VueRouter;
