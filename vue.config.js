const resolve = dir => require('path').join(__dirname, dir)

module.exports = {
  publicPath: "/best-practice",
  devServer: {
    port: 7070,
  },
  // configureWebpack: {
  //   resolve: {
  //     alias: {
  //       comps: require('path').join(__dirname, 'src/components')
  //     }
  //   }
  // },
  configureWebpack(config) {
    config.resolve.alias.comps = require("path").join(
      __dirname,
      "src/components"
    );

    // 根据环境做动态设置
    if (process.env.NODE_ENV === 'development') {
      config.name = 'vue项目最佳实践'
    } else {
      config.name = 'vue best practice'
    }
  },
  chainWebpack(config) {
    // 图标加载：svg-sprite-loader
    // 1.svg默认有处理svg-loader，排除icons目录
    config.module.rule('svg')
      .exclude.add(resolve('src/icons'))
    // 2.引入svg-sprite-loader，负责加载icons目录
    config.module.rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons')).end()
      .use('svg-sprite-loader')
        .loader('svg-sprite-loader')
        .options({symbolId: 'icon-[name]'})
  }
};
