function defineReactive(obj, key, val) {
  // 递归判断
  observe(val);

  // 创建对应的Dep实例
  const dep = new Dep();

  // 属性拦截
  // 利用闭包：
  // 1.局部作用域
  // 2.通过函数暴露出去
  Object.defineProperty(obj, key, {
    get() {
      console.log("get", key);
      // 建立映射关系
      Dep.target && dep.addDep(Dep.target);
      return val;
    },
    set(newVal) {
      console.log("set", key);
      if (newVal !== val) {
        // 新设置的值有可能是对象
        observe(newVal);
        val = newVal;
        // update()
        dep.notify();
      }
    },
  });
}

// 遍历需要响应式处理的对象
function observe(obj) {
  if (typeof obj !== "object") {
    return obj;
  }
  // 遍历
  new Observer(obj);
}

// Observer：用来去分对象还是数组，从而做不同响应式操作
class Observer {
  constructor(value) {
    if (Array.isArray(value)) {
      // todo
    } else {
      // object
      this.walk(value);
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

// KVue
class KVue {
  constructor(options) {
    this.$options = options;
    this.$data = options.data;

    // 1.响应式
    observe(this.$data);

    // 1.5 代理：用户可以通过KVue实例直接访问data中的响应式数据
    proxy(this);

    // 2.编译: 传入宿主元素和KVue实例
    new Compile(options.el, this);
  }
}

class Compile {
  constructor(el, vm) {
    this.$vm = vm;
    this.$el = document.querySelector(el);

    // 执行编译
    this.compile(this.$el);
  }

  compile(el) {
    el.childNodes.forEach((node) => {
      // element
      if (node.nodeType === 1) {
        // 遍历特性
        // console.log('编译元素', node.nodeName);
        this.compileElement(node);

        // 递归
        if (node.childNodes.length > 0) {
          this.compile(node);
        }
      } else if (this.isInter(node)) {
        // console.log('编译文本', node.textContent);
        this.compileText(node);
      }
    });
  }

  // 是否是插值表达式{{xx}}
  isInter(node) {
    return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent);
  }

  // 编译元素
  compileElement(node) {
    // 1.attrs
    const attrs = node.attributes;
    Array.from(attrs).forEach((a) => {
      // k-text="counter"
      const attrName = a.name; // k-text
      const exp = a.value; // counter
      if (attrName.startsWith("k-")) {
        const dir = attrName.substring(2);
        this[dir] && this[dir](node, exp);
      }
      // k-bind:title=""
      // :style  :class
    });
  }

  // 处理插值
  compileText(node) {
    this.update(node, RegExp.$1, 'text') // k-text
    // node.textContent = this.$vm[RegExp.$1];
  }
  // k-text
  text(node, exp) {
    this.update(node, exp, 'text') // k-text
  }
  textUpdater(node, val) {
    node.textContent = val;
  }
  
  // k-html
  html(node, exp) {
    this.update(node, exp, 'html') // k-text
  }
  htmlUpdater(node, val) {
    node.innerHTML = val;
  }

  // 节点、表达式和指令
  update(node, exp, dir) {
    // 0。获取实操函数
    const fn = this[dir + 'Updater']

    // 1.init
    fn && fn(node, this.$vm[exp])

    // 2.update
    new Watcher(this.$vm, exp, function(val) {
      fn && fn(node, val)
    })
  }
}

// 依赖收集
class Dep {
  constructor() {
    // 存储管理的所有watchers
    this.deps = [];
  }

  addDep(watcher) {
    this.deps.push(watcher);
  }

  notify() {
    this.deps.forEach((dep) => dep.update());
  }
}

// 界面中出现动态值，就要创建一个Watcher实例
class Watcher {
  constructor(vm, key, fn) {
    this.vm = vm;
    this.key = key;
    this.fn = fn;

    // 触发依赖收集：
    Dep.target = this; // 保存当前实例
    this.vm[this.key]; // 读取一次key,触发getter
    Dep.target = null;
  }

  update() {
    this.fn.call(this.vm, this.vm[this.key]);
  }
}
