/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

import { def } from '../util/index'

const arrayProto = Array.prototype
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
  const original = arrayProto[method]
  // 定义新的方法
  def(arrayMethods, method, function mutator (...args) {
    // 原始行为
    const result = original.apply(this, args)

    // 变更通知
    // __ob__就是Observer实例
    const ob = this.__ob__
    // 如果是插入操作
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
    // 变更通知：大管家做这件事
    ob.dep.notify()
    return result
  })
})
