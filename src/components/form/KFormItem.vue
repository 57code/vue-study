<template>
  <div>
    <!-- label -->
    <label v-if="label">{{label}}</label>
    <!-- 内容 -->
    <slot></slot>
    <!-- 校验和错误信息展示 -->
    <p v-if="error">{{error}}</p>
  </div>
</template>

<script>
  import Validator from 'async-validator'

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
        const rules = this.form.rules[this.prop]
        const value = this.form.model[this.prop]

        // async-validator
        const validator = new Validator({[this.prop]: rules})
        // 校验时传入数据源
        return validator.validate({[this.prop]: value}, errors => {
          // errors存在，则校验失败
          if (errors) {
            this.error = errors[0].message
          } else {
            // 通过
            this.error = ''
          }
        })
      }
    },
  }
</script>

<style scoped>

</style>