import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'

// 构造函数
function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  // 初始化_init从哪来
  this._init(options)
}

// 定义实例属性和方法
initMixin(Vue) // 实现_init
stateMixin(Vue) // $data,$watch...
eventsMixin(Vue) // $on,$off,$emit
lifecycleMixin(Vue) // _update,$forceUpdate,$destroy
renderMixin(Vue) // _render, $nextTick

export default Vue
