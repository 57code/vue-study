<template>
  <div>
    <!-- 1.label -->
    <label v-if="label">{{label}}</label>
    <!-- 1.5容器 -->
    <slot></slot>
    <!-- 2.校验错误信息 -->
    <p v-if="error">{{error}}</p>
    {{form.rules[prop]}}
    {{form.model[prop]}}
  </div>
</template>

<script>
  export default {
    inject: ['form'],
    props: {
      label: {
        type: String,
      },
      prop: String
    },
    data() {
      return {
        error: ''
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>