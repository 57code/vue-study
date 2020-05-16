/* @flow */

import { ASSET_TYPES } from 'shared/constants'
import { isPlainObject, validateComponentName } from '../util/index'

export function initAssetRegisters (Vue: GlobalAPI) {
  /**
   * Create asset registration methods.
   */
  // ['component','filter','directive']
  // Vue.component('comp', {})
  ASSET_TYPES.forEach(type => {
    // 静态方法Vue['component']
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
          // 组件名称
          definition.name = definition.name || id
          // 获取构造函数
          definition = this.options._base.extend(definition)
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition }
        }
        // 全局注册，options['components']['comp'] = Ctor
        // 由于初始化时会合并用户选项和全局选项，所以这里就起到全局作用
        this.options[type + 's'][id] = definition
        return definition
      }
    }
  })
}
