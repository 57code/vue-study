// 数据响应式
function defineReactive(obj, key, val) {

  // 递归处理
  observe(val)
  
  Object.defineProperty(obj, key, {
    get(){
      console.log('get', key);
      return val
    },
    set(newVal){
      if (newVal !== val) {
        console.log('set', key, newVal);
        observe(newVal)
        val = newVal
      }
    },
  })
}

// 让我们使一个对象所有属性都被拦截
function observe(obj) {
  if(typeof obj !== 'object' || obj == null) {
    return
  }

  // 创建Observer实例:以后出现一个对象，就会有一个Observer实例
  new Observer(obj)

}

// 代理data中数据
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

// KVue:
// 1.响应式操作
class KVue {
  constructor(options) {
    // 保存选项
    this.$options = options
    this.$data = options.data;

    // 响应化处理
    observe(this.$data)

    // 代理
    proxy(this)
  }
}

// 做数据响应化
class Observer {
  constructor(value) {
    this.value = value
    this.walk(value)
  }

  // 遍历对象做响应式
  walk(obj) {
    Object.keys(obj).forEach(key => {
      defineReactive(obj, key, obj[key])
    })
  }
}

// Compiler: 解析模板，找到依赖，并和前面拦截的属性关联起来
class Compiler {
  constructor() {
    
  }
}