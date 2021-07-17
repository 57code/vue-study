const isObject = v => typeof v === 'object'

function reactive(obj) {
  if (!isObject(obj)) {
    return obj
  }
  
  return new Proxy(obj, {
    // target是被代理的对象
    get(target, key) {
      console.log('get', key);
      // const res = target[key]
      const res = Reflect.get(target, key)
      return isObject(res) ? reactive(res) : res
    },
    set(target, key, val) {
      console.log('set', key);
      // target[key] = val
      const res = Reflect.set(target, key, val)
      return res
    },
    deleteProperty(target, key) {
      console.log('deleteProperty', key);
      // delete target[key]
      const res = Reflect.deleteProperty(target, key)
      console.log('deleteproperty');
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
  fn()
  effectStack.push(fn)
}

// 保存依赖关系数据结构
const targetMap = new WeakMap()

// 依赖收集：建立target,key和fn之间映射关系
function track(target, key){}
// 触发副作用：根据target,key获取相关fns，执行它们
function trigger(target, key){}

// 建立依赖关系
effect(() => {
  console.log('effect', state.foo);
})
effect(() => {
  console.log('effect', state.foo);
})

// state.foo
state.foo = 'fooooooo'

// state.bar = 'bar'
// state.bar
// delete state.bar
state.bar.baz