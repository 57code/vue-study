<template>
  <div>
    <!-- <ElementTest></ElementTest> -->

    <!-- KForm -->
    <KForm :model="model" :rules="rules" ref="form">
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
        password: "lalaa",
      },
      rules: {
        username: [{ required: true, message: "用户名为必填项" }],
      },
    };
  },
  methods: {
    onLogin() {
      this.$refs.form.validate((isValid) => {
        this.$notice({
          title: "结果",
          message: isValid ? "请求登录" : "校验失败",
        })
        
        // if (isValid) {
        //   console.log('submit login');
        // } else {
        //   alert('校验失败，请重试！')
        // }
      });
    },
  },
};
</script>

<style scoped></style>
