// 自己的路由器
// 1.VueRouter类，是一个插件
let Vue;
class VueRouter {
  constructor(options) {
    this.$options = options;

    // 声明一个响应式的current
    // 渲染函数如果要重复执行，必须依赖于响应式数据
    const initial = window.location.hash.slice(1) || "/";
    Vue.util.defineReactive(this, "current", initial);
    // this.current = window.location.hash.slice(1) || '/'

    // 监听url变化
    window.addEventListener("hashchange", () => {
      this.current = window.location.hash.slice(1);
    });
  }
}

// 插件要实现install
// 参数1就是Vue
VueRouter.install = function(_Vue) {
  // 保存构造函数的引用
  Vue = _Vue;

  // 2.挂载$router到Vue原型
  // 利用全局混入，延迟执行下面的代码，这样可以获取router实例
  Vue.mixin({
    beforeCreate() {
      // this指的是组件实例
      if (this.$options.router) {
        Vue.prototype.$router = this.$options.router;
      }
    },
  });

  // 3.声明两个全局组件router-view、router-link
  // <router-link to="/abc">xxx</router-link>
  Vue.component("router-link", {
    props: {
      to: {
        type: String,
        required: true,
      },
    },
    render(h) {
      // <a href="#/abc">xxx</a>
      // this指向当前组件实例
      // return <a href={'#'+this.to}>{this.$slots.default}</a>
      return h("a", { attrs: { href: "#" + this.to } }, this.$slots.default);
    },
  });
  Vue.component("router-view", {
    render(h) {
      // current
      // 根据current获取路由表中对应的组件并渲染它
      let component = null;
      const route = this.$router.$options.routes.find(
        (route) => route.path === this.$router.current
      );
      if (route) {
        component = route.component
      }
      return h(component);
    },
  });
};

export default VueRouter;
