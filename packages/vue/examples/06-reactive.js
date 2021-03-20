// vue3响应式实现
function reactive(obj) {
  // 参数1代理的对象，参数2是处理器
  // 返回代理的对象
  return new Proxy(obj,{
    get(target, key, receiver){
      const res = Reflect.get(target, key, receiver)
      // 依赖收集
      track(target, key)
      console.log('get', key);
      return (typeof res === 'object') ? reactive(res) : res
    },
    set(target, key, val, receiver){
      const res = Reflect.set(target, key, val, receiver)
      console.log('set', key);
      // 触发副作用函数执行
      trigger(target, key)
      return res
    },
    deleteProperty(target, key, receiver){
      const res = Reflect.deleteProperty(target, key, receiver)
      // 触发副作用函数执行
      trigger(target, key)
      console.log('deleteProperty', key);
      return res
    },
  })
}

// 存放副作用函数的数组
const effectStack = []

// 建立依赖关系
function effect(fn) {
  const e = createReactiveEffect(fn)
  // 立即执行一次
  e()
  return e
}

function createReactiveEffect(fn) {
  const effect = function (...args) {
    try {
      // 入栈
      effectStack.push(effect)
      // 执行
      return fn(...args)
    } finally {
      // 出栈
      effectStack.pop()
    }
  }
  return effect
}

// 保存依赖关系的数据结构
const targetMap = new WeakMap()

// 建立target，key和响应函数之间映射关系
function track(target, key) {
  // 获取副作用函数
  const effect = effectStack[effectStack.length - 1]
  if(effect) {
    // 1.根据target获取对应的map
    let depMap = targetMap.get(target)
    // 首次访问，depMap不存在需要创建
    if (!depMap) {
      depMap = new Map()
      targetMap.set(target, depMap)
    }
   
    // key对应的副作用函数集合
    let deps = depMap.get(key)
    // 首次访问，deps不存在需要创建
    if (!deps) {
      deps = new Set()
      depMap.set(key, deps)
    }

    // 添加副作用函数到集合中
    deps.add(effect)
  }
}

function trigger(target, key) {
  const depMap = targetMap.get(target)
  if(!depMap) {
    return 
  }
  // 获取key对应的依赖函数集合
  const deps = depMap.get(key)
  if(deps) {
    deps.forEach(dep => dep())
  }
}



const state = reactive({
  foo: 'foo',
  bar: {
    baz: 1
  }
})

effect(() => {
  console.log('effect1', state.foo);
})

effect(() => {
  console.log('effect2', state.foo, state.bar.baz);
})

state.foo
state.foo = 'fooooooo'
// 动态新增和删除
// state.bar = 'bar'
// delete state.bar
state.bar.baz = 10

