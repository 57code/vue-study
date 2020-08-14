import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 区别也是创建工厂函数
export function createStore () {
  return new Vuex.Store({
    state: {
        count:108
    },
    mutations: {
      add(state){
        state.count += 1;
      },
      init(state, count) {
        state.count = count;
      },
    },
    actions: {
      // 加一个异步请求count的action
      getCount({ commit }) {
        console.log('action:getCount');
        return new Promise(resolve => {
          setTimeout(() => {
            commit("init", Math.random() * 100);
            resolve();
          }, 1000);
        });
      },
    },
  })
}