<template>
  <div id="app">
    <nav>
      <router-link to="/">首页</router-link>
      <router-link to="/admin">管理</router-link>
    </nav>

    <!-- 路由出口 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  
};
</script>

<style lang="scss">
a {
  color: $color;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

#app {
  /deep/ .inp {
    border: 1px solid #2687e7
  }  
}
</style>
