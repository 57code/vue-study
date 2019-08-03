<template>
    <div>
        <h3>vuex test</h3>
        <p>{{$store.state.count}}</p>
        <p>{{$store.getters.score}}</p>
        <button @click="add">add</button>
        <button @click="asyncAdd">asyncAdd</button>
    </div>
</template>

<script>
    export default {
        methods: {
            add() {
                this.$store.commit('add', 2);
            },
            async asyncAdd() {
                const result = await this.$store.dispatch('asyncAdd');
                if (result.ok === 1) {
                    alert('操作成功！！')
                }
            }
        },
    }
</script>