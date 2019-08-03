import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import List from "./views/List.vue";
import Detail from "./views/Detail.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      component: Home,
      name: 'home',
      redirect: '/list',
      children: [
        { path: "/list", name: "list", component: List },
        { path: "/detail/:id", name: 'detail', component: Detail }
      ]
    },
    {
      path: "/about",
      name: "about",
      meta: { auth: true },
      // beforeEnter(){},
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    }
  ]
});

// 全局守卫
router.beforeEach((to, from, next) => {
  if (to.meta.auth && !window.isLogin) {
    if (window.confirm("请登录")) {
      window.isLogin = true;
      next(); // 登录成功继续下一步
    } else {
      next("/"); // 放弃回首页
    }
  } else {
    next(); // 不需登录，继续
  }
});

export default router;
