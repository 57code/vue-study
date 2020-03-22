<template>
  <div class="kkb-tree">
    <!-- 数据是数组，不是单根对象 -->
    <TreeNode v-for="item in data" :key="item.title" :model="item"></TreeNode>
  </div>
</template>

<script>
  import TreeNode from '@/components/recursion/TreeNode.vue';

  export default {
    props: {
      // 数据是数组
      data: {
        type: Array,
        required: true 
      },
    },
    components: {
      TreeNode,
    },
  }
</script>

<style scoped>
.kkb-tree {
  text-align: left;
}
</style>