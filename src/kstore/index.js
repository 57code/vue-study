import Vue from 'vue'
import Vuex from './kvuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    counter: 1
  },
  mutations: {
    // state从何而来
    add(state) {
      state.counter++
    }
  },
  actions: {
    add({commit}) {
      setTimeout(() => {
        commit('add')
      }, 1000);
    }
  },
  getters: {
    doubleCounter: state => {
      return state.counter * 2;
    }
  },
  modules: {
  }
})
