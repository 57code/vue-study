// Proxy
const isObject = v => v !== null && typeof v === 'object'

function reactive(obj) {
  if (!isObject(obj)) {
    return obj
  }
  
  return new Proxy(obj, {
    get(target, key, receiver){
      const ret = Reflect.get(target, key, receiver)
      console.log('获取', key);
      track(target, key)
      return isObject(ret) ? reactive(ret) : ret
    },
    set(target, key, value, receiver){
      const ret = Reflect.set(target, key, value, receiver)
      console.log('设置', key);
      trigger(target, key)
      return ret
    },
    deleteProperty(target, key){
      const ret = Reflect.deleteProperty(target, key)
      console.log('删除', key);
      trigger(target, key)
      return ret
    },
    
  })
}

// 声明一个响应函数，放入effectStack备用
const effectStack = []
function effect(fn) {
  const rxEffect = function() {
    // 1.捕获异常
    // 2.fn入栈出栈
    // 3.执行fn
    try {
      effectStack.push(rxEffect)
      return fn()
    } finally {
      effectStack.pop()
    }
  }

  // 执行一次
  rxEffect()

  return rxEffect

}

// 响应函数触发某个响应式数据，开始做依赖收集（映射过程）
const targetMap = new WeakMap()
function track(target, key) {
  // 存入映射关系
  const effect = effectStack[effectStack.length - 1]
  if (effect) {
    let depsMap = targetMap.get(target)
    // 首次访问不存在，创建一个
    if (!depsMap) {
      depsMap = new Map()
      targetMap.set(target, depsMap)
    }
    // 存在则获取之,第一次可能为空，需要创建一个set
    let deps = depsMap.get(key)
    if (!deps) {
      deps = new Set()
      depsMap.set(key, deps)
    }
    // 把响应函数放入集合
    deps.add(effect)
  }
}

// setter或者deletePropty触发时，根据映射关系执行对应cb
function trigger(target, key) {
  const depsMap = targetMap.get(target)
  if (depsMap) {
    // 获取set
    const deps = depsMap.get(key)
    if (deps) {
      deps.forEach(effect => effect())
    }
  }
}


// state就是Proxy实例
const state = reactive({foo: 'foo', bar: {a:1}, arr: [1,2,3]})
// state.foo
// state.foo = 'foooooo'
// // 设置不存在属性
// state.bar = 'bar'

// state.bar.a = 10

// state.arr.push(4)
// state.arr.pop()

effect(() => {
  console.log('effect', state.foo);
  
})

state.foo = 'fooooooooo'