// 创建一个Store类：
// 1.拥有state属性，是响应式的
// 2.拥有两个方法commit,dispatch可以执行mutaions和actions函数
let Vue

class Store {
  constructor(options) {
    // Vue.util.defineReactive(this, 'state', options.state)
    this._vm = new Vue({
      data: {
        $$state: options.state
      }
    })

    // 保存用户传入mutations
    this._mutations = options.mutations
    this._actions = options.actions

    // 绑定this
    this.commit = this.commit.bind(this)
    this.dispatch = this.dispatch.bind(this)
  }

  get state() {
    return this._vm.$data.$$state
  }

  set state(v) {
    console.error('不能修改state');
  }

  commit(type, payload) {
    const entry = this._mutations[type]

    if (!entry) {
      console.error('未知的mutation');
      return 
    }

    entry(this.state, payload)
  }

  dispatch(type, payload) {
    const entry = this._actions[type]

    if (!entry) {
      console.error('未知的action');
      return 
    }

    entry(this, payload)
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

// 导出的对象就是Vuex
export default { Store, install };
