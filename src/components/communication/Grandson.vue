<template>
  <div>
    <h3>grandson</h3>
    <p>{{msg}}</p>
    <!-- inject -->
    <p>{{fooo}}</p>
  </div>
</template>

<script>
  export default {
    inject: {
      fooo: {
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