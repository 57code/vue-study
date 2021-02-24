<template>
  <div>
    <h3 @click="$emit('some-event', 'some msg from grandson')">grandson</h3>
    <p>{{msg}}</p>
    <!-- provide/inject -->
    <p>{{foo}}</p>
  </div>
</template>

<script>
  export default {
    inject: ['foo'],
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