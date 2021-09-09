/* @flow */

import { ASSET_TYPES } from 'shared/constants'
import { isPlainObject, validateComponentName } from '../util/index'

export function initAssetRegisters (Vue: GlobalAPI) {
  /**
   * Create asset registration methods.
   */
  // ['component', 'directive', 'filter']
  ASSET_TYPES.forEach(type => {
    // Vue.component = function(id, def)
    // Vue.component('comp', {...})
    Vue[type] = function (
      id: string,
      definition: Function | Object // 组件配置对象
    ): Function | Object | void {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if (process.env.NODE_ENV !== 'production' && type === 'component') {
          validateComponentName(id)
        }
        // 组件注册函数
        // 如果是对象，说明传入是组件配置，此时需要做转换：对象 =》组件构造函数
        // 这是为后续组件实例化做准备：new Ctor()
        if (type === 'component' && isPlainObject(definition)) {
          // Vue.component('comp', {})
          definition.name = definition.name || id
          // 构造函数获取：Vue.extend(obj) => VueComponent
          // const Ctor = Vue.extend()
          // new Ctor()
          definition = this.options._base.extend(definition)
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition }
        }
        // 2.注册到全局配置项中
        // options.components['comp'] = Ctor
        // 全局注册就是添加到系统选项中，以后所有组件初始化的时候，会有一个选项合并
        // 那是所有这些全局组件就放入了当前组件的components选项中
        this.options[type + 's'][id] = definition
        return definition
      }
    }
  })
}
