<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    provide() {
      return {
        form: this
      }
    },
    props: {
      model: {
        type: Object,
        requried: true
      },
      rules: Object
    },
  }
</script>

<style lang="scss" scoped>

</style>