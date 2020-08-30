import Vue from "vue";

// 传递一个组件配置，返回一个组件实例，并且挂载它到body上
function create(Component, props) {
  // 组件实例创建
  // const Ctor = Vue.extend(Component)
  // new Ctor()
  // 方式二：借鸡生蛋
  const vm = new Vue({
    render: (h) => h(Component, { props }),
  }).$mount(); // 挂载将虚拟dom转换为dom

  // dom追加
  document.body.appendChild(vm.$el)

  // 获取组件实例
  const comp = vm.$children[0]

  comp.remove = () => {
    document.body.removeChild(vm.$el)
    vm.$destroy()
  }
  
  return comp
}

export default create;
