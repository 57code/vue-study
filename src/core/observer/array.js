/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

import { def } from '../util/index'
// 1.获取数组原型
const arrayProto = Array.prototype
// 2.克隆一份
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
  // 原始方法
  const original = arrayProto[method]
  def(arrayMethods, method, function mutator (...args) {
    // 执行原始行为
    const result = original.apply(this, args)

    // 变更通知
    // 1.获取ob实例
    const ob = this.__ob__
    // 如果是新增元素的操作：比如push，unshift或者增加元素的splice操作
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
    // 新加入的对象仍然需要响应式处理
    if (inserted) ob.observeArray(inserted)
    // notify change
    // 让内部的dep通知更新
    ob.dep.notify()
    return result
  })
})
