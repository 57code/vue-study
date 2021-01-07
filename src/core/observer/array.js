/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

import { def } from '../util/index'

// 获取数组原型
const arrayProto = Array.prototype
// 克隆一份
export const arrayMethods = Object.create(arrayProto)

// 7个变更方法需要覆盖
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
  // 覆盖之
  def(arrayMethods, method, function mutator (...args) {
    // 1.执行默认方法
    const result = original.apply(this, args)
    // 2.变更通知
    const ob = this.__ob__
    // 可能会有新元素加入
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
    // 对新加入的元素做响应式
    if (inserted) ob.observeArray(inserted)
    // notify change
    // ob内部有一个dep，让它去通知更新
    ob.dep.notify()
    return result
  })
})
