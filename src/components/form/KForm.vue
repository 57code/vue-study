<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    provide() {
      return {
        // 直接提供当前表单实例
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
  }
</script>

<style lang="scss" scoped>

</style>