const express = require('express')

const app = express()

// 定义一个resolve, 返回传入文件路径的绝对路径
const resolve = dir => require('path').resolve(__dirname, dir)

// 开放dist/client目录，静态文件需要下载
app.use(express.static(resolve('../dist/client'), {index: false}))

// 创建一个bundle渲染器
const { createBundleRenderer } = require('vue-server-renderer')
// 此处bundle就是刚才生成的server/vue-ssr-server-bundle.json绝对路径
const bundle = resolve('../dist/server/vue-ssr-server-bundle.json')
const renderer = createBundleRenderer(bundle, {
  runInNewContext: false, // https://ssr.vuejs.org/zh/api/#runinnewcontext
  template: require('fs').readFileSync(resolve("../public/index.html"), "utf-8"), // 宿主文件
  clientManifest: require(resolve("../dist/client/vue-ssr-client-manifest.json")) // 客户端清单
})

// 处理路由
app.get('*', async (req, res) => {
  const context = {
    url: req.url,
    title: 'ssr test'
  }
  try {
    const html = await renderer.renderToString(context)
    res.send(html)
  } catch (error) {
    console.log(error);
    
    res.status(500).send('服务器内部错误')
  }
  
})

app.listen(3000)