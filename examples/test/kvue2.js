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

  // 每遇到一个对象，就创建一个Observer实例
  // 创建一个Observer实例去做拦截操作
  new Observer(obj);
}

// proxy代理函数：让用户可以直接访问data中的key
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

// 根据传入value类型做不同操作
class Observer {
  constructor(value) {
    this.value = value;

    // 判断一下value类型
    // 遍历对象
    this.walk(value);
  }

  walk(obj) {
    Object.keys(obj).forEach((key) => {
      defineReactive(obj, key, obj[key]);
    });
  }
}

// eslint-disable-next-line no-unused-vars
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
    // 1.$mount()
    // 2.Watcher:一个组件一个watcher
    if (options.el) {
      this.$mount(options.el);
    }
  }

  $mount(el) {
    this.$el = document.querySelector(el);

    // updateComponent
    const updateComponent = () => {
      // 执行渲染函数
      // const { render } = this.$options;
      // const el = render.call(this);
      // const parent = this.$el.parentElement;
      // parent.insertBefore(el, this.$el.nextSibling);
      // parent.removeChild(this.$el);
      // this.$el = el;

      // vnode实现
      const {render} = this.$options
      const vnode = render.call(this, this.$createElement)
      this._update(vnode)
    };

    // 创建一个Watcher实例
    new Watcher(this, updateComponent);
  }

  $createElement(tag, props, children) {
    return { tag, props, children };
  }

  _update(vnode) {
    const prevVnode = this._vnode

    if (!prevVnode) {
      this.__patch__(this.$el, vnode)
    } else {
      // update
      this.__patch__(prevVnode, vnode)
    }
  }

  __patch__(oldVnode, vnode) {
    // oldVnode是dom
    if(oldVnode.nodeType) {
      const parent = oldVnode.parentElement
      const refElm = oldVnode.nextSibling
      // props
      // children
      const el = this.createElm(vnode)
      parent.insertBefore(el, refElm)
      parent.removeChild(oldVnode)
      
    } else {
      // update todo
      // 获取dom
      const el = vnode.el = oldVnode.el
      if (oldVnode.tag === vnode.tag) {
        // props

        // children
        const oldCh = oldVnode.children
        const newCh = vnode.children

        if (typeof newCh === 'string') {
          if (typeof oldCh === 'string') {
            // 文本更新
            if(newCh !== oldCh) {
              el.textContent = newCh
            }
          } else {
            el.textContent = newCh
          }
        } else {
          // 新的是数组
          // 老的是文本
          if (typeof oldCh === 'string') {
            // 清空文本
            el.innerHTML = ''
            newCh.forEach(vnode => this.createElm(vnode))
          } else {
            this.updateChildren(el, oldCh, newCh)
          }
        }
      }
    }

    //保存vnode
    this._vnode = vnode
  }

  // 递归创建dom树
  createElm(vnode) {
    const el = document.createElement(vnode.tag)

    // props
    if(vnode.props) {
      for(const key in vnode.props) {
        el.setAttribute(key, vnode.props[key])
      }
    }

    // chidren
    if (vnode.children) {
      if (typeof vnode.children === 'string') {
        el.textContent = vnode.children
      } else {
        // 子元素
        vnode.children.forEach(vnode => {
          const child = this.createElm(vnode)
          el.appendChild(child)
        })
      }
    }

    // vnode中保存dom
    vnode.el = el

    return el
  }

  // 更新孩子
  updateChildren(parentElm, oldCh, newCh) {
    const len = Math.min(oldCh.length, newCh.length)
    // 遍历较短的那个子数组
    for (let i = 0; i < len; i++) {
      this.__patch__(oldCh[i], newCh[i])
    }

    // newCh若是更长的那个，新增
    if (newCh.length > oldCh.length) {
      newCh.slice(len).forEach(vnode => {
        const el = this.createElm(vnode)
        parentElm.appendChild(el)
      })
    } else if(newCh.length < oldCh.length){
      oldCh.slice(len).forEach(vnode => {
        parentElm.removeChild(vnode.el)
      })
    }
  }
}

// 移除
// class Compile {}

class Watcher {
  constructor(vm, expOrFn) {
    this.vm = vm;
    this.getter = expOrFn;

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

// 管家：和某个key，一一对应，管理多个秘书，数据更新时通知他们做更新工作
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
