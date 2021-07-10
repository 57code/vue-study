<template>
  <div>
    <!-- 1.label -->
    <label v-if="label">{{label}}</label>
    <!-- 2.slot -->
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
        default: ''
      },
      prop: String
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
        const rules = this.form.rules[this.prop]
        const value = this.form.model[this.prop]
        const validator = new Validator({[this.prop]: rules})
        return validator.validate({[this.prop]: value}, errors => {
          // 处理校验结果
          if (errors) {
            this.error = errors[0].message
          } else {
            // 校验通过
            this.error = ''
          }
        })
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>