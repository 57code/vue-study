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

    // 编译
    new Compile('#app', this)
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


// 编译过程
// new Compile(el, vm)
class Compile {
  constructor(el, vm) {
    this.$vm = vm

    this.$el = document.querySelector(el)

    // 编译模板
    if (this.$el) {
      this.compile(this.$el)
    }
  }

  compile(el) {
    // 递归遍历el
    el.childNodes.forEach(node => {
      // 判断其类型
      if (this.isElement(node)) {
        console.log('编译元素', node.nodeName);
        
      } else if (this.isInter(node)){
        // console.log('编译插值表达式', node.textContent);
        this.compileText(node)
      }

      if(node.childNodes) {
        this.compile(node)
      }
    })
  }

  // 插值文本编译
  compileText(node) {
    // 获取匹配表达式
    node.textContent = this.$vm[RegExp.$1]
  }
  
  // 元素
  isElement(node) {
    return node.nodeType === 1
  }

  // 判断是否是插值表达式{{xx}}
  isInter(node) {
    return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent)
  }
}