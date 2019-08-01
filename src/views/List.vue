<template>
  <div>
    List
    <ul>
      <li>
        <router-link to="/detail/1">web全栈</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  watch: {
    $route() {
      // [{name:'home'},{name:'list'}]
      console.log(this.$route.matched);
      // ['home','list']
      //   this.crumbData = this.$route.matched.map(m => m.name);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>