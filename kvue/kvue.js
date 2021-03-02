// Object.defineProperty()
function defineReactive(obj, key, val) {
  // 递归处理
  observe(val)
  
  // 创建对应的Dep
  const dep = new Dep()
  
  Object.defineProperty(obj, key, {
    get() {
      console.log('get', key);
      // 添加依赖
      Dep.target && dep.addDep(Dep.target)
      return val
    },
    set(newVal) {
      if (newVal !== val) {
        console.log('set', key);
        // 处理newVal也是对象的情况
        observe(newVal)
        val = newVal

        dep.notify()
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
        // console.log('元素节点', node.nodeName);
        this.compileElement(node)
        
        // 递归
        if (node.childNodes.length > 0) {
          this.compile(node)
        }
      } 
      if (this.isInter(node)) {
        // 2.如果是文本，判断是不是插值绑定{{}}
        this.compileText(node)
      }
      
    })
  }

  isInter(node) {
    return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent)
  }

  // 提取一个update方法，此方法为哪些动态的依赖初始化并且创建Watcher实例
  update(node, exp, dir) {
    // 1.init
    const fn = this[dir+'Updater']
    fn && fn(node, this.$vm[exp])

    // 2.创建Watcher实例
    new Watcher(this.$vm, exp, function(val) {
      fn && fn(node, val)
    })
  }
  
  // {{ooxx}}
  compileText(node) {
    console.log(RegExp.$1);
    this.update(node, RegExp.$1, 'text')
  }

  textUpdater(node, val) {
    node.textContent = val
  }

  compileElement(node) {
    // 获取所有特性
    let nodeAttrs = node.attributes
    Array.from(nodeAttrs).forEach(attr => {
      console.log(attr);
      // k-text="counter"
      const attrName = attr.name // k-text
      const exp = attr.value     // counter
      if (this.isDir(attrName)) {
        const dir = attrName.substring(2)
        this[dir] && this[dir](node, exp)
      }
    })
  }

  isDir(attr) {
    return attr.startsWith('k-')
  }

  // k-text
  text(node, exp) {
    this.update(node, exp, 'text')
  }

  // k-html
  html(node, exp) {
    this.update(node, exp, 'html')
  }

  htmlUpdater(node, val) {
    node.innerHTML = val
  }
}

// Watcher: 负责视图中依赖的更新
class Watcher {
  constructor(vm, key, updater) {
    this.vm = vm
    this.key = key
    this.updater = updater

    // 尝试读取key，触发依赖收集
    Dep.target = this
    this.vm[this.key]
    Dep.target = null
  }

  // 会被Dep调用
  update() {
    this.updater.call(this.vm, this.vm[this.key])
  }
}

// Dep: 和data中的每个key一一对应，响应式处理的时候，没遍历一个属性，就创建一个Dep实例
class Dep {
  constructor() {
    this.deps = []
  }
  addDep(watcher) {
    this.deps.push(watcher)
  }
  notify() {
    this.deps.forEach(watcher => watcher.update())
  }
}