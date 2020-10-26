<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  provide() {
    return {
      form: this, // 将表单实例传下去
    };
  },
  props: {
    model: {
      type: Object,
      required: true,
    },
    rules: {
      type: Object,
    },
  },
  methods: {
    validate(cb) {
      // 调用所有formitem子项validate
      // 全部通过才算通过
      const tasks = this.$children
        .filter((item) => item.prop)
        .map((item) => item.validate());

      // 判断tasks是否全部通过
      Promise.all(tasks)
        .then(() => cb(true))
        .catch(() => cb(false));
    },
  },
};
</script>

<style scoped></style>
