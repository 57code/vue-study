<template>
  <div class="home">
<<<<<<< HEAD
    <img src="@/assets/logo.png">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <!-- <communication></communication> -->
    <!-- <slot-example></slot-example> -->
    <!-- <form-example></form-example> -->
    <p @click="$store.commit('add')">counter:{{$store.state.counter}}</p>
    <p @click="$store.dispatch('add')">async counter:{{$store.state.counter}}</p>
    <!-- <p>double counter:{{$store.getters.doubleCounter}}</p> -->
=======
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
>>>>>>> 2c65389d71cbe23b8c86eeb55380a66a3bc0c45f
  </div>
</template>

<script>
<<<<<<< HEAD
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
=======
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
>>>>>>> 2c65389d71cbe23b8c86eeb55380a66a3bc0c45f
}
</script>
