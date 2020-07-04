function defineReactive(obj, key, val) {
  // val可能是对象，需要递归处理
  observe(val)

  // 每执行一次defineReactive，就创建一个Dep实例
  const dep = new Dep()
  
  Object.defineProperty(obj, key, {
    get() {
      console.log('get', val);
      Dep.target && dep.addDep(Dep.target)
      return val
    },
    set(newVal) {
      if (newVal !== val) {
        console.log('set', newVal);
        observe(newVal)
        val = newVal

        // 通知更新
        dep.notify()
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
        // console.log('编译元素', node.nodeName);
        this.compileElement(node)
      } else if (this.isInter(node)) {
        // console.log('编译插值表达式', node.textContent);
        this.compileText(node)
      }

      if (node.childNodes) {
        this.compile(node)
      }
    })
  }

  // 插值文本编译
  compileText(node) {
    // 获取匹配表达式
    // node.textContent = this.$vm[RegExp.$1]
    this.update(node, RegExp.$1, 'text')
  }

  compileElement(node) {
    // 获取节点属性
    const nodeAttrs = node.attributes
    Array.from(nodeAttrs).forEach(attr => {
      // k-xxx="aaa"
      const attrName = attr.name // k-xxx
      const exp = attr.value // aaa
      // 判断这个属性类型
      if (this.isDirective(attrName)) {
        const dir = attrName.substring(2)
        // 执行指令
        this[dir] && this[dir](node, exp)
      } 
      
      else if(attrName.startWith('@')){
        // 
        
      }

    })
  }

  // 文本指令
  text(node, exp) {

    this.update(node, exp, 'text')
  }

  html(node, exp) {

    this.update(node, exp, 'html')
  }

  // 所有动态绑定都需要创建更新函数以及对应watcher实例
  update(node, exp, dir) {
    // textUpdater()
    // 初始化
    const fn = this[dir + 'Updater']
    fn && fn(node, this.$vm[exp])

    // 更新: 
    new Watcher(this.$vm, exp, function (val) {
      fn && fn(node, val)
    })
  }

  textUpdater(node, value) {
    node.textContent = value
  }

  htmlUpdater(node, value) {
    node.innerHTML = value
  }

  // 元素
  isElement(node) {
    return node.nodeType === 1
  }

  // 判断是否是插值表达式{{xx}}
  isInter(node) {
    return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent)
  }

  isDirective(attrName) {
    return attrName.indexOf('k-') === 0
  }
}


// Watcher: 小秘书，界面中的一个依赖对应一个小秘书
class Watcher {
  constructor(vm, key, updateFn) {
    this.vm = vm
    this.key = key
    this.updateFn = updateFn

    // 读一次数据，触发defineReactive里面的get()
    Dep.target = this
    this.vm[this.key]
    Dep.target = null
  }

  // 管家调用
  update() {
    // 传入当前的最新值给更新函数
    this.updateFn.call(this.vm, this.vm[this.key])
  }
}

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