// 1.实现响应式
// vue2：Object.defineProperty(obj, key, desc)
// vue3: new Proxy()
// 设置obj的key，拦截它，初始值val
function defineReactive(obj, key, val) {

  // 如果val本身还是对象，则需要递归处理
  observe(val)
  
  Object.defineProperty(obj, key, {
    get() {
      console.log("get", key);
      return val;
    },
    set(v) {
      if (v !== val) {
        // 如果传入v是一个对象，则仍然需要做响应式处理
        observe(v)
        val = v;
        console.log("set", key);
        // update()
      }
    },
  });
}

function observe(obj) {
  // 判断obj的值，必须是object
  if (typeof obj !== 'object' || obj == null) {
    return obj
  }
  Object.keys(obj).forEach((key) => defineReactive(obj, key, obj[key]));
}

function set(obj, key, val) {
  defineReactive(obj, key, val)
}

const obj = {
  foo: "foo",
  bar: "bar",
  baz: {
    a: 1
  },
  arr: [1,2,3]
};
// 对obj做响应式处理
// defineReactive(obj, 'foo', 'foooo')
// defineReactive(obj, 'bar', 'foooo')

observe(obj);

// obj.foo; // get foo
// obj.foo = "fooooooo";
// obj.bar;
// obj.bar = "barrrr";
// obj.baz
// obj.baz.a
// obj.baz = {
//   a: 10
// }
// obj.baz.a

// obj.dong = 'dong'
// obj.dong
set(obj, 'dong', 'dong')
obj.dong

// 数组：覆盖数组中7个变更方法，push、pop、shift、unshift，。。。
// obj.arr.push()
