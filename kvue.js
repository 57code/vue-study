function defineReactive(obj, key, val) {
  // val可能是对象，需要递归处理
  observe(val)

  Object.defineProperty(obj, key, {
    get() {
      console.log('get', val);
      return val
    },
    set(newVal) {
      if (newVal !== val) {
        console.log('set', newVal);
        observe(newVal)
        val = newVal
      }
    }
  })
}

// 对象响应式处理
function observe(obj) {
  // 判断obj类型必须是对象
  if (typeof obj !== 'object' || obj == null) {
    return
  }

  new Observer(obj)
}

// 将$data中的key代理到KVue实例上
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

    // 响应化处理
    observe(this.$data)

    // 代理
    proxy(this)
  }
}

// 每一个响应式对象，半生一个Observer实例
class Observer {
  constructor(value) {
    this.value = value

    // 判断value是obj还是数组
    this.walk(value)
  }

  walk(obj) {
    Object.keys(obj).forEach(
      key => defineReactive(obj, key, obj[key]))
  }
}