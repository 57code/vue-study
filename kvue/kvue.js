function defineReactive(obj, key, val) {
  // 递归
  observe(val);

  Object.defineProperty(obj, key, {
    get() {
      console.log("get", key);
      return val;
    },
    set(v) {
      if (val !== v) {
        console.log("set", key);
        // 传入新值v可能还是对象
        observe(v);
        val = v;
      }
    },
  });
}

// 递归遍历obj，动态拦截obj的所有key
function observe(obj) {
  if (typeof obj !== "object" || obj == null) {
    return obj;
  }

  // 每出现一个对象，创建一个Ob实例
  new Observer(obj);
}

// Observer: 判断传入obj类型，做对应的响应式处理
class Observer {
  constructor(obj) {
    this.value = obj;

    // 判断对象类型
    if (Array.isArray(obj)) {
      // todo
    } else {
      this.walk(obj);
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
    // 保存选项
    this.$options = options;
    this.$data = options.data;

    // 2.响应式处理
    observe(this.$data);

    // 3.代理data到KVue实例上
    proxy(this);

    // 4.编译
    new Compile(options.el, this);
  }
}

class Compile {
  // el-宿主，vm-KVue实例
  constructor(el, vm) {
    this.$vm = vm;
    this.$el = document.querySelector(el);

    this.compile(this.$el);
  }

  compile(el) {
    // 遍历el dom树
    el.childNodes.forEach((node) => {
      if (this.isElement(node)) {
        // element
        // 需要处理属性和子节点
        // console.log("编译元素", node.nodeName);
        this.compileElement(node);

        // 递归子节点
        if (node.childNodes && node.childNodes.length > 0) {
          this.compile(node);
        }
      } else if (this.isInter(node)) {
        // console.log("编译插值表达式", node.textContent);
        // 获取表达式的值并赋值给node
        this.compileText(node);
      }
    });
  }

  isElement(node) {
    return node.nodeType === 1;
  }

  // {{xxx}}
  isInter(node) {
    return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent);
  }

  isDir(attr) {
    return attr.startsWith("k-");
  }

  // 编译文本，将{{ooxx}}
  compileText(node) {
    node.textContent = this.$vm[RegExp.$1];
  }

  // 处理元素所有动态属性
  compileElement(node) {
    Array.from(node.attributes).forEach((attr) => {
      const attrName = attr.name;
      const exp = attr.value;

      // 判断是否是一个指令
      if (this.isDir(attrName)) {
        // 执行指令处理函数
        // k-text, 关心text
        const dir = attrName.substring(2);
        this[dir] && this[dir](node, exp)
      }
    });
  }

  // k-text处理函数
  text(node, exp) {
    node.textContent = this.$vm[exp]
  }

  // k-html
  html(node, exp) {
    node.innerHTML = this.$vm[exp]
  }
}
