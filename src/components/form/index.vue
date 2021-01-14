<template>
  <div>
    <!-- <ElementTest></ElementTest> -->

    <!-- KForm -->
    <KForm :model="model" :rules="rules" ref="loginForm">
      <KFormItem label="用户名" prop="username">
        <KInput v-model="model.username" placeholder="用户名"></KInput>
        <!-- 等效于 -->
        <!-- <KInput :value="model.username" @input="model.username=$event"></KInput> -->
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

// 没有实现插件，需要导入弹窗和create

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
      // 全局校验
      this.$refs.loginForm.validate((isValid) => {
        this.$notice({
          title: "abc",
          message: isValid ? "过" : "不过",
        });
        // if (isValid) {
        //   console.log("submit login");
        // } else {
        //   alert("校验失败");
        // }
      });
    },
  },
};
</script>

<style scoped></style>
