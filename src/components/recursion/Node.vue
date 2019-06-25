<template>
    <div>
        <h3>{{data.title}}</h3>
        <!-- 必须有结束条件 -->
        <Node v-for="d in data.children" :key="d.id" :data="d"></Node>
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
        },
    }
</script>