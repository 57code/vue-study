// 给一个obj定义一个响应式的属性
function defineReactive(obj, key, val) {
  // 递归
  // val如果是个对象，就需要递归处理
  observe(val);

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
        observe(newVal);
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

  new Observer(obj)
}

// 能够将传入对象中的所有key代理到指定对象上
function proxy(vm) {
  Object.keys(vm.$data).forEach((key) => {
    Object.defineProperty(vm, key, {
      get() {
        return vm.$data[key];
      },
      set(v) {
        vm.$data[key] = v;
      },
    });
  });
}

class Observer {
  constructor(obj) {
    // 判断传入obj类型，做相应处理
    if (Array.isArray(obj)) {
      // todo
    } else {
      this.walk(obj);
    }
  }

  walk(obj) {
    Object.keys(obj).forEach((key) => 
      defineReactive(obj, key, obj[key]));
  }
}

class KVue {
  constructor(options) {
    // 0.保存选项
    this.$options = options;
    this.$data = options.data;

    // 1.对data做响应式处理
    observe(options.data);

    // 2.代理
    proxy(this);
  }
}
