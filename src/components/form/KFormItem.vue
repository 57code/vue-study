<template>
  <div>
    <!-- label -->
    <label v-if="label">{{label}}</label>
    <slot></slot>
    <!-- 错误信息 -->
    <p class="error" v-if="error">{{error}}</p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        error: 'some error'
      }
    },
    props: {
      label: {
        type: String,
        default: ''
      },
    },
  }
</script>

<style scoped>
.error {
  color:red
}
</style>