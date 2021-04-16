<template>
  <div>
    <!-- 1.label标签 -->
    <label v-if="label">{{label}}</label>

    <!-- 2.插槽 -->
    <slot></slot>

    <!-- 3.展示校验信息 -->
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
      },
      prop: String
    },
  }
</script>

<style lang="scss" scoped>

</style>