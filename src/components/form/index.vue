<template>
  <div>
    <!-- <ElementTest></ElementTest> -->

    <!-- KForm: 指定管理数据和校验规则 -->
    <!-- KFormItem: 数据校验和错误展示 -->
    <KForm :model="model" :rules="rules">
      <KFormItem label="用户名">
        <KInput v-model="model.username" placeholder="请输入账户"></KInput>
      </KFormItem>
      <KFormItem label="密码">
        <KInput v-model="model.password" placeholder="请输入密码" type="password"></KInput>
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
    KFormItem,KForm
  },
  data() {
    return {
      model: {
        username: "tom",
        password: ""
      },
      rules: {
        username: [{required:true,message:'必须输入用户名'}],
        password: [{required:true,message:'必须输入密码'}]
      }
    };
  }
};
</script>

<style scoped>
</style>