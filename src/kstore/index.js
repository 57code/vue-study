import Vue from 'vue'
import Vuex from './kvuex'

// Vuex是一个插件，它内部应该有install
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
    // 此处ctx是什么，从何而来？
    // ctx: {commit, dispatch, state, rootState}
    add({commit}) {
      setTimeout(() => {
        console.log(this);
        commit('add')
      }, 1000);
    }
  },
  getters: {
    doubleCounter: state => {
      return state.counter * 2;
    }
  }
})
