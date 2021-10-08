// 1.实现插件
let Vue
class Store {
  constructor(options) {
    this._mutations = options.mutations
    this._actions = options.actions
    // 需要对options.state做响应式处理
    // Vue.util.defineReactive()
    this._vm = new Vue({
      data() {
        return {
          // $$state是不会代理到_vm上的
          $$state: options.state
        }
      },
    })

    this.commit = this.commit.bind(this)
    this.dispatch = this.dispatch.bind(this)
  }
  get state() {
    return this._vm._data.$$state
  }
  set state(v) {
    console.error('please use replaceState reset state');
  }

  // 修改状态
  // store.commit('add', 1)
  commit(type, payload) {
    const entry = this._mutations[type]
    if (!entry) {
      console.error('unknown mutation: ' + type);
      return
    }
    entry(this.state, payload)
  }

  dispatch(type, payload) {
    const entry = this._actions[type]
    if (!entry) {
      console.error('unknown action: ' + type);
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
export default { Store, install };
