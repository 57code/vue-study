<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  provide() {
    return {
      // 直接提供当前表单实例
      form: this,
    };
  },
  props: {
    model: {
      type: Object,
      required: true,
    },
    rules: Object,
  },
  methods: {
    validate(cb) {
      // 全局校验
      // 执行内部全部FormItem的validate方法
      // 获取Promise构成的数组
      const tasks = this.$children
        .filter(item => item.prop)
        .map((item) => item.validate());

      // 检查校验结果
      Promise.all(tasks)
        .then(() => cb(true))
        .catch(() => cb(false));
    },
  },
};
</script>

<style lang="scss" scoped></style>
