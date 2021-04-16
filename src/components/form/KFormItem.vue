<template>
  <div>
    <!-- 1.label标签 -->
    <label v-if="label">{{label}}</label>

    <!-- 2.插槽 -->
    <slot></slot>

    <!-- 3.展示校验信息 -->
    <p v-if="error">{{error}}</p>

  </div>
</template>

<script>
  import Validator from 'async-validator'

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
    mounted () {
      this.$on('validate', () => {
        this.validate()
      })
    },
    methods: {
      validate() {
        // 1.获取值和规则
        const value = this.form.model[this.prop]
        const rules = this.form.rules[this.prop]
        // 2.执行校验
        const validator = new Validator({[this.prop]: rules})
        return validator.validate({[this.prop]: value}, errors => {
          if (errors) {
            // 未通过
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