const path = require("path");
const resolve = (dir) => path.resolve(__dirname, dir);

console.log(process.env.foo);
console.log(process.env.VUE_APP_DONG); 

module.exports = {
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
  // }
  configureWebpack(config) {
    config.resolve.alias.comps = path.join(__dirname, "src/components");
    // 根据执行环境做不同配置
    if (process.env.NODE_ENV === "development") {
      config.name = "vue项目最佳实践";
    } else {
      config.name = "vue best practice";
    }
  },
  chainWebpack(config) {
    // 1.组件svg规则加载icons/svg中的图标
    config.module.rule("svg").exclude.add(resolve("src/icons"));
    // 2.配置sv-spirite-loader仅加载icons中的图表
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({ symbolId: "icon-[name]" });
  },
};
