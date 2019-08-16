<template>
  <div class="app-wrapper">
    <sidebar class="sidebar-container" />
    <SideMenu></SideMenu>
    <div class="main-container">
      <router-view />
    </div>
  </div>
</template>

<script>
import SideMenu from '@/components/SideMenu';
import Sidebar from '@/components/Sidebar';
export default {
  components: {SideMenu,Sidebar}
}
</script>