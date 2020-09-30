// 1.插件：挂载$store
// 2.实现Store

let Vue;

class Store {
  constructor(options) {
    // data响应式处理
    // this.$store.state.xx
    this._vm = new Vue({
      data: {
        $$state: options.state
      }
    })

    this._mutations = options.mutations
    this._actions = options.actions

    this.commit = this.commit.bind(this)
    this.dispatch = this.dispatch.bind(this)

    this.getters = {}
    // defineProperty(this.getters, 'doubleCounter', {get(){}})
    // 最后还能利用vue计算属性做缓存
  }

  get state() {
    return this._vm._data.$$state
  }

  set state(v) {
    console.error('please use replaceState to reset state');
    
  }
  
  commit(type, payload) {
    const entry = this._mutations[type]
    if (!entry) {
      console.error('unkown mutation type');
    }

    entry(this.state, payload)
  }
  
  dispatch(type, payload) {
    const entry = this._actions[type]
    if (!entry) {
      console.error('unkown action type');
    }

    entry(this, payload)
  }
  
}

// Vue.use
// install.apply(this, [this,...])
function install(_Vue) {
  Vue = _Vue

  Vue.mixin({
    beforeCreate() {
      if (this.$options.store) {
        Vue.prototype.$store = this.$options.store
      }
    }
  })
}

export default { Store, install };
