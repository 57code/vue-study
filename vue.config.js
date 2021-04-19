const path = require("path");
const port = 7070;
const resolve = (dir) => path.join(__dirname, dir);

console.log(process.env.foo);
console.log(process.env.VUE_APP_DONG);

module.exports = {
  publicPath: "/best-practice", // 部署应⽤包时的基本 URL
  devServer: {
    port,
  },
  // webpack交互
  // configureWebpack: {
  //   resolve: {
  //     alias: {
  //       comps: path.join(__dirname, 'src/components')
  //     }
  //   }
  // }
  configureWebpack(config) {
    config.resolve.alias.comps = path.join(__dirname, "src/components");
    // 动态配置title
    if (process.env.NODE_ENV === "development") {
      config.name = "vue项目最佳实践";
    } else {
      config.name = "vue best practice";
    }
  },
  // 链式方式
  chainWebpack(config) {
    // 任务：引入svg-sprite-loader，替我加载需要svg格式的icon
    // 1.添加这个svg-sprite-loader，只关心icons目录
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("./src/icons")).end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({symbolId: 'icon-[name]'})

    // 2.系统中有一个svg相关的loader：svg-loader，排除掉指定的icons目录
    config.module.rule("svg").exclude.add(resolve("./src/icons"));
  },
};
