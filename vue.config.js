const port = 7070;
const title = 'vue项目最佳实践'

const path = require('path')
// 将传入的相对路径转换为绝对路径
function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    publicPath: '/best-practice',
    devServer: {
        port
    },
    configureWebpack: {
        name: title
    },
    chainWebpack(config) {
        config.module.rule('svg')
            .exclude.add(resolve('src/icons'));
        
        // 添加svg-sprite-loader
        config.module.rule('icons')
            .test(/\.svg$/) //设置test
            .include.add(resolve('src/icons')) //加入include
              .end() // add完上下文进入了数组，使用end回退
            .use('svg-sprite-loader') // 添加loader
              .loader('svg-sprite-loader') // 切换上下文到loader  
              .options({symbolId: 'icon-[name]'}) //指定选项
              .end()
    }
}