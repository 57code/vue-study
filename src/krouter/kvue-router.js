// 1.插件
// 2.两个组件

// vue插件：
// function
// 要求必须有一个install，将来会被Vue.use调用
let Vue; // 保存Vue构造函数，插件中要使用，不导入还能用
class VueRouter {
  constructor(options) {
    this.$options = options;

    // 把current作为响应式数据
    // 将来发生变化，router-view的render函数能够再次执行
    const initial = window.location.hash.slice(1) || "/";
    Vue.util.defineReactive(this, 'current', initial)

    // 监听hash变化
    window.addEventListener("hashchange", () => {
      console.log(this.current);
      this.current = window.location.hash.slice(1);
    });
  }
}
// 参数1是Vue.use调用时传入的
VueRouter.install = function(_Vue) {
  Vue = _Vue;

  // 1.挂载$router属性
  // this.$router.push()
  // 全局混入目的：延迟下面逻辑到router创建完毕并且附加到选项上时才执行
  Vue.mixin({
    beforeCreate() {
      // 次钩子在每个组件创建实例时都会调用
      // 根实例才有该选项
      if (this.$options.router) {
        Vue.prototype.$router = this.$options.router;
      }
    },
  });

  // 2.注册实现两个组件router-view,router-link
  Vue.component("router-link", {
    props: {
      to: {
        type: String,
        required: true,
      },
    },
    render(h) {
      // <a href="to">xxx</a>
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
      // 获取当前路由对应的组件
      let component = null
      const route = this.$router.$options.routes.find(
        (route) => route.path === this.$router.current
      );
      if (route) {
        component = route.component
      }
      console.log(this.$router.current, component);
      

      return h(component);
    },
  });
};

export default VueRouter;
