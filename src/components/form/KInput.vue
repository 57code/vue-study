<template>
  <div>
    <!-- 双向数据绑定：@input, :value -->
    <input :value="value" @input="onInput" v-bind="$attrs">
  </div>
</template>

<script>
  export default {
    inheritAttrs: false,
    props: {
      value: {
        type: String,
        default: ''
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