// 处理post请求参数
const bodyParser = require("body-parser");

const port = 7070;
const title = "vue项目最佳实践";

const path = require("path");
// 将传入的相对路径转换为绝对路径
function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: "/best-practice",
  devServer: {
    port,
    proxy: {
      // 代理 /dev-api/user/login 到 http://127.0.0.1:3000/user/login
      [process.env.VUE_APP_BASE_API]: {
        target: `http://127.0.0.1:3000/`,
        changeOrigin: true,
        pathRewrite: { // api/user/login => /user/login
          ["^" + process.env.VUE_APP_BASE_API]: ""
        }
      },
    //   '/api': {
    //     target: `http://127.0.0.1:3001/`,
    //     changeOrigin: true,
    //     pathRewrite: {
    //       ["^" + process.env.VUE_APP_BASE_API]: ""
    //     }
    //   }
    }
    // 配置mock接口
    // app是express的实例
    // before: app => {
    //     // 处理post参数
    //   app.use(bodyParser.json());

    //   app.post("/dev-api/user/login", (req, res) => {
    //     const { username } = req.body;

    //     if (username === "admin" || username === "jerry") {
    //       res.json({
    //         code: 1,
    //         data: username
    //       });
    //     } else {
    //       res.json({
    //         code: 10204,
    //         message: "用户名或密码错误"
    //       });
    //     }
    //   });

    //   app.get("/dev-api/user/info", (req, res) => {
    //     const auth = req.headers["authorization"];
    //     const roles = auth.split(" ")[1] === "admin" ? ["admin"] : ["editor"];
    //     res.json({
    //       code: 1,
    //       data: roles
    //     });
    //   });
    // }
  },
  configureWebpack: {
    name: title
  },
  chainWebpack(config) {
    config.module.rule("svg").exclude.add(resolve("src/icons"));

    // 添加svg-sprite-loader
    config.module
      .rule("icons")
      .test(/\.svg$/) //设置test
      .include.add(resolve("src/icons")) //加入include
      .end() // add完上下文进入了数组，使用end回退
      .use("svg-sprite-loader") // 添加loader
      .loader("svg-sprite-loader") // 切换上下文到loader
      .options({ symbolId: "icon-[name]" }) //指定选项
      .end();
  }
};
