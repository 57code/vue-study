import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon.vue'

// 自动导入
// context()会返回一个函数，该函数去指定的上下文目录中加载资源
const req = require.context('./svg', false, /\.svg$/)
console.log(req.keys());
// 遍历所有svg目录下的svg文件，并使用req去加载
req.keys().map(req)

Vue.component('svg-icon', SvgIcon)