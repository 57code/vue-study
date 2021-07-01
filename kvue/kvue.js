function defineReactive(obj, key, val) {

  // 如果val本身还是对象，则需要递归处理
  observe(val)
  
  Object.defineProperty(obj, key, {
    get() {
      console.log("get", key);
      return val;
    },
    set(v) {
      if (v !== val) {
        // 如果传入v是一个对象，则仍然需要做响应式处理
        observe(v)
        val = v;
        console.log("set", key);
        // update()
      }
    },
  });
}

function observe(obj) {
  // 判断obj的值，必须是object
  if (typeof obj !== 'object' || obj == null) {
    return obj
  }
  Object.keys(obj).forEach((key) => defineReactive(obj, key, obj[key]));
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

class KVue {
  constructor(options) {
    // 1.保存选项
    this.$options = options
    this.$data = options.data
    // 2.对data选项做响应式处理
    observe(this.$data)

    // 2.5代理
    proxy(this)
    
    // 3.编译
    new Compile(options.el, this)
  }
}

class Compile {
  constructor(el, vm) {
    // 保存KVue实例
    this.$vm = vm

    // 编译模板树
    this.compile(document.querySelector(el))
  }

  // el模板根节点
  compile(el) {
    // 遍历el
    // 1.获取el所有子节点
    el.childNodes.forEach(node => {
      // 2.判断node类型
      if (node.nodeType === 1) {
        // 元素
        console.log('element', node.nodeName);

        // 递归
        if (node.childNodes.length > 0) {
          this.compile(node)
        }
      } else if (this.isInter(node)) {
        // 插值文本
        console.log('text', node.textContent);
        this.compileText(node)
      }
    })
  }

  // 处理插值文本
  compileText(node) {
    node.textContent = this.$vm[RegExp.$1]
  }
  
  // {{ooxx}}
  isInter(node) {
    return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent)
  }
}