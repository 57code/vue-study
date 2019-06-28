<template>
    <div>
        id: {{id}}
    </div>
</template>

<script>
    export default {
        props: {
            id: {
                type: String,
                default: ''
            },
        },
    }
</script>

<style lang="scss" scoped>

</style>