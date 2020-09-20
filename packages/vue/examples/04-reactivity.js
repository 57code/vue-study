const isObject = v => v !== null && typeof v === 'object'

function reactive(obj) {
  if (!isObject(obj)) {
    return obj
  }

  return new Proxy(obj, {
    get(target, key, receiver) {
      const res = Reflect.get(target, key, receiver)
      console.log('get', key)

      // 依赖收集
      track(target, key)

      return isObject(res) ? reactive(res) : res
    },
    set(target, key, value, receiver) {
      const res = Reflect.set(target, key, value, receiver)
      console.log('set', key)

      // 触发依赖
      trigger(target, key)

      return res
    },
    deleteProperty(target, key) {
      const res = Reflect.deleteProperty(target, key)
      console.log('delete', key)

      // 触发依赖
      trigger(target, key)

      return res
    }
  })
}

// 暂时存储cb
const effectStack = []

// 临时存储fn，调用fn触发其内部响应数据的getter
function effect(fn) {
  const rxEffect = function() {
    try {
      // 1.入栈
      effectStack.push(rxEffect)
      // 2.执行fn，触发getter
      return fn()
    } finally {
      effectStack.pop()
    }
  }

  // 立刻执行
  rxEffect()

  return rxEffect
}

// 建立target,key和cb映射关系
const targetMap = new WeakMap()
function track(target, key) {
  // 获取cb
  const effect = effectStack[effectStack.length - 1]
  if (effect) {
    // 获取target对应的Map
    let depsMap = targetMap.get(target)
    if (!depsMap) {
      // 初始化不存在，则创建
      depsMap = new Map()
      targetMap.set(target, depsMap)
    }

    // 获取key对相应的响应函数集合
    let deps = depsMap.get(key)
    if (!deps) {
      // 初始化不存在，则创建
      deps = new Set()
      depsMap.set(key, deps)
    }

    deps.add(effect)
  }
}

// 获取target.key相关的cb集合，并执行它们
function trigger(target, key) {
  const depsMap = targetMap.get(target)
  if (depsMap) {
    const deps = depsMap.get(key)
    if (deps) {
      deps.forEach(effect => effect())
    }
  }
}

const state = reactive({
  foo: 'foo',
  bar: { a: 1 }
})
effect(() => {
  console.log('effect1:', state.foo)
})
// state.foo
state.foo = 'fooooooo'
// state.dong = 'dong'
// delete state.dong

state.bar.a
