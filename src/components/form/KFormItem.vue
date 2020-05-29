<template>
  <div>
    <label>{{label}}</label>
    <slot></slot>
    <p class="error" v-if="error">{{error}}</p>
    <p>{{form.rules[prop]}}</p>
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
  }
</script>

<style lang="scss" scoped>

</style>