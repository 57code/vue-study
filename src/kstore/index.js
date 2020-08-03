import Vue from 'vue'
import Vuex from './kvuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    counter: 0
  },
  mutations: {
    // state如何获取？
    add(state, num = 1) {
      state.counter += num
    }
  },
  actions: {
    // 此处上下文是什么
    add({ commit }) {
      setTimeout(() => {
        commit('add')
      }, 1000);
    }
  },
  getters: {
    doubleCounter(state) {
      return state.counter * 2
    }
  },
  modules: {
  }
})
