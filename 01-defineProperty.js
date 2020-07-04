// 对象响应式原理
// 1.Object.defineProperty()

function defineReactive(obj, key, val) {
  // val可能是对象，需要递归处理
  observe(val)

  Object.defineProperty(obj, key, {
    get() {
      console.log('get', val);
      return val
    },
    set(newVal) {
      if (newVal !== val) {
        console.log('set', newVal);
        observe(newVal)
        val = newVal
      }
    }
  })
}

// 对象响应式处理
function observe(obj) {
  // 判断obj类型必须是对象
  if (typeof obj !== 'object' || obj == null) {
    return
  }

  Object.keys(obj).forEach(key => defineReactive(obj, key, obj[key]))
}

function set(obj, key, val) {
  defineReactive(obj, key, val)
}

const obj = { foo: 'foo', bar: 'bar', baz: { a: 1 } }

// defineReactive(obj, 'foo', 'foo')
observe(obj)

// obj.foo
// obj.foo = 'foooooo'
// obj.bar
// obj.baz.a = 10
// obj.baz = { a: 10 }
// obj.baz.a = 100
// obj.dong = 'dong'
// set(obj, 'dong', 'dong')
// obj.dong