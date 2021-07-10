// 声明一个函数create
// 将传入组件配置转换为构造函数
// 将创建组件实例手动挂载至body

import Vue from "vue"

export default function create(Component, props) {
  // 1.转换为组件构造函数
  // 1.1 Vue.extend(Comp)
  const Ctor = Vue.extend(Component)
  const comp = new Ctor({
    propsData: props
  })
  // 1.2 new Vue({render: h => h(Comp)})
  // 2.挂载
  comp.$mount() // 只挂载：vdom=》dom
  // 挂载之后$el填充了
  // 手动追加至body
  document.body.appendChild(comp.$el)
  
  comp.remove = function() {
    document.body.removeChild(comp.$el)
    comp.$destroy()
  }
  
  return comp

}