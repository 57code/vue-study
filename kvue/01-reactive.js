// Vue.util.defineReactive(this, 'current', '/')
function defineReactive(obj, key, val) {
  // 递归
  observe(val)
  
  // 属性拦截
  Object.defineProperty(obj, key, {
    get() {
      console.log('get', key);
      return val
    },
    set(newVal) {
      if (newVal !== val) {
        console.log('set', key);
        observe(newVal)
        val = newVal
        // update()
      }
    }
  })
}

// 遍历传入obj的所有属性，执行响应式处理
function observe(obj) {
  //首先判断obj是对象
  if (typeof obj !== 'object' || obj == null) {
    return obj
  }
  
  Object.keys(obj).forEach(key => defineReactive(obj, key, obj[key]))
}

// 动态新增一个属性
// Vue.set(obj, key, val)
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
// 1.用户不能够手动设置所有属性：递归响应式处理过程
// defineReactive(obj, 'foo', 'foo')
observe(obj)
// obj.foo
// obj.foo = 'foooo'
// obj.bar
// obj.bar = 'barrr'
// obj.baz
// obj.baz.a
// obj.dong = 'dong'
set(obj, 'dong', 'dong')
obj.dong

obj.baz = {
  a: 10
}

// 2.数组：支持不了
// 解决方案是：要拦截数组的7个变更方法，覆盖他们，让他们做数组操作的同时，进行变更通知