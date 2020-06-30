<template>
  <div>
    <h2>组件通信</h2>
    <!-- props, 自定义事件 -->
    <Child1 msg="some msg from parent" 
      @some-event="onSomeEvent"></Child1>
    <!-- 事件总线 -->
    <Child2 ref="child2" msg="some message"></Child2>

    <Parent msg="msg from grandpa"
      @foo="onFoo"></Parent>
  </div>
</template>

<script>
  import Child1 from '@/components/communication/Child1.vue'
  import Child2 from '@/components/communication/Child2.vue'
  import Parent from '@/components/communication/Parent.vue'
  
  export default {
    provide() {
      return {
        bar: 'bar'
      }
    },
    components: {
      Child1, Child2, Parent
    },
    methods: {
      onSomeEvent(msg) {
        console.log('Communition:', msg);
      },
      onFoo() {
        console.log('msg from Child2');
        
      }
    },
    mounted () {
      // this.$children[1].sendToChild1();
      this.$refs.child2.sendToChild1();
    },
  }
</script>

<style scoped>

</style>