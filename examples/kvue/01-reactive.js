

function reactive(obj, key, val) {
  // 递归
  observe(val)
  
  // object响应式defineProperty
  Object.defineProperty(obj, key, {
    get() {
      console.log('get', key);
      return val
    },
    set(v) {
      if (v !== val) {
        console.log('set', key);
        observe(val)
        val = v
        // update()
      }
    }
  })
}
// 遍历传入obj，对每个key做响应式拦截
function observe(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return obj
  }
  
  Object.keys(obj).forEach(key => {
    reactive(obj, key, obj[key])
  })
}
// 动态
function set(obj, key, val) {
  reactive(obj, key, val)
}

const obj = {
  foo: 'foo',
  bar: 'bar',
  baz: {
    n: 1
  }
}
// reactive(obj, 'foo', 'foo')
observe(obj)
// obj.foo
// obj.foo = 'fooooooo'
// obj.bar
// obj.baz.n // 
// obj.baz = { n: 10 }
// obj.baz.n

// obj.dong = 'dong'
set(obj, 'dong', 'dong')
obj.dong