const express = require('express')
const app = express()

// 1.静态文件服务
const path = require('path')
const resolve = dir => path.resolve(__dirname, dir)
app.use(express.static(resolve('../dist/client'), { index: false }))

// 2.渲染器：bundleRenderer，它可以获取前面生成的两个json文件
const { createBundleRenderer } = require('vue-server-renderer')
// 得到一个渲染器可以直接渲染vue实例
const bundle = resolve('../dist/server/vue-ssr-server-bundle.json')
const renderer = createBundleRenderer(bundle, {
  runInNewContext: false, // https://ssr.vuejs.org/zh/api/#runinnewcontext
  // 宿主文件
  template: require('fs').readFileSync(resolve("../public/index.html"), "utf-8"), // 宿主文件
  clientManifest: require(resolve("../dist/client/vue-ssr-client-manifest.json")) // 客户端清单
})

// 路由和同构
app.get('*', async (req, res) => {
  //  { url: req.url}
  const context = {
    url: req.url
  }

  try {
    // 渲染获取html字符串
    // renderer会调用，创建vue实例，跳转至首屏，将它渲染出来，类似快照
    const html = await renderer.renderToString(context)

    res.send(html)
  } catch (error) {
    // 500错误
    res.status(500).send('Internal Server Error')
  }

})

// 端口
app.listen(3000)