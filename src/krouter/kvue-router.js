let Vue

// 实现一个类
class KVueRouter {
  constructor(options) {
    this.$options = options;

    // 1.保存当前hash到current
    // current必须是响应式的数据
    Vue.util.defineReactive(this, 'current', '/')
    
    // 2.监听hash变化
    window.addEventListener("hashchange", () => {
      // 获取#后面的部分
      this.current = window.location.hash.slice(1);
      console.log(this.current);
    });
  }
}

// 插件实现:install会在use被调用时调用
// 参数1是Vue构造函数
KVueRouter.install = function(_Vue) {
  // 保存构造函数
  Vue = _Vue
  
  // this.$router
  // 挂在Vue原型上
  // 使用全局混入Vue.mixin(), 将router实例挂载过程延迟到Vue实例构建之后
  Vue.mixin({
    beforeCreate() {
      // this指的就是组件实例
      if (this.$options.router) {
        Vue.prototype.$router = this.$options.router;
      }
    },
  });

  // 实现两个全局组件router-view router-link
  Vue.component("router-link", {
    props: {
      to: {
        type: String,
        required: true,
      },
    },
    // <a href="#/abc">abc</a>
    // <router-link to="/abc">abc</router-link>
    render(h) {
      return h("a", { attrs: { href: "#" + this.to } }, this.$slots.default);
    },
  });

  Vue.component("router-view", {
    // <div>xxxx</div>
    render(h) {
      // 1.获取router
      const current = this.$router.current;

      let component = null;

      // 获取匹配的路由
      const route = this.$router.$options.routes.find(
        (route) => route.path === current
      );

      // 设置路由中的组件选项并渲染
      if (route) {
        component = route.component;
      }

      return h(component);
    },
  });
};

export default KVueRouter;
