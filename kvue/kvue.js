function defineReactive(obj, key, val) {
  // 递归处理
  observe(val);

  const dep = new Dep()
  
  Object.defineProperty(obj, key, {
    get() {
      console.log("get", key);

      // 判断一下Dep.target是否存在，若存在则收集依赖
      Dep.target && dep.addDep(Dep.target)
      
      return val;
    },
    set(v) {
      if (v !== val) {
        console.log("set", key, v);
        val = v;
        // update()
        dep.notify()
      }
    },
  });
}

// 对象响应式：遍历每个key，对其执行defineReactive
function observe(obj) {
  // 首先判断obj是不是对象
  if (typeof obj !== "object" || obj === null) {
    return;
  }

  new Observer(obj)
}

class Observer {
  constructor(obj) {
    this.value = obj

    if (Array.isArray(obj)) {
      // todo
    } else {
      // object
      this.walk(obj)
    }
  }

  walk(obj) {
    Object.keys(obj).forEach((key) => {
      defineReactive(obj, key, obj[key]);
    });
  }
}

// 将$data的key代理到vm上去，用户就可以直接使用
function proxy(vm) {
  Object.keys(vm.$data).forEach((key) => {
    Object.defineProperty(vm, key, {
      get() {
        return vm.$data[key]
      },
      set(v) {
        vm.$data[key] = v
      }
    })
  });
}

class KVue {
  constructor(options) {
    // 1.响应式
    this.$options = options
    this.$data = options.data
    observe(this.$data)

    // 1.1代理
    proxy(this)
    
    // 2.编译
    new Compile(options.el, this)
  }
}

class Compile {
  constructor(el, vm) {
    this.$vm = vm

    // 遍历el
    this.$el = document.querySelector(el)
    this.compile(this.$el)
  }

  compile(el) {
    // 遍历node
    el.childNodes.forEach(node => {
      // 1.元素
      if (node.nodeType === 1) {
        // console.log('编译元素', node.nodeName);
        this.compileElement(node)

        // 递归
        if (node.childNodes.length > 0) {
          this.compile(node)
        }
      } else if(this.isInter(node)) {
        // 2.插值绑定文本 {{xxx}}
        // console.log('编译文本', node.textContent);
        this.compileText(node)
      }
    })
  }

  isInter(node) {
    return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent)
  }

  isDir(attrName) {
    return attrName.startsWith('k-')
  }
  
  // update: 给传入的node做初始化并创建watcher负责其更新
  update(node, exp, dir) {
    const fn = this[dir + 'Updater']
    // 1.初始化
    fn && fn(node, this.$vm[exp])

    // 2.创建watcher实例
    new Watcher(this.$vm, exp, function(val) {
      fn && fn(node, val)
    })
  }
  
  // 插值文本编译 {{}}
  compileText(node) {
    this.update(node, RegExp.$1, 'text')
    // console.log(RegExp.$1);
    
  }

  textUpdater(node, val) {
    node.textContent = val
  }
  
  // 编译元素
  compileElement(node) {
    // 获取节点特性
    const nodeAttrs = node.attributes
    Array.from(nodeAttrs).forEach(attr => {
      // k-text="xx"
      const attrName = attr.name // k-text
      const exp = attr.value // xx
      if (this.isDir(attrName)) {
        // 指令
        // 获取指令执行函数并调用
        const dir = attrName.substring(2)
        this[dir] && this[dir](node, exp)
      }
    })
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

// 监听器：负责页面中的一个依赖的更新
class Watcher {
  constructor(vm, key, updateFn) {
    this.vm = vm
    this.key = key
    this.updateFn = updateFn

    // 获取一下key的值触发它的get方法，在那创建当前watcher实例和dep之间关系
    Dep.target = this
    this.vm[this.key]
    Dep.target = null
  }

  update() {
    this.updateFn.call(this.vm, this.vm[this.key])
  }
}

class Dep {
  constructor() {
    this.deps = []
  }

  addDep(dep) {
    this.deps.push(dep)
  }

  notify() {
    this.deps.forEach(dep => dep.update())
  }
}