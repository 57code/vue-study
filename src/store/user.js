import {login, getInfo} from '@/api/user';

const state = {
  token: localStorage.getItem('token'),
  // 其他用户信息
  roles: []
};

const mutations = {
  setToken: (state, token) => {
    state.token = token;
  },
  setRoles: (state, roles) => {
    state.roles = roles;
  }
};

const actions = {
  // 模拟用户登录
  login({ commit }, userInfo) {
    return login(userInfo).then((res) => {
      commit("setToken", res.data);
      localStorage.setItem("token", res.data);
    });
    // const { username } = userInfo;
    // return new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     if (username === "admin" || username === "jerry") {
    //       commit("setToken", username);
    //       localStorage.setItem('token', username);
    //       resolve();
    //     } else {
    //       reject("用户名、密码错误");
    //     }
    //   }, 1000);
    // });
  },
  getInfo({ commit, state }) {
    return getInfo(state.token).then(({data: roles}) => {
      commit("setRoles", roles);
      return {roles}
    })
    // 模拟获取用户角色信息
    // return new Promise((resolve) => {
    //   setTimeout(() => {
    //     const roles = state.token === 'admin' ? ['admin'] : ['editor']
    //     commit("setRoles", roles);
    //     resolve({ roles });
    //   }, 1000);
    // });
  },
  resetToken({ commit }) {
    // 模拟清空令牌和角色状态
    return new Promise(resolve => {
      commit("setToken", "");
      commit("setRoles", []);
      localStorage.removeItem('token');
      resolve();
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};