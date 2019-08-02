<template>
  <div>
    List
    <ul>
      <li @click="$router.push({name:'detail', params: {id: '1'}})">
        web全栈
      </li>
    </ul>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
</style>