<template>
  <div>
<<<<<<< HEAD
    <!-- $listeners会被展开并监听 -->
    <h3 v-on="$listeners">child2</h3>
=======
    <h3>child2</h3>
    <!-- 非属性特性 -->
    <p>{{$attrs.msg}}</p>
    <Grandson v-bind="$attrs" v-on="$listeners"></Grandson>
>>>>>>> 2c65389d71cbe23b8c86eeb55380a66a3bc0c45f
    <button @click="sendToChild1">给child1发送消息</button>
    <!-- $attrs -->
    <p>{{$attrs.msg}}</p>
    <!-- provide/inject -->
    <p>{{foo}}</p>
  </div>
</template>

<script>
  import Grandson from '@/components/communication/Grandson.vue';
  export default {
<<<<<<< HEAD
    inject: ['foo'],
=======
    components: {
      Grandson
    },
>>>>>>> 2c65389d71cbe23b8c86eeb55380a66a3bc0c45f
    methods: {
      sendToChild1() {
        // 利用事件总线发送事件
        // this.$bus.$emit('event-from-child2', 'some msg from child2')
<<<<<<< HEAD
=======
        // 利用共同祖辈元素发送事件
>>>>>>> 2c65389d71cbe23b8c86eeb55380a66a3bc0c45f
        this.$parent.$emit('event-from-child2', 'some msg from child2')
      }
    },
  }
</script>

<style scoped>

</style>