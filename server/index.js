const express = require('express')
const fs = require('fs')
const app = express()

const {createBundleRenderer} = require('vue-server-renderer')
const bundle = require('../dist/server/vue-ssr-server-bundle.json')
const clientManifest = require('../dist/client/vue-ssr-client-manifest.json')
const renderer = createBundleRenderer(bundle, {
    runInNewContext: false,
    template: fs.readFileSync('../src/index.temp.html', 'utf-8'),
    clientManifest: clientManifest
})

function renderToString(context) {
    return new Promise((resolve, reject) => {
        renderer.renderToString(context, (err, html) => {
            if (err) {
                reject(err)
                return;
            }
            resolve(html)
        })
    })
}

// 页面
// const page = new Vue({
//     data:{
//         name:'开课吧',
//         count:1
//     },
//     template:`
//         <div >
//             <h1>{{name}}</h1>
//             <h1>{{count}}</h1>
//         </div>
//     `
// })
app.use(express.static('../dist/client'))
app.get('*', async function(req, res){
    // renderToString可以将vue实例转换为html字符串
    // 若未传递回调函数，则返回Promise
    try {
        const context = {
            title: 'ssr test',
            url: req.url
        }
        const html = await renderToString(context)
        res.send(html)
    } catch (error) {
        res.status(500).send('Internal Server Error')
    }
})

app.listen(3000, ()=>{
    console.log('启动成功')
})