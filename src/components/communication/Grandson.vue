<template>
  <div @click="onclick">
    <h3>grandson</h3>
    <p>{{foo}}</p>
    <!-- 注入的数据 -->
    <p>{{dong}}</p>
  </div>
</template>

<script>
  export default {
    inject: ['dong'],
    props: {
      foo: {
        type: String,
        default: ''
      },
    },
    methods: {
      onclick() {
        
      }
    },
  }
</script>

<style scoped>

</style>