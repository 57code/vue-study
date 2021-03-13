import Vue from "vue";
// 传入组件配置，返回组件实例
// 并且将组件实例执行挂载到body
export default function create(Component, props) {
  // const Ctor = Vue.extend(Component)
  // const comp = new Ctor({
  //   propsData: props
  // })

  // 方式2：借鸡生蛋
  const vm = new Vue({
    render: (h) => h(Component, { props }),
  });
  // 挂载到body
  vm.$mount() // 不传递参数，依然可以得到组件dom => vm.$el
  // 手动追加
  document.body.appendChild(vm.$el)

  // 获取组件实例
  const comp = vm.$children[0]

  // 淘汰方法
  comp.remove = () => {
    document.body.removeChild(vm.$el)
    vm.$destroy()
  }

  return comp
}
