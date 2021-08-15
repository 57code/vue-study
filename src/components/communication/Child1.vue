<template>
  <div @click="$emit('some-event', 'msg from child1')">
    <h3>child1</h3>
    <p>{{msg}}</p>
  </div>
</template>

<script>
  export default {
    props: {
      msg: {
        type: String,
        default: ''
      },
    },
    mounted () {
<<<<<<< HEAD
      // this.$bus.$on('event-from-child2', msg => {
      //   console.log('Child1:', msg);
      // });
=======
      // 总线方式通信
      // this.$bus.$on('event-from-child2', msg => {
      //   console.log('Child1:', msg);
      // });

      // 利用共同祖辈方式通信
      // 兄弟组件可以使用$parent, 没有直接关系使用$root
>>>>>>> 2c65389d71cbe23b8c86eeb55380a66a3bc0c45f
      this.$parent.$on('event-from-child2', msg => {
        console.log('Child1:', msg);
      });
    },
    methods: {
      eat() {
        console.log('这就回家！');
        
      }
    },
  }
</script>

<style scoped>

</style>