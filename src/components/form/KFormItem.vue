<template>
  <div>
    <!-- 1.label -->
    <label v-if="label">{{ label }}</label>
    <!-- 1.5容器 -->
    <slot></slot>
    <!-- 2.校验错误信息 -->
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import Validator from "async-validator";

export default {
  inject: ["form"],
  props: {
    label: {
      type: String,
    },
    prop: String,
  },
  data() {
    return {
      error: "",
    };
  },
  mounted() {
    this.$on("validate", () => {
      this.validate();
    });
  },
  methods: {
    validate() {
      // 单项校验
      const value = this.form.model[this.prop];
      const rules = this.form.rules[this.prop];

      const validator = new Validator({ [this.prop]: rules });
      return new Promise((resolve, reject) => {
        validator.validate({ [this.prop]: value }, (errors) => {
          if (errors) {
            this.error = errors[0].message;
            reject()
          } else {
            this.error = "";
            resolve()
          }
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
