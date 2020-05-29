<template>
  <div>
    <h3>grandson</h3>
    <!-- 非属性特性 -->
    <p>{{foo}}</p>
    <!-- 隔代传值 -->
    <p>{{baz}}</p>
    <p>{{grand.$options.name}}</p>
    <button @click="$emit('some-event', 'msg from grandson')">给爷爷发送消息</button>
  </div>
</template>

<script>
  export default {
    inject: {
      baz: 'bar',
      grand: {
        from: 'grandpa',
        default: ''
      }
    },
    props: {
      foo: {
        type: String,
        default: ''
      },
    }
  }
</script>

<style scoped>

</style>