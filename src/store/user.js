import {addAuthRoute} from '@/router/index'

export default {
  namespaced: true, // 设置独立命名空间，避免命名冲突
  state: {
    isLogin: false,
    username: ''
  },
  mutations: {
    login(state, username) {
      state.isLogin = true
      state.username = username
    },
    logout(state) {
      state.isLogin = false
      state.username = ''
    },
  },
  getters: {
    welcome: state => state.username + ',欢迎回来'
  },
  actions: {
    // 参数1是vuex传递的上下文context：{commit, dispatch, state}
    login({ commit }, username) {
      // 模拟登录api调用，1s钟以后如果用户名是admin则登录成功
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (username === 'admin') {
            commit('login', username)
            // 动态添加认证路由
            addAuthRoute()
            resolve()
          } else {
            reject()
          }
        }, 1000);
      })
    }
  }
}