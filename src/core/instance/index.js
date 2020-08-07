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
  // 执行初始化，_init从何而来
  this._init(options)
}

initMixin(Vue) // 扩展了一个_init方法
stateMixin(Vue) // $data/$props/$set/...
eventsMixin(Vue) // $on/$emit/$once/$off
lifecycleMixin(Vue) // _update/$forceUpdate/$destroy
renderMixin(Vue) // $nextTick/_render

export default Vue
