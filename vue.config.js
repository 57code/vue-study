const path = require("path");

// 封装一个方法获取绝对地址
const resolve = (dir) => path.join(__dirname, dir);

console.log('-------------');
console.log(process.env.foo);
console.log(process.env.VUE_APP_BAR);

module.exports = {
  // 上下文
  publicPath: "/best-practice",
  devServer: {
    port: 7070,
  },
  // webpack基础配置
  // configureWebpack: {
  //   resolve: {
  //     alias: {
  //       comps: path.join(__dirname, 'src/components')
  //     }
  //   }
  // },
  configureWebpack(config) {
    config.resolve.alias.comps = path.join(__dirname, "src/components");
    // 动态
    if (process.env.NODE_ENV === "development") {
      config.name = "vue项目最佳实践";
    } else {
      config.name = "vue best practice";
    }
  },
  // 链式配置webpack
  chainWebpack(config) {
    // 0.禁用系统中默认svg加载loader规避icons目录中的svg
    config.module.rule("svg").exclude.add(resolve("./src/icons"));

    // 1.新增一个svg-sprite-loader加载icons中的svg
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("./src/icons")).end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({symbolId: 'icon-[name]'})
  },
};
