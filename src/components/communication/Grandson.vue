<template>
  <div>
    <h3 @click="$emit('hello')">grandson</h3>
    <p>{{foo}}</p>
    <p>{{bar2}}</p>
  </div>
</template>

<script>
  export default {
    inject: {
      bar2: {
        from: 'bar',
        default: ''
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