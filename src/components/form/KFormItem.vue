<template>
  <div>
    <!-- 0.label -->
    <label v-if="label">{{label}}</label>
    <!-- 1.容器 -->
    <slot></slot>
    <!-- 2.校验错误信息 -->
    <p v-if="error">{{error}}</p>
    <!-- <p>{{form.rules[prop]}}</p>
    <p>{{form.model[prop]}}</p> -->
  </div>
</template>

<script>
  import Schema from 'async-validator'

  export default {
    inject: ['form'],
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
    data() {
      return {
        error: ''
      }
    },
    mounted () {
      // 监听validate事件
      this.$on('validate', () => {
        this.validate()
      })
    },
    methods: {
      validate() {
        // 执行校验，async-validator
        console.log('validate');
        // 1.获取校验规则
        const rules = this.form.rules[this.prop]
        const value = this.form.model[this.prop]

        // 2.构造一个validator实例
        const validator = new Schema({[this.prop]: rules}) 

        // 3.执行校验
        return validator.validate({[this.prop]: value}, errors => {
          // errors数组存在则有校验错误
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