<template>
  <div class="home">
    <img src="@/assets/logo.png">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <!-- <communication></communication> -->
    <!-- <slot-example></slot-example> -->
    <!-- <form-example></form-example> -->
    <p @click="$store.commit('add')">counter:{{$store.state.counter}}</p>
    <p @click="$store.dispatch('add')">async counter:{{$store.state.counter}}</p>
    <!-- <p>double counter:{{$store.getters.doubleCounter}}</p> -->
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'
import communication from '@/components/communication';
import SlotExample from '@/components/slots'
import FormExample from '@/components/form'

export default {
  name: 'app',
  components: {
    HelloWorld,
    communication,
    SlotExample,
    FormExample
  },
  // created () {
  //   this.$store.state = {};
  // },
}
</script>
