import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'

// Vue构造函数
function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  // 初始化
  this._init(options)
}

// 扩展Vue构造函数，实现多个”实例方法“"实例属性”
initMixin(Vue) // _init()
stateMixin(Vue) // $data/$set/$watch等等
eventsMixin(Vue) // $on/$off/...
lifecycleMixin(Vue) // $_update()/$destroy/...
renderMixin(Vue) // $nextTick / _render()

export default Vue
