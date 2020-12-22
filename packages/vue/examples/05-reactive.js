const isObject = v => typeof v === 'object'

function reactive(obj) {
  if (!isObject(obj)) {
    return obj
  }

  return new Proxy(obj, {
    get(target, key) {
      const res = Reflect.get(target, key)
      console.log('get', key)
      // 依赖收集
      track(target, key)
      return isObject(res) ? reactive(res) : res
    },
    set(target, key, value) {
      const res = Reflect.set(target, key, value)
      console.log('set', key)
      trigger(target, key)
      return res
    },
    deleteProperty(target, key) {
      const res = Reflect.deleteProperty(target, key)
      console.log('deleteproperty', key)
      trigger(target, key)
      return res
    }
  })
}

const effectStack = []
function effect(fn) {
  // 错误处理
  // fn进入effectStack
  // fn要执行
  // fn要弹出effectStack
  const e = createReactiveEffect(fn)

  e()

  return e
}
function createReactiveEffect(fn) {
  const effectFn = function() {
    try {
      effectStack.push(effectFn)
      return fn()
    } finally {
      effectStack.pop()
    }
  }
  return effectFn
}

// 保存映射关系的数据结构
const targetMap = new WeakMap()
// 跟踪函数：负责依赖收集
function track(target, key) {
  // 1.获取effectFn
  const effect = effectStack[effectStack.length - 1]
  if (effect) {
    // 1.通过target获取对应的map
    let depMap = targetMap.get(target)

    // 首次进入depMap为空，需要创建之
    if (!depMap) {
      depMap = new Map()
      targetMap.set(target, depMap)
    }

    // 2.通过key获取依赖集合set
    let deps = depMap.get(key)
    if (!deps) {
      deps = new Set()
      depMap.set(key, deps)
    }

    // 3.放入effect
    deps.add(effect)
  }
}

// 触发函数：track()相反操作，拿出映射关系，执行所有cbs
function trigger(target, key) {
  const depMap = targetMap.get(target)

  if (!depMap) {
    return
  }

  const deps = depMap.get(key)
  if (deps) {
    deps.forEach(dep => dep())
  }
}

const obj = reactive({ foo: 'foo', n: { a: 1 } })
// obj.foo
// obj.foo = 'foooooo'
// obj.bar = 'bar'
// obj.bar
// delete obj.bar
// obj.n.a

effect(() => {
  console.log('effect1', obj.foo)
})

effect(() => {
  console.log('effect2', obj.foo, obj.n.a)
})

obj.foo = 'foooooo'
