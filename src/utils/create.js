// 1.动态创建组件实例
// 2.将它们挂载到body
import Vue from 'vue'

export function create(Component, props) {
  // 创建实例
  // 方法1：extend =》 Ctor => new Ctor
  // 方式2：借鸡生蛋
  const vm = new Vue({
    render(h) {
      return h(Component, {props})
    }
  }).$mount() // 只挂载，不设置宿主元素，会生成dom

  // 手动追加到dom上
  document.body.appendChild(vm.$el)

  // 获取生成组件实例
  const comp = vm.$children[0]

  // 添加remove
  comp.remove = () => {
    document.body.removeChild(vm.$el)
    vm.$destroy()
  }

  return comp
}