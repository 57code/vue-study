let Vue;
// vue插件形式：
// 实现一个install方法，该方法会在use的时候被调用
class KVueRouter {
  constructor(options) {
    // 选项中包含路由配置信息，保存之
    this.$options = options;

    // 需要将current属性声明为响应式的
    Vue.util.defineReactive(
      this,
      "current",
      window.location.hash.slice(1) || "/"
    );

    // set方法接收obj必须是响应式的
    // Vue.set(obj, key, val)

    // 2.监听hashchang事件，并且在变化的时候响应
    window.addEventListener("hashchange", () => {
      // hash: #/about
      console.log(this.current);
      this.current = window.location.hash.slice(1);
    });
  }
}

// 形参1是Vue构造函数
KVueRouter.install = function(_Vue) {
  // 传入构造函数，我们可以修改它的原型，起到扩展的作用
  Vue = _Vue;

  // install中this是KVueRouter

  // 1.注册$router
  // 延迟执行接下来代码，等到router实例创建之后
  // 全局混入：Vue.mixn
  Vue.mixin({
    beforeCreate() {
      // 此处this指的是组件实例
      if (this.$options.router) {
        Vue.prototype.$router = this.$options.router;
      }
    },
  });

  // 2.注册router-link和router-view全局组件
  Vue.component("router-link", {
    props: {
      to: {
        type: String,
        required: true,
      },
    },
    render(h) {
      // h是createElement, 返回vnode
      // 获取插槽内容
      // <router-link to="/about"></router-link>
      // <a href="#/about"></a>
      // return <a href={'#' + this.to}>{this.$slots.default}</a>
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
      // 数据响应式：数据变化可侦听，使用这些数据组件就会和响应式数据产生依赖关系
      // 将来如果响应式数据发生变化，这些组件会重新渲染
      // 0.获取router实例
      // console.log(this.$router.$options, this.$router.current);
      let component = null;
      const route = this.$router.$options.routes.find(
        (route) => route.path === this.$router.current
      );
      if (route) {
        component = route.component;
      }
      // 1.获取hash部分，获取path
      // 2.根据path，从路由表中获取组件
      return h(component);
    },
  });
};

export default KVueRouter;
