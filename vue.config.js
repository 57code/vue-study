const port = 7070;
const title = "vue项目最佳实践";

const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: '/best-practice', // 部署应用包时的基本 URL
  devServer: {
    port: port,
  },
  configureWebpack: {
    // 向index.html注入标题
    name: title,
  },
  chainWebpack(config){
    config.module.rule('svg')
      .exclude.add(resolve('./src/icons'))

    config.module.rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('./src/icons')).end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
        .options({symbolId: 'icon-[name]'})      
      
  }
};