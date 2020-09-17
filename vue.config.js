const port  = 7070
const path = require('path')
const resolve = dir => path.join(__dirname, dir)
module.exports = {
  publicPath: '/best-practice',
  devServer: {
    port
  },
  // webpack基础配置
  // configureWebpack: {
  //   // alias
  //   resolve: {
  //     alias: {
  //       // src/components目录
  //       comps: path.join(__dirname, 'src/components')
  //     }
  //   }
  // }
  configureWebpack(config) {
    // 根据环境变量动态做配置
    config.resolve.alias.comps = path.join(__dirname, 'src/components')
    if (process.env.NODE_ENV === 'development') {
      config.name = 'vue项目最佳实践'
    } else {
      config.name = 'vue best practice'
    }
  },
  // 链式配置
  chainWebpack(config) {
    // svg icon图标获取和打包
    // 由于当前配置对svg是有操作的
    // 1.默认svg loader排除我们的icons目录
    config.module.rule('svg')
      .exclude.add(resolve('src/icons'))
    // 2.添加我们的loader，只加载icons
    config.module.rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons')).end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
        .options({symbolId: 'icon-[name]'})  // #icon-wx.svg

  }
}