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
  // 获取数组中的原始方法
  const original = arrayProto[method]
  // 覆盖：给复制的原型定义新的方法
  def(arrayMethods, method, function mutator (...args) {
    // 执行原有功能函数
    const result = original.apply(this, args)

    // 变更通知逻辑：找到数组关联的ob，它内部有个dep，dep通知更新
    const ob = this.__ob__

    // 如果有新增项
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
    // 新加入项也需要做响应式处理
    if (inserted) ob.observeArray(inserted)
    // notify change
    // 变更通知
    ob.dep.notify()
    return result
  })
})
