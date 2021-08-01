import Vue from 'vue'

export default function create(Component, props) {
  // 1.创建Component组件的实例
  const Ctor = Vue.extend(Component)
  const comp = new Ctor({
    propsData: props
  })
  // 2.挂载：将其实例挂载到body
  comp.$mount() // vnode => dom

  // 3.手动追加
  document.body.appendChild(comp.$el)

  // 4.淘汰方法
  comp.remove = function() {
    document.body.removeChild(comp.$el)
    comp.$destroy()
  }
  
  return comp

}