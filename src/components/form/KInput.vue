<template>
  <div>
    <!-- 双绑：
    1.:value
    2.@input -->
    <input :type="type" :value="value" @input="onInput" v-bind="$attrs" />
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    value: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "text",
    },
  },
  methods: {
    onInput(e) {
      this.$emit("input", e.target.value);

      // 通知校验
      this.$parent.$emit('validate')
      // this.dispatch('kformitem', 'validate')
    },
  },
};
</script>

<style lang="scss" scoped></style>
