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
    validate(cb) {
      // 1.获取所有items，执行他们的validate，统一处理返回Promise
      const results = this.$children
        .filter((item) => item.prop)
        .map((item) => item.validate());
        console.log(results);
      Promise.all(results)
        .then(() => cb(true))
        .catch(() => cb(false));
    },
  },
};
</script>

<style lang="scss" scoped></style>
