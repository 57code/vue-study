<template>
  <div class="about">
    <h1>This is an about page</h1>
    <!-- 按钮权限 -->
    <button v-permission="['admin', 'editor']">editor button</button>
    <button v-permission="['admin']">admin button</button>
  </div>
</template>
<script>
export default {
  // beforeRouteEnter(){}
};
</script>
