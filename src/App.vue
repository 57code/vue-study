<template>
  <div id="app">
    <img :src="logo" alt="vue">
    <HelloWorld msg="Hello, Vue"></HelloWorld>
  </div>
</template>

<script>
import logo from '@/assets/logo.png'
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "app",
  components: {
    HelloWorld,
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
