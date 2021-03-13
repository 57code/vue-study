const path = require('path')
const resolve = dir => path.join(__dirname, dir)
const port = 7070

console.log(process.env.foo);

module.exports = {
  publicPath: '/best-practice',
  devServer: {
    port
  },
  // configureWebpack: {
  //   resolve: {
  //     alias: {
  //       comps: path.join(__dirname, 'src/components')
  //     }
  //   }
  // },
  configureWebpack(config) {
    config.resolve.alias.comps = path.join(__dirname, 'src/components')
    
    if (process.env.NODE_ENV === 'development') {
      // 会被写入到webpackConfig
      config.name = '项目最佳实践'
    } else {
      config.name = 'best practice'
    }
  },
  // 链式语法
  chainWebpack(config) {
    // svg图片icon加载：svg-sprite-loader
    // 1.当前项目已经有一个svg loader处理，需要排除我们图标目录
    config.module.rule('svg').exclude.add(resolve('src/icons'))

    // 2.添加一个svg-sprite-loader，仅加载图标目录
    config.module.rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons')).end()
      .use('svg-sprite-loader')
        .loader('svg-sprite-loader')
        .options({symbolId: 'icon-[name]'})

  }
}