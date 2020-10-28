<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p class="p1" @click="foo = 'baz'">{{foo}}</p>
    <comp v-if="foo === 'baz'"></comp>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      foo: 'foo'
    }
  },
  components: {
    comp: {
      name: 'comp',
      render(h) {
        return h('div', 'comp')
      }
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
