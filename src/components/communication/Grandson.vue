<template>
  <div @click="$emit('some-event','msg from grandson')">
    <h3>grandson</h3>
    <p>{{msg}}</p>

    <!-- inject -->
    <p>{{foo1}}</p>
  </div>
</template>

<script>
  export default {
    inject: {
      foo1: {
        from: 'foo'
      }
    },
    props: {
      msg: {
        type: String,
        default: ''
      },
    },
  }
</script>

<style lang="scss" scoped>

</style>