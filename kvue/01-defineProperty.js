// Object.defineProperty()
// 拦截：对某个对象的某个key做拦截
function defineReactive(obj, key, val) {
  // 如果val是对象，需要递归处理之
  observe(val)

  Object.defineProperty(obj, key, {
    get() {
      console.log('get', key);
      return val
    },
    set(newVal) {
      if (val !== newVal) {
        // 如果newVal是对象，也要做响应式处理
        observe(newVal)
        val = newVal
        console.log('set', key, newVal);

      }
    }
  })
}

// 遍历指定数据对象每个key，拦截他们
function observe(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return obj
  }

  Object.keys(obj).forEach(key => {
    defineReactive(obj, key, obj[key])
  })
}

function set(obj, key, val) {
  defineReactive(obj, key, val)
}

const obj = { foo: 'foo', bar: 'bar', baz: { a: 1 } }
observe(obj)
// defineReactive(obj, 'foo', 'foo')
// obj.foo
// obj.foo = 'foooooooo'
// obj.bar
// obj.bar = 'barrrrrr'
// obj.baz.a = 10
// obj.baz = { a: 10 }
set(obj, 'dong', 'dong')
obj.dong = 'dongdong'