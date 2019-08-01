<template>
  <div>
    <input type="checkbox" :checked="checked" @change="onChange"/>
  </div>
</template>

<script>
export default {
  props: {
    checked: {
      type: Boolean,
      default: false
    }
  },
  model: {
    prop: "checked",
    event: "change"
  },
  methods: {
      onChange(e) {          
          this.$emit('change', e.target.checked)
      }
  },
};
</script>