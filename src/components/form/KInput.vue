<template>
  <div>
    <!-- 自定义组件双向绑定：@input,:value -->
    <input :type="type" :value="value" @input="onInput">
  </div>
</template>

<script>
  export default {
    props: {
      value: {
        type: String,
        default: ''
      },
      type: {
        type: String,
        default: 'text'
      },
    },
    methods: {
      onInput(e) {
        this.$emit('input', e.target.value)
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>