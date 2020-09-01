// 路由器插件
// Vue.use(KVueRouter)
// 1.实现一个静态install方法
let Vue

class KVueRouter {
  constructor(options) {
    this.$options = options
    console.log(Vue);
    
  }
}

// 参数1：Vue构造函数,install方法会在use的时候调用
KVueRouter.install = function(_Vue) {
  Vue = _Vue

  // 1.挂载router实例，让我们的子组件中可以使用它
  // 为了解决install先执行，还要在这里访问router实例
  // 做一个全局混入，在beforeCreate钩子里面去做这件事
  Vue.mixin({
    beforeCreate() {
      // 此时，上下文已经是组件实例了
      // 如果this是根实例，则它的$options里面会有路由器实例
      if (this.$options.router) {
        Vue.prototype.$router = this.$options.router
      }
    }
  })
   
  // 2.实现两个全局组件：router-link， router-view
  // <router-link to="/about">xxx</router-link>
  // <a href="#/about">xxx</a>
  Vue.component('router-link', {
    props: {
      to: {
        type: String,
        required: true
      },
    },
    render(h) {
      return h('a', {
        attrs: {
          href: '#' + this.to
        }
      }, [this.$slots.default])
    }
  })
  Vue.component('router-view', {
    render(h) {
      return h('div', 'router-view')
    }
  })

}

export default KVueRouter