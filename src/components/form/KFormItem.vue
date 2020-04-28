<template>
  <div>
    <!-- label标签 -->
    <label v-if="label">{{label}}</label>
    <!-- 容器，放插槽 -->
    <slot></slot>
    <!-- 错误信息展示 -->
    <p v-if="error" class="error">{{error}}</p>
    <p>
      {{form.rules[prop]}}
    </p>
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
      prop: {
        type: String,
        default: ''
      }
    },
  }
</script>

<style scoped>
.error{
  color: red
}
</style>