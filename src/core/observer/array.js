/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

import { def } from '../util/index'

const arrayProto = Array.prototype
// 创建一个全新对象，克隆自数据原型对象
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
  // 定义新方法
  def(arrayMethods, method, function mutator (...args) {
    // 执行原始方法
    const result = original.apply(this, args)

    // 获取ob实例
    const ob = this.__ob__
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
    // 新添加的数组项要做响应式处理
    if (inserted) ob.observeArray(inserted)
    // notify change
    // 通过ob获取大管家
    ob.dep.notify()
    return result
  })
})
