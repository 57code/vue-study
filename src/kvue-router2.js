import Link from './krouter-link'
import View from './krouter-view'

let Vue; // 引用构造函数，VueRouter中要使用

// 保存选项
class VueRouter {
  constructor(options) {
    this.$options = options;

    Vue.util.defineReactive(this, 'matched', [])

    this.current = window.location.hash.slice(1) || '/'
    this.match()

    window.addEventListener("hashchange", () => {
      this.current = window.location.hash.slice(1)
      this.matched = []
      this.match()
    });

    // this.routeMap = {}
    // this.$options.routes.forEach(route => {
    //   this.routeMap[route.path] = route
    // });
  }

  match(routes = this.$options.routes) {    
    routes.forEach(route => {
      if (route.path === '/' && route.path === this.current) {
        this.matched.push(route)
        return
      }
      if (route.path !== '/' && this.current.startsWith(route.path)) {
        this.matched.push(route)
        if (route.children) {
          this.match(route.children)
        }
        return
      }
    });
  }
}

// 插件：实现install方法，注册$router
VueRouter.install = function (_Vue) {
  // 引用构造函数，VueRouter中要使用
  Vue = _Vue;

  Vue.mixin({
    beforeCreate() {
      // 只有根组件拥有router选项
      if (this.$options.router) {
        // vm.$router
        Vue.prototype.$router = this.$options.router;
      }
    }
  });

  Vue.component('router-link', Link)
  Vue.component('router-view', View)
};

export default VueRouter;