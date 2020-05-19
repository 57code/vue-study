<template>
  <div id="app">
    <p @click="add">{{count}}</p>
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"
      @add-feature="addFeature"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from './components/HelloWorld.vue';
import { FeatureSelect } from './types';
import cm from '@/store/counter'

@Component({
  components: {
    HelloWorld,
  },
})
export default class App extends Vue {
  addFeature(f: FeatureSelect) {
    console.log(f.name);
  }

  get count() {
    return cm.count
  }

  add() {
    cm.add()
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
