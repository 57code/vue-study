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

    // 若存在el选项，直接调用mount
    if (options.el) {
      this.$mount(options.el);
    }
  }

  // updateComponent，Watcher
  $mount(el) {
    // 获取宿主
    this.$el = document.querySelector(el);

    const updateComponent = () => {
      // 执行render
      const { render } = this.$options;
      // const el = render.call(this)
      // const parent = this.$el.parentElement
      // parent.insertBefore(el, this.$el.nextSibling)
      // parent.removeChild(this.$el)
      // this.$el = el

      // 调用render获取vnode
      const vnode = render.call(this, this.$createElement);
      this._update(vnode);
    };

    // 创建watcher实例
    new Watcher(this, updateComponent);
  }

  $createElement(tag, props, children) {
    return { tag, props, children };
  }

  _update(vnode) {
    // 获取上次执行的vnode
    const prevVnode = this._vnode;

    if (!prevVnode) {
      // init
      this.__patch__(this.$el, vnode);
    } else {
      // update
      this.__patch__(prevVnode, vnode);
    }
  }

  __patch__(oldVnode, vnode) {
    if (oldVnode.nodeType) {
      // init
      const parent = oldVnode.parentElement;
      const refElm = oldVnode.nextSibling;

      const el = this.createElm(vnode);
      parent.insertBefore(el, refElm);
      parent.removeChild(oldVnode);
    } else {
      // 获取真实dom
      const el = (vnode.el = oldVnode.el);
      // update
      // props
      const oldProps = oldVnode.props || {};
      const newProps = vnode.props || {};
      for (const key in newProps) {
        el.setAttribute(key, newProps[key]);
      }
      for (const key in oldProps) {
        if (!(key in newProps)) {
          el.removeAttribute(key);
        }
      }

      // children
      const oldCh = oldVnode.children;
      const newCh = vnode.children;
      // text update
      if (typeof newCh === "string") {
        if (typeof oldCh === "string") {
          if (newCh !== oldCh) {
            el.textContent = newCh;
          }
        } else {
          // 以前没有文本
          el.textContent = newCh;
        }
      } else {
        // 老节点是文本
        if (typeof oldCh === "string") {
          // 清空，创建新节点
          el.innerHTML = "";
          newCh.forEach((child) => {
            el.appendChild(this.createElm(child));
          });
        } else {
          // 重排
          this.updateChildren(el, oldCh, newCh);
        }
      }
    }
    // 保存vnode
    this._vnode = vnode;
  }

  updateChildren(el, oldCh, newCh) {
    // 这⾥暂且直接patch对应索引的两个节点
    const len = Math.min(oldCh.length, newCh.length);
    for (let i = 0; i < len; i++) {
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

  // vnode => dom
  createElm(vnode) {
    const el = document.createElement(vnode.tag);

    // props
    if (vnode.props) {
      for (const key in vnode.props) {
        const value = vnode.props[key];
        el.setAttribute(key, value);
      }
    }

    // children
    if (vnode.children) {
      if (typeof vnode.children === "string") {
        // text
        el.textContent = vnode.children;
      } else {
        // children array
        vnode.children.forEach((v) => {
          const child = this.createElm(v);
          el.appendChild(child);
        });
      }
    }

    // 保存创建真实dom
    vnode.el = el;

    return el;
  }
}
// 移除
// class Compile {}
class Watcher {
  constructor(vm, fn) {
    this.vm = vm;

    this.getter = fn;

    this.get();
  }
  get() {
    // 依赖收集触发
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
