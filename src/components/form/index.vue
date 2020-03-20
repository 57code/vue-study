<template>
  <div>
    <!-- <ElementTest></ElementTest> -->
    <!-- 设置数据模型和校验规则 -->
    <KForm :model="model" :rules="rules" ref="loginForm">
      <KFormItem label="用户名" prop="username">
        <KInput v-model="model.username" placeholder="请输入用户名"></KInput>
      </KFormItem>
      <KFormItem label="密码" prop="password">
        <KInput v-model="model.password" type="password" placeholder="请输入密码"></KInput>
      </KFormItem>
      <KFormItem>
        <button @click="onLogin">登录</button>
      </KFormItem>
    </KForm>
  </div>
</template>

<script>
import ElementTest from "@/components/form/ElementTest.vue";
import KInput from "@/components/form/KInput.vue";
import KFormItem from "@/components/form/KFormItem.vue";
import KForm from "@/components/form/KForm.vue";
import Notice from '@/components/Notice.vue';

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
        username: "",
        password: ""
      },
      rules: {
        username: [{ required: true, message: "请输入用户名称" }],
        password: [{ required: true, message: "请输入密码" }]
      }
    };
  },
  methods: {
    onLogin() {
      // 全局校验
      this.$refs.loginForm.validate(isValid => {
        if (isValid) {
          console.log('submit login!');
          
        }else {
          // alert('校验失败')
          this.$create(Notice, {
            title: '校验失败',
            message: '校验错误，请重试！',
            duration: 3000
          }).show()
        }
      })
    }
  },
};
</script>

<style scoped>
</style>