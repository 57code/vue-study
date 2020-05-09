/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

import { def } from '../util/index'

// 获取数组原型对象
const arrayProto = Array.prototype
// 复制一份
export const arrayMethods = Object.create(arrayProto)

const methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  // 保存原始方法
  const original = arrayProto[method]
  // 拦截该方法
  def(arrayMethods, method, function mutator (...args) {
    // 执行默认行为
    const result = original.apply(this, args)

    // 额外扩展行为：通知更新
    // 获取小秘书
    const ob = this.__ob__
    // 如果发生插入操作表示有新的成员进来了
    let inserted
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args
        break
      case 'splice':
        inserted = args.slice(2)
        break
    }
    // 社会主义教育一番
    if (inserted) ob.observeArray(inserted)
    // notify change
    // 通知更新
    ob.dep.notify()
    return result
  })
})
