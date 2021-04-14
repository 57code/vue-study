/* @flow */

import { ASSET_TYPES } from 'shared/constants'
import { isPlainObject, validateComponentName } from '../util/index'

export function initAssetRegisters (Vue: GlobalAPI) {
  /**
   * Create asset registration methods.
   */
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
        if (type === 'component' && isPlainObject(definition)) {
          // 1.组件名称
          definition.name = definition.name || id
          // _base === Vue
          // Vue.extend({}) => VueComponent
          // Vue => VueComponent
          // new VueComponent()
          // comp.$mount()
          // 下面是获取组件构造函数，以便后续创建组件实例
          definition = this.options._base.extend(definition)
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition }
        }
        // 2.注册到全局配置对象中
        // this.options.components.comp = definition
        this.options[type + 's'][id] = definition
        return definition
      }
    }
  })
}
