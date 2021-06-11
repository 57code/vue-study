<template>
  <div @click="$emit('some-event', 'some msg from grandson')">
    <h3>grandson</h3>
    <p>{{ msg }}</p>
    <!-- provide/inject -->
    <p>{{ foo }}</p>
  </div>
</template>

<script>
export default {
  inject: ["foo", 'grandpa'],
  props: {
    msg: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss" scoped></style>
