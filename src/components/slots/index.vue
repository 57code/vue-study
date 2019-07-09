<template>
    <div>
        <Comp1>匿名插槽</Comp1>
        <Comp2>
            <!-- 默认插槽用default -->
            <template v-slot:default>具名插槽</template>
            <!-- v-slot:插槽名 -->
            <template v-slot:content>内容...</template>
        </Comp2>
        <Comp3>
            <!-- v-slot:插槽名="作用域上下文" -->
            <template v-slot:default="ctx">
                来自子组件数据：{{ctx.foo}}
            </template>
        </Comp3>
    </div>
</template>

<script>
    import Comp1 from './Comp1.vue'
    import Comp2 from './Comp2.vue'
    import Comp3 from './Comp3.vue'
    
    export default {
        components: {
            Comp1, Comp2, Comp3
        },
    }
</script>

<style scoped>

</style>