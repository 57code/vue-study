import Vue from 'vue'
import VueRouter from './kvue-router2'
import Home from '@/views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    children: [
      {
        path: '/about/detail',
        component: () => import('./views/Detail.vue'),
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
