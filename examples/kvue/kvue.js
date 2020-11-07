function reactive(obj, key, val) {
  // 递归
  observe(val)
  
  // object响应式defineProperty
  Object.defineProperty(obj, key, {
    get() {
      console.log('get', key);
      return val
    },
    set(v) {
      if (v !== val) {
        console.log('set', key);
        observe(val)
        val = v
        // update()
      }
    }
  })
}
// 遍历传入obj，对每个key做响应式拦截
function observe(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return obj
  }
  
  // 创建Ob实例
  new Observer(obj)
}

// 根据传入对象类型做不同响应式处理
class Observer {
  constructor(value) {
    this.value = value

    // 判断类型
    if (Array.isArray(value)) {
      // todo
    } else {
      // object
      this.walk(value)
    }
  }

  walk(obj) {
    Object.keys(obj).forEach(key => {
      reactive(obj, key, obj[key])
    })
  }
}

// 代理：可以使用户直接访问app.xxx代理到$data
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

// eslint-disable-next-line no-unused-vars
class KVue {
  constructor(options) {
    // 保存选项
    this.$options = options
    this.$data = options.data

    // 响应式处理
    observe(this.$data)

    // 代理
    proxy(this)

    // 编译
    new Compile(this, options.el)
  }
}

class Compile {
  constructor(vm, el) {
    this.$vm = vm
    this.el = document.querySelector(el)

    // 编译宿主元素
    this.compile(this.el)
  }

  // 递归遍历
  compile(el) {
    el.childNodes.forEach(node => {
      // 判断类型
      if (node.nodeType === 1) {
        // 元素
        console.log('编译', node.nodeName);

        // 递归
        if (node.childNodes) {
          this.compile(node)
        }
      } else if(node.nodeType === 3) {
        console.log('编译文本', node.textContent);
      }
    })
  }
}