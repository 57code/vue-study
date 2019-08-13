<template>
  <div>
    Login
    <input type="text" v-model="username" />
    <button @click="login">登录</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "admin"
    };
  },
  methods: {
    async login() {
      try {
        await this.$store.dispatch("user/login", { username: this.username });
        this.$router.push({path: '/'});
      } catch (error) {
        alert(error);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>