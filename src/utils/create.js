import Vue from 'vue'

// 创建传入组件的实例，并执行挂载到body
export default function (Comp, props) {
  // 1.组件实例化
  // new Vue({
  //   render: (h) => h(Comp)
  // })
  const Ctor = Vue.extend(Comp)
  const comp = new Ctor({
    propsData: props
  })
  
  // 2.挂载至body
  comp.$mount() // 执行空挂载获取dom
  document.body.appendChild(comp.$el)

  // 2.5 淘汰方法
  comp.remove = () => {
    document.body.removeChild(comp.$el)
    comp.$destroy()
  }
  
  // 3.返回实例
  return comp
}