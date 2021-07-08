/* @flow */

import { ASSET_TYPES } from 'shared/constants'
import { isPlainObject, validateComponentName } from '../util/index'

export function initAssetRegisters (Vue: GlobalAPI) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(type => {
    // Vue.component(id, def)
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
          definition.name = definition.name || id
          // Vue.extend(def) => VueComponent => new VueComponent
          // 获取组件构造函数
          definition = this.options._base.extend(definition)
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition }
        }
        // 全局注册组件：options.components.comp = Ctor
        // 未来组件初始化时会做选项合并
        this.options[type + 's'][id] = definition
        return definition
      }
    }
  })
}
