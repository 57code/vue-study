<template>
  <div id="app">
    <ul>
      <item class="item" 
        v-for="route in permission_routes"
        :key="route.path"
        :model="route"
        :base-path="route.path"></item>
    </ul>
  </div>
</template>
<script>
import Item from "./Item";
import {mapGetters} from 'vuex'
export default {
  name: "SideMenu",
  components: { Item },
  computed: {
    ...mapGetters(['permission_routes'])
  },
};
</script>