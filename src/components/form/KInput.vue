<template>
  <div>
    <!-- 自定义组件要实现v-model必须实现:value, @input -->
    <!-- $attrs存储的是props之外的部分 -->
    <!-- {type:'password'} -->
    <input :value="value" @input="onInput" v-bind="$attrs" />
  </div>
</template>

<script>
import emmiter from "@/mixins/emmiter";
export default {
  inheritAttrs: false, // 避免顶层容器继承属性
  mixins: [emmiter],
  props: {
    value: {
      type: String,
      default: ""
    }
  },
  methods: {
    onInput(e) {
      // 通知父组件数值变化
      this.$emit("input", e.target.value);

      // 通知FormItem校验
    //   this.$parent.$emit("validate");
        this.dispatch("validate");
    }
  }
};
</script>

<style lang="scss" scoped>
</style>