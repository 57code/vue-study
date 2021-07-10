<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
  export default {
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