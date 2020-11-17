// vue3 Proxy  ref
const baseHandler = {
  get(target, key) {
    const res = Reflect.get(target, key)
    console.log('get', key)
    return res
  },
  set(target, key, value) {
    const res = Reflect.set(target, key, value)
    console.log('set', key)
    return res
  },
  deleteProperty(target, key) {
    const res = Reflect.deleteProperty(target, key)
    console.log('deleteProperty', key)
    return res
  }
}

function reactive(obj) {
  if (typeof obj !== 'object' && obj !== null) {
    return obj
  }

  return new Proxy(obj, baseHandler)
}

const state = reactive({ foo: 'foo' })
state.foo
state.foo = 'fooooo'
state.bar = 'bar'
state.bar
delete state.bar
