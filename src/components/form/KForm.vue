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
      required: true,
    },
    rules: Object,
  },
  methods: {
    // 全局校验
    validate(cb) {
      // 1.执行全部Item校验
      // 结果【Promise，。。。】
      const results = this.$children
        .filter((item) => item.prop)
        .map((item) => item.validate());
      // 2.判断校验结果
      Promise.all(results)
        .then(() => cb(true))
        .catch(() => cb(false));
    },
  },
};
</script>

<style scoped></style>
