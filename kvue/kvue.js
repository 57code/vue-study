// Object.defineProperty()
function defineReactive(obj, key, val) {
  // 递归处理
  observe(val)
  
  Object.defineProperty(obj, key, {
    get() {
      console.log('get', key);
      return val
    },
    set(newVal) {
      if (newVal !== val) {
        console.log('set', key);
        // 处理newVal也是对象的情况
        observe(newVal)
        val = newVal
      }
    },
  })
}

// 遍历obj的每个key，执行响应式定义
function observe(obj) {
  // 判断传入obj是否是对象
  if (typeof obj !== 'object' || obj == null) {
    return 
  }
  
  // 对obj做响应式处理
  new Observer(obj)
}

// 传入一个obj，判断该obj类型，做不同响应式处理
class Observer {
  constructor(value) {
    if (Array.isArray(value)) {
      // todo: 数组响应式
    } else {
      this.walk(value)
    }
  }

  walk(obj) {
    Object.keys(obj).forEach(key => {
      defineReactive(obj, key, obj[key])
    })
  }
}

// 代理函数
function proxy(vm) {
  Object.keys(vm.$data).forEach(key => {
    Object.defineProperty(vm, key, {
      get() {
        // 转发data上的值
        return vm.$data[key]
      },
      set(v) {
        vm.$data[key] = v
      }
    })
  })
}

// 构造函数
class KVue {
  constructor(options) {
    // 1.保存配置
    this.$options = options
    this.$data = options.data

    // 2.对data做响应式处理
    observe(this.$data)

    // 2.5代理
    proxy(this)
    
    // 3.编译视图模板
    new Compile(options.el, this)
  }
}

class Compile {
  constructor(el, vm) {
    this.$vm = vm

    this.$el = document.querySelector(el)

    if (this.$el) {
      this.compile(this.$el)
    }
  }

  compile(el) {
    // 对el这棵dom树递归遍历
    el.childNodes.forEach(node => {
      // 1.如果是元素，判断其属性
      if (node.nodeType === 1) {
        console.log('元素节点', node.nodeName);
        // 递归
        if (node.childNodes.length > 0) {
          this.compile(node)
        }
      } 
      if (this.isInter(node)) {
        // 2.如果是文本，判断是不是插值绑定{{}}
        console.log('插值绑定');
      }
      
    })
  }

  isInter(node) {
    return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent)
  }
}