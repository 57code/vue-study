import Vue from 'vue'
import Vuex from './kvuex'

// 实现一个插件：$store挂载
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 1
  },
  mutations: {
    add(state) {
      // state怎么来的
      state.count++
    }
  },
  getters: {
    doubleCount: state => {
      return state.count * 2;
    }
  },
  actions: {
    asyncAdd({commit}) {
      setTimeout(() => {
        commit('add')
      }, 1000);
    }
  },
  modules: {
  }
})
