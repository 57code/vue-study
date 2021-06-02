function defineReactive(obj, key, val) {
  // 递归
  observe(val);

  // 属性拦截
  Object.defineProperty(obj, key, {
    get() {
      console.log("get", key);
      return val;
    },
    set(newVal) {
      if (newVal !== val) {
        console.log("set", key);
        val = newVal;
        // update()
      }
    },
  });
}

// 遍历传入obj的所有属性，执行响应式处理
function observe(obj) {
  //首先判断obj是对象
  if (typeof obj !== "object" || obj == null) {
    return obj;
  }

  Object.keys(obj).forEach((key) => defineReactive(obj, key, obj[key]));
}

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

class KVue {
  constructor(options) {
    // 0.保存选项
    this.$options = options;
    this.$data = options.data;

    // 1.响应式: 递归遍历data中的对象，做响应式处理
    observe(this.$data);

    // 1.5.代理
    proxy(this);

    // 2.编译模板
  }
}
