<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    provide(){
      return {
        // 将表单实例直接传递给后代
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

<style scoped>

</style>