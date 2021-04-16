<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  provide() {
    return {
      form: this,
    };
  },
  props: {
    model: {
      type: Object,
      requried: true,
    },
    rules: Object,
  },
  methods: {
    validate(cb) {
      // 校验结果Promise数组
      const tasks = this.$children
        .filter((item) => item.prop)
        .map((item) => item.validate());
      Promise.all(tasks)
        .then(() => cb(true))
        .catch(() => cb(false));
    },
  },
};
</script>

<style lang="scss" scoped></style>
