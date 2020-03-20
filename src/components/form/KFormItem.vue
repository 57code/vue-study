<template>
  <div>
    <!-- 1.label标签 -->
    <label v-if="label">{{label}}</label>
    <!-- 插槽 -->
    <slot></slot>
    <!-- 3.错误提示 -->
    <p v-if="error">{{error}}</p>
    <p>{{form.rules[prop]}}</p>
  </div>
</template>

<script>
  export default {
    inject: ['form'],
    data() {
      return {
        error: ''
      }
    },
    props: {
      label: {
        type: String,
        default: ''
      },
      prop: String // 校验的字段名称
    },
  }
</script>

<style scoped>

</style>