/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

import { def } from '../util/index'

// 获取数组原型
const arrayProto = Array.prototype
// 复制一份
export const arrayMethods = Object.create(arrayProto)

// 7个需要覆盖的方法
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
  // 缓存原始方法
  const original = arrayProto[method]
  def(arrayMethods, method, function mutator (...args) {
    // 执行原始方法
    const result = original.apply(this, args)

    // 扩展行为：通知更新
    const ob = this.__ob__

    // 有三个操作是新元素加入
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
    // 新加入元素需要执行响应式处理
    if (inserted) ob.observeArray(inserted)
    // notify change
    // 小管家通知更新
    ob.dep.notify()
    return result
  })
})
