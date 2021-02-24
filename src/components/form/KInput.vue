<template>
  <div>
    <!-- 自定义组件双绑：:value @input -->
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
        
        // this.dispatch(‘kformitem’), 向上查找，找到指定组件，让该组件派发事件
        this.$parent.$emit('validate')

      }
    },
  }
</script>

<style lang="scss" scoped>

</style>