<template>
  <div>
    <!-- 双绑： -->
    <!-- ：value   @input -->
    <input type="text" :value="value" @input="onInput" v-bind="$attrs" />
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    value: {
      type: String,
      default: "",
    },
  },
  // model:{},
  methods: {
    onInput(e) {
      this.$emit("input", e.target.value);

      // 通知校验
      this.$parent.$emit("validate");
      // this.dispatch('k-form-item', 'validate')
    },
  },
};
</script>

<style lang="scss" scoped></style>
