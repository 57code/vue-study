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
        required: true 
      },
      rules: Object
    },
    methods: {
      validate() {
        
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>