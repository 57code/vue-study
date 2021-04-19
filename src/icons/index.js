import Vue from "vue";
import SvgIcon from '@/components/SvgIcon'

// 0.自动加载icons/svg目录中的所有图标
const req = require.context("./svg", false, /\.svg$/);
// ['./ldj.svg']
req.keys().map(req);
// 1.声明一个svg-icon组件
Vue.component("svg-icon", SvgIcon);
