<template>
  <div>
    <!-- <ElementTest></ElementTest> -->

    <!-- KForm -->
    <KInput v-model="model.username" placeholder="请输入用户名"></KInput>
    {{model.username}}
  </div>
</template>

<script>
  import ElementTest from '@/components/form/ElementTest.vue'
  import KInput from '@/components/form/KInput.vue';
  export default {
    components: {
      ElementTest, KInput, 
    },
    data() {
      return {
        model: {
          username: 'tom'
        }
      }
    },
  }
</script>

<style scoped>

</style>