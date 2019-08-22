<template>
    <div>
        <h2>Index Page</h2>
        <p>num: {{$store.state.count}}</p>
        <button @click="$store.commit('add')">add</button>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>

</style>