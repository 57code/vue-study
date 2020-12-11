<template>
  <div>
    <!-- 1.label -->
    <label v-if="label">{{label}}</label>
    <!-- 2.插槽 -->
    <slot></slot>
    <!-- 3.错误信息 -->
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
        // value, rule
        const value = this.form.model[this.prop]
        const rules = this.form.rules[this.prop]

        // 2.validator
        const validator = new Validator({[this.prop]: rules})
        return validator.validate({[this.prop]: value}, errors => {
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

</style>