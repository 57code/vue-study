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
      // 全局校验: 把所有Item校验方法执行一遍，全部通过则通过
      // 源码中：当FormItem创建完毕，派发一个事件，然后在Form中注册自己
      // tasks: [promise, ....]
      const tasks = this.$children
        .filter((item) => item.prop)
        .map((item) => item.validate());
      Promise.all(tasks)
        .then(() => {
          cb(true);
        })
        .catch(() => {
          cb(false);
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
