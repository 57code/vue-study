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
      <k-form-item>
        <button @click="onLogin">登录</button>
      </k-form-item>
    </k-form>
  </div>
</template>

<script>
import ElementTest from "@/components/form/ElementTest.vue";
import KInput from "@/components/form/KInput.vue";
import KFormItem from "@/components/form/KFormItem.vue";
import KForm from "@/components/form/KForm.vue";
import Notice from "@/components/Notice.vue";
import { create } from "@/utils/create";

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
        password: "",
      },
      rules: {
        username: [{ required: true, message: "用户名为必填项" }],
        password: [{ required: true, message: "用输入密码" }],
      },
    };
  },
  methods: {
    onLogin() {
      this.$refs.loginForm.validate((isValid) => {
        // if (isValid) {
        //   console.log("submit login");
        // } else {
        //   alert("校验失败");
        // }
        // this.$notice({
        //   title: "社会你杨哥喊你来搬砖",
        //   message: isValid ? "请求登录!" : "校验失败!",
        //   duration: 3000,
        // })
        const notice = create(Notice, {
          title: "社会你杨哥喊你来搬砖",
          message: isValid ? "请求登录!" : "校验失败!",
          duration: 3000,
        });
        notice.show();
      });
    },
  },
};
</script>

<style scoped></style>
