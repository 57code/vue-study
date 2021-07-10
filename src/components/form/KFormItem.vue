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
  export default {
    props: {
      label: {
        type: String,
        default: ''
      },
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
        console.log('validate!');
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>