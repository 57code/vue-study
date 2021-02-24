<template>
  <div>
    <!-- 1.label -->
    <label v-if="label">{{label}}</label>
    <!-- 2.输入项 -->
    <slot></slot>
    <!-- 3.校验信息 -->
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
        // 1.获取校验规则和值
        const rules = this.form.rules[this.prop]
        const value = this.form.model[this.prop]

        // 2.创建校验器，执行校验
        const validator = new Validator({[this.prop]: rules})
        return validator.validate({[this.prop]: value}, errors => {
          if (errors) {
            // 不通过
            this.error = errors[0].message
          } else {
            this.error = ''
          }
        })
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>