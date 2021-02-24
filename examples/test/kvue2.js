// 实现KVue构造函数
function defineReactive(obj, key, val) {
  // 如果val是对象，需要递归处理之
  observe(val);
  // 管家创建
  const dep = new Dep();
  Object.defineProperty(obj, key, {
    get() {
      console.log("get", key);
      // 依赖收集
      Dep.target && dep.addDep(Dep.target);
      return val;
    },
    set(newVal) {
      if (val !== newVal) {
        // 如果newVal是对象，也要做响应式处理
        observe(newVal);
        val = newVal;
        console.log("set", key, newVal);
        // 通知更新
        dep.notify();
      }
    },
  });
}
// 遍历指定数据对象每个key，拦截他们
function observe(obj) {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }
  // 每遇到⼀个对象，就创建⼀个Observer实例
  // 创建⼀个Observer实例去做拦截操作
  new Observer(obj);
}
// proxy代理函数：让⽤户可以直接访问data中的key
function proxy(vm, key) {
  Object.keys(vm[key]).forEach((k) => {
    Object.defineProperty(vm, k, {
      get() {
        return vm[key][k];
      },
      set(v) {
        vm[key][k] = v;
      },
    });
  });
}
// 根据传⼊value类型做不同操作
class Observer {
  constructor(value) {
    this.value = value;
    // 判断⼀下value类型
    // 遍历对象
    this.walk(value);
  }
  walk(obj) {
    Object.keys(obj).forEach((key) => {
      defineReactive(obj, key, obj[key]);
    });
  }
}
class KVue {
  constructor(options) {
    // 0.保存options
    this.$options = options;
    this.$data = options.data;
    // 1.将data做响应式处理
    observe(this.$data);
    // 2.为$data做代理
    proxy(this, "$data");
    // 3.编译模板
    // new Compile('#app', this)

    // 挂载
    if (options.el) {
      this.$mount(options.el);
    }
  }

  // 增加一个$mount方法：获得子树并且追加到宿主元素上
  $mount(el) {
    // 1.获取宿主元素
    this.$el = document.querySelector(el);

    // 2.定义组件更新函数
    const updateComponent = () => {
      // 从组件选项中获取render
      // const { render } = this.$options;
      // const el = render.call(this);
      // const parent = this.$el.parentElement;
      // parent.insertBefore(el, this.$el.nextSibling);
      // parent.removeChild(this.$el)
      // this.$el = el

      // vnode版本
      const { render } = this.$options;
      const vnode = render.call(this, this.$createElement);
      this._update(vnode);
    };

    // 3.创建watcher
    new Watcher(this, updateComponent);
  }

  // 获取vnode
  $createElement(tag, props, children) {
    return { tag, props, children };
  }

  // vnode => dom
  _update(vnode) {
    const prevVnode = this._vnode;
    if (prevVnode) {
      // update
      this.__patch__(prevVnode, vnode);
    } else {
      // init
      this.__patch__(this.$el, vnode);
    }
  }

  __patch__(oldVnode, vnode) {
    // 1.oldVnode是dom
    if (oldVnode.nodeType) {
      // init
      const parent = oldVnode.parentElement;
      const refElm = oldVnode.nextSibling;

      // 递归遍历vnode，创建对应dom树
      const el = this.createElm(vnode);
      parent.insertBefore(el, refElm);
      parent.removeChild(oldVnode);
    } else {
      // update
      const el = (vnode.el = oldVnode.el);
      // sameVnode
      if (oldVnode.tag === vnode.tag) {
        // diff
        // props update
        // children update
        // 1.获取双方children
        const oldCh = oldVnode.children;
        const newCh = vnode.children;
        if (typeof newCh === "string") {
          if (typeof oldCh === "string") {
            if (oldCh !== newCh) {
              el.textContent = newCh;
            }
          } else {
            // 清空并替换为文本
            el.textContent = newCh;
          }
        } else {
          // 数组孩子
          if (typeof oldCh === "string") {
            // 清空
            el.innerHTML = "";
            newCh.forEach((child) => {
              el.appendChild(this.createElm(child));
            });
          } else {
            // 双方都有孩子
            this.updateChildren(el, oldCh, newCh);
          }
        }
      }
    }
    // 保存vnode
    this._vnode = vnode;
  }

  updateChildren(parentElm, oldCh, newCh) {
    // 这⾥暂且直接patch对应索引的两个节点
    const len = Math.min(oldCh.length, newCh.length);
    for (let i = 0; i < len; i++) {
      // 强制更新，不管是不是相同节点
      this.__patch__(oldCh[i], newCh[i]);
    }
    // newCh若是更⻓的那个，说明有新增
    if (newCh.length > oldCh.length) {
      newCh.slice(len).forEach((child) => {
        const el = this.createElm(child);
        parentElm.appendChild(el);
      });
    } else if (newCh.length < oldCh.length) {
      // oldCh若是更⻓的那个，说明有删减
      oldCh.slice(len).forEach((child) => {
        parentElm.removeChild(child.el);
      });
    }
  }

  createElm(vnode) {
    const el = document.createElement(vnode.tag);
    // props
    for (const key in vnode.props) {
      el.setAttribute(key, vnode.props[key]);
    }

    // children
    if (vnode.children) {
      if (typeof vnode.children === "string") {
        el.textContent = vnode.children;
      } else {
        // 数组子元素
        vnode.children.forEach((vnode) => {
          el.appendChild(this.createElm(vnode));
        });
      }
    }

    // 保存真实dom，更新时要用
    vnode.el = el;
    return el;
  }
}
// 移除
// class Compile {}
// Watcher对应一个组件
class Watcher {
  constructor(vm, updaterFn) {
    this.vm = vm;
    this.getter = updaterFn;
    // 依赖收集触发
    this.get();
  }
  get() {
    Dep.target = this;
    this.getter.call(this.vm);
    Dep.target = null;
  }
  update() {
    this.get();
  }
}
// 管家：和某个key，⼀⼀对应，管理多个秘书，数据更新时通知他们做更新⼯作
class Dep {
  constructor() {
    this.deps = new Set();
  }
  addDep(watcher) {
    this.deps.add(watcher);
  }
  notify() {
    this.deps.forEach((watcher) => watcher.update());
  }
}
