// 数据响应式
function defineReactive(obj, key, val) {
  // 递归
  observe(val);

  Object.defineProperty(obj, key, {
    get() {
      console.log("get", key);
      return val;
    },
    set(newVal) {
      if (newVal !== val) {
        console.log("set", key);
        // 保证如果newVal是对象，再次做响应式处理
        observe(newVal);
        val = newVal;
      }
    },
  });
}

// 遍历obj，对其所有属性做响应式
function observe(obj) {
  if (typeof obj !== "object" || obj === null) {
    return;
  }

  new Observer(obj);
}

// 根据传入value的类型做相应的响应式处理
class Observer {
  constructor(value) {
    this.value = value;

    if (Array.isArray(value)) {
      // todo
    } else {
      this.walk(value);
    }
  }

  // 对象响应式
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
// 1.对data选项做响应式处理
// 2.编译模板
class KVue {
  constructor(options) {
    this.$options = options;
    this.$data = options.data;

    // data响应式处理
    observe(this.$data);

    // 代理
    proxy(this)

    // compile
  }
}
