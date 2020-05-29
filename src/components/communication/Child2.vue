<template>
  <div>
    <h3>child2</h3>
    <!-- 非属性特性 -->
    <p>{{$attrs.foo}}</p>
    <!-- 属性展开:v-bind会把$attrs做属性展开，变成键值对形式 -->
    <Grandson v-bind="$attrs" v-on="$listeners"></Grandson>
    <button @click="sendToChild1">给child1发送消息</button>
  </div>
</template>

<script>
import Grandson from "@/components/communication/Grandson.vue";

export default {
  components: {
    Grandson
  },
  methods: {
    sendToChild1() {
      // 利用事件总线发送事件
      // this.$bus.$emit('event-from-child2', 'some msg from child2')
      this.$parent.$emit("event-from-child2", "some msg from child2");
    }
  }
};
</script>

<style scoped>
</style>