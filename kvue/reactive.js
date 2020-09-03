// 利用Object.defineProperty(obj, key, descriptor)
// Vue.util.defineReactive()
function defineReactive(obj, key, val) {
  // 递归遍历
  observe(val)
  
  Object.defineProperty(obj, key, {
    get() {
      console.log(`get ${key}`);
      return val;
    },
    set(newVal) {
      if (newVal !== val) {
        console.log(`set ${key}`);
        observe(newVal) // 新值如果是对象，则要对它执行响应式处理
        val = newVal;
      }
    },
  });
}

function observe(obj) {
  // 必须是对象
  if (typeof obj !== 'object' || obj === null) {
    return obj
  }
  Object.keys(obj).forEach((key) => defineReactive(obj, key, obj[key]));
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
};
// defineReactive(obj, "foo", "foooooo");
observe(obj)
// obj.foo;
// obj.foo = "fooooo~~~~~";
// obj.bar
// obj.bar = 'barrrrrrr'
// obj.baz.a = 10
// obj.baz = {
//   a: 10
// }
// obj.baz.a
// obj.dong = 'dong' // no ok
set(obj, 'dong', 'dong')
obj.dong

// 数组响应式：数组有7个变更方法，覆盖着7个方法，在她们被调用时，额外执行通知变更逻辑