<template>
  <div>
    <!-- label -->
    <label v-if="label">{{label}}</label>
    <!-- 内容 -->
    <slot></slot>
    {{form.rules[prop]}}
    <!-- 校验和错误信息展示 -->
    <p v-if="error">{{error}}</p>
  </div>
</template>

<script>
  export default {
    inject: ['form'],
    props: {
      label: {
        type: String,
        default: ''
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
    mounted () {
      this.$on('validate', () => {
        this.validate()
      })
    },
    methods: {
      validate() {
        // 执行校验
        // 1.获取数值和校验规则
        
      }
    },
  }
</script>

<style scoped>

</style>