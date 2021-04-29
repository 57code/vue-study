// spa页面不能刷新：
// 1.hash
// 2.history api

// url变化显示对应内容：
// 1.router-view：占位容器
// 2.数据响应式

let Vue;

// 1.实现插件
class VueRouter {
  constructor(options) {
    this.options = options;

    // 数据响应式，current必须是响应式的，这样他变化，使用它的组件就会重新render
    // 如何造一个响应式数据
    // 方式1：借鸡生蛋 - new Vue({data: {current: '/'}})
    // 方式2：Vue.util.defineReactive(obj, 'current', '/')
    // Vue.set(this)
    // Vue.set(obj, 'key', 'val')
    Vue.util.defineReactive(
      this,
      "current",
      window.location.hash.slice(1) || "/"
    );

    // 监控url变化
    window.addEventListener("hashchange", () => {
      this.current = window.location.hash.slice(1);
    });
  }
}

// 插件要实现一个install方法
VueRouter.install = function(_Vue) {
  Vue = _Vue;

  // 注册router实例
  // 通过全局混入：Vue.mixin({beforeCreate})
  Vue.mixin({
    beforeCreate() {
      // 仅在根组件创建时执行一次
      if (this.$options.router) {
        Vue.prototype.$router = this.$options.router;
      }
    },
  });

  // 注册router-view和router-link
  Vue.component("router-view", {
    render(h) {
      // url => component
      // url
      // window.location.hash
      // router: this.$router
      let component = null;
      const { current, options } = this.$router;
      const route = options.routes.find((route) => route.path === current);
      if (route) {
        component = route.component;
      }
      console.log(current, options);
      return h(component);
    },
  });
  Vue.component("router-link", {
    props: {
      to: {
        type: String,
        required: true,
      },
    },
    render(h) {
      // <router-link to="/about">xxx</router-link>
      // <a href="#/about">xxx</a>
      // return <a href={"#" + this.to}>{this.$slots.default}</a>;
      return h("a", { attrs: { href: "#" + this.to } }, this.$slots.default);
    },
  });
};

export default VueRouter;
