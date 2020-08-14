// node代码
// express server
const express = require('express')
const app = express()

const Vue = require('vue')
const {createRenderer} = require('vue-server-renderer')

// 获取渲染器
const renderer = createRenderer()

// 问题1：无法交互（客户端激活）
// 问题2：同构开发
app.get('*', async (req, res) => {
  req.url
  // 创建一个Vue实例
  const vm = new Vue({
    data: {name:'村长真棒'},
    template: '<div>{{name}}</div>'
  })
  
  try {
    // renderToString将Vue实例转换为html字符串
    const html = await renderer.renderToString(vm)
    res.send(html)
  } catch (error) {
    res.status(500).send('服务器渲染错误')
  }
  
})

app.listen(3000)