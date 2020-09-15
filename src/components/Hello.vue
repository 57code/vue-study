<template>
  <div>
    {{title}}
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'

  export default Vue.extend({
    data() {
      return {
        title: 'hello comp'
      }
    }
  })
</script>

<style scoped>

</style>