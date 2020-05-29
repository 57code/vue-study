<template>
  <div>
    <!-- <ElementTest></ElementTest> -->

    <!-- KForm -->
    <KForm :model="model" :rules="rules" ref="form">
      <KFormItem label="用户名" prop="username">
        <KInput v-model="model.username"></KInput>
      </KFormItem>
      <KFormItem label="密码" prop="password">
        <KInput v-model="model.password"></KInput>
      </KFormItem>
      <KFormItem>
        <button @click="login">登录</button>
      </KFormItem>
    </KForm>
    {{model}}
  </div>
</template>

<script>
  import ElementTest from '@/components/form/ElementTest.vue'
  import KInput from '@/components/form/KInput.vue';
  import KFormItem from '@/components/form/KFormItem.vue';
  import KForm from '@/components/form/KForm.vue';

  export default {
    data() {
      return {
        model: {
          username: 'tom',
          password: ''
        },
        // 校验规则， async-validator
        rules: {
          username: [
            {required: true, message: '请输入用户名'}
          ],
          password: [
            {required: true, message: '请输入密码'}
          ],
        }
      }
    },
    components: {
      ElementTest,
      KInput,
      KFormItem,
      KForm
    },
    methods: {
      login() {
        this.$refs.form.validate(isValid => {
          // if (isValid) {
          //   console.log('请求登录！！！');
            
          // } else {
          //   alert('校验失败！！！！')
          // }
          this.$notice({
            title: '校验结果',
            message: isValid ? '请求登录' : '校验失败',
            duration: 2000
          }).show()
        })
      }
    },
  }
</script>

<style scoped>

</style>