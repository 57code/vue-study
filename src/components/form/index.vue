<template>
  <div>
    <!-- <ElementTest></ElementTest> -->

    <!-- kkb 表单 -->
    <KForm :model="model" :rules="rules">
      <KFormItem label="用户名" prop="username">
        <KInput v-model="model.username"></KInput>
      </KFormItem>
      <KFormItem label="密码" prop="password">
        <KInput v-model="model.password" type="password" placeholder="请输入密码"></KInput>
      </KFormItem>
    </KForm>
    <!-- <KInput :value="foo" @input="foo=$event"></KInput> -->
  </div>
</template>

<script>
import ElementTest from "@/components/form/ElementTest.vue";
import KInput from "@/components/form/KInput.vue";
import KFormItem from "@/components/form/KFormItem.vue";
import KForm from "@/components/form/KForm.vue";

export default {
  data() {
    return {
      model: {
        username: 'tom',
        password: ''
      },
      rules: {
        username: [{required: true, message: '用户名为必填项'}],
        password: [{required: true, message: '密码为必填项'}]
      }
    };
  },
  components: {
    ElementTest,
    KInput,
    KFormItem,KForm
  }
};
</script>

<style scoped>
</style>