let Vue

// 实现一个插件
class Store {
  constructor(options) {
    console.log(Vue, options);
    // 1.Vue.util.defineReactive(this, 'state', options.state)
    // 2.new Vue()
    this._mutations = options.mutations
    this._actions = options.actions
    
    this._vm = new Vue({
      data() {
        return {
          // 加上两个$, 不让Vue做代理
          $$state: options.state
        }
      },
    })

    this.commit = this.commit.bind(this)
    this.dispatch = this.dispatch.bind(this)
  }

  get state() {
    console.log(this._vm);
    return this._vm._data.$$state
  }
  set state(v) {
    console.error('不能直接覆盖state，你可以使用replaceState');
  }

  // commit('add', 10)
  commit(type, payload) {
    const mutation = this._mutations[type]
    if (!mutation) {
      console.error('错误mutation名称');
      return
    }
    mutation(this.state, payload)
  }

  dispatch(type, payload) {
    const action = this._actions[type]
    if (!action) {
      console.error('错误action名称');
      return
    }
    action(this, payload)
  }
}

function install(_Vue) {
  Vue = _Vue

  // 注册$store
  Vue.mixin({
    beforeCreate() {
      if (this.$options.store) {
        // console.log('我是根实例', this);
        Vue.prototype.$store = this.$options.store
      }
    }
  })
}

// { Store }代表Vuex
export default { Store, install };
