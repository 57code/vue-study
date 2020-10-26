<template>
  <div>
    <!-- <ElementTest></ElementTest> -->

    <!-- KForm -->
    <k-form :model="model" :rules="rules" ref="loginForm">
      <k-form-item label="用户名" prop="username">
         <k-input v-model="model.username" placeholder="请输入用户名"></k-input>
      </k-form-item>
      <k-form-item label="密码" prop="password">
         <k-input type="password" v-model="model.password"></k-input>
      </k-form-item>
    </k-form>
  
  </div>
</template>

<script>
  import ElementTest from '@/components/form/ElementTest.vue'
  import KInput from '@/components/form/KInput.vue'
  import KFormItem from '@/components/form/KFormItem.vue'
  import KForm from '@/components/form/KForm.vue'
  
  export default {
    components: {
      ElementTest,
      KInput,
      KFormItem,
      KForm
    },
    data() {
      return {
        model: {
          username: 'tom',
          password: ''
        },
        rules: {
          username: [
            {required: true, message: '用户名为必填项'}
          ],
          password: [
            {required: true, message: '用输入密码'}
          ],
        }
      }
    },
  }
</script>

<style scoped>

</style>