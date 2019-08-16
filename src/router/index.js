import Vue from "vue";
import Router from "vue-router";
// import Home from "./views/Home.vue";
// import List from "./views/List.vue";
// import Detail from "./views/Detail.vue";
import Layout from '@/layout'; // 布局页

Vue.use(Router);

// 通用页面
export const constRoutes = [
  {
    path: "/login",
    component: () => import("@/views/Login"),
    hidden: true // 导航菜单忽略该项
  },
  {
    path: "/",
    component: Layout,// 应用布局
    redirect: "/home",
    meta: {title:'主页'},
    children: [
      {
        path: "home",
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/Home.vue"),
        name: "home",
        meta: { 
            title: "Home", // 导航菜单项标题
            icon: "qq" // 导航菜单项图标
        }
      },
      {
        path: "bla",
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/Home.vue"),
        name: "bla",
        meta: { 
            title: "blabla", // 导航菜单项标题
            icon: "wx" // 导航菜单项图标
        }
      }

    ]
  }
];

export const asyncRoutes = [
  {
    path: "/about",
    component: Layout,
    redirect: "/about/index",    
    children: [
      {
        path: "index",
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/About.vue"),
        name: "about",
        meta: { 
            title: "About", 
            icon: "qq",
            // 角色决定将来那些用户可以看到该路由
            roles: ['admin', 'editor']
        },
      },
      {
        path: "foo",
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/About.vue"),
        name: "foo",
        meta: { 
            title: "foo", 
            icon: "wx",
            // 角色决定将来那些用户可以看到该路由
            roles: ['admin']
        },
      }
    ]
  }
];

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: constRoutes
});


// const router = new Router({
//   mode: "history",
//   base: process.env.BASE_URL,
//   routes: [
//     {
//       path: "/",
//       component: Home,
//       name: 'home',
//       redirect: '/list',
//       children: [
//         { path: "/list", name: "list", component: List },
//         { path: "/detail/:id", name: 'detail', component: Detail }
//       ]
//     },
//     {
//       path: "/about",
//       name: "about",
//       meta: { auth: true },
//       // beforeEnter(){},
//       // route level code-splitting
//       // this generates a separate chunk (about.[hash].js) for this route
//       // which is lazy-loaded when the route is visited.
//       component: () =>
//         import(/* webpackChunkName: "about" */ "./views/About.vue")
//     }
//   ]
// });

// // 全局守卫
// router.beforeEach((to, from, next) => {
//   if (to.meta.auth && !window.isLogin) {
//     if (window.confirm("请登录")) {
//       window.isLogin = true;
//       next(); // 登录成功继续下一步
//     } else {
//       next("/"); // 放弃回首页
//     }
//   } else {
//     next(); // 不需登录，继续
//   }
// });

// export default router;
