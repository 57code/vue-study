<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    provide() {
      return {
        form: this
      }
    },
    props: {
      model: {
        type: Object,
        required: true 
      },
      rules: Object
    },
    methods: {
      validate(cb) {
        // 调用内部所有FormItem的validate方法
        // 必须全部通过才算校验通过
        const tasks = this.$children
          .filter(item => item.prop)
          .map(item => item.validate())
        // 全过
        Promise.all(tasks).then(() => cb(true)).catch(() => cb(false))
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>