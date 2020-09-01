// 1.实现一个Vuex插件
// 2.实现一个Store类
      // 2.1.响应式的数据state
      // 2.2.commit()实现
      // 2.3.dispatch()实现
// 3.挂载到Vue.prototype
let Vue
class Store {
  constructor(options) {
    // 保存mutations
    this._mutations = options.mutations
    this._actions = options.actions
    
    // 响应式的数据state
    this._vm = new Vue({
      data: {
        $$state: options.state
      }
    })

    this.commit = this.commit.bind(this)
    this.dispatch = this.dispatch.bind(this)

    // getters
    this.getters = {}
    // 遍历getters配置，动态设置计算属性，它们的值是getters的函数计算结果
    // 响应式的属性怎么设置？ 
    
    // 可以利用Vue computed特性
  }

  get state() {
    return this._vm._data.$$state
  }
  set state(v) {
    console.error('please use replaceState to reset state');
  }

  // 实现commit
  // store.commit(type, payload)
  commit(type, payload) {
    const entry = this._mutations[type]

    if (!entry) {
      console.error('unknown mutation type');
      return
    }
    // 指定一下上下文
    entry(this.state, payload)
  }

  dispatch(type, payload) {
    const entry = this._actions[type]

    if (!entry) {
      console.error('unknown action type');
      return
    }
    // 指定一下上下文即Store实例
    return entry(this, payload)
  }
}

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

// 默认导出就是Vuex
export default {Store, install}