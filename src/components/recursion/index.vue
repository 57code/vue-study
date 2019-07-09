<template>
  <div>
    <Node :data="data"></Node>
  </div>
</template>

<script>
import Node from "./Node.vue";

export default {
  data() {
    return {
      data: {
        id: "1",
        title: "递归组件",
        children: [
            { id: "1-1", title: "使用方法" },
            { id: "1-2", title: "注意事项" }
        ]
      }
    };
  },
  components: {
    Node
  }
};
</script>