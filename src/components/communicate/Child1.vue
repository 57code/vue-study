<template>
  <div>
    <h2>Child1</h2>
    <p>{{title}}</p>
    <h3>{{msg}}</h3>
    <button @click="toParent">传递到父元素</button>
    <button @click="$boardcast('boardcast','我是Child1')">广播子元素</button>
    <grand-child1></grand-child1>
    <grand-child2></grand-child2>
  </div>
</template>
<script>
import GrandChild1 from "@/components/communicate/GrandChild1";
import GrandChild2 from "@/components/communicate/GrandChild2";


export default {
  name: "Child1",
  props: ["title"],
  data() {
    return {
      msg: ""
    };
  },
  components: {
    GrandChild1,
    GrandChild2
  },
  methods: {
    toParent() {
      this.$emit("getmsg", "爸爸,我知道错了");
    }
  },
  mounted() {
    this.$on("dispatch", msg => {
      this.msg = "接收dispatch消息:" + msg;
    });
            this.$bus.$on("event-bus",msg=>{
            this.msg = '接收event-bus消息:'+ msg
        })
  }
};
</script>

