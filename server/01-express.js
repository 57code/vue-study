// 传统web，网页内容在服务端渲染完成，一次性传输到浏览器。
// 属于服务端渲染，这里使用express演示传统页面渲染
const express = require('express')
const app = express()

app.get('/', function (req, res) {
  const html = `
    <div id="app">
      <h1>开课吧</h1>
      <p>开课吧真不错</p>
    </div>
  `
  res.send(html)
})

app.listen(3000)