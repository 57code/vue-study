<template>
  <div>
    <h3>child2</h3>
    <!-- 分属性特性 -->
    <p>{{$attrs.foo}}</p>
    <!-- 利用$attrs展开语法可以传递多个属性 -->
    <Grandson v-bind="$attrs" v-on="$listeners"></Grandson>
    <button @click="sendToChild1">给child1发送消息</button>
  </div>
</template>

<script>
  import Grandson from './Grandson.vue'

  export default {
    components: {
      Grandson,
    },
    methods: {
      sendToChild1() {
        // 利用事件总线发送事件
        // this.$bus.$emit('event-from-child2', 'some msg from child2')
        // 利用共同祖辈元素发送事件
        this.$parent.$emit('event-from-child2', 'some msg from child2')
      }
    },
  }
</script>

<style scoped>

</style>