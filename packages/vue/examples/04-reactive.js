// 利用ES6的Proxy做响应式
const isObject = val => val !== null && typeof val === 'object'

// 避免重复代理：创建两个map，利用map做缓存，每次处理之前先看缓存有没有
const toProxy = new WeakMap() // 形如obj:observed
const toRaw = new WeakMap() // 形如observed:obj

function reactive(obj) {
  if (!isObject(obj)) {
    return obj
  }
  
  // 先查找缓存，避免重复代理
  if (toProxy.has(obj)) {
    return toProxy.get(obj)
  }
  if (toRaw.has(obj)) {
    // obj已经代理过了，直接返回
    return obj
  }

  const observed = new Proxy(obj, {
    get(target, key, receiver) {
      const res = Reflect.get(target, key, receiver)
      console.log('获取', key, res);
      // 依赖收集：创建target, key和活动的那个回调函数
      track(target, key)
      // 运行时递归处理
      return isObject(res) ? reactive(res) : res
    },
    set(target, key, value, receiver) {
      const res = Reflect.set(target, key, value, receiver)
      console.log('设置', key, res);
      trigger(target, key)
      return res
    },
    deleteProperty(target, key) {
      const res = Reflect.deleteProperty(target, key)
      console.log('删除', key, res);
      trigger(target, key)
      return res
    }
  })

  // 缓存
  toProxy.set(obj, observed)
  toRaw.set(observed, obj)

  return observed
}

// 创建活动函数数组
const effectStack = []

// 执行fn，将其入栈，执行一次触发getter
function effect(fn) {
  const rxEffect = function() {
    try {
      effectStack.push(fn)
      return fn()
    } catch (error) {
      
    } finally {
      effectStack.pop()
    }
  }
  // 默认执行一次, 激活getter
  rxEffect()

  return rxEffect
}

// 简历映射关系
let targetMap = new WeakMap()
function track(target, key) {
  // 获取活动回调函数
  const effect = effectStack[effectStack.length - 1]
  if (effect) {
    // 获取target有没有映射关系
    let depsMap = targetMap.get(target)
    if (!depsMap) {
      // 如果没有创建过关系，说明是第一次，需要创建这个Map
      depsMap = new Map()
      targetMap.set(target, depsMap)
    }

    // 获取key对应的回调集合
    let deps = depsMap.get(key)
    if (!deps) {
      // 首次执行不存在，创建一个Set
      deps = new Set()
      depsMap.set(key, deps)
    }

    // 把响应函数加入到deps中
    deps.add(effect)
  }
}


// 拿出target，key相关的响应函数，并执行他们
function trigger(target, key) {
  const depsMap = targetMap.get(target)

  if (depsMap) {
    // 获取响应函数集合
    const deps = depsMap.get(key)

    if (deps) {
      // 执行它们
      deps.forEach(effect => {
        effect()
      });
    }
  }
}


const obj = { foo: 'foo', bar: { a: 1 }, arr: [1,2,3] }
const state = reactive(obj)


effect(() => {
  console.log('effect: ', state.foo);
})

// console.log(reactive(state) === state);

// 1.获取
state.foo

// 2.设置
state.foo = 'foooooooo'

// 3.删除
delete state.foo

// 4.添加属性
state.dong = 'dong'
state.dong

// 5.嵌套对象
state.bar.a = 10

state.arr
state.arr.push(4)