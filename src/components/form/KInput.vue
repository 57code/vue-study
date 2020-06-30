<template>
  <div>
    <!-- 管理数据，实现双向绑定 -->
    <!-- :value, @input -->
    <input :type="type" :value="value" @input="onInput"
      v-bind="$attrs">
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
      type: {
        type: String,
        default: 'text'
      }
    },
    methods: {
      onInput(e) {
        this.$emit('input', e.target.value)

        // 触发校验
        this.$parent.$emit('validate')
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>