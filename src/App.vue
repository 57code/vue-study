<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view></router-view>
    <!-- <img src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App" @click="onClick"/>
    <HelloWorld msg="Welcome to Your Vue.js App" ref="hw2">
      <template v-slot:default>abc</template>
      <template v-slot:content="{baz}">content...{{baz}}</template>
    </HelloWorld> -->
    <!-- <communication></communication> -->
    <!-- <slot-example></slot-example> -->
    <!-- <form-example></form-example> -->
    <!-- <NodeTest></NodeTest> -->
    <!-- <tree-test></tree-test> -->
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import communication from '@/components/communication';
import SlotExample from '@/components/slots'
import FormExample from '@/components/form'
import TreeTest from '@/components/recursion';
import NodeTest from '@/components/recursion/NodeTest.vue';

export default {
  name: 'app',
  provide() {
    // 隔代传参，用法类似于data
    return {
      bar: 'barrrrrrrrr',
      app: this
    }
  },
  components: {
    HelloWorld,
    communication,
    SlotExample,
    FormExample,
    TreeTest,
    NodeTest
  },
  mounted () {
    // this.$children[0].xx = 'ooooooooxxxxxxxxx';
    // this.$refs.hw2.xx = 'blablabla'
  },
  methods: {
    onClick() {
      console.log('click me!!');
      
    }
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 60px;
}
</style>
