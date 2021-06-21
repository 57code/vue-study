function reactive(obj) {
  return new Proxy(obj, {
    get(target, key) {
      console.log('get', key)
      // 依赖收集
      track(target, key)
      return typeof target[key] === 'object'
        ? reactive(target[key])
        : target[key]
    },
    set(target, key, val) {
      // notify
      console.log('set', key)
      target[key] = val
      trigger(target, key)
    },
    deleteProperty(target, key) {
      // notify
      console.log('deleteProperty', key)
      delete target[key]
      trigger(target, key)
    }
  })
}

// 临时存储副作用函数
const effectStack = []
// 1.依赖收集函数: 包装fn，立刻执行fn，返回包装结果
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

// 保存依赖关系的数据结构
const targetMap = new WeakMap()

// 依赖收集：建立target/key和fn之间映射关系
function track(target, key) {
  // 1.获取当前的副作用函数
  const effect = effectStack[effectStack.length - 1]
  if (effect) {
    // 2.取出target/key对应的map
    let depMap = targetMap.get(target)
    if (!depMap) {
      depMap = new Map()
      targetMap.set(target, depMap)
    }

    // 3.获取key对应的set
    let deps = depMap.get(key)
    if (!deps) {
      deps = new Set()
      depMap.set(key, deps)
    }

    // 4.存入set
    deps.add(effect)
  }
}

// 触发更新：当某个响应式数据发生变化，根据target、key获取对应的fn并执行他们
function trigger(target, key) {
  // 1.获取target/key对应的set，并遍历执行他们
  const depMap = targetMap.get(target)

  if (depMap) {
    const deps = depMap.get(key)

    if (deps) {
      deps.forEach(dep => dep())
    }
  }
}

// const state = reactive({
//   foo: 'foo',
//   bar: {
//     baz: 1
//   }
// })

// effect(() => {
//   console.log('effect1', state.foo);
// })
// effect(() => {
//   console.log('effect2', state.foo, state.bar.baz);
// })

// state.foo = 'foooo'
// state.bar.baz = 10
// state.foo
// state.foo = 'foooooo'
// delete state.foo
// state.bar = 'bar'
// state.bar
// state.bar
// state.bar.baz
// state.bar = {
//   baz: 10
// }
// state.bar.baz
