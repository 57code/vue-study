// 引用传入Vue构造函数
let Vue

// VueRouter类: new VueRouter({routes: [...]})
class VueRouter {
  constructor(options) {
    // 保存选项备用
    this.$options = options

    // 处理routes
    this.routeMap = {}
    this.$options.routes.forEach(route => {
      this.routeMap[route.path] = route
    })

    // 创建current保存当前url
    // 为了让使用current的组件重新渲染
    // 他应该是响应式的
    Vue.util.defineReactive(this, 'current', '/')

    // 监听hashchange时间
    window.addEventListener('hashchange', this.onHashChange.bind(this))
  }

  onHashChange() {
    // 修改当前url, hash的格式#/xxx
    this.current = window.location.hash.slice(1)
    console.log(this.current);

  }
}

// 实现install方法
// 实现静态install方法即可
// 参数1：Vue构造函数，Vue.use(VueRouter)
VueRouter.install = function (_Vue) {
  Vue = _Vue

  // 1.挂载VueRouter实例
  // 为了能够拿到Vue根实例中的router实例
  // 可以利用全局混入
  Vue.mixin({
    beforeCreate() {
      // 上下文已经是组件实例了
      if (this.$options.router) {
        Vue.prototype.$router = this.$options.router
      }
    }
  })


  // 2.注册两个组件router-view，router-link
  Vue.component('router-view', {
    render(h) {
      // console.log('router-view render', this.$router.current);
      const {routeMap, current} = this.$router
      const component = routeMap[current] ? routeMap[current].component : null
      return h(component)
    }
  })

  // <router-link to="/">xxx</router-link>
  Vue.component('router-link', {
    props: {
      to: {
        type: String,
        default: ''
      },
    },
    render(h) {
      // 参数1tag类型
      // 参数2传入各种属性和事件
      return h('a', { attrs: { href: '#' + this.to } }, this.$slots.default)
      // 也可以使用jsx
      // return <a href={'#' + this.to}>{this.$slots.default}</a>
    }
  })
}

export default VueRouter