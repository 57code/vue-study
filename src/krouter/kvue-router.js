// 我们的自己的插件
// 实现⼀个插件
// 实现VueRouter类
// 处理路由选项
// 监控url变化，hashchange
// 响应这个变化
// 实现install⽅法

let Vue;

// new VueRouter({routes})
class KVueRouter {
  constructor(options) {
    this.$options = options;

    // current必须是响应式的
    // 如何做到？
    // set只能在响应式对象上动态添加新属性
    // new Vue({data() {
    //   return {
    //     key: value
    //   }
    // },})
    Vue.util.defineReactive(
      this,
      "current",
      window.location.hash.slice(1) || "/"
    );
    // this.current = window.location.hash.slice(1) || '/'
    // 监控hashchange
    window.addEventListener("hashchange", () => {
      console.log(this.current);
      this.current = window.location.hash.slice(1);
    });
  }
}

// vue插件：需要实现一个静态方法install
// install(Vue, ...)
KVueRouter.install = function(_Vue) {
  Vue = _Vue;

  // console.log(this);
  // $router注册
  // 延迟执行注册代码
  // 混入：Vue.mixin({beforeCreate(){}})
  Vue.mixin({
    beforeCreate() {
      // console.log(this); // this是组件实例
      // 如果当前this是根组件，它选项中必有一个router
      if (this.$options.router) {
        Vue.prototype.$router = this.$options.router;
      }
    },
  });

  // 两个全局组件: router-link、router-view
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
      // return <a href={"#" + this.to}>{this.$slots.default}</a>
      return h("a", { attrs: { href: "#" + this.to } }, this.$slots.default);
    },
  });
  Vue.component("router-view", {
    // render什么时候会执行？
    // init执行一次
    // 未来响应式数据变化会再次执行
    render(h) {
      // 1.获取hash部分#/about
      // this.$router.$options.routes
      // 2.根据上面地址获取对应组件配置About
      // 3.h(About)
      console.log(this.$router.$options);
      console.log(this.$router.current);
      let component = null;
      const route = this.$router.$options.routes.find(
        (route) => route.path === this.$router.current
      );
      if (route) {
        component = route.component;
      }
      return h(component);
    },
  });
};

export default KVueRouter;
