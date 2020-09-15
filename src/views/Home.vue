<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"
      @add-feature="addFeature" />
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import HelloWorld, {FeatureSelect} from '@/components/HelloWorld.vue'
import Vue from 'vue'

export default Vue.extend({
  name: 'Home',
  components: {
    HelloWorld
  },
  methods: {
    addFeature(feature: FeatureSelect) {
      console.log('add a new feature:',feature.name);
      
    }
  }
})
</script>
