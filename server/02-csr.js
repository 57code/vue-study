// 客户端渲染，返回给客户端的只是页面骨架，没有实际内容
// 真正的内容是在客户端使用js动态生成的
const express = require('express')
const app = express()

app.get('/', function (req, res) {
  const html = `
    <div id="app">
      <h1>{{title}}</h1>
      <p>{{content}}</p>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script>
      new Vue({
        el:'#app',
        data:{
          title:'开课吧', 
          content:'开课吧真不错'
        }
      })
    </script>
  `
  res.send(html)
})

app.listen(3000)