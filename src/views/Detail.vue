<template>
  <div>
    Detail
    <p>id: {{id}}</p>
    
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      default: ""
    }
  },

};
</script>

<style lang="scss" scoped>
</style>