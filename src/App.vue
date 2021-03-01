<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">
        <svg-icon icon-class="yx"></svg-icon>
        Home
      </router-link>
      |
      <router-link to="/about">
        <svg-icon icon-class="bp"></svg-icon>
        About</router-link
      >
    </div>

    <!-- store -->
    <p @click="$store.commit('add')">{{ $store.state.counter }}</p>
    <p @click="$store.dispatch('add')">async: {{ $store.state.counter }}</p>
    <p>{{ $store.getters.doubleCounter }}</p>

    <router-view />
  </div>
</template>
<script>
console.log('------client------');
console.log(process.env.foo);
console.log(process.env.VUE_APP_BAR);

export default {
  
}
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
