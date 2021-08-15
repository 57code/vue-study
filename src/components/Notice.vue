<template>
  <div class="box" v-if="isShow">
<<<<<<< HEAD
    <h3>{{title}}</h3>
    <p class="box-content">{{message}}</p>
  </div>
</template>

=======
    <h3>{{ title }}</h3>
    <p class="box-content">{{ message }}</p>
  </div>
</template>
>>>>>>> 2c65389d71cbe23b8c86eeb55380a66a3bc0c45f
<script>
export default {
  props: {
    title: {
      type: String,
<<<<<<< HEAD
      default: ""
    },
    message: {
      type: String,
      default: ""
    },
    duration: {
      type: Number,
      default: 1000
    }
  },
  data() {
    return {
      isShow: false
=======
      default: "",
    },
    message: {
      type: String,
      default: "",
    },
    duration: {
      type: Number,
      default: 1000,
    },
  },
  data() {
    return {
      isShow: false,
>>>>>>> 2c65389d71cbe23b8c86eeb55380a66a3bc0c45f
    };
  },
  methods: {
    show() {
      this.isShow = true;
      setTimeout(this.hide, this.duration);
    },
    hide() {
      this.isShow = false;
<<<<<<< HEAD
      // 清除自己
      this.remove();
    }
  }
};
</script>

=======
      this.remove();
    },
  },
};
</script>
>>>>>>> 2c65389d71cbe23b8c86eeb55380a66a3bc0c45f
<style>
.box {
  position: fixed;
  width: 100%;
  top: 16px;
  left: 0;
  text-align: center;
  pointer-events: none;
  background-color: #fff;
  border: grey 3px solid;
  box-sizing: border-box;
}
.box-content {
  width: 200px;
  margin: 10px auto;
<<<<<<< HEAD
  font-size: 14px;  
=======
  font-size: 14px;
>>>>>>> 2c65389d71cbe23b8c86eeb55380a66a3bc0c45f
  padding: 8px 16px;
  background: #fff;
  border-radius: 3px;
  margin-bottom: 8px;
}
<<<<<<< HEAD
</style>
=======
</style>
>>>>>>> 2c65389d71cbe23b8c86eeb55380a66a3bc0c45f
