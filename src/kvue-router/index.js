import Vue from 'vue'
import VueRouter from './kvue-router'
import Home from '../views/Home.vue'

// vue插件：
// 1.fn
// 2.object.install
// Vue.use这个方法会调用插件install(Vue)方法
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
