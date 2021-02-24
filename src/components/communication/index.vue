<template>
  <div>
    <h2>组件通信</h2>
    <!-- props, 自定义事件 -->
    <Child1 msg="some msg from parent" @some-event="onSomeEvent"></Child1>
    <!-- 事件总线 -->
    <!-- child2没有生命msg，成为非属性特性 -->
    <Child2 ref="child2" msg="some msg from parent" @some-event="onSomeEvent"></Child2>
  </div>
</template>

<script>
  import Child1 from '@/components/communication/Child1.vue'
  import Child2 from '@/components/communication/Child2.vue'
  
  export default {
    provide() {
      return {
        foo: '来自爷爷的馈赠',
        // grandpa: this
      }
    },
    components: {
      Child1, Child2
    },
    methods: {
      onSomeEvent(msg) {
        console.log('Communition:', msg);
      }
    },
    mounted () {
      // $children获取子组件数组，不包括普通元素，不保证模板中顺序
      console.log(this.$children);
      // $refs用于引用命名的元素或组件，可包含普通元素
      console.log(this.$refs.child2);
      
    },
  }
</script>

<style scoped>

</style>