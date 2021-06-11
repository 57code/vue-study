<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    model: {
      type: Object,
      required: true,
    },
    rules: Object,
  },
  provide() {
    return {
      form: this,
    };
  },
  methods: {
    validate(cb) {
      // 1.遍历执行所有items的校验方法
      const promises = this.$children
        .filter((item) => item.prop)
        .map((item) => item.validate());
      // 2.如果所有校验全部通过，则通过
      Promise.all(promises)
        .then(() => cb(true))
        .catch(() => cb(false));
    },
  },
};
</script>

<style lang="scss" scoped></style>
