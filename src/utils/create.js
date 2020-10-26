import Vue from "vue";

// 传入一个组件配置
// 将它实例化，挂载至body
export function create(Component, props) {
  // 实例化
  // 1.extend
  // 2.new Vue({render(){}})
  const vm = new Vue({
    render: (h) => {
      return h(Component, { props });
    },
  })
  // 挂载才能获得dom
  vm.$mount() // 不传递宿主，手动追加避免覆盖原有内容
  document.body.appendChild(vm.$el)

  // 获取组件实例
  const comp = vm.$children[0]

  comp.remove = () => {
    document.body.removeChild(vm.$el)
    vm.$destroy()
  }
  
  return comp
}
