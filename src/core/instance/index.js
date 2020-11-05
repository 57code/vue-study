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
  // 初始化： _init（）在哪？
  this._init(options)
}

// mixin做什么的？声明vue实例属性和方法
initMixin(Vue) // _init()
stateMixin(Vue) // $attrs/$listeners/$set / $delete/$watch
eventsMixin(Vue) // $on()/$emit()/$once()/$off()
lifecycleMixin(Vue) // _update()/$forceUpdate()/$destroy()
renderMixin(Vue) // $nextTick()/_render()

export default Vue
