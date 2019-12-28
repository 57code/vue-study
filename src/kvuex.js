let Vue;

class Store {
  constructor(options = {}) {

    this._mutations = options.mutations || {}
    this._actions = options.actions || {}
    this._wrappedGetters = options.getters || {}

    const store = this
    const { commit, action } = store
    this.commit = function boundCommit(type, payload) {
      commit.call(store, type, payload)
    }
    this.action = function boundAction(type, payload) {
      return action.call(store, type, payload)
    }

    // 暴露getters给用户
    store.getters = {}
    // 定义computed选项
    const computed = {}
    Object.keys(this._wrappedGetters).forEach(key => {
      // 获取用户定义的getter
      const fn = this._wrappedGetters[key]
      // 转换为computed函数
      computed[key] = function () {
        // 注意使用store
        return fn(store.state)
      }
      // 为store.getters定义只读属性
      Object.defineProperty(store.getters, key, {
        get: () => store._vm[key]
      })
    })

    // Vue实例创建移到这里
    this._vm = new Vue({
      data: { $$state: options.state },
      computed // 利用computed缓存特性，getters体验更好
    })
  }

  get state() {
    return this._vm._data.$$state
  }

  set state(v) {
    console.error('please use replaceState to reset state');
  }

  commit(type, payload) {
    // 获取用户编写的type对应的mutation
    const entry = this._mutations[type]

    if (!entry) {
      console.error(`unknown mutation type: ${type}`);
      return
    }
    // 指定上下文为Store实例
    // 传递state给mutation
    entry(this.state, payload);
  }

  dispatch(type, payload) {
    // 获取用户编写的type对应的action
    const entry = this._actions[type]

    if (!entry) {
      console.error(`unknown action type: ${type}`);
      return
    }
    // 指定上下文为Store实例
    // 传递state给mutation
    return entry(this, payload);
  }
}

function install(_Vue) {
  Vue = _Vue;

  // 这样store执行的时候，就有了Vue，不用import
  // 这也是为啥Vue.use必须在新建store之前
  Vue.mixin({
    beforeCreate() {
      // 这样才能获取到传递进来的store
      // 只有root元素才有store，所以判断一下
      if (this.$options.store) {
        Vue.prototype.$store = this.$options.store
      }
    }
  })
}

export default { Store, install }