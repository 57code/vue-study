<template>
  <div>
    <h3>grandson</h3>
    <p>{{foo}}</p>
    <!-- inject -->
    <p>{{bar}}</p>
  </div>
</template>

<script>
  export default {
    inject: ['bar'],
    props: {
      foo: {
        type: String,
        default: ''
      },
    },
  }
</script>

<style scoped>

</style>