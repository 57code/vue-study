<template>
  <div>
    <span>{{ message }}</span>
    <button @click="changeMsg">点击</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: "vue-text"
    };
  },
  created() {
    this.message = "开课吧";
  },
  methods: {
    changeMsg() {
      this.message = "按钮点击";
    }
  }
};
</script>