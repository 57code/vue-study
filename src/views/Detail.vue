<template>
  <div>
    Detail
    <p>id: {{$route.params.id}}</p>
    <p>{{crumbData}}</p>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      crumbData: []
    }
  },
  watch: {
    $route: {
      handler(route) {
        console.log(this.$route.matched);
        this.crumbData = this.$route.matched.map(m => m.name || m.redirect);
      },
      immediate: true // 这一行要加上，让它一开始执行一次
    }
  },
  // computed: {
  //   crumbData() {
  //     // console.log(this.$route.matched);
  //     return this.$route.matched.map(m => m.name);
  //   }
  // },
};
</script>

<style lang="scss" scoped>
</style>