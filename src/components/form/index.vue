<template>
  <div>
    <KForm :model="model" :rules="rules" ref="loginForm">
      <KFormItem label="用户名" prop="username">
        <KInput v-model="model.username"></KInput>
      </KFormItem>
      <KFormItem label="密码" prop="password">
        <KInput v-model="model.password" type="password"></KInput>
      </KFormItem>
      <KFormItem label="记住密码" prop="password">
        <KCheckBox v-model="model.remember"></KCheckBox>
        <KCheckBox :checked="model.remember" @change="model.remember = $event"></KCheckBox>
      </KFormItem>
      <KFormItem>
        <button @click="onLogin">登录</button>
      </KFormItem>
    </KForm>
    {{model}}
  </div>
</template>

<script>
import KInput from "./KInput.vue";
import KCheckBox from "./KCheckBox.vue";
import KFormItem from "./KFormItem.vue";
import KForm from "./KForm.vue";
import Notice from "../Notice";
import create from "@/utils/create";

export default {
  components: {
    KInput,
    KFormItem,
    KForm,
    KCheckBox
  },
  data() {
    return {
      model: {
        username: "tom",
        password: "",
        remember: false
      },
      rules: {
        username: [{ required: true, message: "用户名必填" }],
        password: [{ required: true, message: "密码必填" }]
      }
    };
  },
  methods: {
    onLogin() {
      // 创建弹窗实例
      let notice;

      this.$refs.loginForm.validate(isValid => {
        notice = create(Notice, {
          title: "xxx",
          message: isValid ? "登录！！！" : "有错！！！",
          duration: 10000
        });

        notice.show();
      });
    }
  }
};
</script>
