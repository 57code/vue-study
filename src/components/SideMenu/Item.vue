<template>
  <!-- hidden选项存在则不显示 -->
  <li v-if="!model.hidden">
    <div @click="toggle">
      <!-- 图标 -->
      <Icon v-if="model.meta && model.meta.icon" :icon-class="model.meta.icon"></Icon>
      <!-- 标题 -->
      <span v-if="isFolder">
        <span v-if="model.meta && model.meta.title">{{model.meta.title}}</span>
        <!-- 有子元素就显示 -->
        <span>[{{open ? '-' : '+'}}]</span>
      </span>
      <!-- 如果是叶子节点。渲染连接 -->
      <template v-else>
        <router-link
          v-if="model.meta && model.meta.title"
          :to="resolvePath(model.path)"
        >{{model.meta.title}}</router-link>
      </template>
    </div>
    <!-- 子树 -->
    <ul v-show="open" v-if="isFolder">
      <item
        class="item"
        v-for="route in model.children"
        :model="route"
        :key="route.path"
        :base-path="resolvePath(model.path)"
      ></item>
    </ul>
  </li>
</template>
<script>
import path from "path";

export default {
  name: "Item",
  props: {
    model: Object,
    basePath: {
      type: String,
      default: ""
    }
  },
  data: function() {
    return {
      open: false // 打开状态
    };
  },
  computed: {
    isFolder: function() {
      // 是否有子树
      return this.model.children && this.model.children.length;
    }
  },
  methods: {
    toggle: function() {
      if (this.isFolder) {
        this.open = !this.open;
      }
    },
    // 拼接父path和子path为完整path
    resolvePath(routePath) {
      return path.resolve(this.basePath, routePath);
    }
  }
};
</script>