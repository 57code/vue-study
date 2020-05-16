const express = require('express')

const app = express()

// 导入Vue
const Vue = require('vue')

// 导入Vue-router
const Router = require('vue-router')
Vue.use(Router)

// 创建一个渲染器
const { createRenderer } = require('vue-server-renderer')
const renderer = createRenderer()

// 处理路由
app.get('*', async (req, res) => {
  // 创建Router实例
  const router = new Router({
    routes: [
      {path: '/', component: {template: '<div>index page</div>'}},
      {path: '/detail', component: {template: '<div>detail page</div>'}},
    ]
  })
  // 创建一个vue实例，用上面renderer渲染该实例获取html内容
  const vm = new Vue({
    data: { name: '村长真棒' },
    template: `
      <div>
        <router-link to="/">index</router-link>
        <router-link to="/detail">detail</router-link>

        <router-view></router-view>
      </div>
    `,
    router
  })

  try {
    // 跳转到首屏
    router.push(req.url)
    const html = await renderer.renderToString(vm)
    res.send(html)
  } catch (error) {
    console.log(error);
    
    res.status(500).send('服务器内部错误')
  }
  
})

app.listen(3000)