<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <slot></slot>
    <p v-if="error">{{error}}</p>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      error: 'eeeee'
    }
  },
  methods: {
    validate() {
      console.log('valdiate');
    }
  },
  mounted () {
    this.$on('validate', () => {
      this.validate()
    })
  },
};
</script>

<style lang="scss" scoped></style>
