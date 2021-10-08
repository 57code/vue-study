// 1.实现vue插件VueRouter
let Vue;
class VueRouter {
  constructor(options) {
    console.log(Vue);
    console.log(options);
    // 用户传入选项保存到Router实例上
    this.options = options;

    // 监控url变化
    // current应该是一个响应式数据
    Vue.util.defineReactive(
      this,
      "current",
      window.location.hash.slice(1) || "/"
    );
    // this.current = "/";
    window.addEventListener("hashchange", () => {
      this.current = window.location.hash.slice(1);
      console.log(this.current);
    });
  }
}

// 静态install方法
// 形参1是Vue构造函数
VueRouter.install = function(_Vue) {
  Vue = _Vue;

  // 1.1.注册全局组件
  Vue.component("router-link", {
    // template: "<a>router-link</a>",
    props: {
      to: {
        type: String,
        required: true,
      },
    },
    render(h) {
      // h -> createElement
      // 返回vnode
      // <router-link to="/about">xxx</router-link>
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
    // template: "<div>router-view</div>",
    render(h) {
      // 1.获取hash地址 #/about
      // 2.根据/about，从路由配置表里面找到对应component
      let component = null;
      const route = this.$router.options.routes.find(
        (item) => item.path === this.$router.current
      );
      if (route) {
        component = route.component;
      }
      return h(component);
    },
  });

  // 1.2.注册$router
  Vue.mixin({
    beforeCreate() {
      // 延迟到未来某个时刻：Vue实例创建之时
      if (this.$options.router) {
        Vue.prototype.$router = this.$options.router;
      }
    },
  });
};

export default VueRouter;
