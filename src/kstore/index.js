import Vue from 'vue'
import Vuex from './kvuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    counter: 0
  },
<<<<<<< HEAD
  getters: {
    doubleCounter(state) {
      return state.counter * 2
    }
  },
  mutations: {
    add(state) {
      state.counter++
      // this.state
    }
  },
  actions: {
    // 结构上下文
    add({ commit }) {
=======
  mutations: {
    add(state) {
      state.counter++
    }
  },
  actions: {
    add({commit}) {
>>>>>>> 2c65389d71cbe23b8c86eeb55380a66a3bc0c45f
      setTimeout(() => {
        commit('add')
      }, 1000);
    }
  },
<<<<<<< HEAD
  modules: {
=======
  getters: {
    doubleCounter: state => {
      return state.couter * 2;
    }
>>>>>>> 2c65389d71cbe23b8c86eeb55380a66a3bc0c45f
  }
})
