<template>
  <div>
    <div @click="toggle" :style="{paddingLeft: (level-1)+'em'}">
      <label>{{model.title}}</label>      
      <span v-if="isFolder">[{{open ? '-' : '+'}}]</span>
    </div>
    <div v-show="open" v-if="isFolder">
      <tree-node class="item" v-for="model in model.children" 
        :model="model" :key="model.title"
        :level="level + 1"></tree-node>
    </div>
  </div>
</template>

<script>
export default {
  name: "tree-node",
  props: {
    model: Object,
    level: {
      type: Number,
      default: 1
    }
  },
  data: function() {
    return {
      open: false
    };
  },
  computed: {
    isFolder: function() {
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