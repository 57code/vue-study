let Vue;

// 声明一个路由器类Vue-Router
// 它是一个Vue插件：必须实现一个install方法
class VueRouter {
  constructor(options) {
    // 1.解析route选项
    this.$options = options;

    // 创建一个current保存最新hash
    // 创建一个响应式数据
    // defineReactive给一个对象定义响应式属性
    // 这样所有引用了current属性的组件，当current变化时，它们都会重新render
    Vue.util.defineReactive(this, 'current', "/")
    
    // 2.监控hash改变
    window.addEventListener("hashchange", () => {
      console.log(window.location.hash);
      // 只要#后面部分
      this.current = window.location.hash.slice(1);
    });
  }
}

// install方法接收Vue构造函数
VueRouter.install = function(_Vue) {
  Vue = _Vue;

  // 挂载$router
  // 利用Vue混入
  Vue.mixin({
    beforeCreate() {
      // 仅仅在Vue实例化的时候执行一次
      if (this.$options.router) {
        // 挂载之后所有组件均可通过this.$router访问路由器实例
        Vue.prototype.$router = this.$options.router;
      }
    },
  });

  // 声明router-link，router-view
  Vue.component("router-link", {
    props: {
      to: {
        type: String,
        default: "",
      },
    },
    render(h) {
      // <router-link to="/about">xxx</router-link>
      // <a href="#/about">xxx</a>
      // return <a href={'#'+this.to}>{this.$slots.default}</a>
      return h("a", { attrs: { href: "#" + this.to } }, this.$slots.default);
    },
  });
  Vue.component("router-view", {
    render(h) {
      let comp = null
      
      // 根据router的current，找到route选项里面与之对应的那个组件
      // 查找一个匹配的路由
      const route = this.$router.$options.routes.find(
        (route) => route.path === this.$router.current
      );
      if (route) {
        // 匹配
        comp = route.component
      }

      return h(comp);
    },
  });
};

export default VueRouter;
