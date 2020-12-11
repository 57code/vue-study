<template>
  <div>
    <!-- <ElementTest></ElementTest> -->

    <!-- KForm -->
    <KForm :model="model" :rules="rules" ref="loginForm">
      <KFormItem label="用户名" prop="username">
        <KInput v-model="model.username" placeholder="请输入用户名"></KInput>
      </KFormItem>
      <KFormItem label="密码" prop="password">
        <KInput
          type="password"
          v-model="model.password"
          placeholder="请输入密码"
        ></KInput>
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

import { create } from "@/utils/create";
import Notice from "@/components/Notice.vue";

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
        password: [{ required: true, message: "用户名为必填项" }],
      },
    };
  },
  methods: {
    onLogin() {
      this.$refs.loginForm.validate((isValid) => {
        const notice = create(Notice, {
          title: "社会你杨哥喊你来搬砖",
          message: isValid ? "请求登录!" : "校验失败!",
          duration: 1000,
        })
        notice.show()
        // if (isValid) {
        //   console.log("submit login");
        // } else {
        //   alert("校验失败，请重试！");
        // }
      });
    },
  },
};
</script>

<style scoped></style>
