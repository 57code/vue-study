import Vue from 'vue'
import Vuex from './kvuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    counter: 0,
  },
  mutations: {
    add(state) {
      state.counter++
    }
  },
  actions: {
    // 参数怎么来的？
    add({ commit }) {
      // 业务逻辑组合或者异步
      setTimeout(() => {
        commit('add')
      }, 1000);
    }
  },
  getters: {
    doubleCounter: state => {
      return state.couter*2;
    },
  },
  modules: {
  }
})
