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
  }
}
// 移除
// class Compile {}
class Watcher {
  constructor(vm, key, updaterFn) {
    this.vm = vm;
    this.key = key;
    this.updaterFn = updaterFn;
    // 依赖收集触发
    Dep.target = this;
    this.vm[this.key];
    Dep.target = null;
  }
  update() {
    this.updaterFn.call(this.vm, this.vm[this.key]);
  }
}
// 管家：和某个key，⼀⼀对应，管理多个秘书，数据更新时通知他们做更新⼯作
class Dep {
  constructor() {
    this.deps = [];
  }
  addDep(watcher) {
    this.deps.push(watcher);
  }
  notify() {
    this.deps.forEach(watcher => watcher.update());
  }
}
