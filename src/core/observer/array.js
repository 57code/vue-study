/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

import { def } from '../util/index'

// 数组原型
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
// 遍历7个方法
methodsToPatch.forEach(function (method) {
  // cache original method
  // 保存原始方法
  const original = arrayProto[method]
  // 扩展
  def(arrayMethods, method, function mutator (...args) {
    // 执行默认方法
    const result = original.apply(this, args)

    // 变更通知
    const ob = this.__ob__

    // 有可能添加新的项，而这个项目之前不是响应式的
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
    // 如果有新项目添加，做响应式处理
    if (inserted) ob.observeArray(inserted)
    // notify change
    // 获取内部dep
    // 通知更新
    ob.dep.notify()
    return result
  })
})
