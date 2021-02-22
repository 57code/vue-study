/* @flow */

import { ASSET_TYPES } from 'shared/constants'
import { isPlainObject, validateComponentName } from '../util/index'

export function initAssetRegisters (Vue: GlobalAPI) {
  /**
   * Create asset registration methods.
   */
  // ASSET_TYPES: ['component', 'filter', 'directive']
  ASSET_TYPES.forEach(type => {
    // 声明静态方法
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
          // 组件名称定义
          definition.name = definition.name || id
          // 获取组件构造函数：
          // _base就是Vue.extend(definition)
          // 此方法返回组件构造函数 Ctor， new Ctor => 组件实例
          definition = this.options._base.extend(definition)
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition }
        }
        // 注册组件，{components: {comp: {...}}}
        // 放入到全局配置中，任何子组件选项会合并，所以这些子组件可以使用这些全局组件
        this.options[type + 's'][id] = definition
        return definition
      }
    }
  })
}
