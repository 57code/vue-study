// 数据响应式
function defineReactive(obj, key, val) {
  // 递归
  observe(val);

  // 创建Dep实例
  const dep = new Dep()
  
  Object.defineProperty(obj, key, {
    get() {
      console.log("get", key);
      // 依赖收集
      Dep.target && dep.addDep(Dep.target)
      return val;
    },
    set(newVal) {
      if (newVal !== val) {
        console.log("set", key);
        // 保证如果newVal是对象，再次做响应式处理
        observe(newVal);
        val = newVal;

        dep.notify()
      }
    },
  });
}

// 遍历obj，对其所有属性做响应式
function observe(obj) {
  if (typeof obj !== "object" || obj === null) {
    return;
  }

  new Observer(obj);
}

// 根据传入value的类型做相应的响应式处理
class Observer {
  constructor(value) {
    this.value = value;

    if (Array.isArray(value)) {
      // todo
    } else {
      this.walk(value);
    }
  }

  // 对象响应式
  walk(obj) {
    Object.keys(obj).forEach((key) => {
      defineReactive(obj, key, obj[key]);
    });
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

// KVue
// 1.对data选项做响应式处理
// 2.编译模板
class KVue {
  constructor(options) {
    this.$options = options;
    this.$data = options.data;

    // data响应式处理
    observe(this.$data);

    // 代理
    proxy(this)

    // compile
    new Compile(options.el, this)
  }
}

// 解析模板
// 1.处理插值
// 2.处理指令和事件
// 3.以上两者初始化和更新
class Compile {
  constructor(el, vm) {
    this.$vm = vm
    this.$el = document.querySelector(el)

    if (this.$el) {
      this.compile(this.$el)
    }
  }

  compile(el) {
    // 遍历el子节点，判断他们类型做相应的处理
    const childNodes = el.childNodes

    childNodes.forEach(node => {
      if (node.nodeType === 1) {
        // 元素
        // console.log('元素', node.nodeName);
        // 处理指令和事件
        const attrs = node.attributes
        Array.from(attrs).forEach(attr => {
          // k-xxx="abc"
          const attrName = attr.name
          const exp = attr.value
          if (attrName.startsWith('k-')) {
            const dir = attrName.substring(2)
            this[dir] && this[dir](node, exp)
          }
        })
      } else if (this.isInter(node)) {
        // 文本
        // console.log('插值', node.textContent);
        this.compileText(node)
      }

      // 递归
      if(node.childNodes) {
        this.compile(node)
      }
    })
  }

  update(node, exp, dir) {
    // 1.初始化
    const fn = this[dir + 'Updater']
    fn && fn(node, this.$vm[exp])

    // 2.更新
    new Watcher(this.$vm, exp, function(val) {
      fn && fn(node, val)
    })
  }
  
  // k-text
  text(node, exp) {
    this.update(node, exp, 'text')
  }

  textUpdater(node, value) {
    node.textContent = value
  }
  
  // 编译文本 {{xxx}}
  compileText(node) {
    this.update(node, RegExp.$1, 'text')
  }

  html(node, exp) {
    this.update(node, exp, 'html')
  }
  
  htmlUpdater(node, value) {
    node.innerHTML = value
  }
  
  // 是否插值表达式
  isInter(node) {
    return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent)
  }
}

// 监听器： 负责依赖更新
class Watcher {
  constructor(vm, key, updateFn) {
    this.vm = vm
    this.key = key
    this.updateFn = updateFn

    // 触发依赖收集
    Dep.target = this
    this.vm[this.key]
    Dep.target = null
  }

  // 未来被Dep调用
  update() {
    // 执行实际更新操作
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