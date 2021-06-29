let Vue;

// 我们自己的router
// 声明插件VueRouter
class VueRouter {
  constructor(options) {
    // 1.保存路由选项
    this.$options = options;

    // current一个初始值
    // 如何是current成为一个响应式数据
    // 此方法可以给一个对象指定一个响应式属性
    Vue.util.defineReactive(
      this,
      "current",
      window.location.hash.slice(1) || "/"
    );

      // 2.监控hash变化
      window.addEventListener("hashchange", () => {
        // hash: #/about
        this.current = window.location.hash.slice(1);
      });
  }
}

// 参数1：Vue构造函数
VueRouter.install = function(_Vue) {
  // 传入构造函数，是不是就能对其进行扩展呀
  Vue = _Vue;

  // 1.注册$router,让所有组件实例都可以访问它
  // 混入：Vue.mixin({})
  Vue.mixin({
    beforeCreate() {
      // 延迟执行：延迟到router实例和vue实例都创建完毕
      if (this.$options.router) {
        // 如果存在说明是根实例
        Vue.prototype.$router = this.$options.router;
      }
    },
  });

  // 2.注册两个全局组件：router-link，router-view
  // <router-link to="/home">home</router-link>
  Vue.component("router-link", {
    props: {
      to: {
        type: String,
        required: true,
      },
    },
    render(h) {
      // <a href="#/home">xxx</a>
      // h是render函数调用时，框架传入的createElement
      // 等同于react中createElement，返回vdom
      // return <a href={'#'+this.to}>{this.$slots.default}</a>
      return h(
        "a",
        {
          attrs: {
            href: "#" + this.to,
          },
        },
        this.$slots.default
      );
    },
  });
  Vue.component("router-view", {
    render(h) {
      let component = null;
      // 1.获取当前url的hash部分
      // 2.根据hash部分从路由表中获取对应的组件
      const route = this.$router.$options.routes.find(
        (route) => route.path === this.$router.current
      );
      console.log(this.$router.current, this.$router.$options);
      if (route) {
        component = route.component;
      }
      return h(component);
    },
  });
};

export default VueRouter;
