// 1.声明一个插件
// 2.实现一个Store
//    实现响应式state属性
//    实现两个方法commit()/dispatch()

let Vue;

class Store {
  constructor(options) {
    // 1.保存选项
    this._mutations = options.mutations || {};
    this._actions = options.actions || {};

    // 2.做响应式状态state属性
    // Vue.util.defineReactive(this, 'state', {})
    this._vm = new Vue({
      data: {
        $$state: options.state,
      },
    });

    // 上下文绑定
    this.commit = this.commit.bind(this)
    this.dispatch = this.dispatch.bind(this)

    // getters
    // 1.动态设置getters属性
    // 2.响应式
    // 附加：能否利用上vue computed
    this.getters = {}
  }

  // 给用户暴露接口
  get state() {
    console.log(this._vm);
    return this._vm._data.$$state;
  }

  set state(v) {
    console.error("please use replaeState to reset state");
  }

  // store.commit(type, payload)
  commit(type, payload) {
    // 获取mutations
    const entry = this._mutations[type];

    if (!entry) {
      console.error("unknown mutation type");
    }

    entry(this.state, payload);
  }

  dispatch(type, payload) {
    // 获取actions
    const entry = this._actions[type];

    if (!entry) {
      console.error("unknown actions type");
    }

    // {commit, dispatch, state, getters}
    entry(this, payload);
  }
}

function install(_Vue) {
  Vue = _Vue;

  // 挂载$store
  Vue.mixin({
    beforeCreate() {
      if (this.$options.store) {
        // 给每个组件实例暴露store实例
        Vue.prototype.$store = this.$options.store;
      }
    },
  });
}

// 导出对象相当于Vuex
export default { Store, install };
