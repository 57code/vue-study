const isObject = val => val !== null && typeof val === 'object'

// 缓存
const toProxy = new WeakMap() // {obj: observed}
const toRaw = new WeakMap() // {observed: obj}

function reactive(obj) {
  if (!isObject(obj)) {
    return obj
  }

  // 检测缓存
  if (toProxy.has(obj)) {
    // 代理过了，直接返回缓存结果
    return toProxy.get(obj)
  }

  if (toRaw.has(obj)) {
    // obj已经是代理对象，直接返回
    return obj
  }
  
  // 代理
  const observed = new Proxy(obj, {
    get(target, key) {
      console.log('get', key);
      const res = Reflect.get(target, key)

      // 依赖收集
      track(target, key)
      
      return isObject(res) ? reactive(res) : res
    },
    set(target, key, value) {
      console.log('set', key);
      const ret = Reflect.set(target, key, value)
      trigger(target, key)
      return ret
    },
    deleteProperty(target, key) {
      console.log('del', key);
      trigger(target, key)
      return Reflect.deleteProperty(target, key)
    }
  })

  // 做缓存
  toProxy.set(obj, observed)
  toRaw.set(observed, obj)

  return observed
}


// 临时保存响应函数
const effectStack = []

function effect(fn) {
  const rxEffect = function() {
    try {
      // 入栈
      effectStack.push(rxEffect)
      // 执行fn
      return fn()
    } finally {
      // 出栈
      effectStack.pop()
    }
  }

  // 立即调用一下
  rxEffect()

  return rxEffect
}

// 大管家 {target: {key: [cb1, cb2, ...]}}
const targetMap = new WeakMap()

// 收集依赖
function track(target, key) {
  // 获取响应函数
  const effect = effectStack[effectStack.length - 1]
  if (effect) {
    // 获取target对应依赖表
    let depsMap = targetMap.get(target)

    if (!depsMap) {
      // 首次不存在，创建之
      depsMap = new Map()
      targetMap.set(target, depsMap)
    }

    // 获取key对应的响应函数
    let deps = depsMap.get(key)
    if (!deps) {
      deps = new Set()
      depsMap.set(key, deps)
    }

    // 获取所有回调函数并执行
    if (!deps.has(effect)) {
      deps.add(effect)
    }
  }
}


// 触发执行
function trigger(target, key) {
  const depsMap = targetMap.get(target)
  if (depsMap) {
    // 获取集合
    const deps = depsMap.get(key)

    if(deps) {
      deps.forEach(effect => effect())
    }
  }
}


const state = reactive({
  foo: 'foo',
  a: { b: 1 }
})


effect(() => {
  console.log('effect1', state.foo)
})
effect(() => {
  console.log('effect2', state.foo)
})

state.foo = 'foooooooooo'

// 避免重复代理
console.log(reactive(state) === state);


// state.foo
// state.foo = 'fooo'
// state.bar = 'bar'
// delete state.bar
// state.a.b