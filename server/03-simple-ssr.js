const express = require('express')
const app = express()

// 导入vue
const Vue = require('vue')
// 渲染器
const { createRenderer } = require('vue-server-renderer')
// 得到一个渲染器可以直接渲染vue实例
const renderer = createRenderer()

// 路由和同构
app.get('*', async (req, res) => {
//  { url: req.url}
  // 创建vue实例
  const vm = new Vue({
    data() {
      return {
        name: '村长真棒'
      }
    },
    template: '<div @click="onclick">{{name}}</div>',
    methods: {
      onclick() {
        console.log('click!');
        
      }
    },
  })
  try {
    // 渲染获取html字符串
    const html = await renderer.renderToString(vm)

    res.send(html)
  } catch (error) {
    // 500错误
    res.status(500).send('Internal Server Error')
  }

})

// 端口
app.listen(3000)