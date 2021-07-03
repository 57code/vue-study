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

// 下面几个函数用于扩展一些Vue实例方法和属性
initMixin(Vue) // _init
stateMixin(Vue) // $set/delete/watch
eventsMixin(Vue) // $on/$off/$emit/$once
lifecycleMixin(Vue) // $destroy/$forceupdate
renderMixin(Vue) // $nextTick/_render

export default Vue
