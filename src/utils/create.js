import Vue from 'vue'

export default function create(Component, props) {
  // 动态创建Component组件的实例
  const Ctor = Vue.extend(Component)
  const comp = new Ctor({
    propsData: props
  })
  // 然后挂载之，并追加至body中
  comp.$mount() // 空挂载可以生成dom
  // 获取dom
  document.body.appendChild(comp.$el)

  comp.remove = () => {
    document.body.removeChild(comp.$el)
    comp.$destroy()
  }
  
  return comp
}