function reactive(obj) {
  if (obj == null || typeof obj !== 'object') {
    return
  }

  return new Proxy(obj, {
    get(target, key) {
      const res = Reflect.get(target, key)
      console.log('get', key, res)
      track(target, key)
      return res != null && typeof res === 'object' ? reactive(res) : res
    },
    set(target, key, value) {
      const res = Reflect.set(target, key, value)
      console.log('set', key)
      trigger(target, key)
      return res
    },
    deleteProperty(target, key) {
      const res = Reflect.deleteProperty(target, key)
      console.log('deleteProp', key)
      trigger(target, key)
      return res
    }
  })
}

// 保存响应函数
const effectStack = []

// 建立依赖关系
function effect(fn) {
  // 封装fn，执行fn，处理错误，响应函数入栈、出栈
  const e = createReactiveEffect(fn)

  e()

  return e
}

function createReactiveEffect(fn) {
  const effect = function() {
    try {
      // 1.入栈
      effectStack.push(effect)

      // 2.执行fn
      return fn()
    } finally {
      // 3.出栈
      effectStack.pop()
    }
  }

  return effect
}

// 存储依赖关系数据结构
const targetMap = new WeakMap()

// 依赖收集
function track(target, key) {
  // 1.获取响应函数
  const effect = effectStack[effectStack.length - 1]
  if (effect) {
    // 2.获取target对应的map
    let depMap = targetMap.get(target)
    if (!depMap) {
      // init
      depMap = new Map()
      targetMap.set(target, depMap)
    } 
    
    // 3.获取key对应的set
    let deps = depMap.get(key)
    if (!deps) {
      // init
      deps = new Set()
      depMap.set(key, deps)
    } 

    // 4.放入deps
    deps.add(effect)
  }
}

// 触发依赖
function trigger(target, key) {
  const depMap = targetMap.get(target)

  if(!depMap) {
    return 
  }

  const deps = depMap.get(key)

  if (deps) {
    deps.forEach(dep => dep())
  }
}

const state = reactive({
  foo: 'foo',
  a: {
    b: 1
  }
})

effect(() => {
  console.log('effect1', state.foo);
})
effect(() => {
  console.log('effect2', state.foo, state.a.b);
})
// const arr = reactive(['a', 'b'])
// state.foo
// state.foo = 'fooooooo'
// state.bar = 'bar'
// delete state.bar

state.a.b = 10

// arr[5] = 'c'
// arr.push('c')
