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
        //do
        console.log('validate');
      }
    },
  }
</script>

<style scoped>

</style>