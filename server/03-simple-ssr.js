// 创建一个express实例
const express = require('express')

const app = express()

// 导入vue
const Vue = require('vue')

// 创建渲染器
const { createRenderer } = require('vue-server-renderer')

const renderer = createRenderer()

// 导入路由
const Router = require('vue-router')
Vue.use(Router)


// 路由：问题2：由express在管理
app.get('*', async (req, res) => {
  // 创建一个路由器实例
  const router = new Router({
    routes: [
      { path: '/', component: { template: '<div>Index</div>' } },
      { path: '/detail', component: { template: '<div>detail</div>' } },
    ]
  })


  // 构建渲染页面内容
  // 问题1：没办法交互
  // 问题3：同构开发问题
  const vm = new Vue({
    router,
    data() {
      return {
        name: '村长真棒'
      }
    },
    template: `
    <div>
      <router-link to="/">index</router-link>
      <router-link to="/detail">detail</router-link>
      <div>{{name}}</div>
      <router-view></router-view>
    </div>
    `
  })

  try {
    // 路由跳转
    router.push(req.url)

    // 渲染: 得到html字符串
    const html = await renderer.renderToString(vm)
    // 发送回前端
    res.send(html)
  } catch (error) {
    res.status(500).send('服务器内部错误')
  }

})

// 监听端口
app.listen(3000)