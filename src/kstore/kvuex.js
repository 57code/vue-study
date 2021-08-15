<<<<<<< HEAD
// 保存构造函数引用，避免import
=======
// 实现一个插件
// 实现Store
>>>>>>> 2c65389d71cbe23b8c86eeb55380a66a3bc0c45f
let Vue;

class Store {
  constructor(options) {
<<<<<<< HEAD
    // this.$options = options;
    this._mutations = options.mutations;
    this._actions = options.actions;

    // 响应化处理state
    // this.state = new Vue({
    //   data: options.state
    // })
    this._vm = new Vue({
      data: {
        // 加两个$，Vue不做代理
=======
    this._mutations = options.mutations
    this._actions = options.actions
    // 响应式处理的数据
    // this.state = new Vue({
    //   data: options.state
    // })
    // setInterval(() => {
    //   this.state.counter++
    // }, 1000);
    this._vm = new Vue({
      data: {
        // 添加$$, Vue就不会代理
>>>>>>> 2c65389d71cbe23b8c86eeb55380a66a3bc0c45f
        $$state: options.state
      }
    })

<<<<<<< HEAD
    // 绑定commit、dispatch的上下文问store实例
    this.commit = this.commit.bind(this)
    this.dispatch = this.dispatch.bind(this)
  }

  // 存取器， store.state
  get state() {
    console.log(this._vm);
    
=======
    this.commit = this.commit.bind(this)
    this.dispatch = this.dispatch.bind(this)

    // getters
    
  }

  get state() {
>>>>>>> 2c65389d71cbe23b8c86eeb55380a66a3bc0c45f
    return this._vm._data.$$state
  }

  set state(v) {
<<<<<<< HEAD
    console.error('你造吗？你这样不好！');
    
  }

  // store.commit('add', 1)
  // type: mutation的类型
  // payload：载荷，是参数
  commit(type, payload) {
    const entry = this._mutations[type]
    if (entry) {
      entry(this.state, payload)
    }
  }

  dispatch(type, payload) {
    const entry = this._actions[type]
    if (entry) {
      entry(this, payload)
    }
  }

}

function install(_Vue) {
  Vue = _Vue;

=======
    console.error('请使用replaceState重置状态');
  }

  // 修改状态，commit('add', payload)
  commit(type, payload) {
    // 1.根据type获取mutation
    const mutation = this._mutations[type]

    if(!mutation) {
      console.error('mutation不存在');
      return 
    }

    mutation(this.state, payload)
  }

  // dispatch('add', payload)
  dispatch(type, payload) {
    const action = this._actions[type]

    if(!action) {
      console.error('action不存在');
      return 
    }

    action(this, payload)
  }

}
function install(_Vue) {
  Vue = _Vue;

  // 注册$store
>>>>>>> 2c65389d71cbe23b8c86eeb55380a66a3bc0c45f
  Vue.mixin({
    beforeCreate() {
      if (this.$options.store) {
        Vue.prototype.$store = this.$options.store
      }
    }
  })
<<<<<<< HEAD

}

// Vuex
export default {
  Store,
  install
}
=======
}

// 现在导出的就是Vuex
export default { Store, install };
>>>>>>> 2c65389d71cbe23b8c86eeb55380a66a3bc0c45f
