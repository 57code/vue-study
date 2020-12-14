// 1.定义svg-icon组件
import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon.vue';

Vue.component('svg-icon', SvgIcon)

// 2.自动加载svg目录下所有svg文件
const req = require.context('./svg', false, /\.svg$/)
req.keys().map(req)