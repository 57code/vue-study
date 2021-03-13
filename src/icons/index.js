import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon.vue'

// 注册svg-icon组件
Vue.component('svg-icon', SvgIcon)

// 自动加载svg目录下所有素材
const req = require.context('./svg', false, /\.svg$/)
req.keys().map(req)