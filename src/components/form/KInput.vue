<template>
  <div>
    <!-- 管理数据：实现双绑 -->
    <!-- :value, @input -->
    <input :type="type" :value="value" @input="onInput"
      v-bind="$attrs">
  </div>
</template>

<script>
  export default {
    inheritAttrs: false , // 关闭特性继承
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

        // 值发生变化的时候就是需要校验的时候
        this.$parent.$emit('validate')
      }
    },
  }
</script>

<style scoped>

</style>