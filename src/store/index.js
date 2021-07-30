import Vue from 'vue'
import Vuex from 'vuex'

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
    add({commit}) {
      setTimeout(() => {
        commit('add')
      }, 1000);
    }
  },
  modules: {
  }
})
