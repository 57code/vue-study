<template>
  <div id="app">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <!-- <CompCommunicate /> --> 
    <!-- <SlotsTest></SlotsTest> -->
    <!-- <Recursion></Recursion> -->
    <!-- <FormSample></FormSample> -->
    <Tree></Tree>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import CompCommunicate from "./components/communicate";
import SlotsTest from "./components/slots";
import Recursion from "./components/recursion";
import FormSample from "./components/form";
import Tree from "./components/tree";

export default {
  name: "app",
  components: {
    HelloWorld,
    CompCommunicate,
    SlotsTest,
    Recursion,
    FormSample,
    Tree
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
