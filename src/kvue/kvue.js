// new KVue({
//     data: {
//         msg: 'hello'
//     }
// })

class KVue {
  constructor(options) {
    this.$options = options;

    this.$data = options.data;
    // 响应化
    this.observe(this.$data);

    // 测试代码
    // new Watcher(this, 'test');
    // this.test;

    // 创建编译器
    new Compile(options.el, this);

    if (options.created) {
        options.created.call(this);
    }
  }

  // 递归遍历，使传递进来的对象响应化
  observe(value) {
    if (!value || typeof value !== "object") {
      return;
    }

    // 遍历
    Object.keys(value).forEach(key => {
      // 对key做响应式处理
      this.defineReactive(value, key, value[key]);
      this.proxyData(key);
    });
  }

  // 在vue根上定义属性代理data中的数据
  proxyData(key) {
    Object.defineProperty(this, key, {
      get() {
        return this.$data[key];
      },
      set(newVal) {
        this.$data[key] = newVal;
      }
    });
  }
  //
  defineReactive(obj, key, val) {
    // 递归
    this.observe(val);

    // 创建Dep实例：Dep和key一对一对应
    const dep = new Dep();

    // 给obj定义属性
    Object.defineProperty(obj, key, {
      get() {
        // 将Dep.target指向的Watcher实例加入到Dep中
        Dep.target && dep.addDep(Dep.target);
        return val;
      },
      set(newVal) {
        if (newVal !== val) {
          val = newVal;
          dep.notify();
        }
      }
    });
  }
}

// Dep:管理若干watcher实例，它和key一对一关系
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

// 保存ui中依赖，实现update函数可以更新之
class Watcher {
  constructor(vm, key, cb) {
    this.vm = vm;
    this.key = key;
    this.cb = cb;

    // 将当前实例指向Dep.target
    Dep.target = this;
    this.vm[this.key];// 读一次key触发getter
    Dep.target = null;
  }

  update() {
      this.cb.call(this.vm, this.vm[this.key])
    // console.log(`${this.key}属性更新了`);
  }
}
