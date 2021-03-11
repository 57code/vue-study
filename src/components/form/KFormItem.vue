<template>
  <div>
    <!-- 显示标签 -->
    <label v-if="label">{{label}}</label>
    <slot></slot>
    <!-- 校验信息 -->
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
      label: String,
      prop: String, // 校验字段名称
    },
    mounted() {
      this.$on('validate', () => {
        this.validate()
      })
    },
    methods: {
      validate() {
        // 最新的值
        const val = this.form.model[this.prop]
        // 校验规则
        const rule = this.form.rules[this.prop] 
        const validator = new Validator({[this.prop]: rule})
        validator.validate({[this.prop]: val}, errors => {
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

<style lang="scss" scoped>

</style>