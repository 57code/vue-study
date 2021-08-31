import Vue from 'vue'
import VueRouter from './kvue-router'
import Home from '../views/Home.vue'

// 引入插件
// use方法将来会调用install方法
Vue.use(VueRouter)

// 路由映射表
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
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

const router = new VueRouter({
  routes
})

export default router
