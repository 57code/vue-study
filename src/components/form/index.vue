<template>
  <div>
    <!-- <ElementTest></ElementTest> -->
    <!-- 设置数据模型和校验规则 -->
    <KForm :model="model" :rules="rules">
      <KFormItem label="用户名" prop="username">
        <KInput v-model="foo" placeholder="请输入用户名"></KInput>
      </KFormItem>
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
  }
};
</script>

<style scoped>
</style>