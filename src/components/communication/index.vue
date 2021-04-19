<template>
  <div>
    <h2>组件通信</h2>
    <!-- props, 自定义事件 -->
    <Child1 msg="some msg from parent" @some-event="onSomeEvent"></Child1>
    <!-- 事件总线 -->
    <Child2 msg="some msg from parent" @click="onClick"></Child2>
    <!-- $children -->
    <button @click="goHome">回家吃饭</button>
  </div>
</template>

<script>
  import Child1 from '@/components/communication/Child1.vue'
  import Child2 from '@/components/communication/Child2.vue'
  
  export default {
    provide() {
      return {
        foo: 'foooooooooo'
      }
    },
    components: {
      Child1, Child2
    },
    methods: {
      onSomeEvent(msg) {
        console.log('Communition:', msg);
      },
      goHome() {
        // $children
        this.$children[0].eat()
      },
      onClick() {
        console.log('来自老爹的回调函数处理', this);
        
      }
    },
  },
  mounted() {
    // $children获取子组件数组，不包括普通元素，不保证模板中顺序
    console.log(this.$children);
    // $refs用于引用命名的元素或组件，可包含普通元素
    console.log(this.$refs.child2);
  },
};
</script>

<style scoped></style>
