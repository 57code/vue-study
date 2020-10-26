<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    provide() {
      return {
        form: this // 将表单实例传下去
      }
    },
    props: {
      model: {
        type: Object,
        required: true 
      },
      rules: {
        type: Object
      }
    },
  }
</script>

<style scoped>

</style>