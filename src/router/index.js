import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/views/index.vue'
import Detail from '@/views/detail.vue'

Vue.use(Router)

// 路由配置
const routes =
  [
    // 客户端没有编译器，这里要写成渲染函数
    { path: "/", component: Index },
    { path: "/detail", component: Detail }
  ]

// 不同之处，这里应该是创建路由器实例的工厂函数
export function createRouter() {
  return new Router({
    mode: 'history',
    routes
  })
}