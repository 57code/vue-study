/* @flow */

import { ASSET_TYPES } from 'shared/constants'
import { isPlainObject, validateComponentName } from '../util/index'

export function initAssetRegisters (Vue: GlobalAPI) {
  /**
   * Create asset registration methods.
   */
  // ASSET_TYPES是数组：['component','directive','filter']
  ASSET_TYPES.forEach(type => {
    // Vue.component = function(){}
    // Vue.component('comp', {...})
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
        // 组件声明相关代码
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id
          // _base是Vue
          // Vue.extend({})返回组件构造函数
          definition = this.options._base.extend(definition)
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition }
        }
        // 注册到components选项中去
        // 在Vue原始选项上添加组件配置，将来其他组件继承，它们都有这些组件注册
        this.options[type + 's'][id] = definition
        return definition
      }
    }
  })
}
