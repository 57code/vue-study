import Vue from "vue";
import Vuex from "./kvuex";

// 想要执行install：
// 1.this.$store
Vue.use(Vuex);

export default new Vuex.Store({
  // state应该是响应式的
  state: {
    counter: 10,
  },
  mutations: {
    // state从何而来？
    add(state) {
      state.counter++;
    },
  },
  actions: {
    add({ commit }) {
      setTimeout(() => {
        commit("add");
      }, 1000);
    },
  },
  getters: {
    doubleCounter: state => {
      return state.counter * 2;
    }
  }
});
