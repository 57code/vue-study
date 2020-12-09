/* @flow */

import { ASSET_TYPES } from 'shared/constants'
import { isPlainObject, validateComponentName } from '../util/index'

export function initAssetRegisters (Vue: GlobalAPI) {
  /**
   * Create asset registration methods.
   */
  // ['component', 'filter', 'directive']
  ASSET_TYPES.forEach(type => {
    // Vue.component('comp', {})
    Vue[type] = function (
      id: string,
      definition: Function | Object
    ): Function | Object | void {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if (process.env.NODE_ENV !== 'production' && type === 'component') {
          validateComponentName(id)
        }
        // component方法注册
        if (type === 'component' && isPlainObject(definition)) {
          // name定义
          definition.name = definition.name || id
          // .vue：组件配置对象 => Vue.extend(配置对象) =》 组件构造函数 Ctor =》 new Ctor
          // Vue => VueComponent
          definition = this.options._base.extend(definition)
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition }
        }
        // this.options.components.comp = Ctor
        // 将组件构造函数存入全局通用配置选项
        // keepalive/transition/transition-group
        this.options[type + 's'][id] = definition
        return definition
      }
    }
  })
}
