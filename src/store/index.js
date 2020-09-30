import Vue from 'vue'
import Vuex from 'vuex'

// this.$store
// this.$store.state.xxx
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    counter: 0
  },
  mutations: {
    add(state) {
      // state从哪来？
      state.counter++
    }
  },
  actions: {
    add({commit}) {
      // 参数是什么，哪来的？
      setTimeout(() => {
        commit('add')
      }, 1000)
    }
  },
  modules: {
  }
})
