/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

import { def } from '../util/index'

// 1.获取原型
const arrayProto = Array.prototype
// 2.克隆副本
export const arrayMethods = Object.create(arrayProto)
// 3.定义要覆盖的7个方法
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
// 4.遍历覆盖
methodsToPatch.forEach(function (method) {
  // cache original method
  // 5.获取原始方法
  const original = arrayProto[method]
  // 6.覆盖该方法
  def(arrayMethods, method, function mutator (...args) {
    // 7.先执行原始方法
    const result = original.apply(this, args)
    // 8.扩展逻辑：变更通知
    const ob = this.__ob__
    // 如果是插入型操作，对新插入的元素要做响应式处理
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
    if (inserted) ob.observeArray(inserted)
    // notify change
    // 变更通知
    ob.dep.notify()
    return result
  })
})
