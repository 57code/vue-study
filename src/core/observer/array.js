/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

import { def } from '../util/index'

// 获取数组原型对象
const arrayProto = Array.prototype
// 备份
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
// 对前面备份的原型对象做覆盖
// 覆盖7个变更方法
methodsToPatch.forEach(function (method) {
  // cache original method
  // 每次拿出一个方法名
  // original就是原始方法，比如push
  const original = arrayProto[method]
  def(arrayMethods, method, function mutator (...args) {
    // 以前的事还要干
    const result = original.apply(this, args)

    // 扩展：变更通知
    const ob = this.__ob__
    let inserted
    // 一下三个方法可能有新元素插入
    // [obj1, obj2, obj3]
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
    ob.dep.notify()
    return result
  })
})
