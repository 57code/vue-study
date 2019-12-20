import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'

Vue.use(VueRouter)

// 配置
const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/course/:name',
    component: () => import('../views/Detail.vue')
  },
  {
    // 会匹配所有路径
    path: '*',
    component: () => import('../views/404.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 全局守卫
// router.beforeEach((to, from, next) => {
//   // 判断路由是否需要守卫
//   // meta数据
//   if (to.meta.auth) {
//     // 是否登录
//     if (window.isLogin) {
//       next()
//     } else {
//       next('/login?redirect='+to.fullPath)
//     }
//   } else {
//     next()
//   }
// })

let hasAddAuthRoute = false;

export function addAuthRoute() {
  if (!hasAddAuthRoute) {
    // 动态添加路由
    router.addRoutes([
      {
        path: "/admin",
        name: "admin",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/Admin.vue"),
        children: [
          {
            path: "/admin/course/:name",
            name: "detail",
            component: () => import("../views/Detail.vue")
          }
        ]
      }
    ]);
    hasAddAuthRoute = true
  }

}

router.beforeEach((to, from, next) => {
  // 判断逻辑：
  if (store.state.user.isLogin) {
    // 可能是缓存登录状态，执行一下路由添加
    addAuthRoute()

    // 已登录
    if (to.path === '/login') {
      // 已登录没必要去登录页，重定向至首页
      next('/')
    } else {
      // 去其他页放行
      next()
    }
  } else {
    // 没有登录
    if (to.path === '/login') {
      // 要去登录页就直接放行
      next()
    } else {
      // 否则重定向到登录页
      next('/login?redirect=' + to.fullPath)
    }
  }
})

export default router
