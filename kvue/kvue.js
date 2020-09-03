// 利用Object.defineProperty(obj, key, descriptor)
// Vue.util.defineReactive()
function defineReactive(obj, key, val) {
  // 递归遍历
  observe(val)
  
  Object.defineProperty(obj, key, {
    get() {
      console.log(`get ${key}`);
      return val;
    },
    set(newVal) {
      if (newVal !== val) {
        console.log(`set ${key}`);
        observe(newVal) // 新值如果是对象，则要对它执行响应式处理
        val = newVal;
      }
    },
  });
}

function observe(obj) {
  // 必须是对象
  if (typeof obj !== 'object' || obj === null) {
    return obj
  }
  
  // 创建一个Observer实例
  new Observer(obj)
}

class Observer {
  constructor(value) {
    this.value = value

    if (Array.isArray(value)) {
      // todo
    } else {
      // object
      this.walk(value)
    }
  }

  // 对象响应式处理
  walk(obj) {
    Object.keys(obj).forEach((key) => 
      defineReactive(obj, key, obj[key]));
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
    this.$options = options
    this.$data = options.data

    // 对data选项做响应式处理
    observe(this.$data)

    // 代理data到vm上
    proxy(this)

    // 执行编译
    new Compile(options.el, this)
  }
}

// 遍历dom树，找到动态的表达式或者指令等
class Compile {
  constructor(el, vm) {
    this.$vm = vm
    this.$el = document.querySelector(el)

    if (this.$el) {
      this.compile(this.$el)
    }
  }

  // 递归传入节点，根据节点类型不同做不同操作
  compile(el) {
    // 获取所有孩子节点
    const childNodes = el.childNodes
    childNodes.forEach(node => {
      if (node.nodeType === 1) {
        // 元素节点
        console.log('编译元素', node.nodeName);
        
      } else if(node.nodeType === 3) {
        console.log('文本节点', node.textContent);
        
      }

      // 递归
      if(node.childNodes) {
        this.compile(node)
      }
    })
  }
}