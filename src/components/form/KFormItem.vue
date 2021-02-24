<template>
  <div>
    <!-- 1.label -->
    <label v-if="label">{{label}}</label>
    <!-- 2.输入项 -->
    <slot></slot>
    <!-- 3.校验信息 -->
    <p v-if="error">{{error}}</p>
    <p>{{form.rules[prop]}}</p>
    <p>{{form.model[prop]}}</p>
  </div>
</template>

<script>
  export default {
    inject: ['form'],
    props: {
      label: {
        type: String,
      },
      prop: {
        type: String
      }
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