<template>
  <li>
    <div @click="toggle">
        <!-- 标题 -->
      {{model.title}}
      <!-- 有子元素就显示 -->
      <span v-if="isFolder">[{{open ? '-' : '+'}}]</span>
    </div>
    <!-- 子树 -->
    <ul v-show="open" v-if="isFolder">
      <item class="item" v-for="model in model.children" :model="model" :key="model.title"></item>
    </ul>
  </li>
</template>
<script>
export default {
  name: "Item",
  props: {
    model: Object
  },
  data: function() {
    return {
      open: false  // 打开状态
    };
  },
  computed: {
    isFolder: function() { // 是否有子树
      return this.model.children && this.model.children.length;
    }
  },
  methods: {
    toggle: function() {
      if (this.isFolder) {
        this.open = !this.open;
      }
    },
  }
};
</script>