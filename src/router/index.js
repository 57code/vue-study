import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 路由配置
const routes =
  [
    // 客户端没有编译器，这里要写成渲染函数
    { path: "/", component: { render: h => h('div', 'index page') } },
    { path: "/detail", component: { render: h => h('div', 'detail page') } }
  ]

// 不同之处，这里应该是创建路由器实例的工厂函数
export function createRouter() {
  return new Router({
    mode: 'history',
    routes
  })
}