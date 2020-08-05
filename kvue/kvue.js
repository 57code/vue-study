// 实现KVue构造函数
function defineReactive(obj, key, val) {
  // 如果val是对象，需要递归处理之
  observe(val)

  Object.defineProperty(obj, key, {
    get() {
      console.log('get', key);
      return val
    },
    set(newVal) {
      if (val !== newVal) {
        // 如果newVal是对象，也要做响应式处理
        observe(newVal)
        val = newVal
        console.log('set', key, newVal);

      }
    }
  })
}

// 遍历指定数据对象每个key，拦截他们
function observe(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return obj
  }

  // 每遇到一个对象，就创建一个Observer实例
  // 创建一个Observer实例去做拦截操作
  new Observer(obj)
}

// proxy代理函数：让用户可以直接访问data中的key
function proxy(vm, key) {
  Object.keys(vm[key]).forEach(k => {
    Object.defineProperty(vm, k, {
      get() {
        return vm[key][k]
      },
      set(v) {
        vm[key][k] = v
      }
    })
  })
}

// 根据传入value类型做不同操作
class Observer {
  constructor(value) {
    this.value = value

    // 判断一下value类型
    // 遍历对象
    this.walk(value)
  }

  walk(obj) {
    Object.keys(obj).forEach(key => {
      defineReactive(obj, key, obj[key])
    })
  }
}

class KVue {
  constructor(options) {
    // 0.保存options
    this.$options = options
    this.$data = options.data

    // 1.将data做响应式处理
    observe(this.$data)

    // 2.为$data做代理
    proxy(this, '$data')

    // 3.编译模板
    new Compile('#app', this)
  }
}

// 
class Compile {
  // el-宿主元素，vm-KVue实例
  constructor(el, vm) {
    this.$el = document.querySelector(el)
    this.$vm = vm

    // 解析模板
    if (this.$el) {
      // 编译
      this.compile(this.$el)
    }
  }

  compile(el) {
    // el是宿主元素
    // 遍历它，判断当前遍历元素的类型
    el.childNodes.forEach(node => {
      if (node.nodeType === 1) {
        console.log('编译元素', node.nodeName);
        
      } else if (this.isInter(node)) {
        // 文本, {{xxx}}
        console.log('编译文本', node.textContent, RegExp.$1);
        
      }

      // 递归
      if(node.childNodes && node.childNodes.length > 0) {
        this.compile(node)
      }
    })
  }

  // 判断插值表达式
  isInter(node) {
    return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent)
  }
}