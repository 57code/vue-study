import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 配置路由：这里要做一个工厂函数，每次请求要返回一个实例
export function createRouter() {
  return new Router({
    mode: 'history', // 可能在前端执行，所以要设置模式
    routes: [
      {path: '/', component: {render: h => h('div','index page')}},
      {path: '/detail', component: {render: h => h('div','detail page')}},
    ]
  })
}