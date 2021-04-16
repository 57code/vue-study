<template>
  <div @click="$emit('some-event', 'msg from grandson')">
    <h3>grandson</h3>
    <p>{{foo}}</p>
    <p>{{yc1}}</p>
  </div>
</template>

<script>
  export default {
    inject: {
      yc1: {
        from: 'yc',
        default: 'bla'
      }
    },
    props: {
      foo: String,
    },
  }
</script>

<style lang="scss" scoped>

</style>