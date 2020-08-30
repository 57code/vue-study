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
        // 执行校验
        console.log('validate');
        
      }
    },
  }
</script>

<style scoped>

</style>