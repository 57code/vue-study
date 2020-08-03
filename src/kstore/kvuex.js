// 1.实现插件
let _Vue
class Store {
  constructor(options) {
    this._mutations = options.mutations
    this._actions = options.actions
    
    // 创建响应式的state
    // this.$store.state.counter
    this._vm = new _Vue({
      data() {
        return {
          // 不希望被代理，就加上$
          $$state: options.state
        }
      },
    })

    // 修改this指向
    this.commit = this.commit.bind(this)
    this.dispatch = this.dispatch.bind(this)

    // getters
    this.getters = {}
    // computed
  }

  get state() {
    return this._vm._data.$$state
  }

  set state(v) {
    console.error('please use replaceState to reset state');
    
  }

  // 修改state
  // this.$store.commit('add', 1)
  commit(type, payload) {
    // 获取tpe对应的mutation
    const fn = this._mutations[type]

    if (!fn) {
      console.error('unknown mutaion');
      return
    }

    // 传入state作为参数
    fn(this.state, payload)

  }

  dispatch(type, payload) {
    // 获取type对应的action
    const fn = this._actions[type]

    if (!fn) {
      console.error('unknown action');
      return
    }

    // 传入当前Store实例做上下文
    return fn(this, payload)
  }

}

function install(Vue) {
  _Vue = Vue

  // 混入
  Vue.mixin({
    beforeCreate() {
      if (this.$options.store) {
        Vue.prototype.$store = this.$options.store
      }
    }
  })
}

// 导出的对象就是Vuex
export default { Store, install }