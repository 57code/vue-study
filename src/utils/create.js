import Vue from "vue";

// 1.create(Comp): 动态创建Comp组件实例
// 2.执行挂载获取其dom元素
// 3.追加到body中
export default function create(Component, props) {
  // 创建组件实例：
  // 方案1：extends
  // const Ctor = Vue.extends(Component)
  // new Ctor({propsData: props})
  // 方案2： 借鸡生蛋
  const vm = new Vue({
    render: (h) => h(Component, { props }),
  }).$mount(); // 只挂载，不指定宿主，依然可以得到dom

  // 手动追加
  document.body.appendChild(vm.$el)

  // 获取组件实例
  // vm.$root // 根实例
  const comp = vm.$children[0] // 根组件实例
  
  // 给一个淘汰方法
  comp.remove = () => {
    document.body.removeChild(vm.$el)
    vm.$destroy()
  }

  // 返回一个组件实例
  return comp
}
