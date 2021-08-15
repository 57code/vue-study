<template>
  <div>
<<<<<<< HEAD
    <!-- 自定义组件双向绑定：:value  @input -->
    <!-- v-bind="$attrs"展开$attrs -->
    <input :type="type" :value="value" @input="onInput" v-bind="$attrs">
=======
    <!-- 双绑：
    1.:value
    2.@input -->
    <input :type="type" :value="value" @input="onInput" v-bind="$attrs" />
>>>>>>> 2c65389d71cbe23b8c86eeb55380a66a3bc0c45f
  </div>
</template>

<script>
<<<<<<< HEAD
  export default {
    inheritAttrs: false, // 设置为false避免设置到根元素上
    props: {
      value: {
        type: String,
        default: ''
      },
      type: {
        type: String,
        default: 'text'
      }
    },
    methods: {
      onInput(e) {
        // 派发一个input事件即可
        this.$emit('input', e.target.value)

        // 通知父级执行校验
        this.$parent.$emit('validate')
      }
    },
  }
</script>

<style scoped>

</style>
=======
export default {
  inheritAttrs: false,
  props: {
    value: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "text",
    },
  },
  methods: {
    onInput(e) {
      this.$emit("input", e.target.value);

      // 通知校验
      this.$parent.$emit('validate')
      // this.dispatch('kformitem', 'validate')
    },
  },
};
</script>

<style lang="scss" scoped></style>
>>>>>>> 2c65389d71cbe23b8c86eeb55380a66a3bc0c45f
