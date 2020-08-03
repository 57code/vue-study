import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    counter: 0
  },
  mutations: {
    // state如何获取？
    add(state) {
      state.counter++
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
  modules: {
  }
})
