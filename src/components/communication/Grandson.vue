<template>
  <div @click="$emit('some-event', 'msg from grandson')">
    <h3>grandson</h3>
    <p>{{foo}}</p>
    <p>{{bar2}}</p>
  </div>
</template>

<script>
  export default {
    inject: {
      bar2: {
        from: 'bar',
        default: 'default bar'
      }
    },
    props: {
      foo: {
        type: String,
        default: ''
      },
    },
  }
</script>

<style lang="scss" scoped>

</style>