import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'

// 1.自动加载svg中所有图标
// context返回一个指定目录的加载方法
const req = require.context('./svg', false, /\.svg$/)
// keys()返回指定上下文中所有匹配文件名称
req.keys().map(req)

// 2.注册svg-icon
Vue.component('svg-icon', SvgIcon)