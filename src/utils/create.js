import Vue from 'vue'
<<<<<<< HEAD
import Notice from '@/components/Notice.vue'

function create(Component, props) {
  // 组件构造函数如何获取？
  // 1.Vue.extend()
  // 2.render
  const vm = new Vue({
    // h是createElement, 返回VNode，是虚拟dom
    // 需要挂载才能变成真实dom
    render: h => h(Component, {props}),
  }).$mount() // 不指定宿主元素，则会创建真实dom，但是不会追加操作

  // 获取真实dom
  document.body.appendChild(vm.$el)

  const comp = vm.$children[0]

  // 删除
  comp.remove = function() {
    document.body.removeChild(vm.$el)
    vm.$destroy()
  }

  return comp

}

export default {
  install(Vue) {
    Vue.prototype.$notice = function(options) {

      return create(Notice, options)
    }

    //$alert
  }
=======

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

>>>>>>> 2c65389d71cbe23b8c86eeb55380a66a3bc0c45f
}