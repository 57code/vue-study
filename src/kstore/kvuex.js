let Vue;

// 创建一个Store类
// 保存用户选项，
// 对state做响应式处理，
// 提供可预测变更方法commit,
// 复杂业务和异步操作需要使用dispatch
class Store {
  constructor(options) {
    // 保存配置
    this.$options = options;

    // 对state做响应式处理
    // Vue初始化的时候，会对data做响应式处理，
    // 同时它还会做代理，data中响应式属性会被代理到Vue实例上
    this._vm = new Vue({
      data: {
        $$state: options.state, // 加上两个$，就不会代理
      },
    });

    // 绑定上下文
    this.commit = this.commit.bind(this)
    this.dispatch = this.dispatch.bind(this)
  }

  get state() {
    return this._vm._data.$$state;
  }

  set state(v) {
    console.error("请使用replaceState()重置状态");
  }

  // 实现提交变更方法commit
  // commit(type, payload)
  commit(type, payload) {
    // 获取type在mutaions选项中对应的函数
    // 并调用该函数
    const fn = this.$options.mutations[type];

    if (!fn) {
      console.error("mutaion不存在");
      return;
    }

    fn(this.state, payload);
  }

  dispatch(type, payload) {
    // 获取type在mutaions选项中对应的函数
    // 并调用该函数
    const fn = this.$options.actions[type];

    if (!fn) {
      console.error("actijon不存在");
      return;
    }

    // action()
    fn(this, payload);
  }
}

function install(_Vue) {
  Vue = _Vue;
  // 挂$store，保存Store实例
  Vue.mixin({
    beforeCreate() {
      if (this.$options.store) {
        Vue.prototype.$store = this.$options.store;
      }
    },
  });
}

export default { Store, install };
