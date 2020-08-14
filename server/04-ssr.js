// 最终的服务端渲染脚本

// node代码
// express server
const express = require('express')
const app = express()
const {createBundleRenderer} = require('vue-server-renderer')

// 获取指定文件绝对路径
const resolve = dir => require('path').resolve(__dirname, dir)

// 第 1 步：开放dist/client目录，关闭默认下载index页的选项，不然到不了后面路由
app.use(express.static(resolve('../dist/client'), {index: false}))


// 获取渲染器
// 第 3 步：服务端打包文件地址
const bundle = resolve("../dist/server/vue-ssr-server-bundle.json");

const renderer = createBundleRenderer(bundle, {
  runInNewContext: false, // https://ssr.vuejs.org/zh/api/#runinnewcontext
  template: require('fs').readFileSync(resolve("../public/index.html"), "utf-8"), // 宿主文件
  clientManifest: require(resolve("../dist/client/vue-ssr-client-manifest.json")) // 客户端清单
});

app.get('*', async (req, res) => {

  // 构造renderer上下文
  const context = {
    title: 'ssr test',
    url: req.url // 用户请求的首屏地址
  }
  
  try {
    // renderToString将Vue实例转换为html字符串
    const html = await renderer.renderToString(context)
    res.send(html)
  } catch (error) {
    res.status(500).send('服务器渲染错误')
  }
  
})

app.listen(3000)