// 我们自己的vuex实现
let Vue;

class Store {
  constructor(options) {
    // 1.保存选项
    this._mutations = options.mutations;
    this._actions = options.actions;

    // 2.暴露state属性, 并对传入state选项做响应式处理
    // Vue.util.defineReactive(this, "state", this.$options.state);
    // _vm希望用户明白，不要访问它
    this._vm = new Vue({
      data() {
        return {
          // 加上$$避免Vue对该属性做代理
          // this._vm.counter这样是不行的
          $$state: options.state
        }
      },
    })

    // 绑定上下文，确保是store实例
    this.commit = this.commit.bind(this)
    this.dispatch = this.dispatch.bind(this)
  }

  get state() {
    return this._vm._data.$$state
  }

  set state(v) {
    console.error('please use replaceState to reset state');
  }

  // $store.commit(type, payload)
  commit(type, payload) {
    const entry = this._mutations[type]
    if (!entry) {
      console.error('unknown mutation!');
      return
    }
    entry(this.state, payload)
  }

  dispatch(type, payload) {
    const entry = this._actions[type]
    if (!entry) {
      console.error('unknown action!');
      return
    }
    entry(this, payload)
  }
}

function install(_Vue) {
  Vue = _Vue;

  // 注册$store
  Vue.mixin({
    beforeCreate() {
      if (this.$options.store) {
        Vue.prototype.$store = this.$options.store;
      }
    },
  });
}

// 导出对象就是Vuex
export default { Store, install };
