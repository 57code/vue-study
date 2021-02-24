import Vue from 'vue'

// 接收组件配置，返回组件实例
export default function create(Component, props) {
  // Vue.extend(Component) => Ctor  => new Ctor
  const vm = new Vue({
    render(h) {
      return h(Component, { props });
    },
  }).$mount() // dom

  // 获取dom，追加到body
  document.body.appendChild(vm.$el)

  const comp = vm.$children[0]
  comp.remove = () => {
    document.body.removeChild(vm.$el)
    vm.$destroy()
  }

  return comp
}
