<template>
  <div>
    <!-- 自定义组件双向绑定：:value, @input -->
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

      // 校验通知
      this.$parent.$emit('validate')
    },
  },
};
</script>

<style lang="scss" scoped></style>
