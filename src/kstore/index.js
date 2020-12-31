import Vue from 'vue'
import Vuex from './kvuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    add(state) {
      // state从哪来
      state.count++
    }
  },
  actions: {
    // 上下文对象是什么，从哪来
    add({commit}) {
      setTimeout(() => {
        commit('add')
      }, 1000);
    }
  },
  getters: {
    doubleCounter: state => {
      return state.count * 2;
    }
  },
  modules: {
  }
})
