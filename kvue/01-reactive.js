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
        observe(newVal)

        console.log("set", key);
        val = newVal;
        // update()
      }
    },
  });
}

// 递归遍历方法
function observe(obj) {
  if (typeof obj !== "object" || obj === null) {
    return;
  }
  Object.keys(obj).forEach((key) => {
    defineReactive(obj, key, obj[key]);
  });
}

const obj = {
  foo: 'foo',
  bar: 'bar',
  baz: {
    a: 1
  }
};
// defineReactive(obj, "foo", "foo");
observe(obj)

function set(obj, key, val) {
  defineReactive(obj, key, val)

  // ...
}


// obj.foo;
// obj.foo = "foooooooo";
// obj.bar;
// obj.baz.a
// obj.baz =  {
//   a: 10
// }
// obj.baz.a

// obj.dong = 'dong' // no ok
set(obj, 'dong', 'dong')
obj.dong

// vue2中数组需要另一套响应式策略
