<template>
  <div>
    <h3 :style="{'text-indent': indent+'em'}">{{data.name}}</h3>
    <!-- 有条件嵌套 -->
    <Node v-for="n in data.children" :key="n.name" :data="n" :level="level+1">
    </Node>
  </div>
</template>

<script>
    export default {
        name: 'Node', // name对递归组件是必要的
        props: {
            data: {
                type: Object,
                require: true 
            },
            level: {
              type: Number,
              default: 0
            }
        },
        computed: {
          indent() {
            return this.level * 2
          }
        }
    }
</script>