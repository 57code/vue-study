function defineReactive(obj, key, val) {
  // 递归处理
  observe(val);

  Object.defineProperty(obj, key, {
    get() {
      console.log("get", key);
      return val;
    },
    set(v) {
      if (v !== val) {
        console.log("set", key, v);
        val = v;
        // update()
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
        console.log('编译元素', node.nodeName);

        // 递归
        if (node.childNodes.length > 0) {
          this.compile(node)
        }
      } else if(this.isInter(node)) {
        // 2.插值绑定文本 {{xxx}}
        console.log('编译文本', node.textContent);
      }
    })
  }

  isInter(node) {
    return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent)
  }
}