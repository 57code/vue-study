// Vue3中响应式实现基于Proxy
function defineReactive(obj) {
  if (typeof obj !== 'object') {
    return obj
  }
  
  return new Proxy(obj, {
    get(target, key) {
      console.log('get', key);
      const res = Reflect.get(target, key)
      return (typeof res !== 'object') ? res : defineReactive(res)
    },
    set(target, key, val) {
      console.log('set', key);
      const res = Reflect.set(target, key, val)
      return res
    },
    deleteProperty(target, key) {
      console.log('delelte', key);
      const res = Reflect.deleteProperty(target, key)
      return res
    }
  })
}

const obj = defineReactive({
  foo: 'foo',
  a: {
    b: 1
  }
})
obj.a.b = 10