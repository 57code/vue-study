// 给一个obj定义一个响应式的属性
function defineReactive(obj, key, val) {
  // 递归
  // val如果是个对象，就需要递归处理
  observe(val)
  
  Object.defineProperty(obj, key, {
    get() {
      console.log("get", key);
      return val;
    },
    set(newVal) {
      if (newVal !== val) {
        console.log("set", key);
        val = newVal;
        // 新值如果是对象，仍然需要递归遍历处理
        observe(newVal)
        // update()
      }
    },
  });
}

// 遍历响应式处理
function observe(obj) {
  if (typeof obj !== "object" || obj == null) {
    return obj;
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
    n: 1
  }
};
// defineReactive(obj, "foo", "foo");
observe(obj)
// obj.foo;
// obj.baz = {
//   n: 10
// }
// obj.baz.n
// obj.dong = 'dong'
set(obj, 'dong', 'dong')
obj.dong
