import Vue from 'vue'
import VueRouter from './kvue-router'
import Home from '../views/Home.vue'

// 引入插件:
// 调用了Router插件的install
// 1.注册了两个全局组件：router-link和router-view
// 2.在Vue原型上添加$router
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

const router = new VueRouter({
  routes
})

export default router
