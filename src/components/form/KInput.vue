<template>
  <div>
    <!-- v-model :value, @input -->
    <input :type="type" :value="value" @input="onInput" v-bind="$attrs">
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
    // mixins: ['emmiter'],
    methods: {
      onInput(e) {
        this.$emit('input', e.target.value)

        // 校验事件
        // this.dispatch('KFormItem', 'validate')
        this.$parent.$emit('validate')
      }
    },
  }
</script>

<style scoped>

</style>