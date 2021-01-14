<template>
  <div>
    <!-- <ElementTest></ElementTest> -->

    <!-- KForm -->
    <KForm :model="model" :rules="rules">
      <KFormItem label="用户名" prop="username">
        <KInput v-model="model.username" placeholder="用户名"></KInput>
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
        username: "tom",
      },
      rules: {
        username: [{ required: true, message: "用户名为必填项" }],
      },
    };
  },
};
</script>

<style scoped></style>
