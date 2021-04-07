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
        observe(newVal);

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

  // 创建Observer实例
  new Observer(obj);
}

// 响应式对象中的某个key只要它的值是一个对象就要创建一个Observer实例
class Observer {
  // 根据传入对象的类型做不同的响应式处理
  constructor(obj) {
    if (Array.isArray(obj)) {
      // todo
    } else {
      // 对象响应式
      this.walk(obj);
    }
  }

  walk(obj) {
    Object.keys(obj).forEach((key) => {
      defineReactive(obj, key, obj[key]);
    });
  }
}

class KVue {
  // new KVue({el, data})
  constructor(options) {
    this.$options = options;

    this.$data = options.data;

    // 对data做响应式处理
    observe(this.$data);

    // 2.编译
  }
}
