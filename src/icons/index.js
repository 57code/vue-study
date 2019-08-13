import Vue from "vue";
import Icon from "@/components/Icon.vue";

// 图标自动导入
// 利用webpack 的require.context自动导入
// 返回的req是只去加载svg目录中的模块的函数
const req = require.context("./svg", false, /\.svg$/);
console.log(req.keys());
req.keys().map(req);

// Icon组件全局注册一下
Vue.component("Icon", Icon);
