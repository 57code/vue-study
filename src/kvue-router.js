import Link from './krouter-link'
import View from './krouter-view'

let Vue;

class VueRouter {
  constructor(options) {
    this.$options = options;
    // path、component映射
    this.routeMap = {};
    // current保存当前hash
    // vue使其是响应式的
    Vue.util.defineReactive(this, 'current', '/')
    
    this.init()
  }
  init() {
    this.bindEvents();
    this.createRouteMap();
  }
  // hash变更检测
  bindEvents() {
    // window.addEventListener("load", this.onHashChange.bind(this), false);
    window.addEventListener("hashchange", this.onHashChange.bind(this), false);
  }

  // 路径变更处理
  onHashChange() {
    this.current = window.location.hash.slice(1) || "/";
  }

  // 创建路由映射表
  createRouteMap() {
    this.$options.routes.forEach(item => {
      this.routeMap[item.path] = item;
    });
  }

}

// 插件逻辑：注册$router，初始化router
VueRouter.install = function (_Vue) {
  Vue = _Vue;

  Vue.mixin({
    beforeCreate() {
      // router选项存在确定是根组件
      if (this.$options.router) {
        // 执行一次，将router实例放到Vue原型，以后所有组件实例就均有$router
        Vue.prototype.$router = this.$options.router;
        // this.$options.router.init();
      }
    }
  });

  Vue.component('RouterView', View)
  Vue.component('RouterLink', Link)
};

export default VueRouter;