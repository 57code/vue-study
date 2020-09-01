// 路由器插件
// Vue.use(KVueRouter)
// 1.实现一个静态install方法
let Vue;

class KVueRouter {
  constructor(options) {
    this.$options = options;
    console.log(Vue);
    // 响应式数据，响应式实现依赖于Vue
    // current保存当前url
    // defineReactive给一个obj定义一个响应式属性 #/about
    const initial = window.location.hash.slice(1) || "/";
    Vue.util.defineReactive(this, "current", initial);

    // 监控url变化
    window.addEventListener("hashchange", this.onHashChange.bind(this));
  }

  onHashChange() {
    this.current = window.location.hash.slice(1);
  }
}

// 参数1：Vue构造函数,install方法会在use的时候调用
KVueRouter.install = function(_Vue) {
  Vue = _Vue;

  // 1.挂载router实例，让我们的子组件中可以使用它
  // 为了解决install先执行，还要在这里访问router实例
  // 做一个全局混入，在beforeCreate钩子里面去做这件事
  Vue.mixin({
    beforeCreate() {
      // 此时，上下文已经是组件实例了
      // 如果this是根实例，则它的$options里面会有路由器实例
      if (this.$options.router) {
        Vue.prototype.$router = this.$options.router;
      }
    },
  });

  // 2.实现两个全局组件：router-link， router-view
  // <router-link to="/about">xxx</router-link>
  // <a href="#/about">xxx</a>
  Vue.component("router-link", {
    props: {
      to: {
        type: String,
        required: true,
      },
    },
    render(h) {
      // jsx写法，当前cli环境支持jsx
      // return <a href={"#" + this.to}>{this.$slots.default}</a>;
      // h(tag, props, children)
      return h(
        "a",
        {
          attrs: {
            href: "#" + this.to,
          },
        },
        [this.$slots.default]
      );
    },
  });
  Vue.component("router-view", {
    render(h) {
      // 获取current对应的组件并且渲染之
      // console.log(this.$router.current);
      let component = null;
      const route = this.$router.$options.routes.find(
        (route) => route.path === this.$router.current
      );
      if (route) {
        component = route.component
      }
      // h(Component)
      return h(component);
    },
  });
};

export default KVueRouter;
