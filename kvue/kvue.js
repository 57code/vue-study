function defineReactive(obj, key, val) {
  // 递归
  observe(val)
  
  Object.defineProperty(obj, key, {
    get() {
      console.log('get', key);
      return val
    },
    set(v) {
      if (val !== v) {
        console.log('set', key);
        // 传入新值v可能还是对象
        observe(v)
        val = v
      }
    },
  })
}

// 递归遍历obj，动态拦截obj的所有key
function observe(obj) {
  if (typeof obj !== 'object' || obj == null) {
    return obj
  }
  
  // 每出现一个对象，创建一个Ob实例
  new Observer(obj)
}

// Observer: 判断传入obj类型，做对应的响应式处理
class Observer {
  constructor(obj) {
    this.value = obj

    // 判断对象类型
    if (Array.isArray(obj)) {
      // todo
    } else {
      this.walk(obj)
    }
  }

  // 对象响应式
  walk(obj) {
    Object.keys(obj).forEach(key => {
      defineReactive(obj, key, obj[key])
    })
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

class KVue {
  constructor(options) {
    // 保存选项
    this.$options = options
    this.$data = options.data

    // 2.响应式处理
    observe(this.$data)

    // 3.代理data到KVue实例上
    proxy(this)
  }
}