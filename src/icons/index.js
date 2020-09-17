import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon.vue'

// 1.自动加载icons/svg中的所有图标
// 获取一个指定上下文的require函数
const req = require.context('./svg', false, /\.svg$/)
// keys()获取所有文件名
req.keys().map(req)

// 2.注册全局的Icon组件
Vue.component('svg-icon', SvgIcon)