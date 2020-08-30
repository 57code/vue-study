<template>
  <div>
    <!-- <ElementTest></ElementTest> -->

    <!-- KForm -->
    <KForm :model="model" :rules="rules" ref="loginForm">
      <KFormItem label="用户名" prop="username">
        <KInput v-model="model.username" placeholder="请输入用户名"></KInput>
      </KFormItem>
      <KFormItem>
        <button @click="submit">提交</button>
      </KFormItem>
    </KForm>
  </div>
</template>

<script>
import ElementTest from "@/components/form/ElementTest.vue";
import KInput from "@/components/form/KInput.vue";
import KFormItem from "@/components/form/KFormItem.vue";
import KForm from "@/components/form/KForm.vue";

import create from "@/utils/create";
import Notice from "@/components/Notice";

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
        username: [{ required: true, message: "请输入用户名" }],
      },
    };
  },
  methods: {
    submit() {
      this.$refs.loginForm.validate((isValid) => {
        create(Notice, {
          title: "来搬砖",
          message: isValid ? "成功" : "失败",
          duration: 3000,
        }).show();
      });

      // 调用Form全局校验方法
      // this.$refs.loginForm.validate(isValid => {
      //   if (isValid) {
      //     console.log('submit!!!');

      //   } else {
      //     alert('校验失败')
      //   }
      // })
    },
  },
};
</script>

<style scoped></style>
