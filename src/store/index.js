import Vue from 'vue'
import Vuex from 'vuex'
import user from './user';
import permission from './permission';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    counter: 0
  },
  getters: {
    doubleCounter(state) {
      return state.counter * 2
    },
    roles: state => state.user.roles,
    hasRoles: state => state.user.roles && state.user.roles.length > 0,
    permission_routes: state => state.permission.routes
  },
  mutations: {
    add(state) {
      state.counter++
      // this.state
    }
  },
  actions: {
    add({ commit }) {
      setTimeout(() => {
        commit('add')
      }, 1000);
    }
  },
  modules: {
    user, permission
  }
})
