let Vue;

// 声明一个路由器类Vue-Router
// 它是一个Vue插件：必须实现一个install方法
class VueRouter {}

// install方法接收Vue构造函数
VueRouter.install = function(_Vue) {
  Vue = _Vue;

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
      return h("div", "router-view");
    },
  });
};

export default VueRouter;
