<template>
  <div>
    <label v-if="label">{{label}}</label>
    <slot></slot>
    <!-- 校验信息 -->
    <p v-if="errorMessage">{{errorMessage}}</p>
  </div>
</template>

<script>
import Schema from "async-validator";

export default {
  data() {
    return {
      errorMessage: ""
    };
  },
  inject: ["form"],
  props: {
    label: {
      type: String,
      default: ""
    },
    prop: String
  },
  mounted() {
    // 监听校验事件、并执行监听
    this.$on("validate", () => {
      this.validate();
    });
  },
  methods: {
    validate() {
      // 执行组件校验
      // 1.获取校验规则
      const rules = this.form.rules[this.prop];

      // 2.获取数据
      const value = this.form.model[this.prop];

      // 3.执行校验
      const desc = {
        [this.prop]: rules
      };
      const schema = new Schema(desc);
      //   参数1是值,参数2是校验错误对象数组
    //   返回的Promise<boolean>
      return schema.validate({ [this.prop]: value }, errors => {
        if (errors) {
          // 有错
          this.errorMessage = errors[0].message;
        } else {
          // 没错，清除错误信息
          this.errorMessage = "";
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>