function reactive(obj, key, val) {
  // 递归
  observe(val);

  // 依赖
  const dep = new Dep()
  
  // object响应式defineProperty
  Object.defineProperty(obj, key, {
    get() {
      console.log("get", key);

      // 依赖收集
      Dep.target && dep.addDep(Dep.target)
      
      return val;
    },
    set(v) {
      if (v !== val) {
        console.log("set", key);
        observe(val);
        val = v;
        // update()
        dep.notify()
      }
    },
  });
}
// 遍历传入obj，对每个key做响应式拦截
function observe(obj) {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  // 创建Ob实例
  new Observer(obj);
}

// 根据传入对象类型做不同响应式处理
class Observer {
  constructor(value) {
    this.value = value;

    // 判断类型
    if (Array.isArray(value)) {
      // todo
    } else {
      // object
      this.walk(value);
    }
  }

  walk(obj) {
    Object.keys(obj).forEach((key) => {
      reactive(obj, key, obj[key]);
    });
  }
}

// 代理：可以使用户直接访问app.xxx代理到$data
function proxy(vm) {
  Object.keys(vm.$data).forEach((key) => {
    Object.defineProperty(vm, key, {
      get() {
        return vm.$data[key];
      },
      set(v) {
        vm.$data[key] = v;
      },
    });
  });
}

// eslint-disable-next-line no-unused-vars
class KVue {
  constructor(options) {
    // 保存选项
    this.$options = options;
    this.$data = options.data;

    // 响应式处理
    observe(this.$data);

    // 代理
    proxy(this);

    // 编译
    new Compile(this, options.el);
  }
}

class Compile {
  constructor(vm, el) {
    this.$vm = vm;
    this.el = document.querySelector(el);

    // 编译宿主元素
    this.compile(this.el);
  }

  // 递归遍历
  compile(el) {
    el.childNodes.forEach((node) => {
      // 判断类型
      if (node.nodeType === 1) {
        // 元素
        // console.log("编译", node.nodeName);
        this.compileElement(node)

        // 递归
        if (node.childNodes) {
          this.compile(node);
        }
      } else if (this.isInter(node)) {
        // console.log("编译文本", node.textContent);
        this.compileText(node)
      }
    });
  }

  // 编译文本节点 {{}}
  compileText(node) {
    this.update(node, RegExp.$1, 'text')
  }
  
  compileElement(node) {
    Array.from(node.attributes).forEach(attr => {
      // k-text="counter"
      const attrName = attr.name   // k-text
      const attrValue = attr.value // counter

      if (attrName.startsWith('k-')) {
        // 指令
        const dir = attrName.substring(2)
        dir && this[dir](node, attrValue)
      }
    })
  }

  // 更新函数：初始化和watcher实例创建
  update(node, exp, dir) {
    // 1.初始化
    const fn = this[dir + 'Updater']
    fn && fn(node, this.$vm[exp])

    // 2.更新
    new Watcher(this.$vm, exp, val => {
      fn && fn(node, val)
    })
  }
  
  // k-text
  text(node, exp) {
    this.update(node, exp, 'text')
  }
  
  textUpdater(node, val) {
    node.textContent = val
  }
  
  // k-html
  html(node, exp) {
    this.update(node, exp, 'html')
  }

  htmlUpdater(node, val) {
    node.innerHTML = val
  }
  
  isInter(node) {
    return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent);
  }
}

// 负责一个节点更新
class Watcher {
  constructor(vm, key, fn) {
    this.vm = vm
    this.key = key
    this.fn = fn

    Dep.target = this
    this.vm[this.key]
    Dep.target = null
  }

  update() {
    this.fn.call(this.vm, this.vm[this.key])
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