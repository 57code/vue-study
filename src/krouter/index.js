import Vue from 'vue'
import VueRouter from './kvue-router'
import Home from '../views/Home.vue'

<<<<<<< HEAD
// 1.应用插件
=======
// use方法内部会调用install(Vue)
>>>>>>> 2c65389d71cbe23b8c86eeb55380a66a3bc0c45f
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
<<<<<<< HEAD
    name: 'home',
=======
    name: 'Home',
>>>>>>> 2c65389d71cbe23b8c86eeb55380a66a3bc0c45f
    component: Home
  },
  {
    path: '/about',
<<<<<<< HEAD
    name: 'about',
=======
    name: 'About',
>>>>>>> 2c65389d71cbe23b8c86eeb55380a66a3bc0c45f
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

<<<<<<< HEAD
// 2.创建实例
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
=======
const router = new VueRouter({
>>>>>>> 2c65389d71cbe23b8c86eeb55380a66a3bc0c45f
  routes
})

export default router
