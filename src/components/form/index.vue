<template>
  <div>
    <!-- <ElementTest></ElementTest> -->

    <!-- KForm -->
    <KFormItem label="用户名">
      <KInput v-model="model.username" placeholder="请输入用户名"></KInput>
    </KFormItem>
    <p>{{model}}</p>
  </div>
</template>

<script>
  import ElementTest from '@/components/form/ElementTest.vue'
  import KInput from '@/components/form/KInput.vue'
  import KFormItem from '@/components/form/KFormItem.vue'
  
  export default {
    components: {
      ElementTest,
      KInput,
      KFormItem
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