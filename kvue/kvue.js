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
    }
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
  Object.keys(vm[key]).forEach(k => {
    Object.defineProperty(vm, k, {
      get() {
        return vm[key][k];
      },
      set(v) {
        vm[key][k] = v;
      }
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
    Object.keys(obj).forEach(key => {
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
    // 3.挂载$mount
    if (options.el) {
      this.$mount(options.el);
    }
  }

  $mount(el) {
    // 1.获取宿主
    this.$el = document.querySelector(el);
    // 2.执行render
    const updateComponent = () => {
      // const el = this.$options.render.call(this);
      // 3.转换结果并追加
      // const parent = this.$el.parentElement;
      // parent.insertBefore(el, this.$el.nextSibling);
      // parent.removeChild(this.$el);
      // this.$el = el;
      const vnode = this.$options.render.call(this, this.$createElement);
      // patch
      this._update(vnode);
    };
    new Watcher(this, updateComponent);
  }

  // 返回虚拟dom
  $createElement(tag, props, children) {
    return { tag, props, children };
  }
  // 转换vnode=》dom
  _update(vnode) {
    // 判断是初始化还是patch
    // 是否存在上次计算结果
    const prevVnode = this._vnode;
    if (!prevVnode) {
      // init
      this.__patch__(this.$el, vnode);
    } else {
      // update
      this.__patch__(prevVnode, vnode);
    }

    // 保存vnode，更新使用
    this._vnode = vnode;
  }

  __patch__(oldVnode, vnode) {
    // 是否走初始化看oldVnode是否是一个dom
    if (oldVnode.nodeType) {
      // init create
      const parent = oldVnode.parentElement;
      const ref = oldVnode.nextSibling;
      const el = this.createElm(vnode);
      parent.insertBefore(el, ref);
      parent.removeChild(oldVnode);
    } else {
      // update
      // 1.获取要更新元素
      const el = (vnode.el = oldVnode.el);
      // 判断是否是相同节点
      if (oldVnode.tag === vnode.tag) {
        // diff
        // props ...
        // children
        // 获取两个子节点数组
        const oldCh = oldVnode.children;
        const newCh = vnode.children;
        if (typeof newCh === "string") {
          if (typeof oldCh === "string") {
            // 文本更新
            if (newCh !== oldCh) {
              el.textContent = newCh;
            }
          } else {
            // 将之前的子元素替换为文本
            el.textContent = newCh;
          }
        } else {
          if (typeof oldCh === "string") {
            // 将之前的文本替换为数组
            el.innerHTML = "";
            newCh.forEach(child => el.appendChild(this.createElm(child)));
          } else {
            // updateChildren
            this.updateChildren(el, oldCh, newCh);
          }
        }
      } else {
        // replace
        // ...
      }
    }
  }

  // 更新两组孩子
  updateChildren(parentElm, oldCh, newCh) {
    // 这⾥暂且直接patch对应索引的两个节点
    const len = Math.min(oldCh.length, newCh.length);
    for (let i = 0; i < len; i++) {
      this.__patch__(oldCh[i], newCh[i]);
    }
    // newCh若是更⻓的那个，说明有新增
    if (newCh.length > oldCh.length) {
      newCh.slice(len).forEach(child => {
        const el = this.createElm(child);
        parentElm.appendChild(el);
      });
    } else if (newCh.length < oldCh.length) {
      // oldCh若是更⻓的那个，说明有删减
      oldCh.slice(len).forEach(child => {
        parentElm.removeChild(child.el);
      });
    }
  }

  // 递归遍历vnode，创建dom树
  createElm(vnode) {
    const el = document.createElement(vnode.tag);

    // props
    // ...

    // children
    if (vnode.children) {
      if (typeof vnode.children === "string") {
        el.textContent = vnode.children;
      } else {
        // 递归
        vnode.children.forEach(child => el.appendChild(this.createElm(child)));
      }
    }

    // vnode中需要保存el,用于未来更新
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

    // 立即执行getter
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
    this.deps.forEach(watcher => watcher.update());
  }
}
