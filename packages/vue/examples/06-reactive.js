// Vue3中响应式实现基于Proxy
function defineReactive(obj) {
  if (typeof obj !== 'object') {
    return obj
  }

  return new Proxy(obj, {
    get(target, key) {
      console.log('get', key)
      const res = Reflect.get(target, key)
      // 依赖收集
      track(target, key)
      return typeof res !== 'object' ? res : defineReactive(res)
    },
    set(target, key, val) {
      console.log('set', key)
      const res = Reflect.set(target, key, val)
      // 触发更新
      trigger(target, key)
      return res
    },
    deleteProperty(target, key) {
      console.log('delelte', key)
      const res = Reflect.deleteProperty(target, key)
      // 触发更新
      trigger(target, key)
      return res
    }
  })
}

// 临时保存要添加依赖的副作用函数
const effectStack = []
// 副作用函数
function effect(fn) {
  // 执行fn，处理可能的错误，入栈出栈行为
  const e = createReactiveEffect(fn)
  // 执行封装之后的副作用函数
  e()
  return e
}
function createReactiveEffect(fn) {
  const effect = function(...args) {
    try {
      // 1.入栈
      effectStack.push(effect)
      // 2.执行, 会触发get
      return fn(...args)
    } finally {
      // 3.出栈
      effectStack.pop()
    }
  }
  return effect
}
// 存放依赖关系的数据结构
const targetMap = new WeakMap()

// 依赖跟踪收集函数
function track(target, key) {
  // 1.拿出副作用函数
  const effect = effectStack[effectStack.length - 1]
  if (effect) {
    let depMap = targetMap.get(target)
    // 首次来的时候不存在，需要创建
    if (!depMap) {
      depMap = new Map()
      targetMap.set(target, depMap)
    }

    // 获取key对应的副作用函数Set
    let deps = depMap.get(key)
    if (!deps) {
      deps = new Set()
      depMap.set(key, deps)
    }

    // 将前面放入effectStack中的副作用函数添加到deps
    deps.add(effect)
  }
}

// 根据传入target，key获取他们对应的副作用函数Set，调用它们
function trigger(target, key) {
  const depMap = targetMap.get(target)
  if (!depMap) {
    return
  }

  // 获取deps
  const deps = depMap.get(key)
  if (deps) {
    deps.forEach(dep => dep())
  }
}

const obj = defineReactive({
  foo: 'foo',
  a: {
    b: 1
  }
})

effect(() => {
  console.log('foo变了11', obj.foo);
})
effect(() => {
  console.log('foo变了22', obj.foo);
})
effect(() => {
  console.log('b变了', obj.a.b);
})
obj.a.b = 10
