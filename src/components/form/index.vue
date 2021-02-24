<template>
  <div>
    <!-- <ElementTest></ElementTest> -->

    <!-- KForm -->
    <KForm :model="model" :rules="rules" ref="loginForm">
      <KFormItem label="用户名" prop="username">
        <KInput v-model="model.username" placeholder="请输入用户名"></KInput>
      </KFormItem>
      <KFormItem><button @click="onLogin">登录</button></KFormItem>
    </KForm>
  </div>
</template>

<script>
import ElementTest from "@/components/form/ElementTest.vue";
import KInput from "@/components/form/KInput.vue";
import KFormItem from "@/components/form/KFormItem.vue";
import KForm from "@/components/form/KForm.vue";
import Notice from "@/components/Notice";
import create from "@/utils/create";

export default {
  components: {
    ElementTest,
    KInput,
    KFormItem,
    KForm,
  },
  data() {
    return {
      model: {
        username: "tom",
      },
      rules: {
        username: [{ required: true, message: "用户名为必填项" }],
      },
    };
  },
  methods: {
    onLogin() {
      this.$refs.loginForm.validate((isValid) => {
        // 创建Notice实例,执行其show方法
        // Vue.prototype.$notice = (props) => {
        //   return create(Notice, {
        //     title: "搬砖啦",
        //     message: isValid ? "校验通过，请求登录" : "校验失败，请重试！",
        //     duration: 3000,
        //   }).show();
        // };
        // this.$notice();
        create(Notice, {
          title: "搬砖啦",
          message: isValid ? "校验通过，请求登录" : "校验失败，请重试！",
          duration: 3000,
        }).show();
        // if (isValid) {
        //   console.log('submit login');
        // } else {
        //   alert('校验失败！！！')
        // }
      });
    },
  },
};
</script>

<style scoped></style>
