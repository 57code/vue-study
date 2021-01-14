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
    // $mount()
    if (options.el) {
      this.$mount(options.el);
    }
  }

  // 转换vnode为dom
  $mount(el) {
    // 1.获取宿主
    this.$el = document.querySelector(el);

    // 2.updateComponent
    const updateComponent = () => {
      const { render } = this.$options;
      // const el = render.call(this);
      // const parent = this.$el.parentElement;
      // parent.insertBefore(el, this.$el.nextSibling);
      // parent.removeChild(this.$el)
      // this.$el = el;

      // vnode  render(h)
      const vnode = render.call(this, this.$createElement)
      this._update(vnode)
    };

    // 3.Watcher实例创建
    new Watcher(this, updateComponent);
  }

  // $createElement返回vnode
  $createElement(tag, props, children) {
    return {tag, props, children}
  }
  
  _update(vnode) {
    const prevVnode = this._vnode
    
    if (!prevVnode) {
      // init
      this.__patch__(this.$el, vnode)
    } else {
      // update
      this.__patch__(prevVnode, vnode)
    }
  }
  
  __patch__(oldVnode, vnode) {
    // init
    if (oldVnode.nodeType) {
      const parent = oldVnode.parentElement
      const refElm = oldVnode.nextSibling
      // 递归创建dom树
      const el = this.createElm(vnode)

      parent.insertBefore(el, refElm)
      parent.removeChild(oldVnode)

      // 保存vnode
      this._vnode = vnode
    } else {
      // update
      const el = vnode.el = oldVnode.el

      // diff
      // props
      // ...
      
      // children
      const oldCh = oldVnode.children
      const newCh = vnode.children
      if (typeof newCh === 'string') {
        if (typeof oldCh === 'string') {
          // 文本更新
          if (newCh !== oldCh) {
            el.textContent = newCh
          }
        } else {
          // 以前可能有孩子
          el.textContent = newCh
        }
      } else {
        // children
        if (typeof oldCh === 'string') {
          // 清空，批量创建
          el.innerHTML = ''
          newCh.forEach(v => {
            const child = this.createElm(v)
            el.appendChild(child)
          })
        } else {
          this.updateChildren(el, oldCh, newCh)
        }
      }
    }
  }

  updateChildren(parentElm, oldCh, newCh) {
    // 对应位置直接更新，老的数组如果长，批量删，新的数组长，批量创建
    const len = Math.min(oldCh.length, newCh.length)

    for (let i = 0; i < len; i++) {
      this.__patch__(oldCh[i], newCh[i])  
    }

    // 如果newCh更长
    if (newCh.length > oldCh.length) {
      newCh.slice(len).forEach(v => {
        const child = this.createElm(v)
        parentElm.appendChild(child)
      })
    } else if (newCh.length < oldCh.length) {
      oldCh.slice(len).forEach(v => {
        parentElm.removeChild(v.el)
      })
    }
  }
  
  createElm(vnode) {
    const el = document.createElement(vnode.tag)

    // props

    // children
    if (vnode.children) {
      if (typeof vnode.children === 'string') {
        el.textContent = vnode.children
      } else {
        // 有多个子元素
        vnode.children.forEach(vnode => {
          const child = this.createElm(vnode)
          el.appendChild(child)
        })
      }
    }

    // 保存真实节点，更新时要用到
    vnode.el = el
    return el
  }
  
}
// 移除
// class Compile {}
class Watcher {
  constructor(vm, fn) {
    this.vm = vm;

    this.getter = fn;

    // 首次调用
    this.get()
  }

  get() {
    // 依赖收集触发
    Dep.target = this;
    // updateComponent => render => data[key]
    this.getter.call(this.vm)
    Dep.target = null;
  }

  update() {
    this.get()
  }
}
// 管家：和某个key，⼀⼀对应，管理多个秘书，数据更新时通知他们做更新⼯作
class Dep {
  constructor() {
    this.deps = new Set()
  }
  addDep(watcher) {
    this.deps.add(watcher);
  }
  notify() {
    this.deps.forEach((watcher) => watcher.update());
  }
}
