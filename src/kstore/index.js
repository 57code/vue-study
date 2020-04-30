import Vue from 'vue'
import Vuex from './kvuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    counter: 0
  },
  mutations: {
    add(state) {
      // state是哪来的？
      state.counter++
    }
  },
  actions: {
    add({commit}) {
      // 上面的上下文是哪来的？它是什么
      setTimeout(() => {
        commit('add')
      }, 1000);
    }
  },
  modules: {
  }
})
