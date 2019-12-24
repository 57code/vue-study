import Vue from 'vue'

const createPlugin = {
  install(Vue) {
    // 创建函数接收要创建组件定义
    Vue.prototype.$create = function(Component, props) {
      // 创建一个Vue新实例
      const vm = new Vue({
        render(h) {
          // render函数将传入组件配置对象转换为虚拟dom
          return h(Component, { props });
        }
      }).$mount(); //执行挂载函数，但未指定挂载目标，表示只执行初始化工作

      // 将生成dom元素追加至body
      document.body.appendChild(vm.$el);

      // 给组件实例添加销毁方法
      const comp = vm.$children[0];
      
      comp.remove = () => {
        document.body.removeChild(vm.$el);
        // vm.$el.parent.removeChild(vm.$el);
        vm.$destroy();
      };
      return comp;
    };
  }
}

Vue.use(createPlugin)