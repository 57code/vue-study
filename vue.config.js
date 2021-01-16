const port = 7070
const path = require('path')
const resolve = dir => path.join(__dirname, dir)

// 
console.log(process.env.foo);
console.log(process.env.VUE_APP_DUANG);

module.exports = {
  publicPath: '/best-practice',
  devServer: {
    port
  },
  // 基础webpack配置
  // configureWebpack: {
  //   name: 'vue项目最佳实践', 
  //   resolve: {
  //     alias: {
  //       comps: path.join(__dirname, 'src/components')
  //     }
  //   }
  // }
  configureWebpack(config) {
     config.resolve.alias.comps = path.join(__dirname, 'src/components')
     if (process.env.NODE_ENV === 'development') {
       config.name = 'vue最佳实践'
      } else {
       config.name = 'vue best practice'
     }
  },
  chainWebpack(config) {
    // 默认还有一个负责svg的loader要排除icons目录
    config.module.rule('svg')
      .exclude.add(resolve('src/icons'))
    // 自己的图表只负责加载icons中的svg
    config.module.rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons')).end()
      .use('svg-sprite-loader') // 设置use选项
      .loader('svg-sprite-loader')
      .options({symbolId: 'icon-[name]'})
  }
}