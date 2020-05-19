<template>
  <div>
    {{message}}
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'

  // 返回的构造函数
  export default Vue.extend({
    data() {
      return {
        message: 'extend component'
      }
    },
    methods: {
      onClick() {
        // this.message
      }
    },
  })
</script>

<style scoped>

</style>