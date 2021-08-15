<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  provide() {
    return {
<<<<<<< HEAD
      form: this
=======
      form: this,
>>>>>>> 2c65389d71cbe23b8c86eeb55380a66a3bc0c45f
    };
  },
  props: {
    model: {
      type: Object,
<<<<<<< HEAD
      required: true
    },
    rules: {
      type: Object
    }
  },
  methods: {
    validate(cb) {
      // 获取所有孩子KFormItem
      // [resultPromise]
      const tasks = this.$children
        .filter(item => item.prop) // 过滤掉没有prop属性的Item
        .map(item => item.validate());

      // 统一处理所有Promise结果
      Promise.all(tasks)
        .then(() => cb(true))
        .catch(() => cb(false));
    }
  }
};
</script>

<style scoped>
</style>
=======
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
>>>>>>> 2c65389d71cbe23b8c86eeb55380a66a3bc0c45f
