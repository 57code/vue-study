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

          // 实时校验，通知父组件
          this.$parent.$emit('validate')
        }
      },
  }
</script>

<style lang="scss" scoped>

</style>