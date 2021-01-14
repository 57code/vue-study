<template>
  <div>
    <!-- 1.label -->
    <label v-if="label">{{label}}</label>
    <!-- 2.内部内容 -->
    <slot></slot>
    <!-- 3.校验结果 -->
    <p v-if="error">{{error}}</p>
    <p>{{form.rules[this.prop]}}</p>
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

</style>