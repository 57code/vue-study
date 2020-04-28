<template>
  <div>
    <!-- label标签 -->
    <label v-if="label">{{label}}</label>
    <!-- 容器，放插槽 -->
    <slot></slot>
    <!-- 错误信息展示 -->
    <p v-if="error" class="error">{{error}}</p>
  </div>
</template>

<script>
  import Schema from 'async-validator'

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
    mounted () {
      // 监听校验事件
      this.$on('validate', () => {
        this.validate()
      })
    },
    methods: {
      validate() {
        // 执行校验
        // 1.获取值和校验规则
        const rules = this.form.rules[this.prop]
        const value = this.form.model[this.prop]

        // 2.执行校验：使用官方也使用的async-validator
        // 创建描述对象
        const descriptor = {[this.prop]:rules}
        // 创建校验器
        const validator = new Schema(descriptor)
        // 执行校验
        return validator.validate({[this.prop]:value}, errors => {
          // 如果errors存在，则说明校验失败
          if (errors) {
            this.error = errors[0].message
          } else {
            this.error = ''
          }
        })
      }
    },
  }
</script>

<style scoped>
.error{
  color: red
}
</style>