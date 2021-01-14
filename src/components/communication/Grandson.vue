<template>
  <div @click="$emit('some-event')">
    <h3>grandson</h3>
    <p>{{foo}}</p>
    <!-- provide/inject -->
    <p>{{yc2}}</p>
  </div>
</template>

<script>
  export default {
    inject: {
      yc2: {
        from: 'yc'
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

<style scoped>

</style>