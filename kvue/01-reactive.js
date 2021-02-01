// 属性拦截：defineProperty()
// Vue.util.
function defineReactive(obj, key, val) {
  // 递归判断
  observe(val);

  // 属性拦截
  // 利用闭包：
  // 1.局部作用域
  // 2.通过函数暴露出去
  Object.defineProperty(obj, key, {
    get() {
      console.log("get", key);
      return val;
    },
    set(newVal) {
      console.log("set", key);
      if (newVal !== val) {
        // 新设置的值有可能是对象
        observe(newVal);
        val = newVal;
        // update()
      }
    },
  });
}

// 遍历需要响应式处理的对象
function observe(obj) {
  if (typeof obj !== "object") {
    return obj;
  }
  // 遍历
  Object.keys(obj).forEach((key) => {
    defineReactive(obj, key, obj[key]);
  });
}

// 如果用户有动态属性需要添加，需要使用set
function set(obj, key, val) {
  defineReactive(obj, key, val)

  // ...
}

// new Vue({data:{}})
const obj = {
  foo: "foo",
  bar: "bar",
  a: {
    n: 1,
  },
};
observe(obj);



// obj.foo
// obj.foo = 'foooooo'
// obj.a.n = 10
// obj.a = { n: 10 };
// obj.a.n

// obj.bla = 'blabla' // no ok
set(obj, 'bla', 'blabla')
obj.bla


// Array
// 需要覆盖扩展7个变更方法：push/pop/shift/unshift/...