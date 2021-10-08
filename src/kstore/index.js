import Vue from 'vue'
import Vuex from './kvuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    counter: 1
  },
  mutations: {
    // state从何而来？
    add(state) {
      state.counter++
    }
  },
  actions: {
    // context: {commit, dispatch, state, rootState}
    add({commit}) {
      setTimeout(() => {
        commit('add')
      }, 1000);
    }
  },
})
