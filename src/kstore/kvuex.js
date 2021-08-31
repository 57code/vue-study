// 实现插件：
// 1. 声明一个Store类：维护响应式state，暴露commit/dispatch
// 2. install: 注册$store

class Store {
  constructor(options) {
    // 保存选项
    this.$options = options

    this._mutations = options.mutations
    this._actions = options.actions
    
    console.log(Vue);
    // api: state
    // 用户传入state选项应该是响应式的
    this._vm = new Vue({
      data() {
        return {
          // 不希望$$state被代理，所以加两个$
          $$state: options.state
        }
      },
    })

    this.commit = this.commit.bind(this)
    this.dispatch = this.dispatch.bind(this)
    
    // getter接口如何暴露
  }

  // 存取器
  get state() {
    // console.log(this._vm);
    return this._vm._data.$$state
  }
  
  set state(v) {
    console.error('请使用reaplaceState()去修改状态');
  }

  // commit('add')
  commit(type, payload) {
    // 匹配type对应的mutation
    const entry = this._mutations[type]
    if (!entry) {
      console.error('error');
      return 
    }
    entry(this.state, payload)
  }

  dispatch(type, payload) {
    // 匹配type对应的mutation
    const entry = this._actions[type]
    if (!entry) {
      console.error('error');
      return 
    }
    // 此处上下文是什么？
    // {commit, dispatch, state}
    return entry(this, payload)
  }
}

let Vue

function install(_Vue) {
  Vue = _Vue

  // 注册$store
  Vue.mixin({
    beforeCreate() {
      if (this.$options.store) {
        Vue.prototype.$store = this.$options.store
      }
    }
  })
}

// 导出对象是Vuex
export default { Store, install }