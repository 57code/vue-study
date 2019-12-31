<template>
  <div>
    <!-- label -->
    <label v-if="label">{{label}}</label>

    <slot></slot>

    <!-- 校验信息显示 -->
    <p v-if="error">{{error}}</p>

  </div>
</template>

<script>
  export default {
    inject: ['form'],
    data() {
      return {
        error: '' // error是空说明校验通过
      }
    },
    props: {
      label: {
        type: String,
        default: ''
      },
    }
  }
</script>

<style scoped>

</style>