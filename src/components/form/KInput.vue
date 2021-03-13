<template>
  <div>
    <!-- 1.双绑: :value, @input
    2.校验通知 -->
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
        required: true
      },
      type: {
        type: String,
        default: 'text'
      }
    },
    methods: {
      onInput(e) {
        this.$emit('input', e.target.value)

        // 通知校验
        // this.dispatch('k-form-item', 'validate')
        this.$parent.$emit('validate')
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>