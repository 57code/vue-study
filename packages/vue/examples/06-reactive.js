const isObject = v => typeof v === 'object'

function reactive(obj) {
  if (!isObject(obj)) {
    return obj
  }

  return new Proxy(obj, {
    // target是被代理的对象
    get(target, key) {
      console.log('get', key)
      // const res = target[key]
      // 依赖收集
      const res = Reflect.get(target, key)
      track(target, key)
      return isObject(res) ? reactive(res) : res
    },
    set(target, key, val) {
      console.log('set', key)
      // target[key] = val
      const res = Reflect.set(target, key, val)
      trigger(target, key)
      return res
    },
    deleteProperty(target, key) {
      console.log('deleteProperty', key)
      // delete target[key]
      const res = Reflect.deleteProperty(target, key)
      trigger(target, key)
      console.log('deleteproperty')
      return res
    }
  })
}

const state = reactive({
  foo: 'foo',
  bar: {
    baz: 1
  }
})

// 临时存储副作用函数
const effectStack = []

// 建立副作用
function effect(fn) {
  const e = createReactiveEffect(fn)

  e()

  return e
}

function createReactiveEffect(fn) {
  const effect = function() {
    try {
      effectStack.push(fn)
      return fn()
    } finally {
      effectStack.pop()
    }
  }
  return effect
}

// 保存依赖关系数据结构
const targetMap = new WeakMap()

// 依赖收集：建立target,key和fn之间映射关系
function track(target, key) {
  // 1.获取effect
  const effect = effectStack[effectStack.length - 1]

  if (effect) {
    // 2.获取target对应的map
    let depMap = targetMap.get(target)
    if (!depMap) {
      // 首次需要创建
      depMap = new Map()
      targetMap.set(target, depMap)
    }

    // 3.获取key对应的set
    let deps = depMap.get(key)
    if (!deps) {
      deps = new Set()
      depMap.set(key, deps)
    }

    // 4.effect存入deps
    deps.add(effect)
  }
}
// 触发副作用：根据target,key获取相关fns，执行它们
function trigger(target, key) {
  const depMap = targetMap.get(target)

  if (depMap) {
    const deps = depMap.get(key)

    if (deps) {
      deps.forEach(dep => dep())
    }
  }
}

// 建立依赖关系
// effect(() => {
//   console.log('effect1', state.foo)
// })
// effect(() => {
//   console.log('effect2', state.foo)
// })

// state.foo
// state.foo = 'fooooooo'

// state.bar = 'bar'
// state.bar
// delete state.bar
// state.bar.baz
