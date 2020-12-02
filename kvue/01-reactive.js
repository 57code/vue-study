// Object.defineProperty()

function defineReactive(obj, key, val) {
  // 递归处理
  observe(val);

  Object.defineProperty(obj, key, {
    get() {
      console.log("get", key);
      return val;
    },
    set(v) {
      if (v !== val) {
        console.log("set", key);
        val = v;
        // update()
      }
    },
  });
}

// 对象响应式：遍历每个key，对其执行defineReactive
function observe(obj) {
  // 首先判断obj是不是对象
  if (typeof obj !== "object" || obj === null) {
    return;
  }

  Object.keys(obj).forEach((key) => {
    defineReactive(obj, key, obj[key]);
  });
}

// Vue.set/delete
// 如果存在动态添加或删除的属性
function set(obj, key, val) {
  defineReactive(obj, key, val);
}

const obj = {
  foo: "foo",
  bar: "bar",
  baz: {
    a: 1,
  },
};
// defineReactive(obj, 'foo', 'foo')
observe(obj);
// obj.foo;
// obj.foo = "foooooooo";
// obj.bar;
// obj.bar = "barrrrrrr";
// obj.baz;
// obj.baz.a;
// obj.dong = "dong";
set(obj, 'dong', 'dong')
obj.dong;

// Array响应式
// 覆盖数组的7个mutation method：push/pop/shift/unshift/....
