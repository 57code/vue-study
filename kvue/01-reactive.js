// Object.defineProperty()
function defineReactive(obj, key, val) {
  // 递归处理
  observe(val)
  
  Object.defineProperty(obj, key, {
    get() {
      console.log('get', key);
      return val
    },
    set(newVal) {
      if (newVal !== val) {
        console.log('set', key);
        // 处理newVal也是对象的情况
        observe(newVal)
        val = newVal
      }
    },
  })
}

// 遍历obj的每个key，执行响应式定义
function observe(obj) {
  // 判断传入obj是否是对象
  if (typeof obj !== 'object' || obj == null) {
    return 
  }
  
  Object.keys(obj).forEach(key => {
    defineReactive(obj, key, obj[key])
  })
}

// Vue.set(obj, key, val)
// 动态增加属性
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
// obj.bar
// obj.baz.a
// obj.baz = {
//   a: 10
// }
// obj.baz.a
// obj.dong = 'dong'
set(obj, 'dong', 'dong')
obj.dong

