import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon.vue'

const req = require.context('./svg', false, /\.svg$/)
req.keys().map(req);

Vue.component('svg-icon', SvgIcon)