<template>
  <div>
    <!-- 展开$attrs对象 -->
    <h3 v-bind="$attrs">child2</h3>
    <button @click="sendToChild1">给child1发送消息</button>
    <!-- $attrs -->
    <p>{{$attrs.msg}}</p>
    <!-- inject -->
    <p>{{foo}}</p>
  </div>
</template>

<script>
  export default {
    inheritAttrs: false,
    inject: ['foo'],
    methods: {
      sendToChild1() {
        // 利用事件总线发送事件
        // this.$bus.$emit('event-from-child2', 'some msg from child2')
        this.$parent.$emit('event-from-child2', 'some msg from child2')
      }
    },
  }
</script>

<style scoped>

</style>