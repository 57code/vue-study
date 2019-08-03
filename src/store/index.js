import Vue from "vue";
import Vuex from "vuex";
import count from './count'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    a: count
  }
});
