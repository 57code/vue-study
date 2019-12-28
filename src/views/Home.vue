<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <!-- <communication></communication> -->
    <!-- <slot-example></slot-example> -->
    <!-- <form-example></form-example> -->
    <p @click="$store.commit('add')">counter: {{$store.state.counter}}</p>
    <p @click="asyncAdd">async counter: {{$store.state.counter}}</p>
    <p>double：{{$store.getters.doubleCounter}}</p>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import communication from '@/components/communication';
import SlotExample from '@/components/slots'
import FormExample from '@/components/form'

export default {
  name: 'home',
  components: {
    HelloWorld,
    communication,
    SlotExample,
    FormExample
  },
  methods: {
    asyncAdd() {
      this.$store.dispatch('add').then(()=>alert('add!!'))
    }
  },
}
</script>
