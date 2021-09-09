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

    // 如果设置el，则挂载
    if (options.el) {
      this.$mount(options.el)
    }
  }

  $mount(el) {
    // 0.获取宿主
    this.$el = document.querySelector(el)
    
    // 1.声明一个updateComponent
    const updateComponent = () => {
      // const el = this.$options.render.call(this)
      // const parent = this.$el.parentElement
      // parent.insertBefore(el, this.$el.nextSibling)
      // parent.removeChild(this.$el)
      // this.$el = el

      // vnode
      const vnode = this.$options.render.call(this, this.$createElement)
      this._update(vnode)
    }

    // 2.new Watcher
    new Watcher(this, updateComponent)

  }

  // 创建返回虚拟dom
  $createElement(tag, props, children) {
    return {tag, props, children}
  }

  // 将传入的vnode转换，如果初始化则创建，如果是更新则patch
  _update(vnode) {
    // 上次vnode
    const prevVnode = this._vnode

    if (!prevVnode) {
      // init
      this.__patch__(this.$el, vnode)
    } else {
      // patch
      this.__patch__(prevVnode, vnode)
    }

    this._vnode = vnode
  }

  __patch__(oldVnode, vnode) {
    // 判断oldVnode是否是真实dom
    if (oldVnode.nodeType) {
      const parent = oldVnode.parentElement
      const refElm = oldVnode.nextSibling
      const el = this.createElm(vnode)
      parent.insertBefore(el, refElm)
      parent.removeChild(oldVnode)
      // 保存vnode
      this._vnode = vnode
    } else {
      // 获取要更新的元素
      const el = vnode.el = oldVnode.el

      // 同层比较相同节点
      if (oldVnode.tag === vnode.tag) {
        // diff
        // props
        // children
        // 获取双方孩子
        const oldCh = oldVnode.children
        const newCh = vnode.children

        if (typeof newCh === 'string') {
          if (typeof oldCh === 'string') {
            // 文本更新
            if (newCh !== oldCh) {
              el.textContent = newCh
            }
          } else {
            // replace elements with text
            el.textContent = newCh
          }
        } else {
          if (typeof oldCh === 'string') {
            // replace text with elements
            // clear
            // 循环创建并追加
          } else {
            this.updateChildren(el, oldCh, newCh)
          }
        }
      } else {
        // replace
      }
    }
  }

  updateChildren(parentElm, oldCh, newCh) {
    // 这⾥暂且直接patch对应索引的两个节点
    const len = Math.min(oldCh.length, newCh.length)
    for (let i = 0; i < len; i++) {
    this.__patch__(oldCh[i], newCh[i])
     }
    // newCh若是更⻓的那个，说明有新增
    if (newCh.length > oldCh.length) {
    newCh.slice(len).forEach(child => {
    const el = this.createElm(child)
    parentElm.appendChild(el)
     })
     } else if (newCh.length < oldCh.length) {
    // oldCh若是更⻓的那个，说明有删减
    oldCh.slice(len).forEach(child => {
    parentElm.removeChild(child.el)
     })
     }
    }

  createElm(vnode) {
    const el = document.createElement(vnode.tag)

    // props

    // children
    if (vnode.children) {
      if (typeof vnode.children === 'string') {
        // 文本内容
        el.textContent = vnode.children
      } else {
        // 子节点递归
        vnode.children.forEach(vnode => {
          el.appendChild(this.createElm(vnode))
        })
      }
    }

    // 保存真实元素，更新时要用
    vnode.el = el
    
    // 返回创建的dom
    return el
  }
}
// 移除
// class Compile {}
class Watcher {
  constructor(vm, fn) {
    this.vm = vm;
    // this.key = key;
    this.getter = fn;
   
    this.get()
  }
  get(){
     // 依赖收集触发
     Dep.target = this;
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
    this.deps = new Set();
  }
  addDep(watcher) {
    this.deps.add(watcher);
  }
  notify() {
    this.deps.forEach(watcher => watcher.update());
  }
}
