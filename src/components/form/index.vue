<template>
  <div>
    <!-- <ElementTest></ElementTest> -->

    <!-- KForm -->
<<<<<<< HEAD
    <KForm :model="userInfo" :rules="rules" ref="loginForm">
      <!-- 用户名 -->
      <KFormItem label="用户名" prop="username">
        <KInput v-model="userInfo.username" placeholder="请输入用户名"></KInput>
      </KFormItem>
      <!-- 密码 -->
      <KFormItem label="密码" prop="password">
        <KInput type="password" v-model="userInfo.password" placeholder="请输入用户名"></KInput>
      </KFormItem>
      <!-- 提交按钮 -->
      <KFormItem>
        <button @click="login">登录</button>
=======
    <KForm :model="model" :rules="rules" ref="loginForm">
      <KFormItem label="用户名" prop="username">
        <KInput v-model="model.username" placeholder="请输入用户名"></KInput>
      </KFormItem>
      <KFormItem label="密码" prop="password">
        <KInput v-model="model.password" placeholder="请输入"></KInput>
      </KFormItem>
      <KFormItem>
        <button @click="onLogin">登录</button>
>>>>>>> 2c65389d71cbe23b8c86eeb55380a66a3bc0c45f
      </KFormItem>
    </KForm>
  </div>
</template>

<script>
import ElementTest from "@/components/form/ElementTest.vue";
import KInput from "@/components/form/KInput.vue";
import KFormItem from "@/components/form/KFormItem.vue";
import KForm from "@/components/form/KForm.vue";
<<<<<<< HEAD
// import Notice from "@/components/Notice.vue";

export default {
  data() {
    return {
      userInfo: {
        username: "tom",
        password: ""
      },
      rules: {
        username: [{ required: true, message: "请输入用户名称" }],
        password: [{ required: true, message: "请输入密码" }]
      }
    };
  },
  components: {
    ElementTest,
    KInput,
    KFormItem,
    KForm
  },
  methods: {
    login() {
      this.$refs["loginForm"].validate(valid => {
        const notice = this.$notice({
          title: "社会你杨哥喊你来搬砖",
          message: valid ? "请求登录!" : "校验失败!",
          duration: 2000
        });
        notice.show();
        // if (valid) {
        //   alert("submit");
        // } else {
        //   console.log("error submit!");
        //   return false;
        // }
      });
    }
  }
};
</script>

<style scoped>
</style>
=======



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
        password: [{ required: true, message: "密码为必填项" }],
      },
    };
  },
  methods: {
    onLogin() {
      this.$refs.loginForm.validate((isValidate) => {
        if (isValidate) {
          // 通过
          console.log("submit login");
        } else {
          this.$notice({
            title: "社会你杨哥喊你来搬砖",
            message: "校验失败!",
            duration: 2000,
          })
        }
      });
    },
  },
};
</script>

<style scoped></style>
>>>>>>> 2c65389d71cbe23b8c86eeb55380a66a3bc0c45f
