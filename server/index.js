const express = require('express')
const Vue = require('vue')

const app = express()
const renderer = require('vue-server-renderer').createRenderer()
// 页面
const page = new Vue({
    data:{
        name:'开课吧',
        count:1
    },
    template:`
        <div >
            <h1>{{name}}</h1>
            <h1>{{count}}</h1>
        </div>
    `
})

app.get('/', async function(req, res){
    // renderToString可以将vue实例转换为html字符串
    // 若未传递回调函数，则返回Promise
    try {
        const html = await renderer.renderToString(page)
        res.send(html)
    } catch (error) {
        res.status(500).send('Internal Server Error')
    }
})

app.listen(3000, ()=>{
    console.log('启动成功')
})