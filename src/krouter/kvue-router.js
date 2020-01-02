let Vue;

// 1.实现一个插件：挂载$router

class KVueRouter {
  constructor(options) {
    this.$options = options

    // 需要创建响应式的current属性
    Vue.util.defineReactive(this, 'current', '/')

    // 监控url变化
    window.addEventListener('hashchange', this.onHashChange.bind(this))
    window.addEventListener('load', this.onHashChange.bind(this))
  }

  onHashChange() {
    console.log(window.location.hash);

    this.current = window.location.hash.slice(1)
  }
}

KVueRouter.install = function (_Vue) {
  // 保存构造函数，在KVueRouter里面使用
  Vue = _Vue;

  // 挂载$router
  // 怎么获取根实例中的router选项
  Vue.mixin({
    beforeCreate() {
      // 确保根实例的时候才执行
      if (this.$options.router) {
        Vue.prototype.$router = this.$options.router
      }

    }
  })


  // 任务2：实现两个全局组件router-link和router-view
  Vue.component('router-link', {
    props: {
      to: {
        type: String,
        required: true
      },
    },
    render(h) {
      // <a href="#/about">abc</a>
      // <router-link to="/about">xxx</router-link>
      // h(tag, data, children)
      console.log(this.$slots);
      return h('a', { attrs: { href: '#' + this.to } }, this.$slots.default)
      // return <a href={'#' + this.to}>{this.$slots.default}</a>
    }
  })
  Vue.component('router-view', {
    render(h) {
      //获取path对应的component
      let component = null;
      this.$router.$options.routes.forEach(route => {
        if (route.path === this.$router.current) {
          component = route.component
        }
      })
      return h(component)
    }
  })
}

export default KVueRouter