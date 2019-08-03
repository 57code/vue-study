<template>
  <div id="app">
    <!-- <VuexTest></VuexTest> -->
    <KVuexTest></KVuexTest>
    <!-- 路由 -->
    <!-- <router-link to="/list">Home</router-link>
    <router-link to="/about">About</router-link>
    <router-view />
    <comp></comp> -->
    <!-- <Tree></Tree> -->
    <!-- <FormTest /> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" ref="hw" @foo="onFoo($event)" /> -->
    <!-- <HelloWorld> -->
    <!-- 默认插槽用default做参数 -->
    <!-- <template v-slot:default>abcdefg</template> -->
    <!-- 具名插槽用插槽名做参数 -->
    <!-- <template v-slot:content="{bla,bar}">{{bla}}{{bar}}</template> -->
    <!-- </HelloWorld> -->
    <!-- <CompCommunicate /> -->
    <!-- <SlotsTest></SlotsTest> -->
    <!-- <Recursion></Recursion> -->
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import CompCommunicate from "./components/communicate";
import SlotsTest from "./components/slots";
import Recursion from "./components/recursion";
import FormTest from "./components/form";
import Tree from "./components/tree";
import VuexTest from './components/VuexTest.vue';
import KVuexTest from './components/KVuexTest.vue';
export default {
  name: "app",
  provide() {
    return { dong: this };
  },
  data() {
    return {
      bla: "blabla"
    };
  },
  components: {
    HelloWorld,
    CompCommunicate,
    SlotsTest,
    Recursion,
    FormTest,
    Tree,
    VuexTest,
    KVuexTest,
  },
  created() {
    // 父组件先于子组件创建
    // console.log(this.$refs.hw);
  },
  mounted() {
    // this.$refs.hw.foo = "bar";
    // this.$children[0].foo = "dong";
  },
  methods: {
    onFoo(e) {
      console.log("onFoo");
      console.log(e);
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
