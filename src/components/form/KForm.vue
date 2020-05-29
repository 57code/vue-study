<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  provide() {
    return {
      form: this
    };
  },
  props: {
    model: {
      type: Object,
      required: true
    },
    rules: Object
  },
  methods: {
    validate(cb) {
      // 全局校验：
      // 获取掉所有Formitem
      // 获得[Promise,...]
      const tasks = this.$children
        .filter(item => item.prop)
        .map(item => item.validate());

      // 执行他们的校验方法，如果大家的Promise全部都resolve，校验通过
      // 如果其中有reject，catch()中可以处理错误提示信息
      Promise.all(tasks)
        .then(() => cb(true))
        .catch(() => cb(false));
    }
  }
};
</script>

<style lang="scss" scoped>
</style>