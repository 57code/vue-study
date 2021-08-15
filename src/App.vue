<template>
  <div id="app">
    <Sidebar></Sidebar>
    <div id="nav">
      <router-link to="/">
        <svg-icon icon-class="denglong"></svg-icon>Home
      </router-link>|
      <router-link to="/about">About</router-link>
    </div>

    <!-- 路由出口 -->
    <router-view />
  </div>
</template>

<script>
import Sidebar from "@/components/Sidebar";

export default {
  components: {
    Sidebar
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
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
