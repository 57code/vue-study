<template>
  <div>
    <label v-if="label">{{label}}</label>
    <slot></slot>
    <p v-if="errorMessage">{{errorMessage}}</p>
  </div>
</template>

<script>
import Schema from 'async-validator'
export default {
  inject: ["form"],
  props: {
    label: {
      type: String,
      default: ""
    },
    prop: {
      type: String
    }
  },
  data() {
    return {
      errorMessage: ""
    };
  },
  mounted() {
      this.$on('validate', this.validate)
  },
  methods: {
      validate() {
          // 做校验
          const value = this.form.model[this.prop]
          const rules = this.form.rules[this.prop]
          // npm i async-validator -S
          const desc = {[this.prop]: rules};
          const schema = new Schema(desc);
          // return的是校验结果的Promise
          return schema.validate({[this.prop]: value}, errors => {
              if (errors) {
                  this.errorMessage = errors[0].message;
              }else {
                  this.errorMessage = ''
              }
          })
      }
  },
};
</script>

<style lang="scss" scoped>
</style>