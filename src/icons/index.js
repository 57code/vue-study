import Vue from 'vue'
import SvgIcon from 'comps/SvgIcon.vue'

// 1.自动加载icons中的svg
const req = require.context('./svg', false, /\.svg$/)
// keys()可以获取svg目录下所有svg文件
console.log(req.keys());
req.keys().map(req)

// 2.注册SvgIcon
Vue.component('svg-icon', SvgIcon)