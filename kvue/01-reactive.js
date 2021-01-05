// Object.defineProperty()
// 将传入的obj，动态设置一个key，它的值val
function defineReactive(obj, key, val) {
  // 递归
  observe(val)
  
  Object.defineProperty(obj, key, {
    get() {
      console.log('get', key);
      return val
    },
    set(v) {
      if (val !== v) {
        console.log('set', key);
        // 传入新值v可能还是对象
        observe(v)
        val = v
      }
    },
  })
}

// 递归遍历obj，动态拦截obj的所有key
function observe(obj) {
  if (typeof obj !== 'object' || obj == null) {
    return obj
  }
  Object.keys(obj).forEach(key => {
    defineReactive(obj, key, obj[key])
  })
}

// this.$set()
// Vue.set()
function set(obj, key, val) {
  defineReactive(obj, key, val)
}

const obj = {
  foo: 'foo',
  bar: 'bar',
  baz: {
    a: 1
  }
}
// defineReactive(obj, 'foo', 'foo')
observe(obj)

// obj.foo
// obj.foo = 'fooooooo'
// obj.baz.a
// obj.baz = { a: 10 }
// obj.baz.a
// obj.dong = 'dong'
// obj.dong
// set(obj, 'dong', 'dong')
// obj.dong