import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

// 1.实现一个插件
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

// 实现一个VueRouter类
const router = new VueRouter({
  routes
})

export default router
