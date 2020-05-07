// 任务：
// 1. 数据响应式：是data选项中的对象编程响应式的
// 2.

// 数据响应式：
// Object.defineProperty()


function defineReactive(obj, key, val) {

  // val可能还是对象，此时我们需要递归
  observe(val)

  // 参数3是描述对象
  Object.defineProperty(obj, key, {
    get() {
      console.log('get', key);
      return val
    },
    set(newVal) {
      if (newVal !== val) {
        console.log('set', key);
        // 防止newVal是对象，提前做一次observe
        observe(newVal)
        val = newVal
      }
    }
  })
}

function observe(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return
  }

  // 响应式
  new Observer(obj)
  
}

// Observer: 辨别当前对象类型是纯对象还是数组，从而做不同响应式操作
class Observer {
  constructor(value) {
    this.value = value
    // 辨别类型
    if (Array.isArray(value)) {
      // todo
    } else {
      this.walk(value)
    }
  }

  walk(obj) {
    // 对象响应式
    Object.keys(obj).forEach(key => defineReactive(obj, key, obj[key]))
  }
}

// 代理函数：可以将$data代理到KVue的实例
// vm是KVue实例
function proxy(vm) {
  Object.keys(vm.$data).forEach(key => {
    // 为当前实例做代理，定义一些key和data相对应
    Object.defineProperty(vm, key, {
      get() {
        return vm.$data[key]
      },
      set(newVal) {
        vm.$data[key] = newVal
      }
    })
  })
}

// KVue：解析选项，响应式、编译等等
class KVue {
  constructor(options) {
    this.$options = options
    this.$data = options.data

    // 对data选项做响应式处理
    observe(this.$data)

    // 代理
    proxy(this)

    // 执行编译
    new Compile(options.el, this)
  }
}

// Compile: 遍历视图模板，解析其中的特殊模板语法为更新函数
// new Compile(el, vm)
class Compile {
  constructor(el, vm) {
    // el:宿主元素选择器
    // vm:KVue的实例
    this.$vm = vm;
    this.$el = document.querySelector(el)

    // 执行编译
    this.compile(this.$el)
  }

  compile(el) {
    // 遍历子元素，判断他们类型并做响应处理
    el.childNodes.forEach(node => {
      // 判断类型
      if (node.nodeType === 1) {
        // 元素节点
        console.log('编译元素', node.nodeName);
        
      } else if(this.isInter(node)) {
        // 文本节点
        console.log('文本节点', node.textContent);
        
      }

      // 递归子节点
      if(node.childNodes) {
        this.compile(node)
      }
    }) 
  }

  // 是否插值绑定
  isInter(node) {
    return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent)
  }


}