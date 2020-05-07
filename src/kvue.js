// 任务：
// 1. 数据响应式：是data选项中的对象编程响应式的
// 2.

// 数据响应式：
// Object.defineProperty()


function defineReactive(obj, key, val) {

  // val可能还是对象，此时我们需要递归
  observe(val)

  // 创建Dep实例，他和key一对一对应关系
  const dep = new Dep()

  // 参数3是描述对象
  Object.defineProperty(obj, key, {
    get() {
      // console.log('get', key);
      // 依赖收集:Dep.target就是当前新创建Watcher实例
      Dep.target && dep.addDep(Dep.target)
      return val
    },
    set(newVal) {
      if (newVal !== val) {
        console.log('set', key);
        // 防止newVal是对象，提前做一次observe
        observe(newVal)
        val = newVal

        // 通知更新
        dep.notify()
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
        // console.log('编译元素', node.nodeName);
        this.compileElement(node)
      } else if (this.isInter(node)) {
        // 文本节点
        // console.log('文本节点', node.textContent);
        // double kill
        this.compileText(node)
      }

      // 递归子节点
      if (node.childNodes) {
        this.compile(node)
      }
    })
  }

  // 是否插值绑定
  isInter(node) {
    return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent)
  }

  // 绑定表达式解析
  compileText(node) {
    // 获取匹配表达式 RegExp.$1,比如counter， vm['counter']
    // node.textContent = this.$vm[RegExp.$1]
    this.update(node, RegExp.$1, 'text')
  }

  // 编译元素节点：判断指令和事件
  compileElement(node) {
    // 获取属性
    const attrs = node.attributes

    Array.from(attrs).forEach(attr => {
      // k-text="counter"
      // attr是一个对象{name:'k-text', value: 'counter'}
      const { name, value } = attr
      // 判断是否是指令
      if (name.indexOf('k-') === 0) {
        // 截取指令
        const dir = name.substring(2)
        // 指令指令
        this[dir] && this[dir](node, value)
      }
      // 判断是否是事件 @
      // else if() {

      // }
    })
  }

  // k-text文本更新
  text(node, exp) {
    this.update(node, exp, 'text')
  }

  // k-html
  html(node, exp) {
    this.update(node, exp, 'html')
  }

  // update方法，高阶函数：除了执行dom操作，创建一个额外watcher实例
  // dir是指令名称
  update(node, exp, dir) {
    // 获取更新方法
    const fn = this[dir + 'Updater']
    // 初始化，让用户看到首次渲染结果
    fn && fn(node, this.$vm[exp])

    // 创建watcher实例
    new Watcher(this.$vm, exp, val => {
      fn && fn(node, val)
    })
  }

  // dom执行方法
  textUpdater(node, value) {
    node.textContent = value
  }

  htmlUpdater(node, value) {
    node.innerHTML = value
  }
}

// Watcher: 管理依赖，执行更新
// const watchers = []
class Watcher {
  // vm是KVue实例
  // key是data中对应的key名称
  // fn是更新函数，他知道怎么更新dom
  constructor(vm, key, fn) {
    this.vm = vm
    this.key = key
    this.fn = fn

    // watchers.push(this)

    // 建立dep和watcher之间的关系
    Dep.target = this
    this.vm[this.key] // 读一下key的值触发其getter
    Dep.target = null
  }

  // 更新函数，由Dep调用
  update() {
    // 更新函数调用，设置上下文问KVue实例，传参是当前最新值
    this.fn.call(this.vm, this.vm[this.key])
  }

}

// Dep: 管理多个watcher实例，当对应key发生变化时，通知他们更新
class Dep {
  constructor() {
    this.deps = []
  }

  addDep(dep) {
    // 添加订阅者，dep就是watcher实例
    this.deps.push(dep)
  }

  // 通知更新
  notify() {
    this.deps.forEach(w => w.update())
  }
}