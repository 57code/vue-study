// 1.实现Store类，存储响应式状态
let Vue

// 1.存储一个响应式的state
class Store {
  constructor(options) {
    // 保存选项
    this.$options = options
    // 保存mutaions
    this._mutations = options.mutations
    this._actions = options.actions

    // 响应式操作
    // Vue.defineReactive()
    this._vm = new Vue({
      data: {
        // 加上$$, 既要对state做响应式，还不做代理
        $$state: options.state
      }
    })
    
    // 绑定commit和dispatch上下文为store实例
    this.commit = this.commit.bind(this)
    this.dispatch = this.dispatch.bind(this)

    // getters
    // 如何动态定义getters中的这些属性
    // 而且还可以对其进行拦截，可以执行这个getter定义的函数
    // defineProperty()
    // 能不能利用Vue计算属性，这样性能更好
    this.getters
  }

  // type - 调用的mutation的名字
  commit(type, payload) {
    const entry = this._mutations[type]

    if(!entry) {
      console.error('unknown mutation')
      return
    }

    entry(this.state, payload)
  }

  dispatch(type, payload) {
    const entry = this._actions[type]

    if(!entry) {
      console.error('unknown action')
      return
    }

    entry(this, payload)
  }
  
  get state() {
    console.log(this._vm);
    return this._vm._data.$$state
  }

  set state(v) {
    console.error('请使用replaceState重置状态');
  }
}

function install(_Vue) {
  Vue = _Vue
  
  // 挂载$store
  Vue.mixin({
    beforeCreate() {
      if (this.$options.store) {
        Vue.prototype.$store = this.$options.store
      }
    }
  })
}

// 导出的对象才是Vuex
export default { Store, install };
