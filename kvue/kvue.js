// 利用Object.defineProperty(obj, key, descriptor)
// Vue.util.defineReactive()
function defineReactive(obj, key, val) {
  // 递归遍历
  observe(val);

  // 每个key对应一个Dep实例
  const dep = new Dep()
  
  Object.defineProperty(obj, key, {
    get() {
      console.log(`get ${key}`);
      // 关系映射：dep和watcher
      Dep.target && dep.addDep(Dep.target)
      return val;
    },
    set(newVal) {
      if (newVal !== val) {
        console.log(`set ${key}`);
        observe(newVal); // 新值如果是对象，则要对它执行响应式处理
        val = newVal;

        // 通知更新
        dep.notify()
      }
    },
  });
}

function observe(obj) {
  // 必须是对象
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  // 创建一个Observer实例
  new Observer(obj);
}

class Observer {
  constructor(value) {
    this.value = value;

    if (Array.isArray(value)) {
      // todo
    } else {
      // object
      this.walk(value);
    }
  }

  // 对象响应式处理
  walk(obj) {
    Object.keys(obj).forEach((key) => defineReactive(obj, key, obj[key]));
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
  constructor(options) {
    this.$options = options;
    this.$data = options.data;

    // 对data选项做响应式处理
    observe(this.$data);

    // 代理data到vm上
    proxy(this);

    // 执行编译
    new Compile(options.el, this);
  }
}

// 遍历dom树，找到动态的表达式或者指令等
class Compile {
  constructor(el, vm) {
    this.$vm = vm;
    this.$el = document.querySelector(el);

    if (this.$el) {
      this.compile(this.$el);
    }
  }

  // 递归传入节点，根据节点类型不同做不同操作
  compile(el) {
    // 获取所有孩子节点
    const childNodes = el.childNodes;
    childNodes.forEach((node) => {
      if (node.nodeType === 1) {
        // 元素节点
        // console.log("编译元素", node.nodeName);
        this.compileElement(node)

        // 递归
        if (node.hasChildNodes) {
          this.compile(node);
        }
      } else if (this.isInter(node)) {
        // console.log("文本节点", node.textContent);
        this.compileText(node)
      }
    });
  }

  isInter(node) {
    // 形如{{xx}}
    return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent)
  }

  // 编译元素节点
  compileElement(node) {
    // 元素节点，处理其属性
    let nodeAttrs = node.attributes
    Array.from(nodeAttrs).forEach(attr => {
      // v-text="xxx"
      const attrName = attr.name // v-text
      const exp = attr.value // xxx

      if (attrName.indexOf('k-') === 0) {
        // 指令
        // 每个指令有其特定的处理函数
        const dir = attrName.substring(2)
        this[dir] && this[dir](node, exp)
      }

    })
  }

  // 遇到绑定表达式或者指令，
  // 首先初始化他们的初始值
  // 创建watcher实例管理当前node它的更新
  update(node, exp, dir) {
    // 初始化
    const fn = this[dir + 'Updater']
    fn && fn(node, this.$vm[exp])

    // 更新函数
    new Watcher(this.$vm, exp, val => {
      fn && fn(node, val)
    })
  }

  textUpdater(node, value) {
    node.textContent = value
  }
  htmlUpdater(node, value) {
    node.innerHTML = value
  }

  // {{xx}}
  compileText(node) {
    this.update(node, RegExp.$1, 'text')
  }

  // k-text
  text(node, exp) {
    this.update(node, exp, 'text')
  }

  // k-html
  html(node, exp) {
    this.update(node, exp, 'html')
  }
}

// 负责更新视图
class Watcher {
  constructor(vm, key, updater) {
    this.vm = vm
    this.key = key
    this.updaterFn = updater

    // 创建实例时，把当前实例指定到Dep.target静态属性上
    Dep.target = this
    // 读一下key，触发get
    vm[key]
    // 置空
    Dep.target = null
  }

  // 未来执行dom更新函数，由dep调用的
  update() {
    this.updaterFn.call(this.vm, this.vm[this.key])
  }
}

// 依赖：defineReactive中的每一个key对应一个Dep的实例， 1：1
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