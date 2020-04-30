<template>
  <div>
    <h2>组件通信</h2>
    <!-- props, 自定义事件 -->
    <Child1 msg="some msg from parent" @some-event="onSomeEvent"></Child1>
    <!-- 事件总线 -->
    <Child2 msg="other msg" v-on="$listeners"></Child2>
  </div>
</template>

<script>
  import Child1 from '@/components/communication/Child1.vue'
  import Child2 from '@/components/communication/Child2.vue'
  
  export default {
    components: {
      Child1, Child2,
      // Child3: () => import('./Child3.vue')
    },
    methods: {
      onSomeEvent(msg) {
        console.log('Communition:', msg);
      }
    },
    mounted () {
      // $children持有所有自定义组件
      // 它不保证顺序
      console.log(this.$children);
    },
  }
</script>

<style scoped>

</style>