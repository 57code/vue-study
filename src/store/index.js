import Vue from 'vue'
import Vuex from 'vuex'
<<<<<<< HEAD
import user from './user';
import permission from './permission';
=======
>>>>>>> 2c65389d71cbe23b8c86eeb55380a66a3bc0c45f

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    counter: 0
  },
<<<<<<< HEAD
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
  modules: {
<<<<<<< HEAD
    user, permission
=======
>>>>>>> 2c65389d71cbe23b8c86eeb55380a66a3bc0c45f
  }
})
