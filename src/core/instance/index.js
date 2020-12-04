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
  this._init(options)
}

initMixin(Vue) // _init() 大部分是实例属性
// 下面几个方法声明组件实例方法
stateMixin(Vue) // $set/...
eventsMixin(Vue) // $on/$emit/...
lifecycleMixin(Vue) // _update()
renderMixin(Vue) // _render()/nextTick

export default Vue
