<template>
  <div id="app">
<<<<<<< HEAD
    <Sidebar></Sidebar>
    <div id="nav">
      <router-link to="/">
        <svg-icon icon-class="denglong"></svg-icon>Home
      </router-link>|
      <router-link to="/about">About</router-link>
    </div>

    <!-- 路由出口 -->
=======
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <!-- <p @click="$store.commit('add')">{{ $store.state.counter }}</p>
    <p @click="$store.dispatch('add')">async:{{ $store.state.counter }}</p> -->
    <!-- <p>{{ $store.getters.doubleCounter }}</p> -->
>>>>>>> 2c65389d71cbe23b8c86eeb55380a66a3bc0c45f
    <router-view />
  </div>
</template>

<<<<<<< HEAD
<script>
import Sidebar from "@/components/Sidebar";

export default {
  components: {
    Sidebar
  }
};
</script>
=======
>>>>>>> 2c65389d71cbe23b8c86eeb55380a66a3bc0c45f
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
