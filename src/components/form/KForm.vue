<template>
  <div>
    <!-- 容器：存放所有表单项 -->
    <!-- 存储值载体：保存大家数据和校验规则 -->
    <slot></slot>
  </div>
</template>

<script>
  export default {
    provide() {
      return {
        // 直接把当前组件实例传递下去
        // 传递下去的对象是响应式的则还可以响应式
        form: this
      }
    },
    props: {
      // 数据模型
      model: {
        type: Object,
        required: true
      },
      rules: Object
    },
  }
</script>

<style scoped>

</style>