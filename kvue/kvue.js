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
  new Observer(obj)
}

// Observer：用来去分对象还是数组，从而做不同响应式操作
class Observer {
  constructor(value) {
    if (Array.isArray(value)) {
      // todo
    } else {
      // object
      this.walk(value)
    }
  }

  walk(obj) {
    Object.keys(obj).forEach((key) => {
      defineReactive(obj, key, obj[key]);
    });
  }
}

function proxy(vm) {
  Object.keys(vm.$data).forEach(key => {
    Object.defineProperty(vm, key, {
      get() {
        return vm.$data[key]
      },
      set(v) {
        vm.$data[key] = v
      }
    })
  })
}

// KVue
class KVue {
  constructor(options) {
    this.$options = options
    this.$data = options.data

    // 1.响应式
    observe(this.$data)

    // 1.5 代理：用户可以通过KVue实例直接访问data中的响应式数据
    proxy(this)
    
    // 2.编译
  }

}