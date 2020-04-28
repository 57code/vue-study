<template>
  <div>
    <!-- 容器：存放所有表单项 -->
    <!-- 存储值载体：保存大家数据和校验规则 -->
    <slot></slot>
  </div>
</template>

<script>
// 我们平时写的组件是一个组件配置对象
export default {
  provide() {
    return {
      // 直接把当前组件实例传递下去
      // 传递下去的对象是响应式的则还可以响应式
      form: this
    };
  },
  props: {
    // 数据模型
    model: {
      type: Object,
      required: true
    },
    rules: Object
  },
  methods: {
    validate(cb) {
      // 遍历肚子里面的所有FormItem，执行他们的validate方法
      // 全部通过才算通过
      // tasks是校验结果的Promise组成的数组
      const tasks = this.$children
        .filter(item => item.prop)
        .map(item => item.validate());
      // 统一判断
      Promise.all(tasks)
        .then(() => cb(true))
        .catch(() => cb(false));
    }
  }
};
</script>

<style scoped>
</style>