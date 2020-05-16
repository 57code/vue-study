<template>
  <div id="app">
    <HelloWorld msg="Hello, Vue!"></HelloWorld>
    <p @click="$store.commit('add')">{{$store.state.count}}</p>
    <nav>
      <router-link to="/">index</router-link>
      <router-link to="/detail">detail</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  components: {
    HelloWorld
  },
  asyncData({store, route}) {
    // 调用者会传入store和route实例
    return store.dispatch('getCount')
  }
}
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
