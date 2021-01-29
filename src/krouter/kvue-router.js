// 实现一个类
class KVueRouter {

}

// 插件实现:install会在use被调用时调用
// 参数1是Vue构造函数
KVueRouter.install = function (Vue) {
  // this.$router
  // 挂在Vue原型上
  // 使用全局混入Vue.mixin(), 将router实例挂载过程延迟到Vue实例构建之后
  Vue.mixin({
    beforeCreate() {
      // this指的就是组件实例
      if (this.$options.router) {
        Vue.prototype.$router = this.$options.router
      }
    }
  })

  // 实现两个全局组件router-view router-link
  Vue.component('router-link', {
    // <a href="#/abc">abc</a>
    render(h) {
      return h('a', 'abc')
    }
  })
  
  Vue.component('router-view', {
    // <div>xxxx</div>
    render(h) {
      return h('div', 'router-view')
    }
  })
}

export default KVueRouter