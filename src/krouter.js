import Vue from 'vue'
import Home from "./views/Home";
import About from "./views/About";
import VueRouter from './kvue-router'

// 插件注册
Vue.use(VueRouter);

export default new VueRouter({
  routes: [
      { path: "/", component: Home }, 
      { path: "/about", component: About }
  ]
});