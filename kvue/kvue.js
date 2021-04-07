// 数据响应式
function defineReactive(obj, key, val) {
  // 递归
  observe(val);

  // 创建一个对应的Dep实例
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
        observe(newVal);

        console.log("set", key);
        val = newVal;
        // update()
        dep.notify()
      }
    },
  });
}

// 递归遍历方法
function observe(obj) {
  if (typeof obj !== "object" || obj === null) {
    return;
  }

  // 创建Observer实例
  new Observer(obj);
}

// 响应式对象中的某个key只要它的值是一个对象就要创建一个Observer实例
class Observer {
  // 根据传入对象的类型做不同的响应式处理
  constructor(obj) {
    if (Array.isArray(obj)) {
      // todo
    } else {
      // 对象响应式
      this.walk(obj);
    }
  }

  walk(obj) {
    Object.keys(obj).forEach((key) => {
      defineReactive(obj, key, obj[key]);
    });
  }
}

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
class KVue {
  // new KVue({el, data})
  constructor(options) {
    this.$options = options;

    this.$data = options.data;

    // 1.对data做响应式处理
    observe(this.$data);

    // 1.5 代理
    proxy(this);

    // 2.编译
    new Compile(options.el, this);
  }
}

class Compile {
  constructor(el, vm) {
    this.$vm = vm;

    this.$el = document.querySelector(el);

    // 遍历宿主元素
    if (this.$el) {
      this.compile(this.$el);
    }
  }

  compile(el) {
    // 递归遍历根元素
    el.childNodes.forEach((node) => {
      if (this.isElm(node)) {
        // console.log("编译元素", node.nodeName);
        this.compileElement(node);
      } else if (this.isInter(node)) {
        // console.log('编译插值文本', node.textContent);
        this.compileText(node);
      }

      // 递归
      if (node.childNodes.length > 0) {
        this.compile(node);
      }
    });
  }

  // 元素判断
  isElm(node) {
    return node.nodeType === 1;
  }

  // 插值判断
  isInter(node) {
    return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent);
  }

  // {{ooxx}} => ooxx => this.$vm.ooxx
  compileText(node) {
    this.update(node, RegExp.$1, 'text')
  }

  // 元素的编译
  compileElement(node) {
    // 遍历所有属性：检查是否存在指令和事件
    const attrs = node.attributes;
    Array.from(attrs).forEach((attr) => {
      console.log(attr);
      // k-text="counter"
      const attrName = attr.name; // k-text
      const exp = attr.value; // counter

      // 只处理动态值
      // 指令-directive
      if (this.isDir(attrName)) {
        // 希望执行一个指令处理函数
        const dir = attrName.substring(2);
        this[dir] && this[dir](node, exp);
      }
    });
  }

  update(node, exp, dir) {
    // 1.初始化
    // 执行dir对应的实操函数
    const fn = this[dir+'Updater']
    fn && fn(node, this.$vm[exp])
    
    // 2.创建Watcher实例
    new Watcher(this.$vm, exp, function (val) {
      fn && fn(node, val)
    })
  }
  
  isDir(attrName) {
    return attrName.startsWith("k-");
  }

  // k-text
  text(node, exp) {
    this.update(node, exp, 'text')
  }

  textUpdater(node, val) {
    node.textContent = val;
  }
  
  // k-html
  html(node, exp) {
    this.update(node, exp, 'html')
  }

  htmlUpdater(node, val) {
    node.innerHTML = val;
  }
}

// 更新执行者Watcher
class Watcher {
  constructor(vm, key, updater) {
    this.vm = vm
    this.key = key
    this.updater = updater

    // 保存Watcher引用
    Dep.target = this
    this.vm[this.key]
    Dep.target = null
  }

  update() {
    this.updater.call(this.vm, this.vm[this.key])
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
    this.deps.forEach(w => w.update())
  }
}
