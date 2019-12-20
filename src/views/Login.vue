<template>
  <div>
    <button @click="login" v-if="!isLogin">登录</button>
    <button @click="logout" v-else>注销</button>
  </div>
</template>

<script>

import {mapState, mapActions} from 'vuex'

export default {
  methods: {
    login() {
      // window.isLogin = true;
      // 提交mutation变更状态
      // this.$store.commit('user/login')
      // 派发动作，触发actions
      // this.$store.dispatch("user/login", "admin").then(() => {
      this["user/login"]("admin").then(() => {
        this.$router.push(this.$route.query.redirect);
      }).catch(() => {
        alert('用户名或密码错误，请重试！')
      });
    },
    logout() {
      // window.isLogin = false;
      this.$store.commit("user/logout");
      this.$router.push("/");
    },
    ...mapActions(['user/login', 'user/logout'])
  },
  computed: {
    // isLogin() {
    //   return this.$store.state.user.isLogin;
    // }
    ...mapState('user', ['isLogin'])
  }
};
</script>

<style lang="scss" scoped>
</style>