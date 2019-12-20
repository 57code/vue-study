import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import persist from './plugins/persist'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user
  },
  strict: true,
  plugins: [persist]
})
