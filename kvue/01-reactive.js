// 数据响应式
function defineReactive(obj, key, val) {
  // 递归
  observe(val)
  
  Object.defineProperty(obj, key, {
    get() {
      console.log("get", key);
      return val;
    },
    set(newVal) {
      if (newVal !== val) {
        console.log('set', key);
        // 保证如果newVal是对象，再次做响应式处理
        observe(newVal)
        val = newVal
      }
    },
  });
}

// 遍历obj，对其所有属性做响应式
function observe(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return 
  }

  // 遍历obj所有key，做响应式处理
  Object.keys(obj).forEach(key => {
    defineReactive(obj, key, obj[key])
  })
}

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
observe(obj)
// obj.foo
// obj.foo = 'foooooo'
// obj.bar
// obj.bar = 'barrrrr'
// obj.baz.a
// obj.baz.a = 10
// obj.baz = {
//   a: 10
// }
// obj.baz.a
// obj.baz.a = 10
// obj.dong = 'dong' // no ok
set(obj, 'dong', 'dong') // ok
obj.dong

// array
// push/pop/shift/unshift/... 使用defineProperty拦截不到
// 思考题